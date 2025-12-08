import HeroImage from "./components/heroImage";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center justify-between bg-white dark:bg-black sm:items-start">
        <div className="w-full inline-flex flex-col justify-center items-center gap-8">
          <HeroImage 
            src="/sunset.png"
            alt="Sunset at Vistvik beach"
            title="Elias Greig-Vistnes"
            subtitle="IT Trainee at Cegal Norway"
          />
        </div>
        <div className="">
          
        </div>
      </main>
    </div>
  );
}