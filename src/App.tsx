import HeroSection from './components/HeroSection';
import InvitationCard from './components/InvitationCard';
import GallerySection from './components/GallerySection';
import LetterSection from './components/LetterSection';
import RsvpForm from './components/RsvpForm';
import WishesSection from "./components/WishesSection";
export default function App() {
  return (
    <main className="min-h-screen bg-white text-slate-800 font-sans flex justify-center">
      <div className="w-full max-w-120 bg-[linear-gradient(to bottom, #f9f6f4, #ffffff, #f3f1ee)] min-h-screen flex flex-col pb-8">
        <HeroSection />
        <InvitationCard />
        <LetterSection />
        <GallerySection />
        <WishesSection />
        <RsvpForm />
      </div>
    </main>
  );
}