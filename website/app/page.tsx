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
                        subtitle="IT Trainee at Cegal Norway"
                    />
                    <div className="w-full max-w-[1512px] md:px-32">
                        <CardGrid2x2
                            heading="Featured Projects"
                            subheading="A collection of my proudest work"
                            items={projectCards}
                        />
                        <PanelImage
                            image="https://egvsa001.egreig-vistnes.no/egvsacontainer1/egreig-vistnes/images/5F9D901C-3380-487B-9C43-21EE887BFA9A_1_105_c.jpeg"
                            alt="Portrait of Elias Greig-Vistnes"
                            heading="Who is Elias Greig-Vistnes?"
                            subheading="A little bit about me."
                            bodies={["Hi, I'm Elias — an IT Trainee at Cegal, working in IT Operations. At the moment I'm on the dedicated servicedesk for OKEA, and this autumn I'll be moving over to 3. line support, working alongside Cegal's IT engineers. Since starting my apprenticeship I've picked up MS-900, AZ-900, and ITIL 4 Foundation, and I'm currently working towards AZ-104.", "Alongside that, I've been involved with Ehra E-sport, a local e-sports club, since early 2025. I started out as a substitute coach, working the club's stands at events like Sommer i Folkehallene in Sørmarka and Randaberg, before moving into my current role as Gameserver Administrator. I run the club's gameserver through Pterodactyl, which lets the head coaches spin up their own dedicated servers for games like Counter-Strike and Minecraft, and I've secured it with SSO against the club's Microsoft tenant through a Cloudflare Zero Trust tunnel.", "This site is one of my own projects as well, built with Next.js and React. I tend to work things out on my own rather than escalate early — nobody asked for the SSO and Cloudflare setup on the Ehra server, I just saw the gap and built it, and that's fairly typical of how most of what I make ends up happening.", "Outside of work, I play for Better E-sport Reavers in the 3. division of the Norwegian VALORANT Komplettliga."]}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
