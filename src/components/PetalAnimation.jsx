import { useEffect, useRef } from 'react'
export default function PetalAnimation({ color = '#F5B7C9', density = 1 }) {
  const ref = useRef(null)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const c = ref.current, x = c.getContext('2d'), dpr = Math.min(window.devicePixelRatio || 1, 2)
    let W, H, raf, last = performance.now(), run = true
    const size = () => { W = innerWidth; H = innerHeight; c.width = W * dpr; c.height = H * dpr; x.setTransform(dpr, 0, 0, dpr, 0, 0) }
    size()
    const mk = (init) => { const z = Math.random(); return { x: Math.random() * W, y: init ? Math.random() * H : -30, z, s: 5 + z * 11, vy: 25 + z * 45, ph: Math.random() * 6.28, r: Math.random() * 6.28, vr: (Math.random() - .5) * 2, o: .3 + z * .45, f: Math.random() * 6.28 } }
    const ps = Array.from({ length: Math.round((W < 640 ? 12 : 26) * density) }, () => mk(true))
    const frame = (t) => {
      if (!run) return
      const dt = Math.min((t - last) / 1000, .05); last = t
      x.clearRect(0, 0, W, H)
      for (const p of ps) {
        p.y += p.vy * dt; p.ph += dt * (.5 + p.z); p.x += (Math.sin(p.ph) * 30 + 12) * dt * (.5 + p.z); p.r += p.vr * dt; p.f += dt * 2
        if (p.y > H + 30 || p.x > W + 40) { Object.assign(p, mk(false)); p.x = Math.random() * W - 40 }
        x.save(); x.translate(p.x, p.y); x.rotate(p.r); x.scale(1, Math.abs(Math.cos(p.f)) * .6 + .4); x.globalAlpha = p.o; x.fillStyle = color
        const s = p.s; x.beginPath(); x.moveTo(0, -s); x.bezierCurveTo(s * .9, -s * .6, s * .7, s * .7, 0, s); x.bezierCurveTo(-s * .7, s * .7, -s * .9, -s * .6, 0, -s); x.fill(); x.restore()
      }
      raf = requestAnimationFrame(frame)
    }
    const vis = () => { if (document.hidden) { run = false; cancelAnimationFrame(raf) } else if (!run) { run = true; last = performance.now(); raf = requestAnimationFrame(frame) } }
    raf = requestAnimationFrame(frame)
    addEventListener('resize', size); document.addEventListener('visibilitychange', vis)
    return () => { run = false; cancelAnimationFrame(raf); removeEventListener('resize', size); document.removeEventListener('visibilitychange', vis) }
  }, [color, density])
  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0 h-full w-full"/>
}
