import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import wedding from './data/weddingData'
import FlowerLoader from './components/FlowerLoader'
import PetalAnimation from './components/PetalAnimation'
import MusicPlayer from './components/MusicPlayer'
import Hero from './sections/Hero'
import CoupleStory from './sections/CoupleStory'
import Invitation from './sections/Invitation'
import WeddingDetails from './sections/WeddingDetails'
import Gallery from './sections/Gallery'
import Location from './sections/Location'
import ClosingSection from './sections/ClosingSection'

export default function App() {
  const [stage, setStage] = useState('loading') // loading -> enter -> site
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  useEffect(() => { Object.entries(wedding.theme).forEach(([k, v]) => document.documentElement.style.setProperty(`--color-${k}`, v)) }, [])
  const loaded = useCallback(() => setStage(s => (s === 'loading' ? 'enter' : s)), [])
  const enter = (music) => { setPlaying(music); try { sessionStorage.setItem('bloom-music', music ? '1' : '0') } catch {} setStage('site') }
  useEffect(() => { try { if (stage === 'enter' && sessionStorage.getItem('bloom-music') === '0') setStage('site') } catch {} }, [stage])
  const locked = stage !== 'site'
  useEffect(() => { document.body.style.overflow = locked ? 'hidden' : '' }, [locked])

  return (
    <>
      <PetalAnimation color={wedding.petalColor}/>
      <AnimatePresence>{stage === 'loading' && <FlowerLoader key="l" settings={wedding.loader} onDone={loaded}/>}</AnimatePresence>
      <AnimatePresence>
        {stage === 'enter' && (
          <motion.div key="e" className="fixed inset-0 z-[95] flex flex-col items-center justify-center gap-6 bg-ivory px-6 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
            <p className="script text-6xl">{wedding.initials}</p>
            <p className="eyebrow">You are invited</p>
            <button className="btn" onClick={() => enter(true)}>Enter with music</button>
            <button className="eyebrow !text-mute" onClick={() => enter(false)}>Enter silently</button>
          </motion.div>
        )}
      </AnimatePresence>
      {stage === 'site' && (
        <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4 }}>
          <Hero w={wedding}/><CoupleStory w={wedding}/><Invitation w={wedding}/><WeddingDetails w={wedding}/><Gallery w={wedding}/><Location w={wedding}/><ClosingSection w={wedding}/>
        </motion.main>
      )}
      <MusicPlayer src={wedding.music} playing={playing} muted={muted} setPlaying={setPlaying} setMuted={setMuted}/>
    </>
  )
}
