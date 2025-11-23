import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import bg1 from '../assets/hero-background1.jpg'
import bg2 from '../assets/hero-background2.jpg'

const slides = [
  {
    id: 0,
    image: bg1,
    title: 'Welcome to Mthunzi Trust',
    subtitle: 'The Umbrella of Hope',
    cta: 'Learn More',
  },
  {
    id: 1,
    image: bg2,
    title: 'Our Mission',
    subtitle:
      'To empower youth and communities through education, entrepreneurship, environmental sustainability, and sexual and reproductive health rights (SRHR), fostering holistic and sustainable development in Malawi.',
    cta: 'Get Involved',
  },
]

const Hero = () => {
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const resumeTimer = useState(null)[0]
  const [isLarge, setIsLarge] = useState(false)

  const prev = () => {
    setIndex((i) => (i - 1 + slides.length) % slides.length)
    pauseTemporarily()
  }
  const next = () => {
    setIndex((i) => (i + 1) % slides.length)
    pauseTemporarily()
  }
  const goTo = (i) => {
    setIndex(i)
    pauseTemporarily()
  }

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Autoplay: advance every 5s unless paused
  useEffect(() => {
    if (isPaused) return
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000)
    return () => clearInterval(id)
  }, [isPaused])

  // Pause when tab is hidden
  useEffect(() => {
    const onVisibility = () => setIsPaused(document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  // Track large screens to refine background behavior
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsLarge(mq.matches)
    update()
    if (mq.addEventListener) mq.addEventListener('change', update)
    else mq.addListener(update)
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', update)
      else mq.removeListener(update)
    }
  }, [])

  function pauseTemporarily(timeout = 8000) {
    setIsPaused(true)
    if (resumeTimer) clearTimeout(resumeTimer)
    const t = setTimeout(() => setIsPaused(false), timeout)
    window.__heroResumeTimer = t
  }

  // clean up any global timer on unmount
  useEffect(() => {
    return () => {
      if (window.__heroResumeTimer) clearTimeout(window.__heroResumeTimer)
    }
  }, [])

  return (
    <section className="relative overflow-hidden">
       <div className="relative bg-cover bg-center bg-no-repeat min-h-[50vh] md:min-h-[60vh] lg:min-h-[80vh]" 
         onMouseEnter={() => setIsPaused(true)} 
         onMouseLeave={() => setIsPaused(false)}>
        {slides.map((slide, i) => {
          const isActive = i === index
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-transform duration-700 ease-out bg-center bg-no-repeat bg-cover sm:bg-contain md:bg-cover`}
              style={{
                backgroundImage: `url(${slide.image})`,
                transform: `translateX(${(i - index) * 100}%)`,
                backgroundPosition: isLarge ? 'center center' : 'center top',
                backgroundAttachment: isLarge ? 'fixed' : 'scroll',
              }}
            >
              <div
                className="absolute inset-0"
                style={{ backgroundColor: isLarge ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.4)' }}
              />

              <div className="container mx-auto text-center relative z-10 py-20 md:py-40 px-4">
                <h3
                  className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 ${isActive ? 'animate-fadeUp' : ''}`}
                  style={isActive ? { animationDelay: '0.12s' } : {}}
                >
                  {slide.title}
                </h3>

                <p
                  className={`text-sm sm:text-lg md:text-xl text-white mb-6 max-w-2xl mx-auto ${isActive ? 'animate-fadeUp' : ''}`}
                  style={isActive ? { animationDelay: '0.28s' } : {}}
                >
                  {slide.subtitle}
                </p>

                {slide.cta === 'Learn More' ? (
                  <Link
                    to="/about"
                    onClick={() => pauseTemporarily()}
                    className={`${isActive ? 'animate-pop' : ''} bg-blue-500 text-white px-4 py-2 md:px-6 md:py-3 rounded text-sm md:text-base inline-block`}
                    style={isActive ? { animationDelay: '0.48s' } : {}}
                  >
                    {slide.cta}
                  </Link>
                ) : (
                  <button
                    onClick={() => pauseTemporarily()}
                    className={`${isActive ? 'animate-pop' : ''} bg-blue-500 text-white px-4 py-2 md:px-6 md:py-3 rounded text-sm md:text-base`}
                    style={isActive ? { animationDelay: '0.48s' } : {}}
                  >
                    {slide.cta}
                  </button>
                )}
              </div>
            </div>
          )
        })}

        {/* Controls */}
        <button
          aria-label="Previous slide"
          onClick={prev}
          className="hidden md:flex items-center justify-center absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white w-10 h-10 rounded-full focus:outline-none"
        >
          ‹
        </button>

        <button
          aria-label="Next slide"
          onClick={next}
          className="hidden md:flex items-center justify-center absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white w-10 h-10 rounded-full focus:outline-none"
        >
          ›
        </button>
      </div>

      {/* Dots */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-6 flex gap-3">
        {slides.map((s, i) => (
          <button
            key={s.id}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`w-3 h-3 rounded-full ${i === index ? 'bg-white' : 'bg-white/40'}`}
          />
        ))}
      </div>
    </section>
  )
}

export default Hero
