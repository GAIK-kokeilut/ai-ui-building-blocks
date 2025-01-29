import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export const SimpleProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const [activeStep, setActiveStep] = useState(1);

  // Käytetään useSpring-hookia pehmeämmän animaation saamiseksi
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setActiveStep(Math.min(Math.ceil(latest * 5), 5));
    });
  }, [scrollYProgress]);

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 h-[500px] flex flex-col items-center">
      {/* Pystysuora tausta-palkki */}
      <div className="absolute h-full w-1.5 bg-gray-200 rounded-full">
        {/* Animoitu täyttöpalkki */}
        <motion.div
          className="w-full bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"
          style={{ height: smoothProgress }}
        />
      </div>

      {/* Numeropallot ja yhdistävät palkit */}
      {[1, 2, 3, 4, 5].map((step) => (
        <div
          key={step}
          className="relative flex items-center justify-center w-12 h-12 mb-20"
        >
          {/* Animoitu ympyrä */}
          <motion.div
            className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold
                shadow-lg border-2 transition-colors duration-300
                ${
                  step <= activeStep
                    ? "bg-blue-500 border-blue-600 text-white"
                    : "bg-white border-gray-200 text-gray-500"
                }`}
            animate={{
              scale: step === activeStep ? 1.2 : 1,
              transition: { duration: 0.2 },
            }}
          >
            {step}
          </motion.div>

          {/* Pieni pallo, joka näkyy aktiivisen vaiheen kohdalla */}
          {step === activeStep && (
            <motion.div
              className="absolute w-4 h-4 bg-blue-400 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};
