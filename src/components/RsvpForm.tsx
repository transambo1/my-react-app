import React, { useState, useEffect } from "react";
import hostInfo from "../data/hostInfo.json";
import guests from "../data/guest.json";
import rsvpConfig from "../data/rsvpConfig.json";

interface FormData {
  name: string;
  wishes: string;
  attending: string;
  phone: string;
  email: string;
}

// Web App URL Apps Script
const GOOGLE_SHEET_API_URL =
  "https://script.google.com/macros/s/AKfycbyfYxboaLHgyD5F8KrfeD-hCRZsqgOxn3UguZvhC8Ek9EMZXEquZMfVHC1-pSJL1RkBIA/exec";

export default function RsvpForm() {
  const searchParams = new URLSearchParams(window.location.search);
  const guestSlug = searchParams.get("to");
  const matchedGuest = guests.find((g) => g.slug === guestSlug);
  const defaultGuestName = matchedGuest?.name || searchParams.get("name") || "";

  const [formData, setFormData] = useState<FormData>({
    name: defaultGuestName,
    wishes: "",
    attending: "Chắc chắn tham dự ✨",
    phone: "",
    email: "",
  });

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Khóa cuộn trang triệt để khi modal hiển thị
  useEffect(() => {
    if (isSuccess) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSuccess]);

  // LOGIC KIỂM TRA DỮ LIỆU
  const validateForm = () => {
    if (!formData.name.trim()) {
      setErrorMessage("Vui lòng điền tên của người thương nhé!");
      return false;
    }

    const phoneRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;
    const cleanPhone = formData.phone.replace(/\s+/g, "");
    if (cleanPhone && !phoneRegex.test(cleanPhone)) {
      setErrorMessage("Số điện thoại không hợp lệ (Ví dụ: 0912345678)!");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email.trim() && !emailRegex.test(formData.email.trim())) {
      setErrorMessage("Địa chỉ Email chưa đúng định dạng!");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const formParams = new URLSearchParams();
      formParams.append("timestamp", new Date().toLocaleString("vi-VN"));
      formParams.append("name", formData.name.trim());
      formParams.append("wishes", formData.wishes.trim() || "(Không có)");
      formParams.append("attending", formData.attending);
      formParams.append("phone", formData.phone.trim() || "(Không có)");

      await fetch(GOOGLE_SHEET_API_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formParams.toString(),
      });

      window.dispatchEvent(
        new CustomEvent("new_wish_submitted", {
          detail: {
            name: formData.name,
            wishes: formData.wishes,
          },
        }),
      );

      // Backup LocalStorage
      const existing = JSON.parse(
        localStorage.getItem("rsvp_submissions") || "[]",
      );
      localStorage.setItem(
        "rsvp_submissions",
        JSON.stringify([
          ...existing,
          { ...formData, createdAt: new Date().toISOString() },
        ]),
      );

      setIsSuccess(true);
    } catch (error) {
      console.error("Lỗi gửi form:", error);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    backgroundColor: "#EEE8E2",
    border: "1.2px solid #5a141b",
    borderRadius: "9999px",
    padding: "10px 18px",
    fontSize: "14px",
    color: "#0C1E42",
    fontFamily: '"Cormorant Garamond", "Times New Roman", serif',
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        backgroundColor: "#0C1E42", // Đổi từ "white" thành "#0C1E42" tránh lộ viền sáng
        boxSizing: "border-box",
      }}
    >
      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <div
        style={{
          position: "relative",
          margin: "0 auto",
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "#0C1E42",
          boxShadow: "0 18px 40px rgba(86,42,43,0.12)",
          padding: "36px 20px 32px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            textAlign: "center",
            color: "#EEE8E2",
            marginBottom: "28px",
            fontFamily: '"Cormorant Garamond", "Times New Roman", serif',
            lineHeight: 1.6,
          }}
        >
          <p style={{ fontSize: "14.5px", fontWeight: 600, margin: "0 0 6px" }}>
            Sự hiện diện của “người thương” sẽ là niềm hạnh phúc của mình.
          </p>
          <p
            style={{ fontSize: "13.5px", margin: "0 0 6px", color: "#EEE8E2" }}
          >
            Nếu tham dự, “người thương” để lại thông tin để{" "}
            {hostInfo.name ? hostInfo.name.split(" ").slice(-1)[0] : "mình"} có
            thể đón tiếp thật chu đáo.
          </p>
          <p style={{ fontSize: "14px", fontWeight: 600, margin: "0" }}>
            Cảm ơn “người thương”!
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "14px" }}
        >
          {/* Tên */}
          <div>
            <input
              type="text"
              required
              placeholder="Tên người thương *"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errorMessage) setErrorMessage("");
              }}
              style={inputStyle}
            />
          </div>

          {/* Lời nhắn */}
          <div>
            <textarea
              rows={4}
              placeholder="Lời nhắn gửi..."
              value={formData.wishes}
              onChange={(e) =>
                setFormData({ ...formData, wishes: e.target.value })
              }
              style={{
                ...inputStyle,
                borderRadius: "20px",
                resize: "none",
                padding: "12px 18px",
              }}
            />
          </div>

          {/* Trạng thái tham dự */}
          <div style={{ position: "relative" }}>
            <select
              value={formData.attending}
              onChange={(e) =>
                setFormData({ ...formData, attending: e.target.value })
              }
              style={{
                ...inputStyle,
                appearance: "none",
                WebkitAppearance: "none",
                cursor: "pointer",
                paddingRight: "36px",
              }}
            >
              <option value="Chắc chắn tham dự ">Chắc chắn tham dự </option>
              <option value="Tiếc quá, mình bận mất rồi ">
                Tiếc quá, mình bận mất rồi 
              </option>
            </select>
            <span
              style={{
                position: "absolute",
                right: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
                color: "#0C1E42",
                fontSize: "10px",
              }}
            >
              ▼
            </span>
          </div>

          {/* Số điện thoại */}
          <div>
            <input
              type="tel"
              placeholder="Số điện thoại (tuỳ chọn)"
              value={formData.phone}
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value });
                if (errorMessage) setErrorMessage("");
              }}
              style={inputStyle}
            />
          </div>

          {/* Thông báo lỗi */}
          {errorMessage && (
            <div
              style={{
                color: "#ff6b6b",
                fontSize: "12px",
                textAlign: "center",
                fontWeight: 600,
                fontFamily: "serif",
              }}
            >
              {errorMessage}
            </div>
          )}

          {/* Nút gửi */}
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              marginTop: "4px",
              width: "100%",
              backgroundColor: "#EEE8E2",
              color: "#0C1E42",
              border: "none",
              borderRadius: "9999px",
              padding: "13px 0",
              fontSize: "18px",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontFamily: '"Cinzel", "Cormorant Garamond", serif',
              cursor: isSubmitting ? "not-allowed" : "pointer",
              boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
              transition: "all 0.2s ease",
            }}
          >
            {isSubmitting
              ? "ĐANG GỬI..."
              : rsvpConfig?.submitButton || "XÁC NHẬN"}
          </button>
        </form>
      </div>

      {/* POPUP THÔNG BÁO THÀNH CÔNG */}
      {isSuccess && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(12, 30, 66, 0.65)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "16px",
            backdropFilter: "blur(2px)",
            touchAction: "none",
          }}
          onClick={() => setIsSuccess(false)}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "340px",
              backgroundColor: "#EEE8E2",
              borderRadius: "24px",
              padding: "28px 20px 24px",
              textAlign: "center",
              boxShadow: "0 20px 40px rgba(12, 30, 66, 0.3)",
              animation: "modalFadeIn 0.25s ease-out",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Nút đóng X */}
            <button
              onClick={() => setIsSuccess(false)}
              style={{
                position: "absolute",
                top: "14px",
                right: "14px",
                background: "#EEE8E2",
                border: "1px solid #0C1E42",
                borderRadius: "50%",
                width: "28px",
                height: "28px",
                fontSize: "13px",
                color: "#0C1E42",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ✕
            </button>

            {/* Tiêu đề */}
            <h4
              style={{
                margin: "0 0 8px",
                fontSize: "20px",
                fontWeight: 700,
                color: "#0C1E42",
                fontFamily: "serif",
              }}
            >
              Gửi Thành Công!
            </h4>

            {/* Nội dung */}
            <p
              style={{
                margin: "0 0 12px",
                fontSize: "14px",
                lineHeight: 1.5,
                color: "#0C1E42",
              }}
            >
              Cảm ơn <strong>{formData.name}</strong> rất nhiều vì đã gửi phản
              hồi và những lời chúc tốt đẹp.
            </p>

            {/* Lời nhắn */}
            <p
              style={{
                margin: "0 0 20px",
                fontSize: "12.5px",
                color: "#0C1E42",
                fontStyle: "italic",
              }}
            >
              Hẹn gặp "người thương" trong ngày lễ tốt nghiệp nhé!
            </p>

            {/* Nút đóng */}
            <button
              onClick={() => setIsSuccess(false)}
              style={{
                width: "100%",
                backgroundColor: "#0C1E42",
                color: "#EEE8E2",
                border: "none",
                borderRadius: "12px",
                padding: "11px 0",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(12, 30, 66, 0.2)",
              }}
            >
              Đóng lại
            </button>
          </div>
        </div>
      )}
    </section>
  );
}