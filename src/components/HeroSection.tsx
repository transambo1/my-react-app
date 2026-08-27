import hostInfo from '../data/hostInfo.json';
import logoPng from '../assets/logo.png';

export default function HeroSection() {
  // Lấy tên cuối để làm chữ ký (VD: Xuân Nghi -> Nghi)
  const nameParts = hostInfo.name.split(' ');
  const firstName = nameParts[nameParts.length - 1];

  return (
    <section className="relative w-full flex flex-col items-center bg-white min-h-[90vh] overflow-hidden pb-10">
      {/* Background lụa mờ (Bạn có thể thay bằng ảnh nền lụa của bạn) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: 'url(https://www.transparenttextures.com/patterns/white-diamond.png)' }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#f8f9fa] via-white to-[#f4f5f6] opacity-80" />

      {/* Dải băng (Ribbon) bên trái */}
      <div 
        className="absolute top-2 left-4 sm:left-6 z-20 w-16 sm:w-20 bg-gradient-to-b from-[#8a151b] to-[#6a0d12] shadow-xl flex flex-col items-center pb-8"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 90%, 0 100%)' }}
      >
        {/* Viền trong của dải băng */}
        <div 
          className="absolute inset-1 border border-white/20 bottom-8"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 90%, 0 100%)' }}
        />
        
        {/* Nội dung chữ trên dải băng */}
        <div className="mt-12 flex items-center justify-center gap-1 sm:gap-2 h-64 text-white">
          <span 
            className="text-[8px] sm:text-[10px] tracking-widest uppercase opacity-80"
            style={{ writingMode: 'vertical-rl' }}
          >
            Khoa Dược
          </span>
          <span 
            className="text-sm sm:text-base font-serif tracking-widest font-medium"
            style={{ writingMode: 'vertical-rl' }}
          >
            {hostInfo.name.toUpperCase()}
          </span>
        </div>
        
        <div className="w-8 h-[1px] bg-white/40 my-4" />
        <span className="text-white text-[10px] sm:text-xs font-serif tracking-widest">K28</span>
      </div>

      <div className="relative z-10 flex flex-col items-center w-full px-8 pt-8">
        
{/* Logo & Tên trường */}
<div className="flex flex-col items-center mb-6 pl-12 sm:pl-16 w-full">
  <div style={{ width: '80px', minWidth: '80px', maxWidth: '80px' }} className="mb-2"> 
    <img 
      src={logoPng}
      alt="University Logo" 
      width={80}
      height={80}
      style={{ width: '80px', height: '80px', objectFit: 'contain', alignContent: 'center' }}
    />
  </div>
  
  <span className="text-[#cc1f27] text-[11px] font-black tracking-[0.15em] leading-tight uppercase text-center max-w-[180px] block">
    {hostInfo.school}
  </span>
</div>



        {/* Tiêu đề Graduation Ceremony */}
        <div className="relative flex flex-col items-center mb-8 pl-8 sm:pl-12 w-full text-center">
          <h1 className="text-3xl sm:text-4xl font-serif text-[#6a0d12] tracking-[0.15em] uppercase font-light relative z-10">
            Graduation
          </h1>
          <span 
            className="text-5xl sm:text-6xl text-[#9a8a81] absolute top-5 sm:top-6 z-0 opacity-80"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Ceremony
          </span>
        </div>
        
        {/* Khung ảnh chính (Hình chữ nhật bo góc) */}
        <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[3/4] bg-white rounded-3xl sm:rounded-[2.5rem] shadow-2xl p-0.5 mb-10 z-10">
          <img 
            src="../assets/hero.png" 
            alt="Graduation Portrait" 
            className="w-full h-full object-cover rounded-3xl sm:rounded-[2.5rem]" 
          />
          
          {/* Chữ ký đè lên dưới cùng của ảnh */}
          <div className="absolute -bottom-4 left-0 right-0 flex justify-center drop-shadow-lg">
            <span 
              className="text-white text-5xl sm:text-6xl"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              {hostInfo.name}
            </span>
          </div>
        </div>

        {/* Trích dẫn Footer */}
        <div className="flex flex-col items-center text-[#6a0d12] mt-4">
          <p className="text-xs sm:text-sm font-serif tracking-[0.2em] uppercase mb-1">
            Every end is
          </p>
          <p className="text-xs sm:text-sm font-serif tracking-[0.2em] uppercase">
            A new beginning...
          </p>
        </div>

      </div>
    </section>
  );
}
