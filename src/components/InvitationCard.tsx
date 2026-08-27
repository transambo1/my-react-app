// src/components/InvitationCard.tsx
import hostInfo from '../data/hostInfo.json';
import guests from '../data/guest.json';

export default function InvitationCard() {
  const searchParams = new URLSearchParams(window.location.search);
  
  // 1. Tìm theo slug trong JSON
  const guestSlug = searchParams.get('to');
  const matchedGuest = guests.find((g) => g.slug === guestSlug);

  // 2. Hoặc fallback lấy trực tiếp param ?name=... nếu không có trong list
  const guestName = matchedGuest?.name || searchParams.get('name') || "Quý Khách";
  const greeting = matchedGuest?.greeting || "Thân mời";

  return (
    <div className="w-full px-6 py-10 bg-[#f8f5f2]">
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#e5e0dc] text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-[#8b5a4b] font-medium">
          {hostInfo.event.title}
        </p>

        {/* Tên khách mời động */}
        <div className="my-6 p-4 bg-[#fdfaf7] rounded-xl border border-[#ede3d8]">
          <p className="text-[#8b5a4b] text-sm">{greeting}</p>
          <h2 className="text-2xl font-serif text-[#5c2d25] mt-1 italic">{guestName}</h2>
        </div>

      {/* Thông tin sự kiện */}
      <div className="space-y-3 text-left text-sm text-gray-700">
        <p><strong>Người mời:</strong> {hostInfo.name}</p>
        <p><strong>Trường:</strong> {hostInfo.school}</p>
        <p><strong>Thời gian:</strong> {hostInfo.event.dayOfWeek}, {hostInfo.event.time} ({hostInfo.event.date})</p>
        <p><strong>Địa điểm:</strong> {hostInfo.event.location}</p>
        <p><strong>Hotline/Zalo:</strong> {hostInfo.phone}</p>
      </div>
    </div>
    </div>
  );
}