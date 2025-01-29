"use client";
import { animate, scroll } from "motion/react";
import { useEffect, useRef } from "react";

interface ImageType {
  id: string;
  src: string;
  title: string;
}

const images: ImageType[] = [
  {
    id: "001",
    src: "/image-1.jpg",
    title: "#001",
  },
  {
    id: "002",
    src: "/image-1.jpg",
    title: "#002",
  },
  {
    id: "003",
    src: "/image-1.jpg",
    title: "#003",
  },
  {
    id: "004",
    src: "/image-1.jpg",
    title: "#004",
  },
];

const Section = ({ image }: { image: ImageType }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (sectionRef.current && titleRef.current) {
      return scroll(
        animate(titleRef.current, { y: [-400, 400] }, { ease: "linear" }),
        {
          target: sectionRef.current,
          offset: ["start end", "end start"],
        },
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="h-screen snap-start flex justify-center items-center relative"
    >
      <div className="w-[300px] h-[400px] bg-white overflow-hidden m-5">
        <img
          src={image.src}
          alt={image.title}
          className="w-full h-full object-cover"
        />
        <h2
          ref={titleRef}
          className="absolute text-[50px] font-bold tracking-[-3px] font-mono"
          style={{
            color: "var(--accent)",
            left: "calc(50% + 120px)",
            top: "calc(50% - 25px)",
          }}
        >
          {image.title}
        </h2>
      </div>
    </section>
  );
};

const ScrollGallery = () => {
  const progressRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && progressRef.current) {
      return scroll(
        animate(progressRef.current, { scaleX: [0, 1] }, { ease: "linear" }),
        {
          target: containerRef.current,
          offset: ["start end", "end end"],
        },
      );
    }
  }, []);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        style={
          {
            "--black": "#0f1115",
            "--white": "#f5f5f5",
            "--yellow": "#fff312",
            "--accent": "var(--yellow)",
            background: "var(--black)",
          } as React.CSSProperties
        }
      >
        {images.map((image) => (
          <Section key={image.id} image={image} />
        ))}
      </div>
      {/* Progress bar rajattu snap-scroll osioon */}
      <div
        ref={progressRef}
        className="absolute left-0 right-0 h-[5px] bottom-[50px] origin-left bg-[var(--accent)]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
};

const FullPage = () => {
  return (
    <div>
      {/* Snap-scrolling osuus */}
      <div className="h-screen overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth-snap relative">
        {/* Hero Section */}
        <section className="h-screen snap-start bg-gray-900 flex items-center justify-center">
          <h1 className="text-white text-4xl">Scroll Down</h1>
        </section>

        {/* Gallery */}
        <ScrollGallery />

        {/* Footer Section */}
        <section className="h-screen snap-start bg-gray-900 flex items-center justify-center">
          <h1 className="text-white text-4xl">Footer Section</h1>
        </section>
      </div>

      {/* Normaali scrollaus osuus */}
      <div className="bg-gray-800 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-white mb-8">
            Normal Scrolling Section
          </h2>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl text-white mb-4">Section {item}</h3>
                <p className="text-gray-300">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPage;
