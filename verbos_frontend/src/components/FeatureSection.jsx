import React from 'react';

const features = [
  {
    title: 'High Performance',
    description: 'Optimized for speed and efficiency.',
    icon: '🚀',
  },
  {
    title: 'SEO Friendly',
    description: 'Built with best practices to rank higher.',
    icon: '🔍',
  },
  {
    title: '24/7 Support',
    description: 'Always here when you need us.',
    icon: '🛎️',
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-[var(--background)] text-amber-50 py-16 px-4 border-t">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Key Features</h2>
        <div className="space-y-8">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <div className="text-3xl">{feature.icon}</div>
              <div>
                <h4 className="text-xl font-semibold">{feature.title}</h4>
                <p className="text-white-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
