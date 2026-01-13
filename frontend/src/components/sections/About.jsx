import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Globe, Award, Calendar, MapPin } from 'lucide-react';
import Team from './Team';

const AboutPage = () => {
  const historyMilestones = [
    {
      year: '2021',
      title: 'Foundation',
      description: 'Mthunzi Trust was founded with a vision to empower Malawian youth.',
      icon: Target,
      color: 'bg-green-100 text-green-800',
    },
    {
      year: '2023',
      title: 'Registration',
      description: 'Officially registered as a youth-led non-profit organization.',
      icon: Award,
      color: 'bg-blue-100 text-blue-800',
    },
    {
      year: '2024',
      title: 'Regional Expansion',
      description: 'Expanded partnerships across Malawi, Zambia, Zimbabwe, and Botswana.',
      icon: Globe,
      color: 'bg-yellow-100 text-yellow-800',
    },
    {
      year: '2025',
      title: 'Global Recognition',
      description: 'Selected as In-Country Focal Point under African Youth Adaptation Network.',
      icon: Users,
      color: 'bg-purple-100 text-purple-800',
    },
  ];

  const targetGroups = [
    {
      group: 'Rural & Peri-urban Communities',
      count: '50+',
      description: 'Communities reached across Malawi',
      icon: MapPin,
      color: 'from-green-500 to-emerald-500',
    },
    {
      group: 'Youth & Women Groups',
      count: '500+',
      description: 'Individuals empowered through our programs',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      group: 'Schools & Institutions',
      count: '20+',
      description: 'Educational institutions partnered with',
      icon: Award,
      color: 'from-yellow-500 to-amber-500',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20"
    >
      {/* Hero Banner */}
      <section className="relative py-20 bg-gradient-to-r from-primary-green/10 to-primary-blue/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              About <span className="text-primary-green">Mthunzi Trust</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 mb-8"
            >
              The Umbrella of Hope - Empowering youth and transforming communities in Malawi
            </motion.p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-50 to-white p-8 rounded-3xl shadow-lg"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-primary-green/10 rounded-full">
                  <Target className="w-8 h-8 text-primary-green" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                A thriving Malawi where empowered youth lead in sustainable development, 
                economic growth, and environmental protection, achieving healthier, 
                educated, and resilient communities.
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-3xl shadow-lg"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-primary-blue/10 rounded-full">
                  <Globe className="w-8 h-8 text-primary-blue" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To empower youth and communities through education, entrepreneurship, 
                environmental sustainability, and sexual and reproductive health rights (SRHR), 
                fostering holistic and sustainable development in Malawi.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From humble beginnings to making a national impact
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary-green to-primary-blue"></div>
            
            {historyMilestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Year */}
                <div className="relative z-10">
                  <div className="w-20 h-20 rounded-full bg-white border-4 border-primary-green flex items-center justify-center shadow-xl">
                    <span className="text-2xl font-bold text-gray-900">{milestone.year}</span>
                  </div>
                </div>

                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8 md:text-right'} pl-8 md:pl-0`}>
                  <div className={`${milestone.color} p-6 rounded-2xl shadow-sm`}>
                    <div className="flex items-center gap-3 mb-3">
                      <milestone.icon className="w-6 h-6" />
                      <h3 className="text-xl font-bold">{milestone.title}</h3>
                    </div>
                    <p className="text-gray-700">{milestone.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Groups */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Who We Serve</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Reaching the most vulnerable and marginalized communities in Malawi
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {targetGroups.map((group, index) => (
              <motion.div
                key={group.group}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-xl border border-gray-100">
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${group.color} flex items-center justify-center`}>
                      <group.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  <div className="pt-8 text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{group.group}</h3>
                    <div className="text-4xl font-bold text-primary-green mb-2">{group.count}</div>
                    <p className="text-gray-600">{group.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide our work and define who we are
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Integrity',
                description: 'We maintain transparency and accountability in all our actions.',
                icon: '🛡️',
                color: 'bg-blue-100 text-blue-800',
              },
              {
                title: 'Collaboration',
                description: 'We believe in partnerships with communities, government, and stakeholders.',
                icon: '🤝',
                color: 'bg-green-100 text-green-800',
              },
              {
                title: 'Innovation',
                description: 'We strive for creative and sustainable solutions to challenges.',
                icon: '💡',
                color: 'bg-yellow-100 text-yellow-800',
              },
              {
                title: 'Empowerment',
                description: 'We focus on enabling individuals to make informed and impactful decisions.',
                icon: '🚀',
                color: 'bg-purple-100 text-purple-800',
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-3xl shadow-lg text-center"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <Team />

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary-green to-primary-blue">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-white mb-6"
          >
            Join Us in Making a Difference
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/90 mb-8 max-w-3xl mx-auto"
          >
            Whether you want to volunteer, partner with us, or support our work, 
            there are many ways to get involved.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="bg-white text-primary-green px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              Get Involved
            </button>
            <button className="bg-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/30 transition-colors backdrop-blur-sm">
              Contact Us
            </button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default AboutPage;