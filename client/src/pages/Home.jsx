import React, { useEffect, useState } from 'react'
import Hero from "../components/Hero"
import { Link } from "react-router-dom"
import { apiFetchJson, normalizeImageUrl } from '../utils/api.js'
import aboutImg from '../assets/about.jpg'
import { FaMapMarkedAlt, FaUsers, FaSchool, FaSeedling, FaBriefcase, FaLeaf, FaChalkboardTeacher, FaHeartbeat, FaGlobeAfrica, FaTractor, FaHandsHelping, FaHandHoldingHeart, FaHandshake, FaEnvelope } from 'react-icons/fa'
import srhrImg from '../assets/health-srhr.jpg'
import eduImg from '../assets/education.jpg'
import envImg from '../assets/environmental-conservation.jpg'
import adaptionImg from '../assets/climate-adaptation.jpg'
import agriImg from '../assets/agriculture.jpg'
import entreImg from '../assets/entre.jpg'

const partners = [
  { icon: FaMapMarkedAlt, text: 'Rural and peri-urban communities in Malawi' },
  { icon: FaUsers, text: 'Youth and women groups' },
  { icon: FaSchool, text: 'Schools and faith-based institutions' },
]

const Home = () => {
  // Posts loaded from backend for home preview (latest 6)
  const [posts, setPosts] = useState([])
  const [loadingPosts, setLoadingPosts] = useState(true)
  const [postsError, setPostsError] = useState(null)
  // Partners loaded from backend (logos uploaded via admin)
  const [partnersRemote, setPartnersRemote] = useState([])
  const [loadingPartners, setLoadingPartners] = useState(true)
  const [partnersError, setPartnersError] = useState(null)

  useEffect(() => {
    let cancelled = false
    const ac = new AbortController()
    const ac2 = new AbortController()
    setLoadingPosts(true)
    setPostsError(null)

    ;(async () => {
      try {
        const data = await apiFetchJson('/api/blogs?limit=3', { signal: ac.signal })
        if (cancelled) return
        const list = Array.isArray(data) ? data : (data && data.posts) || []
        setPosts(list)
      } catch (err) {
        if (cancelled) return
        setPostsError(err && err.message ? err.message : 'Failed to load posts')
      } finally {
        if (!cancelled) setLoadingPosts(false)
      }
    })()

    // fetch partners (logos) for marquee
    ;(async () => {
      setLoadingPartners(true)
      setPartnersError(null)
      try {
        const data = await apiFetchJson('/api/partners', { signal: ac2.signal })
        if (cancelled) return
        const list = Array.isArray(data) ? data : data.partners || []
        setPartnersRemote(list)
      } catch (err) {
        if (cancelled) return
        setPartnersError(err && err.message ? err.message : 'Failed to load partners')
      } finally {
        if (!cancelled) setLoadingPartners(false)
      }
    })()

    return () => { cancelled = true; ac.abort(); try { ac2.abort() } catch (e) {} }
  }, [])

  return (
    <main>
      <Hero />

      <section className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row items-stretch">
            {/* Text column */}
            <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 animate-fadeUp" style={{ animationDelay: '0.05s' }}>
                About Mthunzi Trust
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 leading-relaxed animate-fadeUp" style={{ animationDelay: '0.18s' }}>
                Mthunzi Trust is a youth-led non-profit organization registered with the Malawi Government under the Trustees Act.
                We use advocacy, capacity building, research and community development to empower young people and vulnerable groups
                to participate in Malawi's socio-economic development. Our work aligns with the Sustainable Development Goals,
                Malawi Agenda 2030 and Malawi Vision 2063.
              </p>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 animate-fadeUp" style={{ animationDelay: '0.28s' }}>
                  We work with
                </h3>

                <ul className="space-y-3">
                  {partners.map((p, idx) => {
                    const Icon = p.icon
                    return (
                      <li key={p.text} className="flex items-start gap-3 animate-fadeUp" style={{ animationDelay: `${0.34 + idx * 0.06}s` }}>
                          <div className="shrink-0 w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-sm">
                            <Icon />
                          </div>
                          <p className="text-sm sm:text-base text-gray-700">{p.text}</p>
                      </li>
                    )
                  })}
                </ul>
              </div>

              <div className="flex items-center gap-4">
                <Link to="/about" className="inline-block bg-green-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded hover:bg-green-600 transition animate-pop text-sm sm:text-base" style={{ animationDelay: '0.6s' }}>
                  Learn More
                </Link>
                <Link to="/programs" className="inline-flex items-center text-green-600 hover:underline">
                  Our Programs →
                </Link>
              </div>
            </div>

            {/* Image column */}
            <div className="lg:w-1/2 relative">
              <img
                src={aboutImg}
                alt="About Mthunzi Trust"
                className="w-full h-64 sm:h-80 md:h-96 lg:h-full object-cover transform transition-transform duration-500 hover:scale-105"
              />
              {/* subtle overlay text for large screens */}
              <div className="hidden lg:block absolute top-6 left-6 bg-white/80 backdrop-blur-sm rounded-md px-4 py-2 shadow-md">
                <p className="text-sm text-gray-800 font-medium">Community led • Youth focused • Sustainable</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Thematic Areas */}
      <section className="bg-green-200 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-6 animate-fadeUp" style={{ animationDelay: '0.05s' }}>
            Our Thematic Areas
          </h2>
          <p className="text-center text-gray-700 mb-8 max-w-3xl mx-auto animate-fadeUp" style={{ animationDelay: '0.12s' }}>
            We focus our work across several thematic areas to create sustainable, community-led impact.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Environmental Conservation', image: envImg, alt: 'Tree planting and restoration' },
              { title: 'Climate Justice Advocacy', image: adaptionImg, alt: 'Community climate action' },
              { title: 'Education', image: eduImg, alt: 'Children learning at school' },
              { title: 'Health & SRHR', image: srhrImg, alt: 'Health services' },
              { title: 'Agriculture', image: agriImg, alt: 'Farming activities' },
              { title: 'Entrepreneurship & Livelihoods', image: entreImg, alt: 'Small business and trade' },
            ].map((area, idx) => (
              <figure
                key={area.title}
                className="relative overflow-hidden rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105 hover:-translate-y-1 will-change-transform animate-fadeUp"
                style={{ animationDelay: `${0.18 + idx * 0.06}s` }}
              >
                <img src={area.image} alt={area.alt} className="w-full h-56 sm:h-64 md:h-72 object-cover" />

                {/* dark overlay + title */}
                <figcaption className="absolute inset-0 flex items-end">
                  <div className="w-full bg-linear-to-t from-black/60 via-black/30 to-transparent p-4">
                    <h3 className="text-lg sm:text-xl font-semibold text-white">{area.title}</h3>
                  </div>
                </figcaption>

                <style>{"@keyframes float { 0% { transform: translateY(0); } 50% { transform: translateY(-4px); } 100% { transform: translateY(0); } }"}</style>
                <div className="pointer-events-none" style={{ animation: `float 6s ease-in-out ${idx % 2 === 0 ? '0s' : '1s'} infinite` }} />
              </figure>
            ))}
          </div>
        </div>
      </section>
      
      {/* Blog */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-4">From Blog</h2>
          <p className="text-center text-gray-700 mb-8 max-w-3xl mx-auto">Discover the latest stories and updates from our work. Feel inspired, stay engaged and keep informed about the change happening in our communities.</p>

          {loadingPosts ? (
            <p className="text-center text-gray-600">Loading latest blogs…</p>
          ) : postsError ? (
            <p className="text-center text-red-500">Failed to load blogs.</p>
          ) : posts.length === 0 ? (
            <p className="text-center text-gray-600 italic">coming soon.....check this out.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {posts.slice(0, 3).map((post) => {
                const id = post.id || post._id
                return (
                <article key={id} className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm">
                  {post.image && (
                    <img src={normalizeImageUrl(post.image)} alt={post.title} className="w-full h-40 object-cover rounded-md mb-3" />
                  )}
                  <h3 className="font-semibold text-gray-900 mb-2">{post.title}</h3>
                  <p className="text-sm text-gray-600">{post.shortDescription || (post.fullStory && post.fullStory.slice(0, 200))}</p>
                    <div className="mt-3">
                    <Link to={`/blog/${id}`} className="text-green-600 hover:underline font-medium">Learn more →</Link>
                  </div>
                </article>
              )})}
            </div>
          )}

          <div className="mt-6 text-center">
            <Link to="/blog" className="inline-block text-green-600 hover:underline font-medium">See all blogs</Link>
          </div>
        </div>
      </section>

            {/* Our Partners / Donors */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-2">Our Partners/Donors</h2>
          <p className="text-center text-gray-700 mb-6 max-w-3xl mx-auto">
            We are immensely grateful for the trust and collaboration of our partners. Their contributions not only enhance our programs but also inspire us to continue serving our communities.
          </p>

          {/* Marquee of partner icons (only icons visible; admin will provide name/photo in CMS) */}
          <div className="overflow-hidden">
            <div className="flex items-center gap-8 will-change-transform" style={{ whiteSpace: 'nowrap' }}>
              <div className="flex animate-marquee" style={{ gap: '3rem' }}>
                {loadingPartners ? (
                  <div className="w-full text-center text-gray-600">Loading partners…</div>
                ) : partnersError ? (
                  <div className="w-full text-center text-red-600">Failed to load partners</div>
                ) : partnersRemote && partnersRemote.length > 0 ? (
                  // repeat list to make marquee feel continuous
                  [...partnersRemote, ...partnersRemote].map((p, idx) => (
                    <div key={idx} className="w-32 h-16 flex items-center justify-center">
                      {p.logo ? (
                        <img src={normalizeImageUrl(p.logo)} alt={p.name || `partner-${idx}`} className="max-h-12 object-contain" />
                      ) : (
                        <div className="text-sm text-gray-700 px-2">{p.name || 'Partner'}</div>
                      )}
                    </div>
                  ))
                ) : (
                  // fallback to icon marquee
                  [...partners, ...partners].map((p, idx) => {
                    const Icon = p.icon
                    return (
                      <div key={idx} className="w-16 h-16 flex items-center justify-center text-green-600">
                        <Icon className="w-8 h-8" />
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          </div>

          <style>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              display: inline-flex;
              align-items: center;
              gap: 3rem;
              animation: marquee 20s linear infinite;
            }
          `}</style>
        </div>
      </section>

      {/* Get Involved  */}
      <section className="bg-orange-100 py-2">
        <div className="container mx-auto px-4">
          <div className="bg-orange-100 rounded-lg shadow-sm overflow-hidden">
            <div className="flex flex-col md:flex-row items-stretch">
              {/* Left: text + CTAs (now full width) */}
              <div className="w-full p-6 md:p-10 text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 text-center">Get Involved</h2>
                <p className="text-gray-700 mb-6 max-w-3xl mx-auto">Join Mthunzi Trust in creating sustainable, community-led impact. Choose a way to support that fits your time and capacity — whether through partnership, volunteering or Donation.</p>

                <div className="flex flex-col items-center sm:flex-row sm:items-center sm:gap-4 sm:justify-center mb-4">
                  <Link to="/contact" className="inline-block w-full sm:w-auto bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-center">Partner With Us</Link>
                  <Link to="/contact" className="inline-block w-full sm:w-auto bg-amber-500 text-gray-900 px-4 py-2 rounded hover:bg-amber-600 text-center">Volunteer With Us</Link>
                  <Link to="/contact" className="inline-block w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center">Support Our Work</Link>
                </div>

                <p className="text-sm text-gray-600 mt-4">If you have questions or would like to discuss a partnership, email us at <a href="mailto:info@mthunzitrust.org" className="text-green-600 hover:underline">info@mthunzitrust.org</a>.</p>
              </div>
              
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}

export default Home
