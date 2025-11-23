import React, { useState, useEffect } from 'react'
import aboutImg from '../assets/about.jpg'
import { FaLightbulb, FaEye, FaPuzzlePiece, FaShieldAlt, FaBolt, FaCheckCircle, FaHandshake, FaUsers } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { normalizeImageUrl } from '../utils/api.js'
import alexinaImg from '../assets/alexina.jpg'
import chisomoImg from '../assets/Chisomo.jpg'
import joelImg from '../assets/joel.jpg'
import ntchindiImg from '../assets/ntchindi.jpg'
import phiillemonImg from '../assets/Phiillemon.jpg'
import symonImg from '../assets/symon.jpg'
import harryImg from '../assets/harry.jpg'
import paulImg from '../assets/paul.jpg'

const objectives = [
  'To promote environmental sustainability through advocacy, community-based activities and capacity building.',
  'To reduce barriers to access quality education in schools and improve learning outcomes among students.',
  'To improve access to water, sanitation and hygiene services in schools, health facilities and communities in need.',
  'To enhance agricultural skills and improve livelihoods among youth and women through sustainable farming practices and entrepreneurship.',
  'To increase access to information and services on Sexual Reproductive Health Rights (SRHR), HIV/AIDS, Mental health and Gender Based Violence (GBV) among youth and women.',
]

const coreValues = [
  { title: 'Integrity', icon: FaShieldAlt, desc: 'We uphold the highest standards of honesty, transparency, and ethical conduct in all our actions.' },
  { title: 'Empowerment', icon: FaBolt, desc: 'We believe in empowering individuals and communities to take charge of their own development and well-being.' },
  { title: 'Collaboration', icon: FaHandshake, desc: 'We foster partnerships and teamwork to achieve shared goals and maximize impact.' },
  { title: 'Innovation', icon: FaLightbulb, desc: 'We embrace creativity and seek innovative solutions to address challenges and drive positive change.' },
  { title: 'Respect & Inclusivity', icon: FaUsers, desc: 'We value diversity, inclusivity, and treat everyone with dignity and respect.' },
  { title: 'Accountability', icon: FaCheckCircle, desc: 'We are accountable to our stakeholders, beneficiaries, and the communities we serve, ensuring responsible use of resources and delivering on our commitments.' },
]

const whoServe = [
  { title: 'Rural & Peri-urban Communities', icon: FaUsers, desc: 'Community-driven programs in livelihoods, education, and environmental resilience.' },
  { title: 'Youth & Women Groups', icon: FaHandshake, desc: "Skills, entrepreneurship and SRHR support tailored for young people and women." },
  { title: 'People Living with Disabilities', icon: FaShieldAlt, desc: 'Inclusive programming ensuring access to services and participation.' },
  { title: 'Schools & Faith-based Institutions', icon: FaPuzzlePiece, desc: 'Partnerships that support education, WASH, and community outreach.' },
  { title: 'Local Community Leaders', icon: FaLightbulb, desc: 'Engaging leaders for sustainable, community-led solutions and buy-in.' },
  { title: 'Partner NGOs & Stakeholders', icon: FaCheckCircle, desc: 'Collaboration with organizations to scale impact and share best practices.' },
]

// list (local assets)
const TEAM = [
  { name: 'Symon Satiele', role: 'Founder & CEO', photo: symonImg },
  { name: 'Harry Chagomerana', role: 'Finance & Administration Officer', photo: harryImg },
  { name: 'Ntchindi Tchongwe', role: 'Programs Manager', photo: ntchindiImg },
  { name: 'Joel Chirwa', role: 'ICT & Grants Manager', photo: joelImg },
  { name: "Chisomo Ching'ombe", role: 'Administrative Secretary', photo: chisomoImg },
  { name: 'Alexina Chirwa', role: 'Program Manager', photo: alexinaImg },
  { name: 'Symon Poul', role: 'Researcher Officer', photo: paulImg },
  { name: 'Felister Ngalande', role: 'Monitoring & Evaluation Manager',  },
  { name: 'Phiillemon Banda', role: 'Community Engagement Officer', photo: phiillemonImg },
  { name: 'Elton Makombe', role: 'Administration Officer' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom, duration: 0.45, ease: 'easeOut' },
  }),
}

