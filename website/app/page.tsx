import HeroImage from "./components/heroImage";
import { CardGrid2x2 } from "./components/cardGrids/2x2";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center justify-between bg-white dark:bg-black sm:items-start">
        <div className="w-full inline-flex flex-col justify-center items-center gap-8">
          <HeroImage 
            src="/sunset.png"
            alt="Sunset at Vistvik beach"
            title="Elias Greig-Vistnes"
            subtitle="Subtitle"
          />
          <CardGrid2x2 
            heading="Heading"
            subheading="Subheading"
          />
        </div>
      </main>
    </div>
  );
}