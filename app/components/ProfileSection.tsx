import { SocialLinks } from "./SocialLinks";

interface ProfileProps {
    profile: {
        name: string;
        description: string;
        photoPlaceholder: string;
        address?: { text: string; mapUrl: string };
    };
    socials: { instagram: string; whatsapp: string };
}

export function ProfileSection({ profile, socials }: ProfileProps) {
    return (
        <section className="w-full lg:w-1/2 flex flex-col items-center justify-start lg:sticky lg:top-24 h-fit">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111827] mb-3 text-center uppercase">
                {profile.name}
            </h1>

            <p className="text-gray-600 text-center text-base sm:text-lg mb-6 max-w-sm">
                {profile.description}
            </p>

            <SocialLinks
                socials={socials}
                profileName={profile.name}
                address={profile.address}
            />
        </section>
    );
}