---
title: "Tracking, GDPR and consent: what you really need to know"
date: 2026-06-14
tag: "Data"
author: "Dustin Schneider"
cover: "/img/blog/tracking-gdpr-consent.svg"
summary: "Tracking without proper consent is a risk, switching everything off blindly costs you data. This guide explains what a compliant consent banner needs, what Consent Mode and server-side tracking change, and where the line runs between engineering and legal advice."
description: "Tracking, GDPR and consent explained clearly: what a compliant cookie banner needs, how Consent Mode works, what server-side tracking changes for privacy, and why the legal assessment belongs with your data protection advisor."
related:
  - "server-side-tracking"
  - "consent-mode-v2"
  - "first-party-data-attribution"
---

Tracking has become indispensable for most companies, yet there's a narrow line between "we just
measure everything" and "we switch everything off to be safe." Both are wrong. Measure without a clean
basis and you risk warnings and fines, fail to measure out of fear and you lose the data foundation for
every marketing decision. **Privacy-compliant tracking** isn't a contradiction but a question of the
right technical foundation and the right legal interpretation. This article explains, without legalese,
what matters, and says honestly where our job ends and your data protection advisor's begins.

## Key takeaways

- Tracking that isn't strictly technically necessary generally requires the visitor's active consent.
- A compliant consent banner must offer a real choice: declining as easy as accepting.
- Consent Mode and server-side tracking help you implement privacy deliberately, but they don't replace consent.
- We deliver the clean technical foundation, the legal assessment in each case belongs with your data protection advisor.

## Why consent is mandatory in the first place

As soon as you store or read something on a visitor's device that isn't strictly necessary for the
operation of the site, you generally need their **consent** for it. This covers classic marketing
cookies, but also many analytics and advertising scripts, even when they don't set cookies in the
narrow sense. Two levels matter here: the GDPR as the European data protection regulation, and in
Germany additionally the law governing access to end devices and digital services.

The underlying principle is what counts: consent must be **freely given, informed and unambiguous.** A
pre-ticked checkbox, a "by continuing you agree" notice, or a banner you can only dismiss by agreeing,
none of these meet that bar. This is exactly where many setups fail, not on the technology, but on a
banner that only pretends to offer a choice.

## What a compliant consent banner must do

A banner isn't a decorative pop-up but the legal gateway to your entire tracking. To hold up, it should
meet several requirements:

- **A real choice:** declining must be just as easy and visible as accepting, ideally equal buttons on the first layer.
- **No pre-selection:** optional services are disabled by default, and the visitor actively enables them.
- **Transparency:** clear information about which tools process which data for which purpose.
- **Granularity:** the option to consent to individual purposes separately, rather than only "all or nothing".
- **Withdrawal:** consent once given must be just as easy to revoke later.
- **Documentation:** every consent is logged in a traceable way, so you can prove it if challenged.

Only once the banner sits cleanly may the actual tracking fire at all. This very order is the sticking
point of many flawed implementations.

## Consent Mode: the link between banner and tracking

A common misconception is that the banner alone controls the tracking. In reality you need a technical
bridge that passes the visitor's decision on to your tools. Google's **Consent Mode** is exactly that
bridge. It translates the choice in the banner into signals that Google Analytics and the advertising
tags understand, and thereby controls whether and to what extent data is processed.

If a visitor declines, then depending on the configuration either no data or only heavily reduced,
non-personal signals are transmitted. If they consent, the tracking runs fully. The crucial point:
Consent Mode presupposes a correct banner implementation, it doesn't replace it. More on this in our
article on [Consent Mode v2]({{< relref "/blog/consent-mode-v2" >}}).

## What server-side tracking changes for privacy

Server-side tracking is occasionally misunderstood as a trick to bypass consent. The opposite is true.
Because the data first passes through your own server, you gain control that's simply missing in pure
browser tracking:

- **Data minimisation:** you decide on the server which fields are passed on at all, and you can truncate or anonymise personal data before anything goes to third parties.
- **EU hosting:** processing can take place on servers in Germany, instead of sending data unfiltered to non-European destinations.
- **Traceability:** the data flow is documented and auditable, rather than disappearing invisibly in the browser.

What stays important: with server-side tracking too, consent is required where consent is required. The
architecture doesn't make privacy unnecessary, it makes it achievable.

## Technical foundation and legal assessment: two different things

This is the most important and most honest point of this article. We're software and engineering
specialists, not a legal advisory, and that's how it should stay. Our job is the **clean technical
foundation**: a correctly wired banner, a working Consent Mode, a traceable server-side setup with data
minimisation and EU hosting.

