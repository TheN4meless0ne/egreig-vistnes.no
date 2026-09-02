import HeroImage from "./components/heroImage";
import { CardGrid2x2 } from "./components/cards/grid2x2";
import PanelImage from "./components/panelImage";

export default function Home() {
    return (
        <div className="flex items-center justify-center">
            <main className="flex w-full flex-col items-center justify-between sm:items-start">
                <div className="w-full inline-flex flex-col justify-center items-center gap-8">
                    <HeroImage
                        image="/sunset.png"
                        alt="Sunset at Vistvik beach"
                        title="Elias Greig-Vistnes"
                        subtitle="IT Apprentice at Cegal Norway"
                    />
                    <div className="w-full max-w-[1512px] md:px-32">
                        <CardGrid2x2
                            heading="Projects"
                            subheading="Subheading"
                        />
                        <PanelImage
                            image="https://egvsa001.blob.core.windows.net/egvsacontainer1/egreig-vistnes/images/5F9D901C-3380-487B-9C43-21EE887BFA9A_1_105_c.jpeg"
                            alt="Portrait of Elias Greig-Vistnes"
                            heading="Elias Greig-Vistnes"
                            subheading="A little bit about me."
                            body1="Body text for your whole article or post. We'll put in some lorem ipsum to show how a filled-out page might look:"
                            body2="Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite perfect nostrud nisi intricate Content. Qui  international first-class nulla ut. Punctual adipisicing, essential lovely queen tempor eiusmod irure. Exclusive izakaya charming Scandinavian impeccable aute quality of life soft power pariatur Melbourne occaecat discerning. Qui wardrobe aliquip, et Porter destination Toto remarkable officia Helsinki excepteur Basset hound. Zürich sleepy perfect consectetur."
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
