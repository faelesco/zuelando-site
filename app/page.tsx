import { INITIAL_PAGE } from "./constants/initialPageData";
import { BackgroundElements } from "./components/BackgroundElements";
import { ProfileSection } from "./components/ProfileSection";
import { MusicSection } from "./components/MusicSection";
import { NavigationSection } from "./components/NavigationSection";
import { EventosSection } from "./components/EventosSection";
import { Footer } from "./components/Footer";
import { AdminButton } from "./components/admin/AdminButton";
import { ProximoEventoModal } from "./components/ProximoEventoModal";
import { getEventos, hojeIso, proximoEvento } from "./lib/eventos";

export default async function Home() {
  const eventos = await getEventos();
  const hoje = hojeIso();
  const proximo = proximoEvento(eventos, hoje);

  return (
    <main id="topo" className="relative flex min-h-screen flex-col overflow-hidden">
      <header className="sticky top-0 z-40 border-b border-stone-200/70 bg-stone-50/95">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
          <a href="#topo" className="text-sm font-extrabold uppercase tracking-[0.25em] text-stone-900">
            Zuelando
          </a>
          <nav aria-label="Principal" className="flex items-center gap-5 text-sm font-semibold text-stone-600">
            <a href="#agenda" className="hidden transition-colors hover:text-stone-950 sm:inline">Agenda</a>
            <a href="/musicPage" className="transition-colors hover:text-stone-950">Pontos</a>
            <a href="/sobrePage" className="transition-colors hover:text-stone-950">Sobre</a>
          </nav>
          <AdminButton />
        </div>
      </header>

      <section className="relative mx-auto w-full max-w-6xl px-5 pb-12 pt-12 sm:px-8 sm:pt-16 lg:pb-16 lg:pt-20">
        <BackgroundElements />
        <div className="relative">
          <ProfileSection profile={INITIAL_PAGE.profile} socials={INITIAL_PAGE.socials} />
        </div>
      </section>

      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-5 pb-20 sm:px-8 lg:grid-cols-12 lg:gap-12">
        <aside className="flex flex-col gap-12 lg:col-span-5">
          <NavigationSection pages={INITIAL_PAGE.pages} title={INITIAL_PAGE.sections.explore} />
          <MusicSection links={INITIAL_PAGE.links} title={INITIAL_PAGE.sections.music} />
        </aside>

        <div className="lg:col-span-7">
          <EventosSection title={INITIAL_PAGE.sections.agenda} eventos={eventos} hoje={hoje} />
        </div>
      </div>

      <Footer />

      {proximo && <ProximoEventoModal evento={proximo} />}
    </main>
  );
}
