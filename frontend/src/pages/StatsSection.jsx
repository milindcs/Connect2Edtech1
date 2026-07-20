import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { FaUsers, FaBook, FaBriefcase, FaBuilding } from 'react-icons/fa';
import './Home.css';

const stats = [
  { icon: FaUsers, label: 'Students Trained', value: 5000, suffix: '+' },
  { icon: FaBook, label: 'Courses', value: 15, suffix: '+' },
  { icon: FaBriefcase, label: 'Placements', value: 3000, suffix: '+' },
  { icon: FaBuilding, label: 'Industry Partners', value: 100, suffix: '+' },
];

export default function StatsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <div ref={ref} className="stats-container">
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <motion.div
            key={stat.label}
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Icon className="stat-icon" />
            <h2 className="stat-number">
              {inView && (
                <CountUp start={0} end={stat.value} duration={2.5} separator="," suffix={stat.suffix} />
              )}
            </h2>
            <p className="stat-label">{stat.label}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
