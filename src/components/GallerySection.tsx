import { useState } from 'react';
import galleryData from '../data/gallery.json';

interface PhotoItem {
  id: number;
  url: string;
  caption: string;
  layout: string;
}

export default function GallerySection() {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  return (
    <section className="relative px-6 py-10 bg-[#f8f5f2] flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="font-serif italic text-2xl text-[#5c2d25] tracking-wide">
          The Album
        </h3>
      </div>

      {/* Main image carousel/viewer, or a prominent first image */}
      <div className="w-full aspect-[4/3] bg-white rounded-3xl p-2.5 shadow-sm border border-[#e5e0dc] mb-4">
        <img 
          src="https://images.unsplash.com/photo-1517486804591-cf6270634125?q=80&w=1080&auto=format&fit=crop" 
          alt="Main gallery image" 
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>

      {/* Filmstrip style gallery for smaller images */}
      <div className="w-full flex justify-center space-x-2 mb-8">
        {galleryData.photos.slice(0, 3).map((item) => (
          <div 
            key={item.id}
            className="w-20 h-20 bg-white rounded-2xl p-1 shadow-sm border border-[#e5e0dc] overflow-hidden flex-shrink-0"
          >
            <img 
              src={item.url}
              alt={item.caption}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        ))}
      </div>

      {/* Grid Layout for remaining photos */}
      <div className="grid grid-cols-2 gap-3 w-full">
        {galleryData.photos.slice(3).map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedPhoto(item)}
            className="group relative overflow-hidden rounded-2xl bg-white p-1.5 shadow-sm border border-[#ede3d8] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md aspect-square"
          >
            <div className="w-full h-full overflow-hidden rounded-xl relative">
              <img
                src={item.url}
                alt={item.caption}
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {/* Overlay Caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2.5">
                <p className="text-white text-[11px] font-light truncate">{item.caption}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal cho ảnh lớn */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative">
            <img 
              src={selectedPhoto.url} 
              alt={selectedPhoto.caption} 
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-lg"
            />
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-2 right-2 text-white text-3xl font-bold bg-black/50 rounded-full w-10 h-10 flex items-center justify-center focus:outline-none"
            >
              &times;
            </button>
            {selectedPhoto.caption && (
              <p className="text-white text-center mt-3 text-sm italic">
                {selectedPhoto.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
//                     {item.caption}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Lightbox Modal */}
//       {selectedPhoto && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
//           onClick={() => setSelectedPhoto(null)}
//         >
//           <div
//             className="bg-white p-3 rounded-2xl max-w-sm w-full shadow-2xl border border-[#ede3d8] flex flex-col items-center"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="w-full rounded-xl overflow-hidden max-h-[65vh]">
//               <img
//                 src={selectedPhoto.url}
//                 alt={selectedPhoto.caption}
//                 className="w-full h-full object-contain"
//               />
//             </div>
//             <p className="font-serif italic text-xs text-[#5c2d25] mt-3 text-center">
//               {selectedPhoto.caption}
//             </p>
//             <button
//               onClick={() => setSelectedPhoto(null)}
//               className="mt-3 text-[11px] font-medium text-[#8b5a4b] hover:text-[#5c2d25] px-4 py-1"
//             >
//               Đóng lại
//             </button>
//           </div>
//         </div>
//       )}
//     </section>
//   );
}