import HeroSection from './components/HeroSection';
import InvitationCard from './components/InvitationCard';
import GallerySection from './components/GallerySection';
import LetterSection from './components/LetterSection';
import RsvpForm from './components/RsvpForm';
import WishesSection from "./components/WishesSection";

export default function App() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-800 font-sans flex justify-center">
     <div className="w-full max-w-105 min-h-screen flex flex-col shadow-2xl bg-white">
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