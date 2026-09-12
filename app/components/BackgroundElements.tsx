export function BackgroundElements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute bottom-0 -left-10 sm:left-0 lg:left-12 w-40 h-64 sm:w-48 sm:h-80 lg:w-64 lg:h-96 bg-[url('/espada.svg')] bg-no-repeat bg-contain bg-bottom" />
      <div className="absolute -top-6 -right-6 sm:top-2 sm:right-2 lg:top-8 lg:right-12 w-28 h-28 sm:w-32 sm:h-32 lg:w-52 lg:h-52 bg-[url('/atabaque.svg')] bg-no-repeat bg-contain bg-top" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 lg:w-96 lg:h-96 bg-[url('/carranca.svg')] bg-no-repeat bg-center opacity-5" />
    </div>
  );
}