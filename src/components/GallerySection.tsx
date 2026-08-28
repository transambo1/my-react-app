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

  // Tách 4 ảnh đầu cho Story Slider ngang, các ảnh còn lại đưa vào Bento Grid
  const storyPhotos = photos.slice(0, 4);
  const gridPhotos = photos.slice(4);

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
        /* Ẩn thanh cuộn mặc định nhưng vẫn vuốt mượt */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes fadeInZoom {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* KHUNG CARD CHÍNH */}
      <div
        style={{
          position: "relative",
          margin: "0 auto",
          width: "100%",
          maxWidth: "420px",
          borderRadius: "20px",
          backgroundColor: "#ffffff",
          boxShadow: "0 18px 40px rgba(86,42,43,0.12)",
          padding: "32px 14px 28px",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* 1. HEADER NGHỆ THUẬT */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#8a584c",
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
              color: "#460817",
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
              backgroundColor: "#d5c2be",
            }}
          />
        </div>

        {/* 2. SLIDER NGANG PHONG CÁCH TẠP CHÍ (HORIZONTAL SNAP CAROUSEL) */}
        <div style={{ marginBottom: "26px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
              padding: "0 4px",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "#460817",
                fontFamily: "serif",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Highlight Stories
            </span>
            <span
              style={{
                fontSize: "11px",
                color: "#998580",
                fontStyle: "italic",
              }}
            >
              Vuốt sang phải ➔
            </span>
          </div>

          <div
            className="no-scrollbar"
            style={{
              display: "flex",
              gap: "12px",
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              paddingBottom: "6px",
            }}
          >
            {storyPhotos.map((item, idx) => (
              <div
                key={item.id || idx}
                onClick={() => setSelectedPhoto(item)}
                style={{
                  flex: "0 0 160px",
                  height: "220px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  position: "relative",
                  scrollSnapAlign: "start",
                  cursor: "pointer",
                  boxShadow: "0 8px 18px rgba(70,8,23,0.12)",
                  border: "2px solid #fdfbf9",
                  transform: idx % 2 === 0 ? "rotate(-1deg)" : "rotate(1.5deg)",
                  transition: "transform 0.2s ease",
                }}
              >
                <img
                  src={item.url}
                  alt={item.caption || "Story"}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(70,8,23,0.7) 0%, transparent 60%)",
                    display: "flex",
                    alignItems: "flex-end",
                    padding: "10px",
                    boxSizing: "border-box",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      color: "#ffffff",
                      fontSize: "11.5px",
                      fontFamily: "serif",
                      fontWeight: 600,
                      lineHeight: 1.2,
                    }}
                  >
                    {item.caption || `Khoảnh khắc #${idx + 1}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. BENTO MOSAIC GRID ĐAN XEN BẤT ĐỐI XỨNG */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridAutoRows: "105px",
            gap: "8px",
          }}
        >
          {gridPhotos.map((item, index) => {
            // Tạo kiểu dáng bất đối xứng theo chu kỳ
            const isTall = index % 5 === 0; // Chiếm 2 hàng dọc
            const isWide = index % 5 === 3; // Chiếm 2 cột ngang

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
                  backgroundColor: "#f5f0eb",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                  border: "1.5px solid #ffffff",
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

                {/* Badge đính kèm caption mờ góc dưới */}
                {item.caption && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "6px 8px",
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
                    }}
                  >
                    <span
                      style={{
                        color: "#fff",
                        fontSize: "10px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "block",
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

        {/* 4. TEM TRANG TRÍ POLAROID DƯỚI CÙNG */}
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
              color: "#8c7572",
              fontFamily: '"Cormorant Garamond", serif',
            }}
          >
            “Chạm vào từng bức ảnh để xem trọn vẹn nhé!” ✨
          </span>
        </div>
      </div>

      {/* 5. LIGHTBOX MODAL PHÓNG TO ẢNH CAO CẤP */}
      {selectedPhoto && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.85)",
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
          {/* Nút đóng */}
          <button
            onClick={() => setSelectedPhoto(null)}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "rgba(255, 255, 255, 0.2)",
              border: "none",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              color: "#ffffff",
              fontSize: "18px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>

          {/* Khung ảnh Polaroid phóng to */}
          <div
            style={{
              position: "relative",
              maxWidth: "92vw",
              maxHeight: "80vh",
              backgroundColor: "#ffffff",
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
                  color: "#460817",
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
