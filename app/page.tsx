import { INITIAL_PAGE } from "./constants/initialPageData";
import { BackgroundElements } from "./components/BackgroundElements";
import { ProfileSection } from "./components/ProfileSection";
import { MusicSection } from "./components/MusicSection";
import { NavigationSection } from "./components/NavigationSection";
import { Footer } from "./components/Footer";
import { AgendaEAdmin } from "./components/AgendaEAdmin";
import { AdminButton } from "./components/AdminButton";

export default function Home() {
  return (
    <main className="min-h-screen relative flex flex-col overflow-x-hidden">
      <BackgroundElements />
      
      <AdminButton />

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-8 px-6 sm:px-8 lg:px-12 mt-12 lg:mt-16 mb-12 flex-grow">
        
        <ProfileSection 
          profile={INITIAL_PAGE.profile} 
          socials={INITIAL_PAGE.socials} 
        />
        
        <section className="w-full lg:w-1/2 flex flex-col gap-10">
          <NavigationSection 
            pages={INITIAL_PAGE.pages} 
            title={INITIAL_PAGE.sections.explore} 
          />
          
          <AgendaEAdmin title={INITIAL_PAGE.sections.agenda} />
          
          <MusicSection 
            links={INITIAL_PAGE.links} 
            title={INITIAL_PAGE.sections.music} 
          />
        </section>
      </div>

      <Footer />
    </main>
  );
}