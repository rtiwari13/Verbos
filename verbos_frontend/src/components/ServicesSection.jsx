import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const services = [
  {
    title: 'Smart Note-Taking',
    description: 'Powerful note organization with rich text editing and section-based management.',
    icon: '📝'
  },
  {
    title: 'Task Management',
    description: 'Organize your tasks with customizable categories and daily planning.',
    icon: '✓'
  },
  {
    title: 'Document Workspace',
    description: 'Create, edit, and organize documents with collaborative features.',
    icon: '📄'
  },
];

const ServicesSection = () => {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
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
      className="bg-[var(--background)] text-[var(--foreground)] py-24 px-4"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 text-[var(--primary)]">Services</h2>
        <p className="text-lg text-[var(--muted-foreground)] mb-16 max-w-2xl mx-auto">
          Everything you need to organize your thoughts, tasks, and documents in one seamless workspace.
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ scale: 1.02, translateY: -5 }}
              className={`
                relative group overflow-hidden
                bg-[var(--card)] hover:bg-[var(--sidebar-accent)]/40
                rounded-2xl p-8
                border border-[var(--border)] hover:border-[var(--primary)]
                transition-all duration-300 ease-out
                backdrop-blur-sm
              `}
            >
              {/* Background Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[var(--primary)]/10 blur-xl transition-opacity duration-300"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight text-[var(--foreground)]">
                  {service.title}
                </h3>
                <p className="text-[var(--muted-foreground)] leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  ); 
};

export default ServicesSection;