// Team section component
const TeamSection = ({ teamMembers, teamLoading, teamError }) => {
  // Resolve photo source: prefer uploaded/server images (normalized), keep local imported assets as-is
  function getPhotoSrc(member) {
    const fallback = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    const p = (member && (member.photo || member.image)) || ''
    if (!p) return fallback
    if (typeof p === 'string') {
      if (/^https?:\/\//i.test(p)) return p
      // Server uploads are stored under /uploads or uploads
      if (p.startsWith('/uploads') || p.startsWith('uploads')) return normalizeImageUrl(p)
      if (p.includes('/assets/')) return p
      if (p.startsWith('/')) return p
      return normalizeImageUrl(p)
    }
    return p
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 text-center"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={0.02}
      >
        Team
      </motion.h2>
      
      <motion.p
        className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={0.04}
      >
        Meet a team of young, dedicated professionals committed to community-led development.
      </motion.p>

      <div className="border-t border-gray-300 my-8"></div>

      {/* Loading State */}
      {teamLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      )}

      {/* Error State */}
      {teamError && (
        <motion.div
          className="bg-red-50 border border-red-200 rounded-lg p-4 text-center mb-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <p className="text-red-700">Error loading team: {teamError}</p>
        </motion.div>
      )}

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.id || index}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0.06 + index * 0.1}
            whileHover={{ y: -5 }}
          >
            {/* Team Member Photo */}
              <div className="h-64 overflow-hidden">
              <img
                src={getPhotoSrc(member)}
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                }}
              />
            </div>

            {/* Team Member Info */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {member.name}
              </h3>
              
              {member.role && (
                <p className="text-green-600 font-semibold mb-3">
                  {member.role}
                </p>
              )}

              {/* bio removed per design */}

              {/* Social Links (if available in your API) */}
              {(member.linkedin || member.twitter || member.email) && (
                <div className="flex space-x-3 mt-4 pt-4 border-t border-gray-100">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                  )}
                  {member.twitter && (
                    <a
                      href={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="text-gray-400 hover:text-green-600 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {!teamLoading && teamMembers.length === 0 && !teamError && (
        <motion.div
          className="text-center py-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <p className="text-gray-500 text-lg">No team members to display</p>
        </motion.div>
      )}
    </div>
  )
}

