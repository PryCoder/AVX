import { motion } from "framer-motion";

const staggerContainer = (staggerChildren, delayChildren) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: staggerChildren || 0.1,
      delayChildren: delayChildren || 0,
    },
  },
});

export const SectionWrapper = ({ children, className = "" }) => {
  return (
    <motion.section
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className={`max-w-7xl mx-auto relative z-0 px-6 lg:px-8 ${className}`}
    >
      {children}
    </motion.section>
  );
};

export default SectionWrapper;