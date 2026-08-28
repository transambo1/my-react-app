import hostInfo from "../data/hostInfo.json";
import logoPng from "../assets/logo.png";
import heroPng from "../assets/hero.png";
import ribbonPng from "../assets/ribbon.svg";

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
      }}
    >
      {/* Keyframe hiệu ứng gió thổi đưa ra ngoài cùng section */}
      <style>{`
        @keyframes windSwayStrong {
          0% {
            transform: rotate(0deg) skewX(0deg);
          }
          20% {
            transform: rotate(5deg) skewX(2.5deg);
          }
          45% {
            transform: rotate(-4.2deg) skewX(-2deg);
          }
          70% {
            transform: rotate(3.5deg) skewX(1.8deg);
          }
          85% {
            transform: rotate(-2deg) skewX(-1deg);
          }
          100% {
            transform: rotate(0deg) skewX(0deg);
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
          borderRadius: "16px",
          backgroundColor: "#f8f5f3",
          boxShadow: "0 18px 40px rgba(86,42,43,0.12)",
        }}
      >
        {/* Background Layers */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            opacity: 0.4,
            background:
              "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(240,240,245,0.5) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            background: "linear-gradient(to bottom, #f9f6f4, #ffffff, #f3f1ee)",
          }}
        />

        {/* 1. DẢI RUY-BĂNG ĐÍNH TUYỆT ĐỐI SÁT MÉP TRÊN CÙNG */}
        <div
          style={{
            position: "absolute",
            top: 0, // Dính tuyệt đối đỉnh trên
            left: "14px",
            width: "clamp(55px, 15vw, 68px)",
            height: "clamp(260px, 68vw, 320px)",
            zIndex: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            filter: "drop-shadow(2px 6px 10px rgba(70,8,23,0.35))",
            transformOrigin: "top center",
            animation:
              "windSwayStrong 6.2s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite",
            margin: 0,
            padding: 0,
          }}
        >
          <img
            src={ribbonPng}
            alt="Ribbon decoration"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "fill",
              display: "block",
              verticalAlign: "top", // Loại bỏ khoảng trống thừa mặc định của inline img
            }}
          />
        </div>

        {/* 2. KHU VỰC HEADER & TYPOGRAPHY */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            paddingLeft: "clamp(55px, 15vw, 68px)",
            paddingRight: "8px",
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
              gap: "10px",
            }}
          >
            <img
              src={logoPng}
              alt="University Logo"
              style={{
                width: "46px",
                height: "46px",
                objectFit: "contain",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                lineHeight: 1.15,
                color: "#c3182b",
              }}
            >
              <span
                style={{
                  fontSize: "19px",
                  fontWeight: 900,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                Ydược
              </span>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                }}
              >
                University
              </span>
            </div>
          </div>

          {/* Typography: Graduation + Ceremony */}
          <div
            style={{
              position: "relative",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "14px 0 20px",
            }}
          >
            <h1
              style={{
                position: "relative",
                zIndex: 2,
                margin: 0,
                fontWeight: 500,
                textTransform: "uppercase",
                color: "#460817",
                fontFamily: '"Cinzel Decorative", "Bodoni MT", "Didot", serif',
                fontSize: "clamp(1.25rem, 4.2vw, 1.75rem)",
                letterSpacing: "0.22em",
                paddingLeft: "0.22em",
                textShadow: "0 0.5px 1px rgba(70,8,23,0.15)",
              }}
            >
              Graduation
            </h1>

            <span
              style={{
                position: "absolute",
                zIndex: 1,
                top: "68%",
                left: "52%",
                transform: "translate(-50%, -20%)",
                whiteSpace: "nowrap",
                fontStyle: "italic",
                fontWeight: 400,
                color: "#b09e99",
                opacity: 0.85,
                pointerEvents: "none",
                userSelect: "none",
                fontFamily: '"Alex Brush", "Great Vibes", "Playball", cursive',
                fontSize: "clamp(2.4rem, 8.5vw, 3.4rem)",
              }}
            >
              Ceremony
            </span>
          </div>
        </div>

        {/* 3. KHUNG ẢNH CHÂN DUNG */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            marginTop: "20px",
            padding: "0 24px 10px",
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
              boxShadow: "0 12px 24px rgba(70,8,23,0.14)",
            }}
          >
            <img
              src={heroPng}
              alt="Graduation portrait"
              style={{
                width: "100%",
                height: "clamp(400px, 100vw, 500px)",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
              }}
            />

            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: "90px",
                background:
                  "linear-gradient(to top, rgba(15,8,9,0.5), transparent)",
              }}
            />

            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: "30px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  color: "#ffffff",
                  lineHeight: 1,
                  fontSize: "clamp(1.8rem, 6vw, 2.4rem)",
                  fontFamily: '"Monsieur La Doulaise", "Segoe Script", cursive',
                  textShadow: "0 2px 4px rgba(0,0,0,0.7)",
                }}
              >
                {lastName}
              </span>
            </div>
          </div>
        </div>

        {/* 4. FOOTER */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            padding: "16px 8px 24px",
            textAlign: "center",
            color: "#6d1115",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "clamp(12px, 3.2vw, 14px)", // Tăng kích thước chữ
              fontWeight: 400,
              textTransform: "uppercase",
              letterSpacing: "0.22em",
              paddingLeft: "0.32em", // Cân bằng khoảng cách căn giữa
              lineHeight: 1.4,
            }}
          >
            Every end is
          </p>
          <p
            style={{
              margin: "6px 0 0 0",
              fontSize: "clamp(12px, 3.2vw, 14px)", // Tăng kích thước chữ
              fontWeight: 400,
              textTransform: "uppercase",
              letterSpacing: "0.22em",
              paddingLeft: "0.32em", // Cân bằng khoảng cách căn giữa
              lineHeight: 1.4,
            }}
          >
            A new beginning...
          </p>
        </div>
      </div>
    </section>
  );
}
