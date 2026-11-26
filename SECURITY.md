# Security Policy

## Project status

This is the source of the AgentCenter marketing site and blog. The hosted AgentCenter app service
has been shut down; the code here is published under the [MIT License](LICENSE) and provided as-is.

## Supported versions

Security fixes are made on the default branch (`main`), which is what the live site is built from.
Please reproduce against the latest `main` before reporting.

| Version         | Supported |
| --------------- | --------- |
| `main` (latest) | Yes       |
| Anything older  | No        |

## Reporting a vulnerability

**Do not open a public issue, discussion or pull request for a security problem.**

Report it privately through GitHub's private vulnerability reporting:

1. Go to **[Security → Report a vulnerability](https://github.com/MissionControlSquad/website/security/advisories/new)**.
2. Describe the issue, the affected file(s) or component, and the impact you can demonstrate.
3. Include clear reproduction steps or a minimal proof of concept, and the commit you tested.

Only the reporter and the repository maintainers can see the report.

## What to expect

This project is maintained on a best-effort basis by volunteers. We aim to:

- acknowledge a report within **7 days**,
- share an initial assessment within **14 days**, and
- agree a disclosure date with you once a fix or mitigation is ready (by default, no later than
  **90 days** after the report).

Fixes are published as a [GitHub Security Advisory](https://github.com/MissionControlSquad/website/security/advisories), with a CVE
requested through GitHub where appropriate, and reporters are credited unless they prefer not to be.

## Scope

In scope: code and configuration in this repository, including the API routes under `app/api/`,
`proxy.ts` and the workflows under `.github/`.

Out of scope:

- the decommissioned hosted app service (`*.app.agentcenter.cloud`, `admin.agentcenter.cloud`);
- the third-party services the site uses (BuildBase, Vercel); report those to their owners;
- findings in third-party dependencies that are already publicly known (Dependabot tracks these);
- reports that need a compromised host, physical access, or social engineering of maintainers;
- missing hardening headers or best-practice notes with no demonstrated impact.

## Safe harbor

We will not pursue or support legal action against anyone who researches and reports in good
faith under this policy: avoid privacy violations and data destruction, do not degrade other
people's systems, and give us reasonable time to respond before any disclosure.
