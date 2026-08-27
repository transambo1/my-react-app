import letterData from '../data/letter.json';

export default function LetterSection() {
  return (
    <section className="relative px-6 py-10 bg-[#f8f5f2] flex flex-col items-center">
      <div className="w-full bg-white rounded-3xl p-7 shadow-sm border border-[#e5e0dc] text-center flex flex-col items-center">
        
        {/* Tiêu đề chữ viết tay nghệ thuật */}
        <h2 className="font-serif italic text-2xl sm:text-3xl text-[#5c2d25] tracking-wide mb-6">
          {letterData.title}
        </h2>

        {/* Các đoạn tâm thư */}
        <div className="space-y-4 text-xs sm:text-[13px] leading-relaxed text-[#4a2e2b] font-light">
          {letterData.paragraphs.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        {/* Chữ ký */}
        <p className="font-serif italic text-xl text-[#5c2d25] mt-8">Kim Ngân</p>

      </div>
    </section>
  );
}