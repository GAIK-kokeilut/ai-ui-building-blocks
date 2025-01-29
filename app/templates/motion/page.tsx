"use client";
import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
const cards = [
  {
    emoji: "🎨",
    title: "Design",
    description: "Moderni ja responsiivinen käyttöliittymä Tailwind CSS:llä.",
  },
  {
    emoji: "⚡",
    title: "Suorituskyky",
    description: "Optimoitu suorituskyky Next.js 15:n avulla.",
  },
  {
    emoji: "🚀",
    title: "Animaatiot",
    description: "Sulava käyttökokemus Motion-kirjaston animaatioilla.",
  },
  {
    emoji: "🌟",
    title: "Innovaatio",
    description: "Uusimmat web-teknologiat käytössäsi.",
  },
  {
    emoji: "🔥",
    title: "Ketteryys",
    description: "Nopea kehitys ja helppo ylläpidettävyys.",
  },
  {
    emoji: "💡",
    title: "Älykkyys",
    description: "Älykkäät ratkaisut monimutkaisiin ongelmiin.",
  },
  {
    emoji: "🎯",
    title: "Tarkkuus",
    description: "Tarkasti toteutetut yksityiskohdat.",
  },
  {
    emoji: "🌈",
    title: "Monipuolisuus",
    description: "Laaja valikoima ominaisuuksia ja toimintoja.",
  },
  {
    emoji: "🎮",
    title: "Interaktiivisuus",
    description: "Vuorovaikutteiset elementit ja animaatiot.",
  },
  {
    emoji: "🔒",
    title: "Turvallisuus",
    description: "Turvallinen ja luotettava toteutus.",
  },
];

const ProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  // Pehmeä animaatio scrollaukselle
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Näytä/piilota progress bar scrollauksen perusteella
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      setIsVisible(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsVisible(false);
      }, 1000); // Piilota palkki 1 sekunnin kuluttua scrollauksen loppumisesta
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <motion.div
      className="fixed left-0 right-0 top-0"
      initial={{ opacity: 0, y: -10 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : -10,
      }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="h-1 bg-gradient-to-r from-blue-500 to-blue-600"
        style={{ scaleX, transformOrigin: "0%" }}
      />
    </motion.div>
  );
};

interface CardProps {
  emoji: string;
  title: string;
  description: string;
  index: number;
}

const Card: React.FC<CardProps> = ({ emoji, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
          delay: index * 0.1,
          ease: "easeOut",
        },
      }}
      viewport={{ once: true, margin: "-100px", amount: 0.1 }}
      className="w-full max-w-md mx-auto mb-24"
    >
      <div className="bg-white rounded-xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
        <div className="flex items-center gap-6 mb-6">
          <span className="text-6xl">{emoji}</span>
          <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        </div>
        <p className="text-lg text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

const ScrollCards = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center text-gray-900 mb-20"
        >
          Scroll Trigger Demo
        </motion.h1>

        <div>
          {cards.map((card, index) => (
            <Card key={index} {...card} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

function Page() {
  return (
    <div>
      <ScrollCards />
      <ProgressBar />
    </div>
  );
}
export default Page;
