// Demo wedding content. Replace these sample names, dates, venue details and images for each real couple.
const ph = (w, h, t, a = '#F3EEE5', b = '#D8C69A') =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/><text x="50%" y="50%" fill="#88847D" font-family="serif" font-size="${Math.round(w / 12)}" text-anchor="middle">${t}</text></svg>`)}`

const wedding = {
  groom: 'Daniel',
  bride: 'Anna',
  initials: 'D & A',
  date: '2027-05-09',
  time: '11:30',
  displayTime: '11:30 AM',
  timezone: '+05:30',
  venue: {
    name: 'St. Mary’s Church',
    address: 'Main Road, Kottayam, Kerala, India',
    mapsUrl: '',
    photo: ph(1000, 700, 'Venue photo'),
  },
  heroImage: '/images/hero.jpg',
  music: '',
  heroSubtitle: 'Together with their families, we invite you to celebrate our beginning.',
  invitation: {
    lead: 'Together with their families',
    body: 'Request the honor of your presence at their wedding celebration.',
    verse: '“Love is patient, love is kind… and now these three remain: faith, hope and love.”',
    verseRef: '1 Corinthians 13',
  },
  story: [
    {
      date: 'June 2019',
      title: 'First Meeting',
      text: 'A chance hello at a friend’s gathering turned into hours of conversation.',
      image: '/images/gallery-01.jpg',
    },
    {
      date: 'March 2020',
      title: 'Our Beginning',
      text: 'Coffee dates became long walks, and long walks became a promise.',
    },
    {
      date: '2021–2025',
      title: 'Special Memories',
      text: 'Journeys, festivals, quiet evenings — every moment became a favourite.',
      image: '/images/gallery-03.jpg',
    },
    {
      date: 'December 2026',
      title: 'The Engagement',
      text: 'One question, one answer, and a lifetime of yeses.',
    },
    {
      date: 'May 2027',
      title: 'The Wedding Day',
      text: 'We begin forever — and we want you with us.',
    },
  ],
  gallery: [
    { src: '/images/gallery-01.jpg', alt: 'The couple sharing a close moment', w: 508, h: 765 },
    { src: '/images/hero.jpg', alt: 'The couple standing together in the garden', w: 508, h: 765 },
    { src: '/images/gallery-02.jpg', alt: 'The couple walking together outdoors', w: 508, h: 765 },
    { src: '/images/gallery-03.jpg', alt: 'The couple seated together with flowers', w: 508, h: 765 },
  ],
  theme: {
    ivory: '#F9F6F0',
    cream: '#F3EEE5',
    gold: '#C5A66A',
    softgold: '#D8C69A',
    ink: '#292722',
    mute: '#88847D',
    petal: '#F5B7C9',
  },
  petalColor: '#F5B7C9',
  loader: { duration: 6000, maxWait: 9000, message: 'A beautiful story is about to unfold…' },
  closing: { line: 'We can’t wait to celebrate with you.' },
}

export const getMapsUrl = (w = wedding) =>
  w.venue.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${w.venue.name} ${w.venue.address}`)}`

export const getWeddingMoment = (w = wedding) => new Date(`${w.date}T${w.time}:00${w.timezone}`)

export const getDateParts = (w = wedding) => {
  const [y, m, d] = w.date.split('-').map(Number)
  const dt = new Date(Date.UTC(y, m - 1, d))
  return {
    year: y,
    day: d,
    month: dt.toLocaleString('en', { month: 'long', timeZone: 'UTC' }),
    weekday: dt.toLocaleString('en', { weekday: 'long', timeZone: 'UTC' }),
  }
}

export default wedding
