import letterData from "../data/letter.json";
import hostInfo from "../data/hostInfo.json";

export default function LetterSection() {
  const hostName = hostInfo?.name || "Kim Ngân";
  const nameParts = hostName.split(" ");
  const signatureName =
    nameParts.length > 1
      ? `${nameParts[nameParts.length - 2]} ${nameParts[nameParts.length - 1]}`
      : hostName;

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        backgroundColor: "#f7f4f1",
        padding: "0 8px 30px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          position: "relative",
          margin: "0 auto",
          width: "100%",
          maxWidth: "420px",
          borderRadius: "20px",
          backgroundColor: "#ffffff",
          boxShadow: "0 18px 40px rgba(86,42,43,0.12)",
          padding: "36px 22px 32px",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* HỌA TIẾT NỀN NƯỚC MỜ TRANG TRÍ GÓC BỨC THƯ */}
        <div
          style={{
            position: "absolute",
            top: "-40px",
            right: "-40px",
            width: "140px",
            height: "140px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(181,165,161,0.2) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* 1. TIÊU ĐỀ BỨC THƯ (Chữ Serif nghiêng mộc mạc) */}
        <div style={{ textAlign: "center", marginBottom: "22px" }}>
          <h2
            style={{
              margin: "0 0 6px 0",
              fontSize: "clamp(1.5rem, 5vw, 1.85rem)",
              fontWeight: 500,
              fontStyle: "italic",
              color: "#460817",
              fontFamily: '"Cormorant Garamond", "Cinzel", "Georgia", serif',
              letterSpacing: "0.02em",
              lineHeight: 1.25,
            }}
          >
            {letterData.title}
          </h2>
          {/* Đường gạch trang trí ngắn ở giữa */}
          <div
            style={{
              margin: "0 auto",
              width: "36px",
              height: "1px",
              backgroundColor: "#c5b6b2",
            }}
          />
        </div>

        {/* 2. CÁC ĐOẠN TÂM THƯ */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            textAlign: "justify",
            color: "#4a3536",
            fontFamily: '"Cormorant Garamond", "Times New Roman", serif',
            fontSize: "14.5px",
            lineHeight: 1.65,
            padding: "0 4px",
          }}
        >
          {letterData.paragraphs.map((para, idx) => (
            <p
              key={idx}
              style={{
                margin: 0,
                textIndent: "1.2em", // Thụt đầu dòng mỗi đoạn như thư tay
              }}
            >
              {para}
            </p>
          ))}
        </div>

        {/* 3. KHU VỰC CHỮ KÝ DƯỚI CÙNG (Căn lề phải nghệ thuật) */}
        <div
          style={{
            marginTop: "24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            paddingRight: "10px",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              fontStyle: "italic",
              color: "#8c7572",
              fontFamily: '"Cormorant Garamond", serif',
              marginBottom: "2px",
            }}
          >
            Thương mến,
          </span>

          {/* CHỮ KÝ NGHỆ THUẬT */}
          <div
            style={{
              position: "relative",
              display: "inline-block",
            }}
          >
            <span
              style={{
                display: "block",
                fontSize: "clamp(2.4rem, 8vw, 3.2rem)",
                lineHeight: 1,
                fontWeight: 400,
                color: "#460817",
                fontFamily:
                  '"Monsieur La Doulaise", "Alex Brush", "Great Vibes", cursive',
                transform: "rotate(-3deg)", // Xoay nhẹ tạo cảm giác ký tay thật
                userSelect: "none",
                textShadow: "0 1px 2px rgba(70,8,23,0.15)",
                paddingRight: "6px",
              }}
            >
              {signatureName}
            </span>

            {/* Trái tim nhỏ đính cạnh chữ ký */}
            <span
              style={{
                position: "absolute",
                top: "-4px",
                right: "-12px",
                fontSize: "13px",
                color: "#ff5e7e",
                transform: "rotate(12deg)",
              }}
            >
              💕
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
