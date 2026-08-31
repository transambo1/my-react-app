import { useEffect, useState, useRef } from "react";

interface WishItem {
  id: number;
  name: string;
  wishes: string;
  attending?: string;
  time?: string;
}

const GOOGLE_SHEET_API_URL =
  "https://script.google.com/macros/s/AKfycbyfYxboaLHgyD5F8KrfeD-hCRZsqgOxn3UguZvhC8Ek9EMZXEquZMfVHC1-pSJL1RkBIA/exec";

const FALLBACK_WISHES: WishItem[] = [
  {
    id: 1,
    name: "Lâm Thành",
    wishes:
      "Chúc mừng tân cử nhân xuất sắc! Chúc em luôn vững bước và tỏa sáng rực rỡ trên con đường y nghiệp phía trước nhé! 🎓✨",
    time: "Vừa xong",
  },
  {
    id: 2,
    name: "Phương Lan",
    wishes:
      "Tự hào về cậu rất nhiều. Mong mọi ước mơ và dự định trong tương lai của cậu đều thành hiện thực nhé bạn thân! 💕",
    time: "Hôm qua",
  },
  {
    id: 3,
    name: "Hoàng Bách",
    wishes:
      "Cuối cùng cũng tới ngày hái quả ngọt sau bao năm thức khuya dậy sớm. Chúc mừng bác sĩ tương lai!",
    time: "2 ngày trước",
  },
];

