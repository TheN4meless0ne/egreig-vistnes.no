# Personal Website
My personal website, [egreig-vistnes.no](https://www.egreig-vistnes.no), is where I share projects and documents I think are worth showing. I built it myself and run it end to end, from the code to the hosting and the Microsoft 365 pieces behind it.

## How it's built
The frontend is written in Next.js with Tailwind CSS, managed with pnpm and hosted on Vercel. A small Flask (Python) backend handles the features that need to talk to other services. Images are kept out of the Git repository and served from Azure Blob Storage instead, which keeps the repo lean.

## Features
**Documents from SharePoint.** The documents on the site, including the one you're reading now, live in one of my SharePoint sites. The backend fetches each file along with its details (name, size and when it was last changed), so the site always shows the latest version without me having to redeploy.

**Contact form.** Messages sent from the contact page go out through Microsoft Graph from a dedicated no-reply mailbox in my own Microsoft 365 tenant. The app registration behind it is restricted with Exchange RBAC for Applications, so it can only send as that one mailbox and nothing else.

**Privacy.** Because the contact form collects a name and an email address, the site has a privacy policy written with Norwegian GDPR rules in mind.