The **legal assessment** in each case, meaning which tools you may actually use on which legal basis,
belongs in the hands of your data protection officer or your law firm. These two levels interlock but
aren't the same thing. The best technology is useless without a clean legal interpretation, and the
best legal advice runs into the void if the technology behind it is implemented poorly. We make sure
your data protection advisor can build on a solid technical foundation.

## Technically necessary or consent-required?

A central distinction in practice is the one between technically necessary and consent-required
services. The overview below classifies typical cases, but doesn't replace an individual review:

| Purpose | Typical classification | Consent needed? |
|---------|------------------------|-----------------|
| Cart, login, security | technically necessary | usually no |
| Pure reach measurement without personal reference | depends on the setup | often contested, review needed |
| Web analytics with profiling | not necessary | usually yes |
| Marketing and retargeting pixels | not necessary | usually yes |
| Embedding external fonts, maps, videos | depends on the provider | frequently yes |

The right column shows tendencies, not binding statements. The concrete classification depends on your
setup and belongs in the final assessment by your data protection advisor.

## Common mistakes we see again and again

In practice, setups rarely fail on exotic edge cases, but on the same recurring patterns:

- **Tracking fires before consent:** the script already loads before the visitor has even clicked. That renders the banner useless.
- **Declining is hidden:** a prominent "Accept" button, with declining only via detours. That undermines the freedom of choice.
- **Banner and tools are disconnected:** the banner looks pretty but technically controls nothing. The visitor's choice fizzles out.
- **No documentation:** anyone who doesn't log consent can prove nothing if challenged.
- **Set up once and forgotten:** new tools get added without wiring up the consent mechanism. The setup ages quietly.

None of these mistakes requires deep specialist knowledge to avoid. It just takes a clean order of
operations and someone who takes measurement seriously as engineering.

## Data minimisation as a guiding principle

The most effective privacy is the kind where certain data never arises or leaves the building in the
first place. This is exactly where **data minimisation** comes in, and it's more than a legal duty, it's
good engineering practice. With every data point, ask: do we really need this information for a
decision? If not, don't collect it.

Server-side tracking makes this principle achievable, because you control centrally which fields are
passed on, truncated or anonymised. So you gain something seemingly paradoxical: less raw data
collected, but cleaner and more reliable analysis. Those who minimise from the start carry less risk
later, less effort, and still have the numbers that count for decisions.

## What you can do concretely in the short term

Even without a big project, a lot can be improved quickly. Three steps with high impact:

- **Check the banner:** is declining as easy as accepting? Are optional services genuinely disabled until consent is given?
- **Test the order:** does any tracking script fire before the visitor has agreed? You can check this in the browser's developer tools.
- **Take inventory:** which tools run on your site at all, and does anyone know the purpose of each one?

These three points cover the most common and most costly mistakes. They don't replace a full review,
but they quickly create clarity about where you stand.

## Frequently asked questions

**Do I need consent for every kind of tracking?**
Not for strictly necessary functions like cart or login. For analytics, marketing and most external
services, however, consent is generally required.

**Is a cookie banner enough to be legally safe?**
No. The banner is necessary but only one building block. What matters is that it's wired correctly,
actually controls the tracking, and that the legal assessment of the tools in use holds up.

**Is server-side tracking automatically GDPR-compliant?**
No. It creates better conditions through data minimisation and EU hosting, but it replaces neither the
consent nor the legal review in each case.

**Do you also do the legal assessment?**
No, and we say so deliberately. We deliver the clean technical foundation. The legal assessment belongs
with your data protection officer or law firm, with whom we're happy to collaborate.

**Do I lose valuable data through privacy compliance?**
You mainly lose data from visitors who didn't consent. With Consent Mode and a clean setup, the
remaining data can be used as well as possible, without undermining the freedom of choice.

**How much effort is a clean implementation?**
It depends on scope. A focused setup of a correct banner, Consent Mode and clean data handling is often
in place within a few weeks, including testing and documentation.

## Conclusion

Privacy and reliable tracking don't exclude each other, they depend on each other. Those who take the
banner seriously, wire up Consent Mode correctly and minimise consistently, measure cleanly **and**
deliberately. We deliver the technology, the legal assessment belongs with your data protection advisor,
and together a foundation emerges that you can rely on.

Learn more on our [Measurement Infrastructure]({{< relref "/services/measurement-infrastructure" >}}) page.
Related: [Server-Side Tracking: the complete guide]({{< relref "/blog/server-side-tracking" >}})
and [Consent Mode v2]({{< relref "/blog/consent-mode-v2" >}}).
