import React, { useState, useEffect } from "react";
import portraitBottomPng from "../assets/logo.png";
import topDecorationPng from "../assets/hero.png";
import { useInvitationData } from "../hooks/useInvitationData";
import ContactModal from "./ContactModal";
import invitationPng from "../assets/invi1.jpg";
import mapPng from "../assets/map1.jpeg";
import phonePng from "../assets/phone-call.svg";

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

  // LOGIC ĐẾM NGƯỢC TỚI NGÀY 09/09/2026
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2026-09-09T00:00:00").getTime();

    const calculateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateCountdown();
    const timer = setInterval(calculateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        backgroundColor: "white",
        padding: "0 8px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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

      {/* CONTAINER KHUNG CHÍNH (XANH NAVY) */}
      <div
        style={{
          position: "relative",
          margin: "0 auto",
          width: "100%",
          maxWidth: "420px",
          borderRadius: "20px",
          backgroundColor: "#0C1E42",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingBottom: "85px",
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

        {/* 2. KHỐI BỌC THIỆP TRẮNG NẰM NỔI */}
        <div
          style={{
            position: "relative",
            width: "100%",
            zIndex: 10,
            padding: "24px 14px 0",
            display: "flex",
            justifyContent: "center",
            boxSizing: "border-box",
          }}
        >
          {/* TẤM THIỆP CHÍNH */}
          <div
            style={{
              position: "relative",
              margin: "0 auto",
              backgroundImage: `url(${invitationPng})`,
              backgroundPosition: "top center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundColor: "#ffffff",
              width: "100%",
              maxWidth: "350px",
              borderRadius: "28px",
              padding: "28px 16px 24px",
              boxSizing: "border-box",
              boxShadow: "0 14px 35px rgba(0,0,0,0.25)",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Lời chào & Tên khách */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                paddingTop: "120px",
                justifyContent: "center",
                gap: "8px",
                flexWrap: "wrap",
                width: "100%",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#0C1E42",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  fontFamily: '"Cinzel", serif',
                }}
              >
                {greeting}:
              </p>

              <h2
                style={{
                  margin: 0,
                  fontSize: "clamp(2.3rem, 8vw, 3rem)",
                  fontWeight: 400,
                  color: "#121F49",
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
                margin: "4px 0 12px 0",
                fontSize: "14px",
                fontWeight: 700,
                color: "#0C1E42",
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
                gap: "8px",
                marginBottom: "16px",
                width: "100%",
              }}
            >
              <div
                style={{
                  borderTop: "1.5px solid #0C1E42",
                  borderBottom: "1.5px solid #0C1E42",
                  padding: "4px 6px",
                  fontSize: "13.5px",
                  fontWeight: 700,
                  color: "#0C1E42",
                  letterSpacing: "0.08em",
                  fontFamily: "serif",
                  whiteSpace: "nowrap",
                }}
              >
                {eventMonth}
              </div>

              <div
                style={{
                  fontSize: "clamp(2.4rem, 8.5vw, 3.2rem)",
                  fontWeight: 600,
                  color: "#0C1E42",
                  lineHeight: 1,
                  fontFamily: '"Cormorant Garamond", "Cinzel", serif',
                  padding: "0 4px",
                }}
              >
                {eventDay}
              </div>

              <div
                style={{
                  borderTop: "1.5px solid #0C1E42",
                  borderBottom: "1.5px solid #0C1E42",
                  padding: "4px 6px",
                  fontSize: "13.5px",
                  fontWeight: 700,
                  color: "#0C1E42",
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
                margin: "0 0 2px 0",
                fontSize: "12px",
                fontStyle: "italic",
                color: "#524b48",
                fontFamily: "serif",
              }}
            >
              Tại địa điểm:
            </p>
            <h3
              style={{
                margin: "0 0 2px 0",
                fontSize: "15px",
                fontWeight: 700,
                color: "#0C1E42",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                fontFamily: "serif",
              }}
            >
              {hostInfo.school || "TRƯỜNG ĐẠI HỌC Y DƯỢC TP.HCM"}
            </h3>
            <p
              style={{
                margin: "0 0 4px 0",
                fontSize: "12.5px",
                fontWeight: 600,
                color: "#0C1E42",
                letterSpacing: "0.05em",
                fontFamily: "serif",
              }}
            >
              ({hostInfo?.campus || "Cơ sở chính"})
            </p>
            <p
              style={{
                margin: "0 0 14px 0",
                fontSize: "11px",
                lineHeight: 1.4,
                color: "#3d3836",
                padding: "0 4px",
              }}
            >
              {hostInfo.event?.location ||
                "217 Đ. Hồng Bàng, Chợ Lớn, Hồ Chí Minh"}
            </p>

            {/* CỤM NÚT BẢN ĐỒ & BÃI XE */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                paddingTop: "6px",
                justifyContent: "center",
                gap: "36px",
                width: "100%",
              }}
            >
              {/* 1. Nút Xem chỉ đường */}
              <a
                href={mapSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textDecoration: "none",
                  color: "#0C1E42",
                  animation: "pulseGlow 1.8s ease-in-out infinite",
                }}
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{ marginBottom: "2px" }}
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    fontFamily: "serif",
                  }}
                >
                  Bản đồ
                </span>
              </a>

              {/* 2. Nút bấm hiện ảnh bản đồ */}
              <button
                onClick={() => setShowMapModal(true)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "inline-flex",
                  flexDirection: "column",
                  alignItems: "center",
                  color: "#0C1E42",
                  animation: "pulseGlow 1.8s ease-in-out infinite",
                  padding: 0,
                }}
              >
                <svg
                  width="19"
                  height="19"
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
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    fontFamily: "serif",
                  }}
                >
                  Bãi xe
                </span>
              </button>
            </div>

            {/* KHỐI ĐẾM NGƯỢC VÀ LỊCH LỄ TỐT NGHIỆP 09/09/2026 */}
            <div
              style={{
                marginTop: "16px",
                paddingTop: "14px",
                borderTop: "1px dashed rgba(12, 30, 66, 0.2)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              <span
                style={{
                  fontSize: "10.5px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#0C1E42",
                  marginBottom: "8px",
                  fontFamily: '"Cinzel", serif',
                }}
              >
                Until the big day
              </span>

              {/* 1. CÁC Ô ĐẾM NGƯỢC THỜI GIAN (NGÀY - GIỜ - PHÚT - GIÂY) */}
              <div
                style={{
                  display: "flex",
                  gap: "6px",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "14px",
                  width: "100%",
                }}
              >
                {[
                  { label: "Ngày", value: timeLeft.days },
                  { label: "Giờ", value: timeLeft.hours },
                  { label: "Phút", value: timeLeft.minutes },
                  { label: "Giây", value: timeLeft.seconds },
                ].map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      border: "1px solid rgba(12, 30, 66, 0.2)",
                      borderRadius: "8px",
                      padding: "4px 6px",
                      minWidth: "42px",
                      boxShadow: "0 2px 6px rgba(12, 30, 66, 0.05)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "#0C1E42",
                        fontFamily: '"Cormorant Garamond", serif',
                        lineHeight: 1.1,
                      }}
                    >
                      {String(item.value).padStart(2, "0")}
                    </span>
                    <span
                      style={{
                        fontSize: "8.5px",
                        color: "#524b48",
                        fontFamily: "serif",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        marginTop: "2px",
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* 2. TỜ LỊCH THÁNG 09/2026 KHOANH TRÒN NGÀY 09/09 */}
              <div
                style={{
                  width: "100%",
                  maxWidth: "280px",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  borderRadius: "14px",
                  padding: "10px 12px 8px",
                  boxShadow: "0 4px 14px rgba(12, 30, 66, 0.08)",
                  border: "1.2px solid rgba(12, 30, 66, 0.15)",
                  boxSizing: "border-box",
                }}
              >
                {/* Tiêu đề Tháng */}
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#0C1E42",
                    fontFamily: '"Cinzel", "Cormorant Garamond", serif',
                    letterSpacing: "0.1em",
                    marginBottom: "6px",
                    borderBottom: "1px solid rgba(12, 30, 66, 0.1)",
                    paddingBottom: "3px",
                  }}
                >
                  THÁNG 09 • 2026
                </div>

                {/* Hàng Thứ (T2 -> CN) */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    textAlign: "center",
                    fontSize: "9.5px",
                    fontWeight: 700,
                    color: "#6b7280",
                    fontFamily: "serif",
                    marginBottom: "4px",
                  }}
                >
                  <span>T2</span>
                  <span>T3</span>
                  <span>T4</span>
                  <span>T5</span>
                  <span>T6</span>
                  <span>T7</span>
                  <span style={{ color: "#b91c1c" }}>CN</span>
                </div>

                {/* Lưới Ngày */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    textAlign: "center",
                    rowGap: "2px",
                    fontSize: "11px",
                    fontFamily: '"Cormorant Garamond", serif',
                    fontWeight: 600,
                    color: "#2c3e50",
                  }}
                >
                  <span /> {/* Ô trống T2 trước ngày 01 */}

                  {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
                    const isTarget = day === 9;
                    const now = new Date();
                    const isToday =
                      now.getFullYear() === 2026 &&
                      now.getMonth() === 8 &&
                      now.getDate() === day;

                    return (
                      <div
                        key={day}
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "24px",
                        }}
                      >
                        {isTarget ? (
                          <div
                            style={{
                              width: "22px",
                              height: "22px",
                              borderRadius: "50%",
                              backgroundColor: "#0C1E42",
                              color: "#ffffff",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: 700,
                              fontSize: "11px",
                              boxShadow: "0 2px 6px rgba(12, 30, 66, 0.35)",
                              position: "relative",
                            }}
                          >
                            {day}
                            <span
                              style={{
                                position: "absolute",
                                top: "-6px",
                                right: "-4px",
                                fontSize: "9px",
                              }}
                            >
                              💖
                            </span>
                          </div>
                        ) : isToday ? (
                          <div
                            style={{
                              width: "20px",
                              height: "20px",
                              borderRadius: "50%",
                              border: "1.2px dashed #0C1E42",
                              backgroundColor: "rgba(100, 149, 237, 0.15)",
                              color: "#0C1E42",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: 700,
                            }}
                          >
                            {day}
                          </div>
                        ) : (
                          <span>{day}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. NÚT GỌI (CONTACT US) NẰM GÓC DƯỚI */}
        {!showMapModal && (
          <button
            onClick={() => setShowCallModal(true)}
            style={{
              position: "absolute",
              bottom: "20px",
              right: "18px",
              background: "transparent",
              border: "none",
              padding: 0,
              cursor: "pointer",
              filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.25))",
              animation: "bounceWobble 2.8s ease-in-out infinite",
              outline: "none",
              zIndex: 20,
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
                  alt="Call icon"
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
        )}
      </div>

      {/* MODAL POPUP HIỂN THỊ ẢNH BẢN ĐỒ */}
      {showMapModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setShowMapModal(false)}
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
            onClick={(e) => e.stopPropagation()}
          >
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

            <img
              src={mapPng}
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