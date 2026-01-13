import React from "react";

const howWeWork = [
  {
    icon: (
      <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-green-500"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
    ),
    title: 'ADVOCACY',
    desc: 'We advocate for youth, women, and Persons With Disabilities(PWDs).',
  },
  {
    icon: (
      <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-green-500"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
    ),
    title: 'CAPACITY BUILDING',
    desc: 'We help develop capacity of the member organizations and the young people that we work with.',
  },
  {
    icon: (
      <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-green-500"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
    ),
    title: 'PARTNERSHIP',
    desc: 'We collaborate with organizations in and out country to meet our joint objectives.',
  },
  {
    icon: (
      <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-green-500"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2s2-.9 2-2v-2c0-1.1-.9-2-2-2zm0 10c-4.41 0-8-1.79-8-4V6c0-2.21 3.59-4 8-4s8 1.79 8 4v8c0 2.21-3.59 4-8 4z"/></svg>
    ),
    title: 'COMMUNITY ENGAGEMENT & ACTION',
    desc: 'We engage communities to drive local action and sustainable change.',
  },
  {
    icon: (
      <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-green-500"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2s2-.9 2-2v-2c0-1.1-.9-2-2-2zm0 10c-4.41 0-8-1.79-8-4V6c0-2.21 3.59-4 8-4s8 1.79 8 4v8c0 2.21-3.59 4-8 4z"/></svg>
    ),
    title: 'EMPOWERMENT',
    desc: 'We empower individuals and groups to realize their full potential.',
  },
  {
    icon: (
      <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-green-500"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m4 0h-1v4h-1m-4 0h-1v-4h-1"/></svg>
    ),
    title: 'INNOVATION',
    desc: 'We foster innovative solutions to address emerging challenges.',
  },
];


const HowWeWork = () => (
  <section className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center gap-4 mb-12">
        <div className="w-20 h-1 bg-gray-300 rounded" />
        <h2 className="text-4xl font-bold text-blue-900">HOW WE WORK</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {howWeWork.map((item, idx) => (
          <div key={idx} className="flex items-start">
            <div className="mr-4 flex-shrink-0">{item.icon}</div>
            <div>
              <h3 className="text-lg font-bold tracking-wide mb-1 text-gray-900">{item.title}</h3>
              <p className="text-gray-700 text-base leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowWeWork;
