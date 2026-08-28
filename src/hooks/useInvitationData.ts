import { useState } from "react";
import hostInfo from "../data/hostInfo.json";
import guests from "../data/guest.json";

export interface ContactPerson {
  name: string;
  phone: string;
}

export function useInvitationData() {
  const [showCallModal, setShowCallModal] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState("");

  const searchParams = new URLSearchParams(window.location.search);

  // 1. Tìm khách mời theo slug hoặc query param name
  const guestSlug = searchParams.get("to");
  const matchedGuest = guests.find((g) => g.slug === guestSlug);
  const guestName =
    matchedGuest?.name || searchParams.get("name") || "Lâm Thành";
  const greeting = matchedGuest?.greeting || "THÂN MỜI";

  // 2. Format thời gian sự kiện
  const eventDay = hostInfo.event?.day || "09";
  const eventMonth = hostInfo.event?.month || "09";
  const eventYear = hostInfo.event?.year || "2026";
  const eventTimeAndWeek = `${hostInfo.event?.time || "08:30"} ${
    hostInfo.event?.dayOfWeek || "THỨ BẢY"
  }`;

  // 3. Link Google Maps
  const mapSearchUrl =
    hostInfo.event?.mapUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURI(
      hostInfo.event?.location || hostInfo.school,
    )}`;

  // 4. Hàm sao chép số điện thoại
  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    setTimeout(() => setCopiedPhone(""), 2000);
  };

  // 5. Danh sách liên hệ
  const contactList: ContactPerson[] =
    (hostInfo.contacts as ContactPerson[]) || [
      {
        name: hostInfo.name,
        phone: hostInfo.phone || "0912345678",
      },
    ];

  return {
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
  };
}
