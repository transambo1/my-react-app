import { useState } from "react";
import galleryData from "../data/gallery.json";

interface PhotoItem {
  id: number;
  url: string;
  caption: string;
  layout?: string;
}

export default function GallerySection() {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const photos: PhotoItem[] = galleryData.photos || [];

  // Lọc các ảnh hợp lệ có url
  const validPhotos = photos.filter((p) => p.url && p.url.trim() !== "");
  const filmPhotos = validPhotos.slice(0, 5);
  const gridPhotos = validPhotos.slice(5);

  // Nhân đôi để trượt mượt mà vô tận
  const marqueeList = [...filmPhotos, ...filmPhotos];

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
        /* Chuyển động cuộn film từ trái qua phải liên tục */
        @keyframes filmScrollLeftToRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }

        .film-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: filmScrollLeftToRight 28s linear infinite;
        }

        .film-track:hover {
          animation-play-state: paused;
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
          // borderRadius: "20px",
          backgroundColor: "#0C1E42",
          boxShadow: "0 18px 40px rgba(12, 30, 66, 0.28)",
          padding: "32px 14px 28px",
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
              fontSize: "clamp(2rem, 7vw, 2.6rem)",
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

        {/* KHUNG CUỘN PHIM NÂNG SÁNG VỚI TÔNG KEM #EEE8E2 */}
        <div
          style={{
            position: "relative",
            width: "calc(100% + 28px)",
            marginLeft: "-14px",
            marginBottom: "26px",
            overflow: "hidden",
            backgroundColor: "#122754", // Xanh navy sáng hơn, không bị đen chìm
            padding: "10px 0",
            borderTop: "1.5px solid rgba(238, 232, 226, 0.35)",
            borderBottom: "1.5px solid rgba(238, 232, 226, 0.35)",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.25)",
          }}
        >
          {/* Lỗ đục cuộn phim hàng trên - Màu #EEE8E2 sắc nét */}
          <div
            style={{
              height: "12px",
              width: "100%",
              marginBottom: "8px",
              backgroundImage:
                "radial-gradient(ellipse at center, #EEE8E2 45%, transparent 50%)",
              backgroundSize: "16px 8px",
              backgroundRepeat: "repeat-x",
              backgroundPosition: "center",
            }}
          />

          {/* Dải ảnh trượt */}
          <div className="film-track">
            {marqueeList.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                onClick={() => setSelectedPhoto(item)}
                style={{
                  position: "relative",
                  flex: "0 0 175px",
                  height: "122px",
                  margin: "0 8px",
                  cursor: "pointer",
                  backgroundColor: "#EEE8E2", // Khung nền màu kem sáng nổi bật
                  borderRadius: "8px",
                  padding: "5px",
                  boxSizing: "border-box",
                  boxShadow: "0 6px 14px rgba(0,0,0,0.3)",
                  transition: "transform 0.2s ease",
                }}
              >
                {/* Vùng hiển thị ảnh bên trong */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    borderRadius: "4px",
                    overflow: "hidden",
                    backgroundColor: "#0C1E42",
                  }}
                >
                  <img
                    src={item.url}
                    alt={item.caption || "Film Frame"}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      filter: "brightness(1.03) contrast(1.02)",
                    }}
                  />

                  {/* Mã số cuộn phim vintage */}
                  <span
                    style={{
                      position: "absolute",
                      bottom: "4px",
                      right: "6px",
                      backgroundColor: "rgba(12, 30, 66, 0.7)",
                      color: "#EEE8E2",
                      padding: "1px 4px",
                      borderRadius: "3px",
                      fontSize: "8.5px",
                      fontFamily: "monospace",
                      letterSpacing: "0.06em",
                      pointerEvents: "none",
                    }}
                  >
                    #{String((idx % filmPhotos.length) + 1).padStart(2, "0")}🎞️
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Lỗ đục cuộn phim hàng dưới - Màu #EEE8E2 sắc nét */}
          <div
            style={{
              height: "12px",
              width: "100%",
              marginTop: "8px",
              backgroundImage:
                "radial-gradient(ellipse at center, #EEE8E2 45%, transparent 50%)",
              backgroundSize: "16px 8px",
              backgroundRepeat: "repeat-x",
              backgroundPosition: "center",
            }}
          />
        </div>

        {/* BENTO MOSAIC GRID ĐAN XEN */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridAutoRows: "105px",
            gap: "8px",
          }}
        >
          {gridPhotos.map((item, index) => {
            const isTall = index % 5 === 0;
            const isWide = index % 5 === 3;

            return (
              <div
                key={item.id || index}
                onClick={() => setSelectedPhoto(item)}
                style={{
                  gridColumn: isWide ? "span 2" : "span 1",
                  gridRow: isTall ? "span 2" : "span 1",
                  borderRadius: "14px",
                  overflow: "hidden",
                  position: "relative",
                  cursor: "pointer",
                  backgroundColor: "rgba(238, 232, 226, 0.12)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                  border: "1.5px solid rgba(238, 232, 226, 0.25)",
                }}
              >
                <img
                  src={item.url}
                  alt={item.caption || "Gallery"}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />

                {item.caption && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "6px 8px",
                      background:
                        "linear-gradient(to top, rgba(12, 30, 66, 0.9), transparent)",
                    }}
                  >
                    <span
                      style={{
                        color: "#EEE8E2",
                        fontSize: "10px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "block",
                        fontFamily: "serif",
                      }}
                    >
                      {item.caption}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CHÚ THÍCH TRANG TRÍ */}
        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
            padding: "8px 0 0",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              fontStyle: "italic",
              color: "#EEE8E2",
              opacity: 0.85,
              fontFamily: '"Cormorant Garamond", serif',
            }}
          >
            “Chạm vào từng khung hình để xem trọn vẹn kỷ niệm!” ✨
          </span>
        </div>
      </div>

      {/* LIGHTBOX MODAL PHÓNG TO ẢNH (BLUR BACKDROP GIỮ NGUYÊN) */}
      {selectedPhoto && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(12, 30, 66, 0.75)",
            backdropFilter: "blur(6px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 99999,
            padding: "16px",
            boxSizing: "border-box",
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
              maxHeight: "80vh",
              backgroundColor: "#EEE8E2",
              padding: "10px 10px 18px",
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
              alt={selectedPhoto.caption || "Preview"}
              style={{
                maxWidth: "100%",
                maxHeight: "68vh",
                objectFit: "contain",
                borderRadius: "12px",
                display: "block",
              }}
            />

            {selectedPhoto.caption && (
              <p
                style={{
                  margin: "12px 0 0",
                  fontSize: "14px",
                  fontWeight: 600,
                  fontStyle: "italic",
                  color: "#0C1E42",
                  fontFamily: '"Cormorant Garamond", serif',
                  textAlign: "center",
                }}
              >
                {selectedPhoto.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}