const milestones = [
  {
    year: "2019",
    title: "First Short Story Published",
    description: "A 3,000-word psychological thriller appeared in a dark fiction anthology. It took seven months to write and fourteen rejections to place.",
  },
  {
    year: "2021",
    title: "The Escapist Begins",
    description: "Launched this brand and newsletter to share stories, craft advice, and dark fiction recommendations with readers who get it.",
  },
  {
    year: "2022",
    title: "10,000 Subscribers",
    description: "The community grew quietly and honestly — no ads, no gimmicks, just stories worth reading and tools worth having.",
  },
  {
    year: "2024",
    title: "Debut Novel: The Silent Hour",
    description: "The book that nearly broke me and finally made me. My debut psychological thriller is out in the world now, and it's the most honest thing I've ever written.",
  },
]

export function AuthorTimeline() {
  return (
    <div className="relative pl-8">
      {/* Vertical line */}
      <div className="absolute left-3 top-2 bottom-2 w-px bg-brand-gold/30" aria-hidden />

      <div className="space-y-12">
        {milestones.map((milestone, i) => (
          <div key={i} className="relative">
            {/* Dot */}
            <div className="absolute -left-5 top-1 w-4 h-4 rounded-full bg-brand-gold/20 border-2 border-brand-gold/60 flex items-center justify-center" aria-hidden>
              <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
            </div>

            <div>
              <span className="font-serif text-2xl font-bold text-brand-gold/70">
                {milestone.year}
              </span>
              <h3 className="font-serif text-xl font-semibold text-brand-cream mt-1 mb-2">
                {milestone.title}
              </h3>
              <p className="text-brand-stone text-sm leading-relaxed max-w-lg">
                {milestone.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
