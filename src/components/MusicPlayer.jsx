import { useEffect, useRef } from 'react'
import { Volume2, VolumeX, Play, Pause } from 'lucide-react'

// Built-in soft generated melody (original, royalty-free). Used when no music file is configured.
const NOTES = [392, 494, 587, 523, 440, 523, 659, 587, 392, 494, 587, 784, 659, 587, 523, 494]
function makeSynth() {
  let ctx, master, timer, i = 0
  const init = () => { if (ctx) return; ctx = new (window.AudioContext || window.webkitAudioContext)(); master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination) }
  const note = () => {
    const o = ctx.createOscillator(), g = ctx.createGain(), t = ctx.currentTime
    o.type = 'sine'; o.frequency.value = NOTES[i++ % NOTES.length]
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.5, t + .15); g.gain.exponentialRampToValueAtTime(.001, t + 2.2)
    o.connect(g); g.connect(master); o.start(t); o.stop(t + 2.3)
  }
  return {
    play(muted) { init(); ctx.resume(); master.gain.setTargetAtTime(muted ? 0 : .08, ctx.currentTime, .5); if (!timer) { note(); timer = setInterval(note, 900) } },
    pause() { if (!ctx) return; master.gain.setTargetAtTime(0, ctx.currentTime, .3); clearInterval(timer); timer = null },
    mute(m) { if (ctx) master.gain.setTargetAtTime(m ? 0 : .08, ctx.currentTime, .1) },
    destroy() { clearInterval(timer); ctx && ctx.close() },
  }
}

export default function MusicPlayer({ src, playing, muted, setPlaying, setMuted }) {
  const eng = useRef(null)
  useEffect(() => {
    if (src) { const a = new Audio(src); a.loop = true; a.volume = .35; eng.current = { play: (m) => { a.muted = m; a.play().catch(() => setPlaying(false)) }, pause: () => a.pause(), mute: (m) => { a.muted = m }, destroy: () => { a.pause(); a.src = '' } } }
    else eng.current = makeSynth()
    return () => eng.current && eng.current.destroy()
  }, [src, setPlaying])
  useEffect(() => { if (!eng.current) return; playing ? eng.current.play(muted) : eng.current.pause() }, [playing]) // eslint-disable-line
  useEffect(() => { eng.current && eng.current.mute(muted) }, [muted])
  const eq = playing && !muted
  return (
    <div className="fixed bottom-5 right-5 z-[96] flex items-center gap-1 rounded-full border border-gold/50 bg-ivory/90 p-1.5 shadow-lg" role="group" aria-label="Music controls">
      <button onClick={() => setPlaying(!playing)} aria-label={playing ? 'Pause music' : 'Play music'} className="grid h-10 w-10 place-items-center rounded-full text-gold hover:bg-cream">
        {playing ? <Pause size={16}/> : <Play size={16}/>}
      </button>
      <div className="flex h-4 w-6 items-end gap-[3px]" aria-hidden>
        {[0, 1, 2].map(i => <span key={i} className="w-[3px] rounded bg-gold" style={{ height: 4, animation: eq ? `eq ${0.7 + i * .2}s ease-in-out ${i * .1}s infinite alternate` : 'none' }}/>)}
      </div>
      <button onClick={() => setMuted(!muted)} aria-label={muted ? 'Unmute' : 'Mute'} className="grid h-10 w-10 place-items-center rounded-full text-gold hover:bg-cream">
        {muted ? <VolumeX size={16}/> : <Volume2 size={16}/>}
      </button>
      <style>{'@keyframes eq{from{height:4px}to{height:16px}}'}</style>
    </div>
  )
}
