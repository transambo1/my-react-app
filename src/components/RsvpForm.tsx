import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import rsvpConfig from '../data/rsvpConfig.json';

interface FormData {
  name: string;
  email: string;
  phone: string;
  attending: string;
  wishes: string;
}

export default function RsvpForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    attending: 'attending',
    wishes: ''
  });

  const [submittedData, setSubmittedData] = useState<{ id: string; name: string; email: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;

    const newTicket = {
      id: `TICKET-${Date.now()}`,
      ...formData,
      createdAt: new Date().toISOString()
    };

    // Lưu vào LocalStorage
    const existing = JSON.parse(localStorage.getItem('rsvp_submissions') || '[]');
    localStorage.setItem('rsvp_submissions', JSON.stringify([...existing, newTicket]));

    setSubmittedData({
      id: newTicket.id,
      name: newTicket.name,
      email: newTicket.email
    });
  };

  return (
    <section className="px-6 py-10 bg-[#f8f5f2] flex flex-col items-center">
      {/* RSVP Form Card */}
      <div className="w-full bg-white rounded-3xl p-7 shadow-sm border border-[#e5e0dc] mb-8">
        <div className="text-center mb-6">
          <h3 className="font-serif italic text-2xl text-[#5c2d25] tracking-wide mb-2">
            {rsvpConfig.title}
          </h3>
          <p className="text-xs text-[#8b5a4b] font-light">
            {rsvpConfig.subtitle}
          </p>
        </div>

        {!submittedData ? (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs text-[#5c2d25]">
            <div>
              <label className="block font-medium mb-1">{rsvpConfig.fields.nameLabel}</label>
              <input
                type="text"
                required
                placeholder={rsvpConfig.fields.namePlaceholder}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#d4bca4]/60 bg-[#faf8f5] focus:outline-none focus:border-[#8b5a4b] text-xs"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">{rsvpConfig.fields.phoneLabel}</label>
              <input
                type="tel"
                required
                placeholder={rsvpConfig.fields.phonePlaceholder}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#d4bca4]/60 bg-[#faf8f5] focus:outline-none focus:border-[#8b5a4b] text-xs"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">{rsvpConfig.fields.emailLabel}</label>
              <input
                type="email"
                required
                placeholder={rsvpConfig.fields.emailPlaceholder}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#d4bca4]/60 bg-[#faf8f5] focus:outline-none focus:border-[#8b5a4b] text-xs"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">{rsvpConfig.fields.attendanceLabel}</label>
              <select
                value={formData.attending}
                onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#d4bca4]/60 bg-[#faf8f5] focus:outline-none focus:border-[#8b5a4b] text-xs"
              >
                <option value="attending"></option>
                <option value="not-attending"></option>
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1">{rsvpConfig.fields.wishesLabel}</label>
              <textarea
                placeholder={rsvpConfig.fields.wishesPlaceholder}
                value={formData.wishes}
                onChange={(e) => setFormData({ ...formData, wishes: e.target.value })}
                rows={3}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#d4bca4]/60 bg-[#faf8f5] focus:outline-none focus:border-[#8b5a4b] text-xs"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#5c2d25] text-white py-3 rounded-xl font-semibold uppercase tracking-wider text-sm hover:bg-[#8b5a4b] transition-colors duration-300"
            >
              {rsvpConfig.submitButton}
            </button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-base text-[#5c2d25] font-semibold">Cảm ơn bạn đã đăng ký tham dự!</p>
            <p className="text-sm text-[#8b5a4b]">Vui lòng lưu lại mã QR dưới đây để tiện check-in:</p>
            <div className="flex justify-center p-4 bg-white rounded-xl border border-[#ede3d8]">
              <QRCodeSVG 
                value={`rsvp-id:${submittedData.id}|name:${submittedData.name}|email:${submittedData.email}`} 
                size={180}
                level="H"
                bgColor="#ffffff"
                fgColor="#000000"
              />
            </div>
            <p className="text-[11px] text-gray-500">Mã số: {submittedData.id}</p>
            <p className="text-[11px] text-gray-500">Tên: {submittedData.name}</p>
          </div>
        )}
      </div>

      {/* Thank you image */}
      <div className="w-full aspect-[4/3] bg-white rounded-3xl p-2.5 shadow-sm border border-[#e5e0dc]">
        <img 
          src="https://images.unsplash.com/photo-1517486804591-cf6270634125?q=80&w=1080&auto=format&fit=crop" 
          alt="Thank you" 
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
    </section>
//   );              className="w-full px-3.5 py-2.5 rounded-xl border border-[#d4bca4]/60 bg-[#faf8f5] focus:outline-none focus:border-[#8b5a4b] text-xs"
//             />
//           </div>

//           <div>
//             <label className="block font-medium mb-1">{rsvpConfig.fields.phoneLabel}</label>
//             <input
//               type="tel"
//               placeholder={rsvpConfig.fields.phonePlaceholder}
//               value={formData.phone}
//               onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//               className="w-full px-3.5 py-2.5 rounded-xl border border-[#d4bca4]/60 bg-[#faf8f5] focus:outline-none focus:border-[#8b5a4b] text-xs"
//             />
//           </div>

//           <div>
//             <label className="block font-medium mb-2">{rsvpConfig.fields.attendanceLabel}</label>
//             <div className="space-y-2">
//               {rsvpConfig.fields.options.map((opt) => (
//                 <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="radio"
//                     name="attending"
//                     value={opt.value}
//                     checked={formData.attending === opt.value}
//                     onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
//                     className="accent-[#8b5a4b]"
//                   />
//                   <span>{opt.label}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           <div>
//             <label className="block font-medium mb-1">{rsvpConfig.fields.wishesLabel}</label>
//             <textarea
//               rows={3}
//               placeholder={rsvpConfig.fields.wishesPlaceholder}
//               value={formData.wishes}
//               onChange={(e) => setFormData({ ...formData, wishes: e.target.value })}
//               className="w-full px-3.5 py-2.5 rounded-xl border border-[#d4bca4]/60 bg-[#faf8f5] focus:outline-none focus:border-[#8b5a4b] text-xs resize-none"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full mt-2 py-3 px-4 rounded-xl bg-[#8b5a4b] text-white font-medium text-xs tracking-wider uppercase hover:bg-[#703b32] transition shadow-md"
//           >
//             {rsvpConfig.submitButton}
//           </button>
//         </form>
//       </div>

//       {/* Modal Popup hiển thị Mã QR Check-in */}
//       {submittedData && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
//           <div className="bg-white rounded-3xl p-6 max-w-xs w-full text-center shadow-2xl border border-[#e8ded3] flex flex-col items-center">
//             <h4 className="font-serif text-lg font-bold text-[#5c2d25]">
//               {rsvpConfig.successModal.title}
//             </h4>
//             <p className="text-[11px] text-[#8b5a4b] mt-1 mb-4 leading-relaxed">
//               {rsvpConfig.successModal.message}
//             </p>

//             {/* Mã QR code Check-in */}
//             <div className="p-4 bg-[#fdfbf7] border border-[#e8ded3] rounded-2xl shadow-inner mb-3">
//               <QRCodeSVG 
//                 value={JSON.stringify({ ticketId: submittedData.id, guest: submittedData.name, email: submittedData.email })} 
//                 size={160}
//                 fgColor="#5c2d25"
//               />
//             </div>
            
//             <p className="text-[11px] font-mono text-gray-500 font-semibold mb-1">
//               MÃ VÉ: {submittedData.id}
//             </p>
//             <p className="text-xs font-serif font-bold text-[#5c2d25] mb-5">
//               Khách mời: {submittedData.name}
//             </p>

//             <button
//               onClick={() => setSubmittedData(null)}
//               className="w-full py-2.5 rounded-xl bg-[#5c2d25] text-white text-xs font-medium hover:bg-[#4a2e2b] transition"
//             >
//               Đóng lại
//             </button>
//           </div>
//         </div>
//       )}
//     </section>
//   );
    )
}