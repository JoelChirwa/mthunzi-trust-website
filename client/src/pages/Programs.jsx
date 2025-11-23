import srhrImg from '../assets/health-srhr.jpg'
import eduImg from '../assets/education.jpg'
import envImg from '../assets/environmental-conservation.jpg'
import adaptionImg from '../assets/climate-adaptation.jpg'
import agriImg from '../assets/agriculture.jpg'
import entreImg from '../assets/entre.jpg'

const Programs = () => {
  return (
    <main>
      <section className="bg-green-900 text-white py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-4">Our Programs</h1>
          <p className="max-w-3xl text-white/90 mb-8">Explore our diverse programs designed to enhance your skills and knowledge in various fields.</p>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <img src={adaptionImg} alt="Community program" className="w-full rounded-2xl object-cover shadow-lg" />
            </div>

            <div className="pt-2">
              <h2 className="text-xl md:text-2xl font-bold text-yellow-400 mb-4">Climate Justice Advocacy</h2>
              <p className="text-white/90 leading-relaxed mb-4">Mthunzi Trust champions climate justice by centring the voices and rights of communities most affected by climate change, with a specific focus on youth and women. We conduct advocacy and community-based activities that build local capacity to participate in policy dialogues and demand equitable climate action.</p>
              <p className="text-white/90 leading-relaxed">Our work advances environmental sustainability through community-led monitoring, promotion of nature-based solutions, and training in climate-smart practices that strengthen resilience for households and smallholder farmers. By linking advocacy with practical interventions and partnerships, Mthunzi Trust supports fair access to land, water and resilient infrastructure while enabling climate‑resilient livelihoods.</p>
            </div>
          </div>
          
          <div className="mt-12 grid md:grid-cols-2 gap-8 items-start">
            <div className="pt-2">
              <h2 className="text-xl md:text-2xl font-bold text-yellow-400 mb-4">Environmental Conservation</h2>
              <p className="text-white/90 leading-relaxed mb-4">Mthunzi Trust promotes environmental sustainability through hands-on community restoration, advocacy and capacity building. We implement reforestation and habitat protection activities, support community waste reduction campaigns, and train local stewards in sustainable natural resource management.</p>
              <p className="text-white/90 leading-relaxed">Our interventions include community workshops and participatory planning that increase local ownership and inform advocacy for stronger environmental policies. By integrating conservation with livelihoods and climate resilience, these activities help protect natural capital while improving food security and reducing risks from environmental degradation.</p>
            </div>

            <div>
              <img src={envImg} alt="Environmental Conservation" className="w-full rounded-2xl object-cover shadow-lg" />
            </div>
          </div>
          
          <div className="mt-12 grid md:grid-cols-2 gap-8 items-start">
            <div>
              <img src={srhrImg} alt="Health services" className="w-full rounded-2xl object-cover shadow-lg" />
            </div>

            <div className="pt-2">
              <h2 className="text-xl md:text-2xl font-bold text-yellow-400 mb-4">Health & SRHR</h2>
              <p className="text-white/90 leading-relaxed mb-4">
                Mthunzi Trust increases access to SRHR, HIV/AIDS, mental health and GBV services by combining community outreach, capacity building and service linkages tailored for youth and women. We train peer educators and health workers, facilitate voluntary counseling and testing, provide psychosocial support and referral pathways, and run risk-reduction and information campaigns to reduce stigma and barriers to care.
              </p>
              <p className="text-white/90 leading-relaxed">
               Our programmes collaborate with facilities and communities to improve WASH services where they support health outcomes, ensuring safer environments for service delivery, recovery and dignity.
              </p>
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-8 items-start">
            <div className="pt-2">
              <h2 className="text-xl md:text-2xl font-bold text-yellow-400 mb-4">Education</h2>
              <p className="text-white/90 leading-relaxed mb-4">Mthunzi Trust works to reduce barriers to quality education and improve learning outcomes by strengthening school environments, supporting teachers, and providing targeted learning support for vulnerable children. Our activities include teacher training, provision of learning materials, mentorship and community engagement to reduce dropout and promote gender equality.</p>
              <p className="text-white/90 leading-relaxed">We prioritise WASH improvements in schools—ensuring clean water, adequate sanitation and hygiene education—to create safer learning environments that support attendance, health and better academic performance among students.</p>
            </div>

            <div>
              <img src={eduImg} alt="Education" className="w-full rounded-2xl object-cover shadow-lg" />
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-8 items-start">
            <div>
              <img src={agriImg} alt="Agriculture" className="w-full rounded-2xl object-cover shadow-lg" />
            </div>

            <div className="pt-2">
              <h2 className="text-xl md:text-2xl font-bold text-yellow-400 mb-4">Agriculture</h2>
              <p className="text-white/90 leading-relaxed mb-4">Mthunzi Trust enhances agricultural skills and livelihoods for youth and women through practical training in sustainable and climate‑smart farming practices. We run farmer field schools and demonstrations on soil and water management, promote improved seed and input use, and provide hands-on technical support to increase productivity.</p>
              <p className="text-white/90 leading-relaxed">We link technical skills to market-oriented approaches—post-harvest handling, value addition and market linkages—so participants can diversify income streams, improve household food security and build resilience to climate shocks.</p>
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-8 items-start">
            <div className="pt-2">
              <h2 className="text-xl md:text-2xl font-bold text-yellow-400 mb-4">Entrepreneurship & Livelihoods</h2>
              <p className="text-white/90 leading-relaxed mb-4">Mthunzi Trust increases livelihoods and entrepreneurship opportunities by delivering vocational and business skills training tailored for youth and women. We provide mentorship, market-readiness support, financial literacy and linkages to microfinance and value chain partners to help entrepreneurs launch and scale enterprises.</p>
              <p className="text-white/90 leading-relaxed">Programs emphasise sustainable enterprises—incorporating climate-smart agricultural products and circular economy principles—so that small businesses not only generate income but also align with environmental sustainability and strengthen community resilience.</p>
            </div>

            <div>
              <img src={entreImg} alt="Entrepreneurship" className="w-full rounded-2xl object-cover shadow-lg" />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Programs
