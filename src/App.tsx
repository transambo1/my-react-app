import HeroSection from './components/HeroSection';
import InvitationCard from './components/InvitationCard';
import GallerySection from './components/GallerySection';
import LetterSection from './components/LetterSection';
import RsvpForm from './components/RsvpForm';

export default function App() {
  return (
    <main className="min-h-screen bg-[#faf7f2] text-slate-800 font-sans flex justify-center">
      <div className="w-full max-w-[480px] bg-[#f8f5f2] min-h-screen flex flex-col pb-8">
        <HeroSection />
        <InvitationCard />
        <LetterSection />
        <GallerySection />
        <RsvpForm />
      </div>
    </main>
  );
}