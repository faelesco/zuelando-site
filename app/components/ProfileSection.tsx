import { SocialLinks } from "./SocialLinks";

interface ProfileProps {
    profile: { name: string; description: string; address?: { text: string; mapUrl: string }; };
    socials: { instagram: string; whatsapp: string };
}

export function ProfileSection({ profile, socials }: ProfileProps) {
    return (
        <div className="max-w-2xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-amber-700">Cultura de matriz africana</p>
            <h1 className="text-5xl font-extrabold uppercase leading-none tracking-tight text-stone-900 sm:text-6xl lg:text-7xl">
                {profile.name}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-stone-600 sm:text-lg">{profile.description}</p>

            <div className="mt-8 flex flex-wrap gap-3">
                <a
                    href="#agenda"
                    className="inline-flex items-center rounded-full bg-stone-900 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-stone-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                >
                    Ver próximos eventos
                </a>
            </div>

            <div className="mt-6">
                <SocialLinks socials={socials} address={profile.address} />
            </div>
        </div>
    );
}
