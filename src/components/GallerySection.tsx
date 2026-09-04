import { useState, useEffect, useRef } from "react";

interface PhotoItem {
  id: number;
  url: string;
}

// BỘ ẢNH LẤY TRỰC TIẾP TỪ PUBLIC/PHOTOS/
const STATIC_PHOTOS: PhotoItem[] = [
  { id: 1, url: "/photos/pic1.jpg" },
  { id: 2, url: "/photos/pic2.jpg" },
  { id: 3, url: "/photos/pic3.jpg" },
  { id: 4, url: "/photos/pic4.jpg" },
  { id: 5, url: "/photos/pic5.jpg" },
  { id: 6, url: "/photos/pic6.jpg" },
  { id: 7, url: "/photos/pic7.jpg" },
  { id: 8, url: "/photos/pic8.jpg" },
  { id: 9, url: "/photos/pic9.jpg" },
  { id: 10, url: "/photos/pic10.jpg" },
  { id: 11, url: "/photos/pic11.jpg" },
  { id: 12, url: "/photos/pic12.jpg" },
  { id: 13, url: "/photos/pic13.jpg" },
  { id: 14, url: "/photos/pic14.jpg" },
  { id: 15, url: "/photos/pic15.jpg" },
  { id: 16, url: "/photos/pic16.jpg" },
  { id: 17, url: "/photos/pic17.jpg" },
  { id: 18, url: "/photos/pic18.jpg" },
  { id: 19, url: "/photos/pic19.jpg" },
  { id: 20, url: "/photos/pic20.jpg" },
];
export default function GallerySection() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const total = STATIC_PHOTOS.length;
  const thumbnailContainerRef = useRef<HTMLDivElement | null>(null);

  // Khóa cuộn trang bên ngoài khi mở xem chi tiết ảnh
  useEffect(() => {
    if (selectedPhoto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedPhoto]);

  // Tự động cuộn dải thumbnail để ô ảnh đang chọn luôn nằm chính giữa
  useEffect(() => {
    if (thumbnailContainerRef.current) {
      const activeThumb = thumbnailContainerRef.current.querySelector(
        `[data-index="${currentIndex}"]`
      ) as HTMLElement | null;
      if (activeThumb) {
        activeThumb.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    }
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  // Tính khoảng cách tương đối (-1: trước, 0: chính giữa, 1: sau)
  const getOffset = (index: number) => {
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

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
        /* Ẩn thanh cuộn mặc định của thumbnail */
        .thumb-scroll::-webkit-scrollbar {
          display: none;
        }
        .thumb-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Hiệu ứng rê chuột nút mũi tên */
        .nav-arrow-minimal {
          opacity: 0.6;
          transition: all 0.25s ease;
        }
        .nav-arrow-minimal:hover {
          opacity: 1;
          transform: translateY(-50%) scale(1.18);
        }

        @keyframes fadeInZoom {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* KHUNG CARD CHÍNH - MÀU NAVY #0C1E42 */}
      <div
        style={{
          position: "relative",
          margin: "0 auto",
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "#0C1E42",
          boxShadow: "0 18px 40px rgba(12, 30, 66, 0.28)",
          padding: "32px 0 28px",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* 1. HEADER NGHỆ THUẬT */}
        <div style={{ textAlign: "center", marginBottom: "20px", padding: "0 14px" }}>
          <span
            style={{
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#EEE8E2",
              display: "block",
              marginBottom: "4px",
            }}
          >
            Memories & Moments
          </span>
          <h2
            style={{
              margin: 0,
              fontSize: "40px",
              fontWeight: 400,
              fontStyle: "italic",
              color: "#EEE8E2",
              fontFamily: '"Alex Brush", "Cormorant Garamond", cursive',
              lineHeight: 1.1,
            }}
          >
            The Graduation Album
          </h2>
          <div
            style={{
              margin: "10px auto 0",
              width: "40px",
              height: "1px",
              backgroundColor: "rgba(238, 232, 226, 0.4)",
            }}
          />
        </div>

        {/* 2. KHU VỰC SLIDER CHÍNH */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "480px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {STATIC_PHOTOS.map((item, idx) => {
            const offset = getOffset(idx);
            const isCenter = offset === 0;
            const isPrev = offset === -1;
       

            if (Math.abs(offset) > 1) return null;

            return (
              <div
                key={item.id}
                onClick={() => (isCenter ? setSelectedPhoto(item) : setCurrentIndex(idx))}
                style={{
                  position: "absolute",
                  width: "315px",
                  height: "460px",
                  borderRadius: "18px",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "all 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
                  zIndex: isCenter ? 10 : 2,
                  transform: isCenter
                    ? "translateX(0%) scale(1)"
                    : isPrev
                    ? "translateX(-78%) scale(0.88)"
                    : "translateX(78%) scale(0.88)",
                  opacity: isCenter ? 1 : 0.45,
                  filter: isCenter ? "none" : "blur(3px) brightness(0.6)",
                  boxShadow: isCenter
                    ? "0 22px 42px rgba(0,0,0,0.55), 0 0 0 1px rgba(238,232,226,0.25)"
                    : "0 8px 18px rgba(0,0,0,0.3)",
                }}
              >
                <img
                  src={item.url}
                  alt="Graduation photo"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />

                {/* NÚT MŨI TÊN TỐI GIẢN TRONG LÒNG ẢNH CHÍNH */}
                {isCenter && (
                  <>
                    <button
                      className="nav-arrow-minimal"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrev();
                      }}
                      style={{
                        position: "absolute",
                        left: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        zIndex: 15,
                        background: "none",
                        border: "none",
                        color: "#EEE8E2",
                        fontSize: "38px",
                        fontWeight: 300,
                        lineHeight: 1,
                        cursor: "pointer",
                        outline: "none",
                        padding: "8px",
                        textShadow: "0 2px 8px rgba(0,0,0,0.75)",
                      }}
                    >
                      ‹
                    </button>

                    <button
                      className="nav-arrow-minimal"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNext();
                      }}
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        zIndex: 15,
                        background: "none",
                        border: "none",
                        color: "#EEE8E2",
                        fontSize: "38px",
                        fontWeight: 300,
                        lineHeight: 1,
                        cursor: "pointer",
                        outline: "none",
                        padding: "8px",
                        textShadow: "0 2px 8px rgba(0,0,0,0.75)",
                      }}
                    >
                      ›
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* 3. CHỈ SỐ BỨC ẢNH & DẢI THUMBNAIL AUTO-FOCUS */}
        <div style={{ marginTop: "12px", width: "100%" }}>
          {/* Badge tiến trình ảnh */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "8px",
              fontSize: "14px",
              letterSpacing: "0.2em",
              color: "rgba(238, 232, 226, 0.7)",
              fontFamily: "monospace",
              textTransform: "uppercase",
            }}
          >
            {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>

          {/* Dải cuộn ảnh thu nhỏ tự căn giữa */}
          <div
            ref={thumbnailContainerRef}
            className="thumb-scroll"
            style={{
              display: "flex",
              gap: "8px",
              overflowX: "auto",
              padding: "8px 24px",
              scrollBehavior: "smooth",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {STATIC_PHOTOS.map((item, index) => {
              const isActive = index === currentIndex;
              return (
                <div
                  key={item.id}
                  data-index={index}
                  onClick={() => setCurrentIndex(index)}
                  style={{
                    flex: "0 0 52px",
                    height: "52px",
                    borderRadius: "10px",
                    overflow: "hidden",
                    cursor: "pointer",
                    border: isActive
                      ? "2px solid #EEE8E2"
                      : "1.5px solid rgba(238, 232, 226, 0.15)",
                    opacity: isActive ? 1 : 0.35,
                    transform: isActive ? "scale(1.12)" : "scale(0.95)",
                    transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
                    boxSizing: "border-box",
                    boxShadow: isActive ? "0 4px 12px rgba(0,0,0,0.4)" : "none",
                  }}
                >
                  <img
                    src={item.url}
                    alt={`Thumbnail ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Chú thích trang trí */}
        <div style={{ textAlign: "center", marginTop: "14px", padding: "0 14px" }}>
          <span
            style={{
              fontSize: "16.5px",
              fontStyle: "italic",
              color: "#EEE8E2",
              opacity: 0.75,
              fontFamily: '"Cormorant Garamond", serif',
            }}
          >
            “Xuân Nghi's Congratulation” ✨
          </span>
        </div>
      </div>

      {/* 4. MODAL PHÓNG TO ẢNH (LIGHTBOX) */}
      {selectedPhoto && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(12, 30, 66, 0.8)",
            backdropFilter: "blur(6px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 99999,
            padding: "16px",
            boxSizing: "border-box",
            touchAction: "none",
          }}
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "rgba(238, 232, 226, 0.2)",
              border: "1px solid rgba(238, 232, 226, 0.4)",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              color: "#EEE8E2",
              fontSize: "16px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>

          <div
            style={{
              position: "relative",
              maxWidth: "92vw",
              maxHeight: "82vh",
              backgroundColor: "#EEE8E2",
              padding: "10px",
              borderRadius: "18px",
              boxShadow: "0 24px 50px rgba(0,0,0,0.5)",
              animation: "fadeInZoom 0.25s ease-out",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPhoto.url}
              alt="Preview"
              style={{
                maxWidth: "100%",
                maxHeight: "75vh",
                objectFit: "contain",
                borderRadius: "12px",
                display: "block",
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
}