import { useEffect, useState } from 'react'
const calc = (t) => {
  const diff = Math.max(0, t - Date.now()), s = Math.floor(diff / 1000)
  return { d: Math.floor(s / 86400), h: Math.floor(s / 3600) % 24, m: Math.floor(s / 60) % 60, s: s % 60, done: diff === 0 }
}
export default function useCountdown(target) {
  const [v, setV] = useState(() => calc(target))
  useEffect(() => {
    setV(calc(target))
    const id = setInterval(() => { const n = calc(target); setV(n); if (n.done) clearInterval(id) }, 1000)
    return () => clearInterval(id)
  }, [target])
  return v
}
