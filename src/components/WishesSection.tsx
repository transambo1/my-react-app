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
      "Chúc mừng tân cử nhân xuất sắc! Chúc em luôn vững bước và tỏa sáng rực rỡ trên con đường y nghiệp phía trước nhé! ",
    time: "Vừa xong",
  },
  {
    id: 2,
    name: "Phương Lan",
    wishes:
      "Tự hào về cậu rất nhiều. Mong mọi ước mơ và dự định trong tương lai của cậu đều thành hiện thực nhé bạn thân! ",
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

const AUTOPLAY_DURATION = 6000; // 6 giây đổi 1 lời chúc khi bật autoplay

export default function WishesSection() {
  const [wishes, setWishes] = useState<WishItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [showAllModal, setShowAllModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

 const progressTimerRef = useRef<number | null>(null);

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
            })
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
        setProgress(0);
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

  // XỬ LÝ AUTOPLAY KHÔNG NHẢY CÓC: Bỏ currentIndex khỏi dependencies
  useEffect(() => {
    if (!isPlaying || wishes.length <= 1) {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      return;
    }

    const interval = 50; // cập nhật mỗi 50ms
    const step = (interval / AUTOPLAY_DURATION) * 100;

    progressTimerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIndex((idx) => (idx + 1) % wishes.length);
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [isPlaying, wishes.length]);

  const handleNext = () => {
    if (wishes.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % wishes.length);
    setProgress(0);
  };

  const handlePrev = () => {
    if (wishes.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + wishes.length) % wishes.length);
    setProgress(0);
  };

  const activeWish = wishes[currentIndex] || wishes[0];
  const total = wishes.length;

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        backgroundColor: "#ffffff",
        boxSizing: "border-box",
      }}
    >
      <style>{`
        @keyframes spinWheel {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes soundWave {
          0%, 100% { height: 6px; }
          50% { height: 18px; }
        }
        @keyframes fadeTapeMessage {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(12, 30, 66, 0.2);
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
          // borderRadius: "20px",
          backgroundColor: "#EEE8E2",
          boxShadow: "0 18px 40px rgba(12, 30, 66, 0.08)",
          padding: "30px 18px 26px",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: "#0C1E42",
              display: "block",
              marginBottom: "4px",
            }}
          >
            VINTAGE RADIO & TAPE
          </span>
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(1.9rem, 7vw, 2.5rem)",
              fontWeight: 400,
              fontStyle: "italic",
              color: "#0C1E42",
              fontFamily: '"Alex Brush", "Cormorant Garamond", cursive',
              lineHeight: 1.15,
            }}
          >
            Những Lời Iu Thương
          </h2>
          <div
            style={{
              margin: "10px auto 0",
              width: "36px",
              height: "1px",
              backgroundColor: "rgba(12, 30, 66, 0.2)",
            }}
          />
        </div>

        {isLoading ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px 0",
              color: "#0C1E42",
              fontSize: "13px",
              fontStyle: "italic",
            }}
          >
            Đang tải cuộn băng kỷ niệm... 
          </div>
        ) : (
          <>
            {/* THÂN MÁY CASSETTE VINTAGE */}
            <div
              style={{
                backgroundColor: "#0C1E42",
                borderRadius: "20px",
                padding: "16px 14px",
                boxShadow: "inset 0 2px 6px rgba(238, 232, 226, 0.15), 0 10px 24px rgba(12, 30, 66, 0.3)",
                border: "2px solid #0C1E42",
                marginBottom: "18px",
              }}
            >
              {/* CỬA SỔ BĂNG CASSETTE */}
              <div
                style={{
                  backgroundColor: "#EEE8E2",
                  borderRadius: "14px",
                  padding: "12px 14px",
                  border: "1.5px solid rgba(238, 232, 226, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "14px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Bánh răng xoay bên trái */}
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    backgroundColor: "#EEE8E2",
                    border: "3px dashed #0C1E42",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    animation: isPlaying ? "spinWheel 4s linear infinite" : "none",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
                  }}
                >
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      backgroundColor: "#0C1E42",
                    }}
                  />
                </div>

                {/* Nhãn băng giữa & Sóng âm thanh */}
                <div style={{ textAlign: "center", flex: 1, padding: "0 10px" }}>
                  <span
                    style={{
                      fontSize: "10px",
                      color: "#0C1E42",
                      fontFamily: "monospace",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    TRACK #{currentIndex + 1} OF {total}
                  </span>

                  {/* Sóng âm thanh mini */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "3px",
                      height: "20px",
                    }}
                  >
                    {[0.1, 0.4, 0.2, 0.6, 0.3, 0.5, 0.2].map((delay, idx) => (
                      <div
                        key={idx}
                        style={{
                          width: "3px",
                          backgroundColor: "#0C1E42",
                          borderRadius: "2px",
                          animation: isPlaying ? `soundWave 1.2s ease-in-out infinite` : "none",
                          animationDelay: `${delay}s`,
                          height: isPlaying ? "14px" : "6px",
                          transition: "height 0.2s ease",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Bánh răng xoay bên phải */}
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    backgroundColor: "#EEE8E2",
                    border: "3px dashed #0C1E42",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    animation: isPlaying ? "spinWheel 4s linear infinite" : "none",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
                  }}
                >
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      backgroundColor: "#0C1E42",
                    }}
                  />
                </div>
              </div>

              {/* MÀN HÌNH PHÁT NỘI DUNG LỜI CHÚC */}
              <div
                key={activeWish?.id || currentIndex}
                style={{
                  backgroundColor: "#EEE8E2",
                  borderRadius: "14px",
                  padding: "16px 14px",
                  boxShadow: "inset 0 1px 4px rgba(12, 30, 66, 0.1)",
                  animation: "fadeTapeMessage 0.25s ease-out",
                  minHeight: "125px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "6px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                   
                      <h4
                        style={{
                          margin: 0,
                          fontSize: "17px",
                          fontWeight: 700,
                          color: "#0C1E42",
                          fontFamily: "serif",
                        }}
                      >
                        {activeWish?.name}
                      </h4>
                    </div>

                    <span style={{ fontSize: "11px", color: "rgba(12, 30, 66, 0.6)" }}>
                      {activeWish?.time || "Mới gửi"}
                    </span>
                  </div>

                  <p
                    style={{
                      margin: 0,
                      fontSize: "13px",
                      lineHeight: 1.55,
                      color: "#0C1E42",
                      fontFamily: '"Cormorant Garamond", serif',
                      fontStyle: "italic",
                      textAlign: "justify",
                      maxHeight: "85px",
                      overflowY: "auto",
                    }}
                    className="custom-scrollbar"
                  >
                    “{activeWish?.wishes}”
                  </p>
                </div>

                {/* THANH TIẾN TRÌNH AUTOPLAY */}
                <div
                  style={{
                    marginTop: "10px",
                    width: "100%",
                    height: "3px",
                    backgroundColor: "rgba(12, 30, 66, 0.15)",
                    borderRadius: "2px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${progress}%`,
                      height: "100%",
                      backgroundColor: "#0C1E42",
                      transition: "width 0.05s linear",
                    }}
                  />
                </div>
              </div>

              {/* BỘ NÚT ĐIỀU KHIỂN */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "14px",
                  padding: "0 6px",
                }}
              >
                <button
                  onClick={() => setShowAllModal(true)}
                  style={{
                    background: "rgba(238, 232, 226, 0.12)",
                    border: "none",
                    borderRadius: "10px",
                    padding: "6px 10px",
                    color: "#EEE8E2",
                    fontSize: "11.5px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                   Người thương ({total})
                </button>

                {/* Cụm nút Play / Prev / Next */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <button
                    onClick={handlePrev}
                    style={{
                      backgroundColor: "rgba(238, 232, 226, 0.15)",
                      color: "#EEE8E2",
                      border: "none",
                      borderRadius: "50%",
                      width: "34px",
                      height: "34px",
                      fontSize: "13px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    ⏮
                  </button>

                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    style={{
                      backgroundColor: "#EEE8E2",
                      color: "#0C1E42",
                      border: "none",
                      borderRadius: "50%",
                      width: "42px",
                      height: "42px",
                      fontSize: "15px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
                    }}
                  >
                    {isPlaying ? "⏸" : "▶"}
                  </button>

                  <button
                    onClick={handleNext}
                    style={{
                      backgroundColor: "rgba(238, 232, 226, 0.15)",
                      color: "#EEE8E2",
                      border: "none",
                      borderRadius: "50%",
                      width: "34px",
                      height: "34px",
                      fontSize: "13px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    ⏭
                  </button>
                </div>
              </div>
            </div>

            {/* CHÚ THÍCH NHỎ */}
            <div style={{ textAlign: "center" }}>
              <span
                style={{
                  fontSize: "12px",
                  fontStyle: "italic",
                  color: "rgba(12, 30, 66, 0.75)",
                  fontFamily: '"Cormorant Garamond", serif',
                }}
              >
                {isPlaying
                  ? "Đài đang tự động chuyển tin nhắn sau 6s..."
                  : "Đã tạm dừng phát, bấm nút  ▶  để tiếp tục."}
              </span>
            </div>
          </>
        )}
      </div>

      {/* MODAL XEM TOÀN BỘ DANH BẠ LỜI CHÚC */}
      {showAllModal && (
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
              boxShadow: "0 20px 40px rgba(12, 30, 66, 0.25)",
              maxHeight: "80vh",
              display: "flex",
              flexDirection: "column",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Nút đóng */}
            <button
              onClick={() => setShowAllModal(false)}
              style={{
                position: "absolute",
                top: "14px",
                right: "14px",
                background: "rgba(12, 30, 66, 0.08)",
                border: "none",
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

            {/* Tiêu đề Modal */}
            <div style={{ textAlign: "center", marginBottom: "16px" }}>
              <h3
                style={{
                  margin: "0 0 4px",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#0C1E42",
                  fontFamily: "serif",
                }}
              >
                Tổng hợp iu thương ({wishes.length})
              </h3>
              <p style={{ margin: 0, fontSize: "12px", color: "rgba(12, 30, 66, 0.65)" }}>
                Chạm vào người gửi để nghe phát lại tin nhắn
              </p>
            </div>

            {/* Danh sách cuộn toàn bộ */}
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
              {wishes.map((item, idx) => {
                const isCurrent = idx === currentIndex;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setProgress(0);
                      setShowAllModal(false);
                    }}
                    style={{
                      backgroundColor: isCurrent ? "#0C1E42" : "#EEE8E2",
                      color: isCurrent ? "#EEE8E2" : "#0C1E42",
                      borderRadius: "16px",
                      padding: "12px 14px",
                      border: `1px solid ${isCurrent ? "#0C1E42" : "rgba(12, 30, 66, 0.08)"}`,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
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
                          color: isCurrent ? "#EEE8E2" : "#0C1E42",
                          fontFamily: "serif",
                        }}
                      >
                        {isCurrent ? "▶ " : ""}{item.name}
                      </span>
                      <span
                        style={{
                          fontSize: "11px",
                          color: isCurrent ? "rgba(238, 232, 226, 0.75)" : "rgba(12, 30, 66, 0.55)",
                        }}
                      >
                        {item.time || "Mới gửi"}
                      </span>
                    </div>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "13px",
                        lineHeight: 1.45,
                        fontFamily: '"Cormorant Garamond", serif',
                        fontStyle: "italic",
                      }}
                    >
                      “{item.wishes}”
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}