export default function WishesSection() {
  const [wishes, setWishes] = useState<WishItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showAllModal, setShowAllModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Xử lý cử chỉ vuốt chạm (Touch gesture)
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  useEffect(() => {
    async function fetchWishesFromSheet() {
      try {
        const res = await fetch(GOOGLE_SHEET_API_URL);
        const result = await res.json();

        if (
          result.status === "success" &&
          Array.isArray(result.data) &&
          result.data.length > 0
        ) {
          const formatted: WishItem[] = result.data.map(
            (item: WishItem, idx: number) => ({
              id: item.id || idx + 1,
              name: item.name || "Ẩn danh",
              wishes: item.wishes,
              time: item.time || "",
            }),
          );

          setWishes(formatted);
          return;
        }

        setWishes(FALLBACK_WISHES);
      } catch (error) {
        console.error("Lỗi tải lời chúc từ Google Sheet:", error);
        setWishes(FALLBACK_WISHES);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWishesFromSheet();

    const handleNewWish = (event: Event) => {
      const customEvt = event as CustomEvent;
      const newWishDetail = customEvt.detail;

      if (newWishDetail?.wishes && newWishDetail.wishes !== "(Không có)") {
        setWishes((prev) => {
          const newEntry: WishItem = {
            id: Date.now(),
            name: newWishDetail.name || "Ẩn danh",
            wishes: newWishDetail.wishes,
            time: "Vừa xong",
          };
          return [newEntry, ...prev];
        });
        setCurrentIndex(0);
      }

      setTimeout(() => {
        fetchWishesFromSheet();
      }, 2500);
    };

    window.addEventListener("new_wish_submitted", handleNewWish);

    return () => {
      window.removeEventListener("new_wish_submitted", handleNewWish);
    };
  }, []);

  const handleNext = () => {
    if (wishes.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % wishes.length);
  };

  const handlePrev = () => {
    if (wishes.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + wishes.length) % wishes.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 45) {
      handleNext(); // Vuốt sang trái -> Thẻ tiếp theo
    } else if (distance < -45) {
      handlePrev(); // Vuốt sang phải -> Thẻ trước đó
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const total = wishes.length;

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        backgroundColor: "#f7f4f1",
        padding: "0 8px 36px",
        boxSizing: "border-box",
      }}
    >
      <style>{`
        @keyframes swipeCardIn {
          from { opacity: 0; transform: scale(0.92) translateY(16px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d8c2be;
          border-radius: 4px;
        }
      `}</style>

      {/* KHUNG THIỆP CHÍNH */}
      <div
        style={{
          position: "relative",
          margin: "0 auto",
          width: "100%",
          maxWidth: "420px",
          borderRadius: "20px",
          backgroundColor: "#ffffff",
          boxShadow: "0 18px 40px rgba(86,42,43,0.12)",
          padding: "32px 18px 28px",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "22px" }}>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: "#8a584c",
              display: "block",
              marginBottom: "4px",
            }}
          >
            MESSAGES & LOVE
          </span>
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(1.9rem, 7vw, 2.5rem)",
              fontWeight: 400,
              fontStyle: "italic",
              color: "#460817",
              fontFamily: '"Alex Brush", "Cormorant Garamond", cursive',
              lineHeight: 1.15,
            }}
          >
            Xấp Thư Yêu Thương
          </h2>
          <div
            style={{
              margin: "10px auto 0",
              width: "36px",
              height: "1px",
              backgroundColor: "#d5c2be",
            }}
          />
        </div>

        {isLoading ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px 0",
              color: "#8a584c",
              fontSize: "13px",
              fontStyle: "italic",
            }}
          >
            Đang chuẩn bị những tấm thư... ✨
          </div>
        ) : (
          <>
            {/* THANH THỐNG KÊ & XEM TẤT CẢ */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
                padding: "0 4px",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#460817",
                  fontFamily: "serif",
                  letterSpacing: "0.04em",
                }}
              >
                LÁ THƯ {currentIndex + 1} / {total}
              </span>
              <button
                onClick={() => setShowAllModal(true)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "11.5px",
                  color: "#8a584c",
                  fontWeight: 600,
                  cursor: "pointer",
                  padding: 0,
                  textDecoration: "underline",
                }}
              >
                Xem tất cả ({total}) ➔
              </button>
            </div>

            {/* KHU VỰC XẤP THẺ 3D (SWIPE STACK) */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "235px",
                marginBottom: "20px",
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Thẻ nền thứ 3 (Dưới cùng) */}
              {total > 2 && (
                <div
                  style={{
                    position: "absolute",
                    inset: "0 18px",
                    top: "16px",
                    backgroundColor: "#f4ede8",
                    borderRadius: "20px",
                    border: "1px solid #ebdcd5",
                    transform: "rotate(3deg) scale(0.92)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                    zIndex: 1,
                  }}
                />
              )}

              {/* Thẻ nền thứ 2 (Ở giữa) */}
              {total > 1 && (
                <div
                  style={{
                    position: "absolute",
                    inset: "0 10px",
                    top: "8px",
                    backgroundColor: "#fdf8f5",
                    borderRadius: "20px",
                    border: "1px solid #ebdcd5",
                    transform: "rotate(-2deg) scale(0.96)",
                    boxShadow: "0 6px 14px rgba(0,0,0,0.05)",
                    zIndex: 2,
                  }}
                />
              )}

              {/* Thẻ chính hiện tại (Ở trên cùng) */}
              {wishes[currentIndex] && (
                <div
                  key={wishes[currentIndex].id || currentIndex}
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "#ffffff",
                    borderRadius: "20px",
                    padding: "20px 18px 16px",
                    border: "1.5px solid #ebdcd5",
                    boxShadow: "0 12px 28px rgba(70,8,23,0.1)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    zIndex: 3,
                    animation: "swipeCardIn 0.28s ease-out",
                    boxSizing: "border-box",
                  }}
                >
                  <div>
                    {/* Header Thẻ */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "12px",
                        borderBottom: "1px solid #f2e6e3",
                        paddingBottom: "8px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <div
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            backgroundColor: "#520914",
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            fontSize: "13px",
                          }}
                        >
                          {wishes[currentIndex].name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h4
                            style={{
                              margin: 0,
                              fontSize: "14px",
                              fontWeight: 700,
                              color: "#460817",
                              fontFamily: "serif",
                            }}
                          >
                            {wishes[currentIndex].name}
                          </h4>
                          {wishes[currentIndex].time && (
                            <span
                              style={{ fontSize: "11px", color: "#998580" }}
                            >
                              {wishes[currentIndex].time}
                            </span>
                          )}
                        </div>
                      </div>

                      <span style={{ fontSize: "18px" }}>💌</span>
                    </div>

                    {/* Nội dung lời chúc */}
                    <p
                      style={{
                        margin: 0,
                        fontSize: "13.5px",
                        lineHeight: 1.6,
                        color: "#4a3536",
                        fontFamily: '"Cormorant Garamond", serif',
                        fontStyle: "italic",
                        textAlign: "justify",
                        maxHeight: "105px",
                        overflowY: "auto",
                      }}
                      className="custom-scrollbar"
                    >
                      “{wishes[currentIndex].wishes}”
                    </p>
                  </div>

                  {/* Chân thẻ: Gợi ý vuốt */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderTop: "1px dashed #f0ded9",
                      paddingTop: "6px",
                      fontSize: "11px",
                      color: "#998580",
                    }}
                  >
                    <span>👈 Vuốt để đổi thư</span>
                    <span>👉</span>
                  </div>
                </div>
              )}
            </div>

            {/* BỘ NÚT BẤM ĐIỀU HƯỚNG DƯỚI THẺ */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <button
                onClick={handlePrev}
                style={{
                  backgroundColor: "#faf4f0",
                  color: "#460817",
                  border: "1.2px solid #ecd8d2",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  fontSize: "16px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 3px 8px rgba(70,8,23,0.08)",
                }}
              >
                ◀
              </button>

              <div
                style={{ display: "flex", gap: "6px", alignItems: "center" }}
              >
                {wishes.slice(0, 6).map((_, dotIdx) => (
                  <div
                    key={dotIdx}
                    style={{
                      width: dotIdx === currentIndex % 6 ? "18px" : "6px",
                      height: "6px",
                      borderRadius: "3px",
                      backgroundColor:
                        dotIdx === currentIndex % 6 ? "#520914" : "#e0cfcb",
                      transition: "all 0.25s ease",
                    }}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                style={{
                  backgroundColor: "#520914",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  fontSize: "16px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(82,9,20,0.25)",
                }}
              >
                ▶
              </button>
            </div>
          </>
        )}
      </div>

      {/* MODAL XEM TOÀN BỘ DANH SÁCH LỜI CHÚC */}
      {showAllModal && (
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
          onClick={() => setShowAllModal(false)}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "360px",
              backgroundColor: "#ffffff",
              borderRadius: "24px",
              padding: "26px 18px 20px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
              maxHeight: "80vh",
              display: "flex",
              flexDirection: "column",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowAllModal(false)}
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
              }}
            >
              ✕
            </button>

            <div style={{ textAlign: "center", marginBottom: "16px" }}>
              <h3
                style={{
                  margin: "0 0 4px",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#460817",
                  fontFamily: "serif",
                }}
              >
                Sổ Lưu Bút ({wishes.length})
              </h3>
              <p style={{ margin: 0, fontSize: "12px", color: "#888" }}>
                Tất cả lời chúc gửi đến bạn
              </p>
            </div>

            <div
              className="custom-scrollbar"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                overflowY: "auto",
                paddingRight: "4px",
                maxHeight: "55vh",
              }}
            >
              {wishes.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setShowAllModal(false);
                  }}
                  style={{
                    backgroundColor: "#faf7f5",
                    borderRadius: "16px",
                    padding: "12px 14px",
                    border: "1px solid #ede4df",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "4px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "13.5px",
                        fontWeight: 700,
                        color: "#460817",
                        fontFamily: "serif",
                      }}
                    >
                      {item.name}
                    </span>
                    <span style={{ fontSize: "11px", color: "#998580" }}>
                      {item.time || "Mới gửi"}
                    </span>
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "13px",
                      lineHeight: 1.45,
                      color: "#4a3536",
                      fontFamily: '"Cormorant Garamond", serif',
                      fontStyle: "italic",
                    }}
                  >
                    “{item.wishes}”
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
