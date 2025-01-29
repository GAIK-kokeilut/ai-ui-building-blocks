"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Activity,
  BarChart3,
  FolderGit2,
  PieChart,
  Users,
  Users2,
} from "lucide-react";
import React, { ReactNode, useState } from "react";

export const StaggedContainer = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.15,
          },
        },
        hidden: {},
      }}
    >
      {children}
    </motion.div>
  );
};

const GridItem = ({
  className,
  title,
  children,
  icon: Icon,
}: {
  className?: string;
  title?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={cn(
        "flex flex-col transition-all duration-700 ease-out hover:shadow-lg relative",
        className,
        isHovered && "scale-[1.02]",
      )}
      variants={{
        hidden: {
          opacity: 0,
          y: 20,
          scale: 0.95,
        },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            type: "spring",
            duration: 0.8,
            bounce: 0.3,
          },
        },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
        transition: {
          duration: 0.3,
          ease: "easeOut",
        },
      }}
    >
      {/* Border glow efekti */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        animate={
          isHovered
            ? {
                boxShadow: "0 0 0 1px rgba(var(--primary-rgb), 0.2)",
              }
            : {
                boxShadow: "0 0 0 0px rgba(var(--primary-rgb), 0)",
              }
        }
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
      />

      <div className="flex flex-col p-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {Icon && (
              <motion.div
                animate={
                  isHovered
                    ? {
                        rotate: [0, -5, 5, 0],
                        scale: 1.1,
                      }
                    : {
                        rotate: 0,
                        scale: 1,
                      }
                }
                transition={{
                  duration: 0.6,
                  ease: [0.4, 0, 0.2, 1],
                  rotate: {
                    times: [0, 0.2, 0.5, 0.8],
                    repeatDelay: 1,
                  },
                }}
                className="text-primary flex-shrink-0"
              >
                {Icon}
              </motion.div>
            )}
            <motion.h3
              className={cn(
                "text-base md:text-lg transition-all duration-500 ease-out whitespace-nowrap",
                isHovered ? "font-semibold" : "font-medium",
              )}
              animate={isHovered ? { x: 3, scale: 1.02 } : { x: 0, scale: 1 }}
              transition={{
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              {title}
            </motion.h3>
          </div>
          {isHovered && title !== "Opiskelijatiimi" && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
                delay: 0.1,
              }}
              className="text-xs font-medium text-muted-foreground whitespace-nowrap"
            >
              Näytä lisää →
            </motion.div>
          )}
        </div>
      </div>
      <motion.div
        className="flex-1 px-4 pb-4 relative z-10"
        animate={
          isHovered
            ? {
                y: -3,
                scale: 1.01,
              }
            : {
                y: 0,
                scale: 1,
              }
        }
        transition={{
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default function Grid() {
  return (
    <div className="w-full p-4 lg:p-8">
      <StaggedContainer>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Bento Grid Template</h1>
            <p className="text-muted-foreground">
              Example of Bento Grid template using shadcn/ui components
            </p>
          </div>
          <GridItem
            className="col-span-1 lg:col-span-2 xl:col-span-3 bg-card rounded-xl border shadow"
            title="Yleiskatsaus"
            icon={<BarChart3 size={24} />}
          >
            <div className="flex flex-col space-y-4">
              <p className="text-muted-foreground">
                Tervetuloa Höpö-Helian opiskelijaportaaliin! Täältä näet
                keskeiset tiedot opinnoistasi ja kampuksen tapahtumista.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">
                    Opintopisteet
                  </span>
                  <span className="text-lg font-medium">125/240</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">
                    Keskiarvo
                  </span>
                  <span className="text-lg font-medium">4.2/5</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">
                    Aktiiviset kurssit
                  </span>
                  <span className="text-lg font-medium">4</span>
                </div>
              </div>
            </div>
          </GridItem>

          <GridItem
            className="bg-card rounded-xl border shadow"
            title="Opiskelijatilastot"
            icon={<Users size={24} />}
          >
            <div className="space-y-4">
              <div className="flex justify-between">
                <div>
                  <h4 className="text-sm font-medium">
                    Opiskelijoita yhteensä
                  </h4>
                  <p className="text-2xl font-bold">10,543</p>
                  <span className="text-xs text-muted-foreground">
                    Kaikki kampukset
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Paikalla tänään</h4>
                  <p className="text-2xl font-bold">3,478</p>
                  <span className="text-xs text-muted-foreground">
                    +15% eilisestä
                  </span>
                </div>
              </div>
              <div className="h-40 bg-muted/50 rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground">
                  Opiskelijamäärän kehitys
                </span>
              </div>
            </div>
          </GridItem>

          <GridItem
            className="bg-card rounded-xl border shadow"
            title="Kampusaktiviteetit"
            icon={<Activity size={24} />}
          >
            <div className="space-y-3">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Tulevat tapahtumat</h4>
                <div className="space-y-2">
                  <div className="bg-muted/30 p-2 rounded">
                    <p className="font-medium">Yrittäjyyspäivä</p>
                    <span className="text-sm text-muted-foreground">
                      15.1.2025 - Pasila
                    </span>
                  </div>
                  <div className="bg-muted/30 p-2 rounded">
                    <p className="font-medium">IT-alan rekrymessut</p>
                    <span className="text-sm text-muted-foreground">
                      22.1.2025 - Malmi
                    </span>
                  </div>
                  <div className="bg-muted/30 p-2 rounded">
                    <p className="font-medium">Kansainvälisyysviikko</p>
                    <span className="text-sm text-muted-foreground">
                      29.1.2025 - Kaikki kampukset
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </GridItem>

          <GridItem
            className="bg-card rounded-xl border shadow"
            title="Kurssitilastot"
            icon={<PieChart size={24} />}
          >
            <div className="w-full flex flex-col space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="bg-muted/30 p-3 rounded h-full">
                  <h4 className="text-sm font-medium">Suosituimmat kurssit</h4>
                  <div className="text-sm mt-2 space-y-1">
                    <p>1. Ohjelmoinnin perusteet</p>
                    <p>2. Digiosaaminen</p>
                    <p>3. Business English</p>
                  </div>
                </div>
                <div className="bg-muted/30 p-3 rounded h-full">
                  <h4 className="text-sm font-medium">Arvosanat</h4>
                  <div className="mt-2">
                    <p className="text-sm">Keskiarvo: 3.8/5</p>
                    <p className="text-sm">Mediaani: 4/5</p>
                  </div>
                </div>
              </div>
              <div className="w-full bg-muted/30 p-3 rounded min-h-[96px]">
                <div className="flex items-center justify-center h-full">
                  <span className="text-sm text-muted-foreground">
                    Arvosanajakauma
                  </span>
                </div>
              </div>
            </div>
          </GridItem>
          <GridItem
            className="lg:col-span-2 bg-card rounded-xl border shadow"
            title="Viimeisimmät projektit"
            icon={<FolderGit2 size={24} />}
          >
            <div className="space-y-4">
              <div className="grid gap-3">
                <div className="bg-muted/30 p-3 rounded">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Verkkosivuston uudistus</h4>
                      <p className="text-sm text-muted-foreground">
                        Web-ohjelmointi
                      </p>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      Aktiivinen
                    </span>
                  </div>
                </div>
                <div className="bg-muted/30 p-3 rounded">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">
                        Mobiilisovellus startup-yritykselle
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Innovaatioprojekti
                      </p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      Suunnittelussa
                    </span>
                  </div>
                </div>
                <div className="bg-muted/30 p-3 rounded">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Markkinointikampanja</h4>
                      <p className="text-sm text-muted-foreground">
                        Digitaalinen markkinointi
                      </p>
                    </div>
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                      Tarkistuksessa
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </GridItem>

          <GridItem
            className="bg-card rounded-xl border shadow"
            title="Opiskelijatiimi"
            icon={<Users2 size={24} />}
          >
            <div className="space-y-4">
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Aktiiviset tiimit</h4>
                <div className="space-y-2">
                  {["Ohjelmistokehitys", "UX/UI Suunnittelu", "Tietoturva"].map(
                    (team, index) => (
                      <div key={team} className="bg-muted/30 p-3 rounded">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{team}</p>
                            <span className="text-sm text-muted-foreground">
                              {4 + index} jäsentä
                            </span>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-xs font-medium text-primary hover:text-primary/80"
                          >
                            Näytä lisää →
                          </motion.button>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </GridItem>
        </div>
      </StaggedContainer>
    </div>
  );
}
