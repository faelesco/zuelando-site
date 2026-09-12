import { INITIAL_PAGE } from "./constants/initialPageData";
import { BackgroundElements } from "./components/BackgroundElements";
import { ProfileSection } from "./components/ProfileSection";
import { AgendaSection } from "./components/AgendaSection";
import { MusicSection } from "./components/MusicSection";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden flex justify-center bg-[#F9FAFB]">
      <BackgroundElements />
      <div className="relative z-10 w-full max-w-6xl flex flex-col lg:flex-row gap-12 lg:gap-8 p-6 sm:p-8 lg:p-12 mt-8 lg:mt-16 mb-12 lg:mb-0">
        
        <ProfileSection 
          profile={INITIAL_PAGE.profile} 
          socials={INITIAL_PAGE.socials} 
        />
        
        <section className="w-full lg:w-1/2 flex flex-col gap-10">
          <AgendaSection 
            events={INITIAL_PAGE.events} 
            title={INITIAL_PAGE.sections.agenda} 
          />
          <MusicSection 
            links={INITIAL_PAGE.links} 
            title={INITIAL_PAGE.sections.music} 
          />
        </section>

      </div>
    </main>
  );
}