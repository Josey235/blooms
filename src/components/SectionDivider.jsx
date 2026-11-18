export default function SectionDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-2" aria-hidden>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold"/>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C5A66A" strokeWidth="1"><circle cx="12" cy="12" r="2"/>{[0, 72, 144, 216, 288].map(a => <path key={a} transform={`rotate(${a} 12 12)`} d="M12 10C9 6 10 3 12 2c2 1 3 4 0 8z"/>)}</svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold"/>
    </div>
  )
}
