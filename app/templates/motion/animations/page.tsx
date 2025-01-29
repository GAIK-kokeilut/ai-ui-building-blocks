"use client";
import { motion } from "framer-motion";
import { RotateCw } from "lucide-react";
import { ReactNode } from "react";

// Slide In animaatio (sivulta sisään)
export const SlideIn = ({
  children,
  direction = "left",
}: {
  children: ReactNode;
  direction?: "left" | "right";
}) => {
  return (
    <motion.div
      initial={{ x: direction === "left" ? -100 : 100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9 }}
    >
      {children}
    </motion.div>
  );
};

// Scale animaatio (kasvaa sisään)
export const ScaleIn = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9 }}
    >
      {children}
    </motion.div>
  );
};

// Rotate animaatio
export const RotateIn = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial={{ rotate: -180, opacity: 0 }}
      whileInView={{ rotate: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9 }}
    >
      {children}
    </motion.div>
  );
};

// Bounce animaatio
export const BounceIn = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        bounce: 0.4,
        duration: 1,
      }}
    >
      {children}
    </motion.div>
  );
};

// Stagger effect (elementit tulevat yksi kerrallaan)
export const StaggerContainer = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.4,
            delayChildren: 0.2,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8, // Säädä kestoa
            ease: "easeOut",
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

// Hover ja tap efektit
export const Interactive = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 300, // jäykkyys
        damping: 20, // vaimennusta
        mass: 1.2, // "painoa"
      }}
    >
      {children}
    </motion.div>
  );
};

// Demo sivu
export default function Home() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="flex items-center justify-center gap-4 mb-8">
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          <RotateCw className="h-4 w-4" />
          Toista animaatiot
        </button>
      </div>
      <div className="container mx-auto px-4 space-y-24">
        {/* Slide efektit */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SlideIn direction="left">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Slide vasemmalta</h2>
              <p>Tämä elementti liukuu vasemmalta sisään.</p>
            </div>
          </SlideIn>

          <SlideIn direction="right">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Slide oikealta</h2>
              <p>Tämä elementti liukuu oikealta sisään.</p>
            </div>
          </SlideIn>
        </div>

        {/* Scale efekti */}
        <ScaleIn>
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Scale efekti</h2>
            <p>Tämä elementti skaalautuu sisään.</p>
          </div>
        </ScaleIn>

        {/* Rotate efekti */}
        <RotateIn>
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Rotate efekti</h2>
            <p>Tämä elementti pyörähtää paikalleen.</p>
          </div>
        </RotateIn>

        {/* Bounce efekti */}
        <BounceIn>
          <div className="bg-purple-500 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Bounce efekti</h2>
            <p>Tämä elementti pomppaa paikalleen.</p>
          </div>
        </BounceIn>

        {/* Stagger efekti */}
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <StaggerItem key={i}>
                <div className="bg-indigo-500 text-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-bold mb-4">Stagger {i}</h2>
                  <p>Nämä elementit tulevat yksi kerrallaan.</p>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        {/* Interaktiiviset elementit */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Interactive key={i}>
              <div className="bg-pink-500 text-white p-6 rounded-lg shadow-lg cursor-pointer">
                <h2 className="text-2xl font-bold mb-4">Interaktiivinen {i}</h2>
                <p>Hover ja tap efektit. Kokeile!</p>
              </div>
            </Interactive>
          ))}
        </div>
      </div>
    </div>
  );
}
