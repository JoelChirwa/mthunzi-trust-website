import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, Award, MapPin, Users, Briefcase } from 'lucide-react';

const Team = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  const leadershipTeam = [
    {
      id: 1,
      name: 'Symon Satiele',
      role: 'Founder & CEO',
      email: 'symon@mthunzitrust.org',
      phone: '+265 996 654 088',
      bio: 'Visionary leader with extensive experience in youth empowerment and sustainable development.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=400',
      color: 'from-green-500 to-emerald-600',
      achievements: ['Founded Mthunzi Trust', 'Youth Development Advocate'],
    },
    {
      id: 2,
      name: 'Harry Chagomerana',
      role: 'Finance Manager',
      email: 'harry@mthunzitrust.org',
      phone: '+265 991 234 567',
      bio: 'Financial expert with 5+ years experience in nonprofit financial management.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=400',
      color: 'from-blue-500 to-cyan-600',
      achievements: ['Financial Strategy', 'Grant Management'],
    },
    {
      id: 3,
      name: 'Hazvinei Mang\'anda',
      role: 'Programs Manager',
      email: 'hazvinei@mthunzitrust.org',
      phone: '+265 992 345 678',
      bio: 'Program development specialist with focus on community-based initiatives.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&h=400',
      color: 'from-purple-500 to-pink-600',
      achievements: ['Program Design', 'Community Engagement'],
    },
    {
      id: 4,
      name: 'Godfrey Jidiga',
      role: 'Business Development Officer',
      email: 'godfrey@mthunzitrust.org',
      phone: '+265 993 456 789',
      bio: 'Partnerships and business development expert with extensive network.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400',
      color: 'from-yellow-500 to-orange-600',
      achievements: ['Partnership Building', 'Strategic Alliances'],
    },
    {
      id: 5,
      name: 'Phillemon Banda',
      role: 'Communication & PR Officer',
      email: 'phillemon@mthunzitrust.org',
      phone: '+265 994 567 890',
      bio: 'Communication strategist with expertise in digital marketing and public relations.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=400',
      color: 'from-red-500 to-rose-600',
      achievements: ['Brand Strategy', 'Digital Campaigns'],
    },
    {
      id: 6,
      name: 'Ntchindi Tchongwe',
      role: 'Monitoring & Evaluation Officer',
      email: 'ntchindi@mthunzitrust.org',
      phone: '+265 995 678 901',
      bio: 'Data analysis and impact measurement specialist with research background.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=400',
      color: 'from-indigo-500 to-blue-600',
      achievements: ['Impact Assessment', 'Data Analytics'],
    },
  ];

  const departments = [
    {
      name: 'Management',
      members: 4,
      icon: Users,
      color: 'bg-green-100 text-green-800',
    },
    {
      name: 'Programs',
      members: 8,
      icon: Briefcase,
      color: 'bg-blue-100 text-blue-800',
    },
    {
      name: 'Finance',
      members: 3,
      icon: Award,
      color: 'bg-yellow-100 text-yellow-800',
    },
    {
      name: 'Operations',
      members: 5,
      icon: MapPin,
      color: 'bg-purple-100 text-purple-800',
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Meet Our <span className="text-primary-green">Leadership</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            A dedicated team of youth leaders committed to transforming Malawi
          </motion.p>
        </div>

        {/* Department Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {departments.map((dept, index) => (
            <motion.div
              key={dept.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className={`${dept.color} p-6 rounded-2xl shadow-lg text-center`}
            >
              <dept.icon className="w-12 h-12 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">{dept.members}</div>
              <div className="font-semibold">{dept.name}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {leadershipTeam.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedMember(member)}
              className="bg-white rounded-2xl overflow-hidden shadow-xl cursor-pointer card-hover group"
            >
              {/* Member Image */}
              <div className="relative h-64 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-20`}></div>
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  <div className={`bg-gradient-to-br ${member.color} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                    {member.role}
                  </div>
                </div>
              </div>

              {/* Member Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{member.bio}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = `mailto:${member.email}`;
                      }}
                      className="p-2 text-gray-500 hover:text-primary-green transition-colors"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="w-5 h-5" />
                    </button>
                  </div>
                  <button className="text-primary-green font-semibold hover:text-primary-green/80 transition-colors">
                    View Profile →
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary-green/10 to-primary-blue/10 p-8 rounded-3xl max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Join Our <span className="text-primary-green">Team</span>
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We're always looking for passionate individuals to join us in making a difference.
              Whether you're a volunteer, intern, or professional, there's a place for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary px-8 py-3">
                View Open Positions
              </button>
              <button className="btn-secondary px-8 py-3">
                Volunteer With Us
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Member Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="relative">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                >
                  ✕
                </button>

                {/* Member Header */}
                <div className={`h-48 bg-gradient-to-r ${selectedMember.color} relative`}>
                  <div className="absolute -bottom-16 left-8">
                    <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-xl">
                      <img
                        src={selectedMember.image}
                        alt={selectedMember.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Member Content */}
                <div className="pt-20 px-8 pb-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900">{selectedMember.name}</h3>
                      <div className={`inline-flex items-center px-4 py-2 mt-2 rounded-full bg-gradient-to-r ${selectedMember.color} text-white font-medium`}>
                        {selectedMember.role}
                      </div>
                    </div>
                    <div className="flex space-x-3 mt-4 md:mt-0">
                      <a
                        href={`mailto:${selectedMember.email}`}
                        className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                        aria-label={`Email ${selectedMember.name}`}
                      >
                        <Mail className="w-5 h-5" />
                      </a>
                      <a
                        href={`tel:${selectedMember.phone}`}
                        className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                        aria-label={`Call ${selectedMember.name}`}
                      >
                        <Phone className="w-5 h-5" />
                      </a>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">About</h4>
                    <p className="text-gray-700">{selectedMember.bio}</p>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Key Achievements</h4>
                    <ul className="space-y-2">
                      {selectedMember.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className={`w-2 h-2 rounded-full mt-2 mr-3 ${selectedMember.color.replace('from-', 'bg-').replace(' to-.*', '')}`}></div>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => setSelectedMember(null)}
                      className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Team;