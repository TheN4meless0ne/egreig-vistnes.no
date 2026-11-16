import Link from '../components/parts/link'
import { CONTACT_EMAIL } from '../lib/config'

export const metadata = {
    title: 'Privacy',
    description: 'How personal data is handled on egreig-vistnes.no.',
}

// Change this whenever the text below changes.
const LAST_UPDATED = '16 November 2026'

const LEGITIMATE_INTEREST = 'GDPR Art. 6(1)(f)'

type Processing = {
    when: string
    data: string
    purpose: string
    basis: string
    kept: string
}

const PROCESSING: Processing[] = [
    {
        when: 'You send the contact form',
        data: 'Name, email address, and the message you write.',
        purpose: 'Reading and answering your message.',
        basis: `Legitimate interest in answering enquiries you choose to send, ${LEGITIMATE_INTEREST}.`,
        kept: 'Up to 12 months after the last message in the conversation, then deleted.',
    },
    {
        when: 'You visit any page',
        data: 'IP address, time, requested URL, browser and device information.',
        purpose: 'Delivering the site, keeping it secure and limiting abuse.',
        basis: `Legitimate interest in running a secure site, ${LEGITIMATE_INTEREST}.`,
        kept: "A short period in the hosting provider's logs.",
    },
    {
        when: 'Visitor statistics',
        data: 'Page URL, referrer, country, region and city derived from the IP address, device type, operating system and browser.',
        purpose: 'Seeing which pages are read and how fast they load.',
        basis: `Legitimate interest in improving the site, ${LEGITIMATE_INTEREST}.`,
        kept: 'Visitors are told apart by a temporary hash discarded after 24 hours. The statistics are kept in aggregated form.',
    },
    {
        when: 'You load images or open a document preview',
        data: 'IP address and browser information reach the storage provider.',
        purpose: 'Showing the content.',
        basis: `Legitimate interest in publishing the content, ${LEGITIMATE_INTEREST}.`,
        kept: "The provider's standard logs.",
    },
]

const linkClass = 'underline hover:no-underline'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold mt-4">{title}</h2>
            {children}
        </section>
    )
}

function ContactLink() {
    return (
        <Link href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
            {CONTACT_EMAIL}
        </Link>
    )
}

function ProcessingCard({ item }: { item: Processing }) {
    const rows = [
        { label: 'Data', value: item.data },
        { label: 'Purpose', value: item.purpose },
        { label: 'Legal basis', value: item.basis },
        { label: 'Kept for', value: item.kept },
    ]

    return (
        <article className="border-b border-neutral-200 pb-4">
            <h3 className="text-lg font-medium mb-2">{item.when}</h3>
            <dl className="grid grid-cols-1 sm:grid-cols-[8rem_1fr] gap-x-4 gap-y-1 text-sm leading-relaxed">
                {rows.map((row) => (
                    <div key={row.label} className="contents">
                        <dt className="text-neutral-500">{row.label}</dt>
                        <dd className="mb-1 sm:mb-0">{row.value}</dd>
                    </div>
                ))}
            </dl>
        </article>
    )
}

export default function PrivacyPage() {
    return (
        <main className="flex flex-col items-center gap-6 w-full px-6 py-6">
            <div className="flex flex-col gap-4 w-full max-w-2xl leading-relaxed">
                <header className="flex flex-col gap-1">
                    <h1 className="text-2xl font-semibold">Privacy policy</h1>
                    <p className="text-sm text-neutral-500">Last updated: {LAST_UPDATED}</p>
                </header>

                <p>
                    This policy explains what personal data is processed when you visit
                    www.egreig-vistnes.no or send a message through the contact form, why, and
                    what rights you have. It follows the Norwegian Personal Data Act
                    (personopplysningsloven) and the EU General Data Protection Regulation (GDPR).
                </p>

                <Section title="Who is responsible">
                    <p>
                        Elias Greig-Vistnes, a private individual in Norway, is the data
                        controller for this website. Questions and requests go to <ContactLink />.
                    </p>
                </Section>

                <Section title="What is processed, and why">
                    <div className="flex flex-col gap-4">
                        {PROCESSING.map((item) => (
                            <ProcessingCard key={item.when} item={item} />
                        ))}
                    </div>
                    <p>
                        The contact form is limited to two submissions per ten minutes per IP
                        address to stop spam. Your message is sent as an email to my mailbox; the
                        website itself keeps no copy. Search terms typed into the site search are
                        used to return results and are not stored.
                    </p>
                    <p>
                        You are not required to provide any information. Without an email address
                        I cannot reply to a contact form message.
                    </p>
                </Section>

                <Section title="Cookies">
                    <p>
                        The site sets no cookies and stores nothing on your device for tracking.
                        The statistics are collected without cookies, and you are not followed
                        across other websites.
                    </p>
                </Section>

                <Section title="Who receives the data">
                    <ul className="list-disc list-outside pl-5 flex flex-col gap-2">
                        <li>
                            <strong>Vercel Inc.</strong> (USA) hosts the site and provides the
                            firewall, Web Analytics and Speed Insights, as a data processor.
                        </li>
                        <li>
                            <strong>Microsoft</strong> provides the mailbox where contact form
                            messages arrive (Exchange Online) and stores the site&apos;s images
                            and documents (Azure Blob Storage, SharePoint and the Office web
                            viewer).
                        </li>
                    </ul>
                    <p>
                        Your data is not sold, not used for advertising, and not shared with
                        anyone else unless the law requires it.
                    </p>
                </Section>

                <Section title="Transfers outside the EEA">
                    <p>
                        Vercel and Microsoft may process data in the United States. Those
                        transfers rely on the EU–US Data Privacy Framework where the provider is
                        certified, and otherwise on the EU Standard Contractual Clauses.
                    </p>
                </Section>

                <Section title="Your rights">
                    <p>
                        You can ask to see the data held about you, have it corrected or deleted,
                        have its use restricted, or object to the processing. Send the request
                        to <ContactLink />. You will get an answer within one month, free of
                        charge.
                    </p>
                    <p>There is no automated decision-making or profiling.</p>
                </Section>

                <Section title="Complaints">
                    <p>
                        If you think your data has been handled in breach of the rules, you can
                        complain to the Norwegian Data Protection Authority, Datatilsynet,
                        at{' '}
                        <Link href="https://www.datatilsynet.no" className={linkClass}>
                            datatilsynet.no
                        </Link>
                        . I would appreciate the chance to sort it out first.
                    </p>
                </Section>

                <Section title="Changes">
                    <p>Changes to this policy are published on this page with a new date.</p>
                </Section>
            </div>
        </main>
    )
}