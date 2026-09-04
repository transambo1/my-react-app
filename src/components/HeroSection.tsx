import hostInfo from "../data/hostInfo.json";
import logoPng from "../assets/logo.png";
import ribbonPng from "../assets/sash.webp";
const heroPng = "public/photos/main.jpg";
export default function HeroSection() {
  const nameParts = hostInfo.name.split(" ");

  const lastName =
    nameParts.length > 1
      ? `${nameParts[nameParts.length - 2]} ${nameParts[nameParts.length - 1]}`
      : hostInfo.name;

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
      }}
    >
      <style>{`
        /* Khi mới vào: Ruy-băng thả từ trên trần xuống tự nhiên */
        @keyframes ribbonDropEntrance {
          0% {
            opacity: 0;
            transform: translateY(-30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Khung ngoài: Đung đưa nhẹ nhàng theo chiều gió */
        @keyframes windSwaySwing {
          0% {
            transform: rotate(0deg) skewX(0deg);
          }
          25% {
            transform: rotate(3.8deg) skewX(2.5deg);
          }
          50% {
            transform: rotate(-3.2deg) skewX(-2deg);
          }
          75% {
            transform: rotate(2.2deg) skewX(1.4deg);
          }
          100% {
            transform: rotate(0deg) skewX(0deg);
          }
        }

        /* Thẻ img bên trong: Uốn lượn nếp gấp theo chiều dọc 3D */
        @keyframes verticalRibbonWave {
          0% {
            transform: rotateY(0deg) skewY(0deg) scaleY(1);
          }
          20% {
            transform: rotateY(18deg) skewY(2.2deg) scaleY(1.02);
          }
          45% {
            transform: rotateY(-14deg) skewY(-2deg) scaleY(0.98);
          }
          70% {
            transform: rotateY(12deg) skewY(1.5deg) scaleY(1.01);
          }
          85% {
            transform: rotateY(-8deg) skewY(-1deg) scaleY(0.99);
          }
          100% {
            transform: rotateY(0deg) skewY(0deg) scaleY(1);
          }
        }
      `}</style>

      <div
        style={{
          position: "relative",
          margin: "0 auto",
          width: "100%",
          maxWidth: "420px",
          overflow: "hidden",
          backgroundColor: "#EEE8E2",
        }}
      >
        {/* 1. DẢI RUY-BĂNG TRANG TRÍ GÓC TRÁI */}
        <div
          style={{
            position: "absolute",
            top: "-5px",
            left: "12px",
            width: "70px",
            zIndex: 30,
            pointerEvents: "none",
            transformOrigin: "top center",
            perspective: "600px",
            filter: "drop-shadow(3px 8px 14px rgba(12, 30, 66, 0.3))",
            animation:
              "ribbonDropEntrance 0.6s ease-out forwards, windSwaySwing 5.2s ease-in-out 0.6s infinite",
          }}
        >
          <img
            src={ribbonPng}
            alt="Ribbon decoration"
            style={{
              width: "100%",
              height: "300px",
              maxHeight: "640px",
              objectFit: "cover",
              objectPosition: "top center",
              display: "block",
              transformOrigin: "top center",
              animation:
                "verticalRibbonWave 4.4s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite",
            }}
          />
        </div>

        {/* 2. KHU VỰC HEADER & TYPOGRAPHY */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            paddingLeft: "clamp(64px, 17vw, 80px)",
            paddingRight: "10px",
            paddingTop: "24px",
            paddingBottom: "8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Logo Trường */}
          <div
            style={{
              marginBottom: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            <img
              src={logoPng}
              alt="University Logo"
              style={{
                width: "50px",
                height: "50px",
                objectFit: "contain",
                filter: "drop-shadow(0px 4px 10px rgba(56, 149, 208, 0.35))",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                lineHeight: 1.15,
                color: "#3895D0",
              }}
            >
              <span
                style={{
                  fontSize: "19px",
                  fontWeight: 900,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  paddingBottom: "4px",
                  textShadow: "0px 3px 6px rgba(56, 149, 208, 0.3)",
                }}
              >
                Đại Học Y Dược
              </span>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  textShadow: "0px 2px 4px rgba(56, 149, 208, 0.25)",
                }}
              >
                Thành phố Hồ Chí Minh
              </span>
            </div>
          </div>

          {/* Typography: Graduation + Invitation */}
          <div
            style={{
              position: "relative",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "14px 0 16px",
            }}
          >
            <h1
              style={{
                position: "relative",
                zIndex: 2,
                margin: 0,
                fontWeight: 900,
                textTransform: "uppercase",
                color: "#0C1E42",
                fontFamily: '"Playlist Script"',
                fontSize: "30px",
                letterSpacing: "0.22em",
                paddingLeft: "0.22em",
                WebkitTextStroke: "0.8px #0C1E42",
              }}
            >
              Graduation
            </h1>

            <span
              style={{
                position: "absolute",
                zIndex: 1,
                top: "87%",
                left: "52%",
                transform: "translate(-50%, -20%)",
                whiteSpace: "nowrap",
                letterSpacing: "0.22em",
                fontWeight: 400,
                color: "#b09e99",
                opacity: 0.85,
                pointerEvents: "none",
                userSelect: "none",
                fontFamily: '"Great Vibes", "Alex Brush", "Allura", cursive',
                fontSize: "clamp(2.4rem, 8.5vw, 3.4rem)",
              }}
            >
              Invitation
            </span>
          </div>
        </div>

        {/* 3. KHUNG ẢNH CHÂN DUNG CHUẨN TỶ LỆ GỐC (CHỨA TÊN VÀ THÔNG ĐIỆP) */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            marginTop: "16px",
            padding: "0 20px 28px",
          }}
        >
          <div
            style={{
              position: "relative",
              margin: "0 auto",
              width: "100%",
              overflow: "hidden",
              borderRadius: "24px",
              backgroundColor: "#ffffff",
              boxShadow: "0 14px 30px rgba(12, 30, 66, 0.16)",
            }}
          >
            {/* Ảnh hiển thị chuẩn 100% kích thước tỷ lệ thật */}
            <img
              src={heroPng}
              alt="Graduation portrait"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />

            {/* Chữ Xuân Nghi (Nằm phía trên bên phải khung ảnh) */}
            <div
              style={{
                position: "absolute",
                top: "22px",
                right: "22px",
                zIndex: 4,
              }}
            >
              <span
                style={{
                  color: "#ffffff",
                  lineHeight: 1,
                  fontSize: "clamp(2.1rem, 7vw, 2.7rem)",
                  fontFamily: '"Monsieur La Doulaise", "Alex Brush", cursive',
                  textShadow:
                    "0 2px 8px rgba(12, 30, 66, 0.85), 0 1px 3px rgba(0,0,0,0.9)",
                  letterSpacing: "0.02em",
                }}
              >
                {lastName}
              </span>
            </div>

            {/* Dải gradient che nhẹ chân ảnh để tôn thông điệp */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: "100px",
                background:
                  "linear-gradient(to top, rgba(12, 30, 66, 0.82) 0%, rgba(12, 30, 66, 0.4) 55%, transparent 100%)",
                zIndex: 3,
              }}
            />

            {/* Câu thông điệp hiển thị thay thế vị trí chân ảnh */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: "16px",
                zIndex: 4,
                textAlign: "center",
                color: "#EEE8E2",
                padding: "0 12px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "clamp(11.5px, 3vw, 13px)",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.22em",
                  paddingLeft: "0.22em",
                  lineHeight: 1.4,
                  textShadow: "0 2px 6px rgba(0, 0, 0, 0.8)",
                }}
              >
                Every end is
              </p>
              <p
                style={{
                  margin: "4px 0 0 0",
                  fontSize: "clamp(11.5px, 3vw, 13px)",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.22em",
                  paddingLeft: "0.22em",
                  lineHeight: 1.4,
                  textShadow: "0 2px 6px rgba(0, 0, 0, 0.8)",
                }}
              >
                A new beginning...
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}