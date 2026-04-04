import HeroImage from "./components/heroImage";
import { CardGrid2x2 } from "./components/cards/grid2x2";
import PanelImage from "./components/panelImage";

export default function Home() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <main className="flex min-h-screen w-full flex-col items-center justify-between sm:items-start">
                <div className="w-full inline-flex flex-col justify-center items-center gap-8">
                    <HeroImage
                        image="/sunset.png"
                        alt="Sunset at Vistvik beach"
                        title="Elias Greig-Vistnes"
                        subtitle="IT Apprentice at Cegal Norway"
                    />
                    <div className="md:px-32">
                        <CardGrid2x2
                            heading="Projects"
                            subheading="Subheading"
                        />
                        <PanelImage
                            image="https://placehold.co/520x335"
                            alt="Placeholder Image"
                            heading="Heading"
                            subheading="Subheading"
                            body1="Body text for your whole article or post. We'll put in some lorem ipsum to show how a filled-out page might look:"
                            body2="Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite perfect nostrud nisi intricate Content. Qui  international first-class nulla ut. Punctual adipisicing, essential lovely queen tempor eiusmod irure. Exclusive izakaya charming Scandinavian impeccable aute quality of life soft power pariatur Melbourne occaecat discerning. Qui wardrobe aliquip, et Porter destination Toto remarkable officia Helsinki excepteur Basset hound. Zürich sleepy perfect consectetur."
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
