export function BackgroundElements() {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <div className="absolute bottom-0 left-2 sm:left-6 lg:left-10 w-36 h-64 sm:w-48 sm:h-80 lg:w-60 lg:h-[420px] bg-[url('/espada.svg')] bg-no-repeat bg-contain bg-bottom opacity-90 transition-all" />
            <div className="absolute top-2 right-2 sm:top-4 sm:right-6 lg:top-8 lg:right-10 w-28 h-28 sm:w-36 sm:h-36 lg:w-52 lg:h-52 bg-[url('/atabaque.svg')] bg-no-repeat bg-contain bg-top opacity-90 transition-all" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 lg:w-96 lg:h-96 bg-[url('/carranca.svg')] bg-no-repeat bg-center opacity-5" />
        </div>
    );
}