export interface EmailTemplate {
  id: string;
  sendDelay: string;
  subject: string;
  previewText: string;
  body: string;
  ctaLabel?: string;
  ctaUrl?: string;
  purpose: string;
}

export const obituaryWelcomeSequence: EmailTemplate[] = [
  {
    id: "obituary-welcome-1",
    sendDelay: "immediate",
    subject: "Your copy of The Obituary is here.",
    previewText: "Something to read tonight, when it's quiet.",
    purpose: "Deliver lead magnet + set tone",
    ctaLabel: "Download The Obituary",
    ctaUrl: "{{obituary_download_url}}",
    body: `{{first_name}},

Here it is — [Download The Obituary →]({{obituary_download_url}})

No introduction needed. The story will do that.

Read it when you have a little space. It's not long, but it stays with you.

When you're done, I'd love to know what hit hardest.

— Keke

P.S. Over the next couple of weeks I'll send you a few things: why I wrote this, what readers have said, and what I'm working on next. Nothing loud. Just the conversation I wish more authors were having.`,
  },
  {
    id: "obituary-welcome-2",
    sendDelay: "3 days after Email 1",
    subject: "Why I wrote a woman who won't be saved.",
    previewText: "This is the part most authors skip.",
    purpose: "Author vulnerability — pure relationship building, no CTA",
    body: `{{first_name}},

Most thriller authors will tell you their book is about a mystery, a crime, a twist.

I'm going to tell you something different.

*The Obituary* is about a woman who is finally honest with herself — and how terrifying that is. Not because of what's outside her. Because of what she finds inside.

I wrote her when I was exhausted of women in fiction who exist to be rescued. Who react instead of act. Who get described as "complex" by everyone around them but never actually get to *be* complex on the page.

I've been that reader. Picking up thrillers that promised depth and delivering shock. Closing a book and feeling — cheated. Like I'd been given the wrapper but not the thing.

*The Obituary* was my refusal to do that.

If it hit something in you — I want you to know that was on purpose.

— Keke`,
  },
  {
    id: "obituary-welcome-3",
    sendDelay: "6 days after Email 1",
    subject: "You already know what this book feels like.",
    previewText: "You've lived parts of it.",
    purpose: "Mirror her inner world — CTA to blog (low commitment)",
    ctaLabel: "Read the blog",
    ctaUrl: "/blog",
    body: `{{first_name}},

Here's the thing about readers like you — and I don't mean that as a compliment wrapped in a sell. I mean it as recognition.

You've read books that should have wrecked you and didn't.

You've recommended a thriller to someone and watched their face when they told you the twist was the best part. And you thought: *no, the twist was the least interesting thing about it.*

You're not looking for plot. You're looking for permission — to sit with something dark, something complicated, something that mirrors the parts of you that are hard to explain to people who don't read.

That's what I write toward.

Not the question of who did it. The question of why they became someone who could.

If you want to see where that thinking lives beyond *The Obituary* — I write about it on the blog. Particularly [*Why Thrillers Keep Failing Women*](/blog/why-thrillers-keep-failing-women) and [*The Psychology of the Unreliable Narrator*](/blog/psychology-of-the-unreliable-narrator).

No pressure. Just more of the conversation, if you want it.

— Keke`,
  },
  {
    id: "obituary-welcome-4",
    sendDelay: "9 days after Email 1",
    subject: '"I read it twice in one week."',
    previewText: "Here's what readers are saying — in their own words.",
    purpose: "Social proof in reader voice — soft CTA to book",
    ctaLabel: "Read the first chapter free",
    ctaUrl: "/books/the-silent-hour",
    body: `{{first_name}},

I don't do this often, but I want to share some of what's been coming into my inbox since *The Silent Hour* came out.

Because sometimes the best way I can describe a book is to get out of the way and let readers do it.

---

*"I need a book that wrecks me in a good way — this was it. I didn't expect to ugly-cry over a thriller."*
— Maya R., book club organizer

*"Finally a female protagonist who isn't just described as complicated. She actually IS. I thought about her for a week."*
— Destinee T., teacher

*"I brought this to my book club. We talked for four hours. Someone cried. We're reading it again next quarter."*
— Janelle W., reader

---

These aren't the readers I expected. They're the readers I wrote for.

If you're curious what they were responding to — [*The Silent Hour* is here](/books/the-silent-hour). The first chapter is free if you want to test the water first.

— Keke`,
  },
  {
    id: "obituary-welcome-5",
    sendDelay: "13 days after Email 1",
    subject: "I think you're ready for this.",
    previewText: "No pressure. Just an open door.",
    purpose: "Soft conversion — three entry points at different commitment levels",
    ctaLabel: "Get The Silent Hour",
    ctaUrl: "/books/the-silent-hour",
    body: `{{first_name}},

If *The Obituary* did what I hoped — if it left something with you — then I want to tell you where else that lives.

*The Silent Hour* is the novel I wrote after years of reading thrillers and thinking: *someone needs to go further.*

A woman alone in a house that is both her shelter and her suspicion. A marriage that looks normal from the outside. A protagonist who isn't waiting to be saved — who isn't even sure she wants to be.

It will wreck you. On purpose. In the best way.

---

If you want to go deeper, there are a few ways in:

- **[The Silent Hour](/books/the-silent-hour)** — the novel
- **[Book Club Companion Kit](/shop)** — discussion guide, theme breakdown, character deep-dives (if you bring books to your group, this is the one to bring)
- **[The Inner Circle Newsletter](/newsletter)** — early access, exclusive short fiction, the things I don't post publicly

Take the one that fits where you are.

And if none of them feel right yet — that's okay too. You already found me. That's enough for now.

— Keke`,
  },
];

export function getSequenceEmail(id: string): EmailTemplate | undefined {
  return obituaryWelcomeSequence.find((e) => e.id === id);
}
