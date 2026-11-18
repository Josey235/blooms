import Reveal from '../components/Reveal'
export default function CoupleStory({ w }) {
  return (
    <section id="story" className="relative z-10 mx-auto max-w-4xl px-6 py-24">
      <Reveal className="mb-16 text-center"><p className="script text-5xl md:text-6xl">Our Story</p><p className="eyebrow mt-3">How it began</p></Reveal>
      <div className="relative">
        <div className="absolute left-3 top-0 h-full w-px bg-gradient-to-b from-transparent via-gold to-transparent md:left-1/2"/>
        {w.story.map((e, i) => (
          <Reveal key={e.title} className={`relative mb-14 pl-10 md:w-1/2 md:pl-0 ${i % 2 ? 'md:ml-auto md:pl-12' : 'md:pr-12 md:text-right'}`}>
            <span className={`absolute left-[7px] top-2 h-3 w-3 rounded-full border border-gold bg-ivory ${i % 2 ? 'md:-left-[6px]' : 'md:left-auto md:-right-[6px]'}`}/>
            <p className="eyebrow">{e.date}</p>
            <h3 className="mt-2 font-serif text-3xl">{e.title}</h3>
            <p className="mt-2 leading-relaxed text-mute">{e.text}</p>
            {e.image && <img loading="lazy" src={e.image} alt={e.title} className="mt-4 w-full rounded-2xl border border-gold/30 object-cover"/>}
          </Reveal>
        ))}
      </div>
    </section>
  )
}
