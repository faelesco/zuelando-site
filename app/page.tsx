"use client";

import { useState } from "react";
import { INITIAL_PAGE } from "./constants/initialPageData";
import { BackgroundElements } from "./components/BackgroundElements";
import { ProfileSection } from "./components/ProfileSection";
import { AgendaSection } from "./components/AgendaSection";
import { MusicSection } from "./components/MusicSection";
import { NavigationSection } from "./components/NavigationSection";
import { Footer } from "./components/Footer";
import { AdminAuth } from "./components/AdminAuth";

export default function Home() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <main className="min-h-screen relative flex flex-col overflow-x-hidden">
      <BackgroundElements />

      <div className="relative z-50 w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 pt-6 sm:pt-8 flex justify-end">
        <AdminAuth isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-8 px-6 sm:px-8 lg:px-12 mt-4 lg:mt-8 mb-12 flex-grow">

        <ProfileSection
          profile={INITIAL_PAGE.profile}
          socials={INITIAL_PAGE.socials}
        />

        <section className="w-full lg:w-1/2 flex flex-col gap-10">
          <NavigationSection
            pages={INITIAL_PAGE.pages}
            title={INITIAL_PAGE.sections.explore}
          />

          <AgendaSection
            title={INITIAL_PAGE.sections.agenda}
            isAdmin={isAdmin}
          />

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