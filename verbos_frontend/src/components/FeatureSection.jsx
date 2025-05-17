import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const features = [
  {
    title: 'Rich Text Editing',
    description: 'Advanced formatting tools with support for headings, lists, and text styling for better content organization.',
    icon: '✍️',
    gradient: 'from-purple-500/10 via-fuchsia-500/10 to-pink-500/10',
    borderGradient: 'from-purple-500/30 via-fuchsia-500/30 to-pink-500/30',
  },
  {
    title: 'Category Organization',
    description: 'Flexible categorization system for both tasks and notes, with custom spaces for different areas of your life.',
    icon: '📂',
    gradient: 'from-cyan-500/10 via-blue-500/10 to-indigo-500/10',
    borderGradient: 'from-cyan-500/30 via-blue-500/30 to-indigo-500/30',
  },
  {
    title: 'Real-time Sync',
    description: 'Automatic saving and synchronization keeps your content up-to-date across all your devices.',
    icon: '🔄',
    gradient: 'from-amber-500/10 via-orange-500/10 to-red-500/10',
    borderGradient: 'from-amber-500/30 via-orange-500/30 to-red-500/30',
  },
];

const FeaturesSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className="bg-[var(--background)] text-[var(--foreground)] py-24 px-4 border-t border-[var(--border)]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-[var(--primary)]">Features</h2>
          <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
            Powerful tools designed to enhance your productivity and streamline your workflow.
          </p>
        </div>
        <div className="space-y-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={`
                relative group
                bg-[var(--card)] hover:bg-[var(--sidebar-accent)]/40
                rounded-2xl p-6 md:p-8
                border border-[var(--border)] hover:border-[var(--primary)]
                transition-all duration-300 ease-out
                backdrop-blur-sm
                overflow-hidden
              `}
            >
              {/* Background Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[var(--primary)]/10 blur-xl transition-opacity duration-300"></div>

              {/* Content */}
              <div className="relative z-10 flex items-start gap-6 md:gap-8">
                <div className="flex-shrink-0">
                  <div className="text-5xl md:text-6xl group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                </div>
                <div className="flex-grow">
                  <h4 className="text-xl md:text-2xl font-bold mb-2 tracking-tight text-[var(--foreground)]">
                    {feature.title}
                  </h4>
                  <p className="text-[var(--muted-foreground)] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturesSection;