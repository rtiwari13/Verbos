import React from 'react';

const services = [
  {
    title: 'Web Development',
    description: 'Building responsive and scalable web applications.',
    icon: '💻',
  },
  {
    title: 'Mobile Apps',
    description: 'Cross-platform mobile applications using React Native.',
    icon: '📱',
  },
  {
    title: 'UI/UX Design',
    description: 'Crafting intuitive and engaging user experiences.',
    icon: '🎨',
  },
];

const ServicesSection = () => {
  return (
    <section className="bg-[var(--background)]  text-amber-50 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center ">
        <h2 className="text-4xl font-bold mb-10 ">Our Services</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-[var(--card)] rounded-xl p-6 shadow hover:shadow-lg transition"
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
              <p className="text-white-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
