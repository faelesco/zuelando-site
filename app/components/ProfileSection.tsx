import { SocialLinks } from "./SocialLinks";

interface ProfileProps {
    profile: {
        name: string;
        description: string;
        photoPlaceholder?: string;
        address?: { text: string; mapUrl: string };
    };
    socials: { instagram: string; whatsapp: string };
}

export function ProfileSection({ profile, socials }: ProfileProps) {
    return (
        <section className="w-full lg:w-1/2 flex flex-col items-center justify-start lg:sticky lg:top-24 h-fit pt-4 sm:pt-8">

            <div className="flex flex-col items-center gap-3 mb-8 w-full">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-gray-900 via-gray-800 to-gray-500 text-center uppercase drop-shadow-sm pb-1">
                    {profile.name}
                </h1>

                <div className="w-12 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full mb-2 opacity-80"></div>

                <p className="text-gray-500 text-center text-base sm:text-lg max-w-md font-medium leading-relaxed px-4">
                    {profile.description}
                </p>
            </div>

            <SocialLinks
                socials={socials}
                profileName={profile.name}
                address={profile.address}
            />
        </section>
    );
}