import React from 'react';
import portraitBottomPng from "../assets/logo.png";
import topDecorationPng from "../assets/hero.png";
import { useInvitationData } from "../hooks/useInvitationData";
import ContactModal from "./ContactModal";
import invitationPng from "../assets/invi.jpg";
import mapPng from "../assets/map.jpg";
import phonePng from "../assets/phone-call.svg"
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
  const [showMapModal, setShowMapModal] = React.useState(false);

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
            background: invitationPng,
            zIndex: 10,
            padding: "36px 16px 0",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              position: "relative",
              margin: "0 auto",
              backgroundImage: `url(${invitationPng})`,
              backgroundPosition: "center",
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              width: "100%",
              maxWidth: "340px",
              minHeight: "450px",
              borderRadius: "28px",
              padding: "32px 18px 24px",
              boxSizing: "border-box",
              boxShadow: "0 14px 35px rgba(80,30,35,0.14)",
              textAlign: "center",
            }}
          >
            <div
              className="flex"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                paddingTop: "40px",
                justifyContent: "center",
                gap: "10px",
                flexWrap: "wrap"
              }}
            >
              {/* Lời chào */}
              <p
                style={{
                  margin: 0, // Đưa margin về 0 để không bị lệch hàng dòng với chữ bên cạnh
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#460817",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  fontFamily: '"Cinzel", serif',
                }}
              >
                {greeting}:
              </p>

              {/* Tên khách mời */}
              <h2
                style={{
                  margin: 0, // Đưa margin về 0 để đồng bộ trục dọc chuẩn xác
                  fontSize: "clamp(2.4rem, 8.5vw, 3.2rem)",
                  fontWeight: 400,
                  color: "#7d706c",
                  fontFamily: '"Alex Brush", "Monsieur La Doulaise", cursive',
                  lineHeight: 1.15,
                }}
              >
                {guestName}
              </h2>
            </div>

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
            <div>
              <div
                className="flex"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: "10px",
                  justifyContent: "center",
                  gap: "40px",
                  flexWrap: "wrap"
                }}
              >
                {/* 1. Nút Xem chỉ đường (Mở Google Maps link cũ của bạn) */}
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
                    Bản đồ
                  </span>
                </a>

                {/* 2. NÚT MỚI: BẤM ĐỂ HIỆN ẢNH BẢN ĐỒ */}
                <button
                  onClick={() => setShowMapModal(true)} // Khi bấm sẽ kích hoạt hiện Modal
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "inline-flex",
                    flexDirection: "column",
                    alignItems: "center",
                    color: "#460817",
                    animation: "pulseGlow 1.8s ease-in-out infinite",
                    padding: 0,
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginBottom: "2px" }}
                  >
                    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                    <line x1="9" y1="3" x2="9" y2="18" />
                    <line x1="15" y1="6" x2="15" y2="21" />
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
                    Bãi xe
                  </span>
                </button>
              </div>

              {/* MODAL POPUP HIỂN THỊ ẢNH BẢN ĐỒ (CHỈ HIỆN KHI STATE LÀ TRUE) */}
              {showMapModal && (
                <div
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    borderColor: "#3895D0",
                    backgroundColor: "rgba(0, 0, 0, 0.7)", // Làm tối nền phía sau tấm thiệp
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 9999, // Đảm bảo nổi lên trên cùng toàn bộ website
                    backdropFilter: "blur(4px)", // Làm mờ nhẹ nền sau cho sang trọng
                  }}
                  onClick={() => setShowMapModal(false)} // Bấm ra ngoài vùng ảnh cũng sẽ tự đóng
                >
                  <div
                    style={{
                      position: "relative",
                      maxWidth: "90%",
                      maxHeight: "80%",
                      backgroundColor: "#C6E2FF",
                      padding: "5px",
                      borderRadius: "12px",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                    }}
                    onClick={(e) => e.stopPropagation()} // Ngăn sự kiện đóng khi bấm trực tiếp vào ảnh
                  >
                    {/* Nút X để đóng nhanh */}
                    <button
                      onClick={() => setShowMapModal(false)}
                      style={{
                        position: "absolute",
                        top: "-15px",
                        right: "-15px",
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        backgroundColor: "#6C7B8B",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                      }}
                    >
                      ✕
                    </button>

                    {/* ẢNH BẢN ĐỒ CỦA BẠN */}
                    <img
                      src={mapPng} // Bạn thay "heroPng" bằng biến ảnh sơ đồ/bản đồ thực tế của bạn nhé (Ví dụ: mapImagePng)
                      alt="Sơ đồ đường đi"
                      style={{
                        width: "100%",
                        maxHeight: "70vh",
                        objectFit: "contain",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

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
                backgroundColor: "#6495ED",
                border: "2.5px solid #F0F8FF",
                borderRadius: "26px",
                padding: "8px 14px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 0 0 1px #F0F8FF",
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
                    color: "#F0F8FF",
                    textShadow:
                      "1.2px 1.2px 0 #000000, -1.2px -1.2px 0 #000000, 1.2px -1.2px 0 #000000, -1.2px 1.2px 0 #000000",
                    letterSpacing: "0.02em",
                  }}
                >
                  Contact us
                </span>
                {/* <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 900,
                    color: "#ffffff",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.4)",
                  }}
                >
                  If you arrived
                </span> */}
              </div>

              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "50%",
                  width: "24px",
                  height: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
                }}
              >
                <img
                  src={phonePng}
                  alt="Logo nền"
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    objectFit: "contain",
                    objectPosition: "center center",
                    display: "block",
                    backgroundColor: "#6495ED",
                  }}
                />
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
