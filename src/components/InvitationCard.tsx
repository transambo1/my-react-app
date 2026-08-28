import portraitBottomPng from "../assets/logo.png";
import topDecorationPng from "../assets/ribbon.svg";
import { useInvitationData } from "../hooks/useInvitationData";
import ContactModal from "./ContactModal";

export default function InvitationCard() {
  const {
    guestName,
    greeting,
    eventDay,
    eventMonth,
    eventYear,
    eventTimeAndWeek,
    mapSearchUrl,
    contactList,
    showCallModal,
    setShowCallModal,
    copiedPhone,
    handleCopyPhone,
    hostInfo,
  } = useInvitationData();

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        backgroundColor: "#f7f4f1",
        padding: "0 8px",
        boxSizing: "border-box",
      }}
    >
      <style>{`
        @keyframes pulseGlow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        @keyframes bounceWobble {
          0%, 100% { transform: rotate(-3deg) scale(1) translateY(0px); }
          50% { transform: rotate(2deg) scale(1.04) translateY(-4px); }
        }
        @keyframes floatHeart {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.85; }
          50% { transform: translateY(-8px) scale(1.15); opacity: 1; }
        }
        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* CONTAINER KHUNG CHÍNH */}
      <div
        style={{
          position: "relative",
          margin: "0 auto",
          width: "100%",
          maxWidth: "420px",
          borderRadius: "20px",
          backgroundColor: "#ffffff",
          boxShadow: "0 18px 40px rgba(86,42,43,0.12)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* 1. KHỐI TRANG TRÍ PHÍA TRÊN CÙNG */}
        {topDecorationPng && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "70px",
              zIndex: 5,
              pointerEvents: "none",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(to bottom, rgba(243,239,235,0.8), transparent)",
              }}
            />
          </div>
        )}

        {/* 2. TẤM HÌNH LOGO / ẢNH NỀN LÓT XUYÊN SUỐT NỬA DƯỚI */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "560px",
            zIndex: 1,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={portraitBottomPng}
            alt="Logo nền"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "center center",
              display: "block",
            }}
          />
        </div>

        {/* 3. KHỐI CARD THIỆP TRẮNG NẰM NỔI Ở TRÊN */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            padding: "36px 16px 0",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              position: "relative",
              margin: "0 auto",
              width: "100%",
              maxWidth: "340px",
              backgroundColor: "#ffffff",
              borderRadius: "28px",
              padding: "32px 18px 24px",
              boxSizing: "border-box",
              boxShadow: "0 14px 35px rgba(80,30,35,0.14)",
              textAlign: "center",
            }}
          >
            {/* Lời chào */}
            <p
              style={{
                margin: "0 0 4px 0",
                fontSize: "13px",
                fontWeight: 700,
                color: "#460817",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontFamily: '"Cinzel", serif',
              }}
            >
              {greeting}
            </p>

            {/* Tên khách mời */}
            <h2
              style={{
                margin: "0 0 16px 0",
                fontSize: "clamp(2.4rem, 8.5vw, 3.2rem)",
                fontWeight: 400,
                color: "#7d706c",
                fontFamily: '"Alex Brush", "Monsieur La Doulaise", cursive',
                lineHeight: 1.15,
              }}
            >
              {guestName}
            </h2>

            {/* Thời gian */}
            <p
              style={{
                margin: "0 0 14px 0",
                fontSize: "14.5px",
                fontWeight: 700,
                color: "#460817",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontFamily: "serif",
              }}
            >
              {eventTimeAndWeek}
            </p>

            {/* Lịch Ngày / Tháng / Năm */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                marginBottom: "18px",
              }}
            >
              <div
                style={{
                  borderTop: "1.5px solid #460817",
                  borderBottom: "1.5px solid #460817",
                  padding: "5px 8px",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#460817",
                  letterSpacing: "0.08em",
                  fontFamily: "serif",
                  whiteSpace: "nowrap",
                }}
              >
                 {eventMonth}
              </div>

              <div
                style={{
                  fontSize: "clamp(2.6rem, 9vw, 3.4rem)",
                  fontWeight: 600,
                  color: "#460817",
                  lineHeight: 1,
                  fontFamily: '"Cormorant Garamond", "Cinzel", serif',
                  padding: "0 4px",
                }}
              >
                {eventDay}
              </div>

              <div
                style={{
                  borderTop: "1.5px solid #460817",
                  borderBottom: "1.5px solid #460817",
                  padding: "5px 8px",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#460817",
                  letterSpacing: "0.08em",
                  fontFamily: "serif",
                  whiteSpace: "nowrap",
                }}
              >
                NĂM {eventYear}
              </div>
            </div>

            {/* Địa điểm */}
            <p
              style={{
                margin: "0 0 3px 0",
                fontSize: "12.5px",
                fontStyle: "italic",
                color: "#524b48",
                fontFamily: "serif",
              }}
            >
              Tại địa điểm:
            </p>
            <h3
              style={{
                margin: "0 0 3px 0",
                fontSize: "16px",
                fontWeight: 700,
                color: "#460817",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                fontFamily: "serif",
              }}
            >
              {hostInfo.school || "TRƯỜNG ĐẠI HỌC Y DƯỢC TP.HCM"}
            </h3>
            <p
              style={{
                margin: "0 0 5px 0",
                fontSize: "13px",
                fontWeight: 600,
                color: "#460817",
                letterSpacing: "0.05em",
                fontFamily: "serif",
              }}
            >
              ({hostInfo?.campus || "Cơ sở chính"})
            </p>
            <p
              style={{
                margin: "0 0 16px 0",
                fontSize: "11.5px",
                lineHeight: 1.45,
                color: "#3d3836",
                padding: "0 6px",
              }}
            >
              {hostInfo.event?.location ||
                "217 Đ. Hồng Bàng, Chợ Lớn, Hồ Chí Minh"}
            </p>

            {/* Nút Xem chỉ đường */}
            <a
              href={mapSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                textDecoration: "none",
                color: "#460817",
                animation: "pulseGlow 1.8s ease-in-out infinite",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ marginBottom: "2px" }}
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontFamily: "serif",
                }}
              >
                XEM CHỈ ĐƯỜNG
              </span>
            </a>
          </div>
        </div>

        {/* 4. KHOẢNG KHÔNG GIAN ĐÁY ĐỂ LỘ TRỌN LOGO VÀ NÚT GỌI */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "clamp(260px, 70vw, 320px)",
            zIndex: 15,
          }}
        >
          {/* Trái tim bay */}
          <span
            style={{
              position: "absolute",
              top: "35px",
              right: "65px",
              fontSize: "24px",
              animation: "floatHeart 2.5s ease-in-out infinite",
            }}
          >
            💖
          </span>
          <span
            style={{
              position: "absolute",
              top: "75px",
              right: "140px",
              fontSize: "18px",
              animation: "floatHeart 3.2s ease-in-out infinite 0.6s",
            }}
          >
            💕
          </span>

          {/* Sticker bấm để gọi */}
          <button
            onClick={() => setShowCallModal(true)}
            style={{
              position: "absolute",
              bottom: "35px",
              right: "16px",
              background: "transparent",
              border: "none",
              padding: 0,
              cursor: "pointer",
              filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.25))",
              animation: "bounceWobble 2.8s ease-in-out infinite",
              outline: "none",
            }}
          >
            <div
              style={{
                backgroundColor: "#49a3f8",
                border: "2.5px solid #ffffff",
                borderRadius: "26px",
                padding: "8px 14px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 0 0 2px #2583e6",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  lineHeight: 1.15,
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 900,
                    color: "#ff3366",
                    textShadow:
                      "1.2px 1.2px 0 #fff, -1.2px -1.2px 0 #fff, 1.2px -1.2px 0 #fff, -1.2px 1.2px 0 #fff",
                    letterSpacing: "0.02em",
                  }}
                >
                  bấm để gọi
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 900,
                    color: "#ffffff",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.4)",
                  }}
                >
                  cho tui nhé
                </span>
              </div>

              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
                }}
              >
                📱
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* 5. POPUP MODAL TÁCH RIÊNG */}
      <ContactModal
        isOpen={showCallModal}
        onClose={() => setShowCallModal(false)}
        contacts={contactList}
        contactMessage={hostInfo["contacst-message"]}
        copiedPhone={copiedPhone}
        onCopyPhone={handleCopyPhone}
      />
    </section>
  );
}
