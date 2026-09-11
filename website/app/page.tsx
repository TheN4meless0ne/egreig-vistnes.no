import HeroImage from "./components/heroImage";
import { CardGrid2x2 } from "./components/cards/grid2x2";
import PanelImage from "./components/panelImage";
import { getFeaturedProjectsContent } from "./lib/content";
import { formatDate } from "./lib/content/format";

// Featured projects come from SharePoint via the backend; same reasoning as
// docs/page.tsx — don't bake a stale listing into a static build.
export const dynamic = "force-dynamic";

export default async function Home() {
    const featuredProjects = await getFeaturedProjectsContent();
    const projectCards = featuredProjects.map((project) => ({
        title: project.title,
        // Falls back to the last-modified date for projects without a
        // Description column value set yet, rather than showing nothing.
        body: project.summary || formatDate(project.date, true),
        href: `/docs/${project.slug}`,
    }));

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
                            items={projectCards}
                        />
                        <PanelImage
                            image="https://egvsa001.egreig-vistnes.no/egvsacontainer1/egreig-vistnes/images/5F9D901C-3380-487B-9C43-21EE887BFA9A_1_105_c.jpeg"
                            alt="Portrait of Elias Greig-Vistnes"
                            heading="Who is Elias Greig-Vistnes?"
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