const About = () => {
  const [openIndex, setOpenIndex] = useState(null)
  const [openWho, setOpenWho] = useState(null)
  // Use hard-coded TEAM data for About page
  const [teamMembers, setTeamMembers] = useState(TEAM)
  const [teamLoading, setTeamLoading] = useState(false)
  const [teamError, setTeamError] = useState(null)

  return (
    <section className="text-gray-800 bg-amber-200 rounded-lg">
      <div className="container mx-auto px-6 py-8">
        <motion.h1
          className="text-3xl md:text-4xl font-bold mb-6 text-gray-900"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.02}
        >
          About Us
        </motion.h1>
        <div className="p-6 text-center sm:text-left">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="lg:pr-6">
              <p className="text-sm font-medium text-green-600 uppercase tracking-wider mb-4 mt-4">Executive Summary</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-4">Mthunzi Trust — The Umbrella of Hope</h2>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed max-w-xl mt-2">
                Established in 2021 and formally registered in 2023, Mthunzi Trust is a youth-led nonprofit organization operating in Lilongwe and Blantyre, Malawi. The Trust is committed to strengthening communities by promoting education, entrepreneurship, agriculture, environmental sustainability and sexual and reproductive health and rights (SRHR).
              </p>
            </div>

            <div className="text-gray-700 text-sm md:text-base leading-relaxed space-y-6">
              <p>
                In developing our programs, we follow an inclusive, participatory and community-driven approach. We work closely with diverse stakeholders including community leaders, teachers, youth groups, women's networks, local government structures and partner NGOs to identify pressing needs and co-design solutions. Through consultations, community dialogues and collaborative planning sessions, we ensure that initiatives are context-specific, evidence-based and aligned with the aspirations of the communities we serve.
              </p>
              <p>
                Through advocacy, community action and strategic partnerships, Mthunzi Trust works to advance several United Nations Sustainable Development Goals, particularly Quality Education (SDG 4), Gender Equality (SDG 5), Climate Action (SDG 13), Life on Land (SDG 15) and Decent Work and Economic Growth (SDG 8). The organization's mission also aligns with Malawi Vision 2063, contributing toward building a prosperous, inclusive and sustainable nation.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative min-h-[70vh] sm:min-h-screen overflow-hidden">
        {/* Background image + coloured overlay */}
        <div className="absolute inset-0">
          <img
            src={aboutImg}
            alt="Community"
            className="w-full h-full object-cover brightness-75 lg:filter lg:blur-sm"
          />
          <div className="absolute inset-0 bg-yellow-600/30 lg:bg-yellow-600/45 mix-blend-multiply" />
        </div>

        <div className='px-12'> 
          <div className="relative z-10 container mx-auto px-6 py-12 md:py-20">
            <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
              {/* Left boxed card */}
              <motion.aside
                className="lg:w-5/12 w-full flex items-center"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={0.05}
              >
                <div className="w-full border border-white/90 rounded-md p-6 md:p-8 text-white backdrop-blur-sm animate-fadeUp">
                  <div className="flex items-start gap-3 mb-5">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 flex items-center justify-center text-white text-lg md:text-xl">
                      <FaLightbulb />
                    </div>
                    <div>
                      <h4 className="font-semibold text-base md:text-lg">Our Mission</h4>
                      <p className="text-sm md:text-base mt-2">
                        To empower youth and communities through education, entrepreneurship, environmental sustainability,
                        agriculture and sexual and reproductive health rights (SRHR), fostering holistic and sustainable
                        development in Malawi.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 mb-5">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 flex items-center justify-center text-white text-lg md:text-xl">
                      <FaEye />
                    </div>
                    <div>
                      <h4 className="font-semibold text-base md:text-lg">Our Vision</h4>
                      <p className="text-sm md:text-base mt-2">
                        A thriving Malawi where empowered youth lead in sustainable development, economic growth and
                        environmental protection, achieving healthier, educated and resilient communities.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 flex items-center justify-center text-white text-lg md:text-xl">
                      <FaPuzzlePiece />
                    </div>
                    <div>
                      <h4 className="font-semibold text-base md:text-lg">Legality</h4>
                      <ul className="list-disc list-inside text-sm md:text-sm mt-2 space-y-2">
                        <li>Registered under Trustees Act as a Trustee.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.aside>

              {/* Right objectives list */}
              <div className="lg:w-7/12 w-full ">
                <motion.h2
                  className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 tracking-wider"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={0.12}
                >
                  SPECIFIC OBJECTIVES
                </motion.h2>

                <div className="bg-transparent rounded-md divide-y divide-white/20 overflow-hidden shadow-sm">
                  {objectives.map((obj, idx) => (
                    <motion.div
                      key={idx}
                      className="py-4 md:py-6"
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      variants={fadeUp}
                      custom={0.18 + idx * 0.04}
                    >
                      <p className="text-white/90 leading-relaxed text-sm md:text-base">{obj}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        
      {/* Values */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div>
            <motion.h3
              className="text-2xl font-bold mb-4 text-center"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0.03}
            >
              Core Values
            </motion.h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {coreValues.map((v, i) => {
                const Icon = v.icon
                const open = openIndex === i
                return (
                  <motion.div
                    key={v.title}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={0.03 + i * 0.03}
                  >
                    <div className="border rounded-md overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setOpenIndex(open ? null : i)}
                        aria-expanded={open}
                        className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-3">
                          <span className="inline-flex items-center justify-center w-9 h-9 rounded text-gray-700">
                            <Icon />
                          </span>
                          <span className="font-semibold text-gray-800">{v.title}</span>
                        </div>
                        <span className="text-gray-500">{open ? '−' : '+'}</span>
                      </button>

                      <div className={`px-4 pb-4 transition-all duration-200 ${open ? 'pt-3 max-h-40 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                        <p className="text-sm text-gray-700">{v.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Who we serve - accordion matching Core Values format */}
      <div className="container mx-auto px-6 py-12">
        <motion.h3
          className="text-2xl font-semibold mb-4 text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.04}
        >
          Who we serve
        </motion.h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 max-w-4xl mx-auto">
          {whoServe.map((w, idx) => {
            const Icon = w.icon
            const open = openWho === idx
            return (
              <motion.div key={w.title} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={0.03 + idx * 0.03}>
                <div className="border rounded-md overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenWho(open ? null : idx)}
                    aria-expanded={open}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center justify-center w-9 h-9 rounded text-gray-700">
                        <Icon />
                      </span>
                      <span className="font-semibold text-gray-800">{w.title}</span>
                    </div>
                    <span className="text-gray-500">{open ? '−' : '+'}</span>
                  </button>

                  <div className={`px-4 pb-4 transition-all duration-200 ${open ? 'pt-3 max-h-40 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                    <p className="text-sm text-gray-700">{w.desc}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Team section */}
      <TeamSection 
        teamMembers={teamMembers}
        teamLoading={teamLoading}
        teamError={teamError}
      />
    </section>
  )
}

export default About