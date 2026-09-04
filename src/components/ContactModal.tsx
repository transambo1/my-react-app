import { useEffect } from "react";
import type { ContactPerson } from "../hooks/useInvitationData";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contacts: ContactPerson[];
  contactMessage?: string;
  copiedPhone: string;
  onCopyPhone: (phone: string) => void;
}

export default function ContactModal({
  isOpen,
  onClose,
  contacts,
  contactMessage = "Liên hệ nếu bạn cần hướng dẫn đường đi hoặc đón tiếp nhé!",
  copiedPhone,
  onCopyPhone,
}: ContactModalProps) {
  // KHÓA CUỘN TRANG NGOÀI KHI MODAL MỞ
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.65)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "16px",
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "350px",
          backgroundColor: "#ffffff",
          borderRadius: "24px",
          padding: "24px 18px 20px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
          animation: "modalFadeIn 0.25s ease-out",
          maxHeight: "85vh",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Nút đóng */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            background: "#f3eee9",
            border: "none",
            borderRadius: "50%",
            width: "28px",
            height: "28px",
            fontSize: "13px",
            color: "#555",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          ✕
        </button>

        {/* Header Popup */}
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <h4
            style={{
              margin: "0 0 4px",
              fontSize: "18px",
              fontWeight: 700,
              color: "#0C1E42",
              fontFamily: "serif",
            }}
          >
            Thông Tin Liên Hệ
          </h4>
          <p style={{ margin: 0, fontSize: "12px", color: "#777" }}>
            {contactMessage}
          </p>
        </div>

        {/* Danh sách người liên hệ */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            overflowY: "auto",
            paddingRight: "2px",
            maxHeight: "320px",
          }}
        >
          {contacts.map((person, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#faf7f5",
                borderRadius: "16px",
                padding: "12px 14px",
                border: "1px solid #ede4df",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  minWidth: 0,
                }}
              >
                <span
                  style={{
                    fontSize: "14.5px",
                    fontWeight: 700,
                    color: "#333",
                    margin: "0 0 2px 0",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {person.name}
                </span>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#0C1E42",
                    letterSpacing: "0.02em",
                  }}
                >
                  {person.phone}
                </span>
              </div>

              {/* Nút Gọi & Sao chép số */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <button
                  onClick={() => onCopyPhone(person.phone)}
                  style={{
                    border: "none",
                    backgroundColor:
                      copiedPhone === person.phone ? "#cfcfcf" : "#ebe4df",
                    color: copiedPhone === person.phone ? "#fff" : "#0C1E42",
                    padding: "7px 10px",
                    borderRadius: "10px",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "all 0.2s ease",
                  }}
                >
                  {copiedPhone === person.phone ? "Copied" : "Copy"}
                </button>

                <a
                  href={`tel:${person.phone}`}
                  style={{
                    backgroundColor: "#0C1E42",
                    color: "#ffffff",
                    textDecoration: "none",
                    padding: "7px 12px",
                    borderRadius: "10px",
                    fontSize: "12px",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    boxShadow: "0 2px 6px rgba(12, 30, 66, 0.25)",
                  }}
                >
                  Gọi
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}