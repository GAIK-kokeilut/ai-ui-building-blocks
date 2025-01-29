"use client";
import { Template } from "@/lib/types/template";
import { motion } from "framer-motion";
import { MoveUpRight } from "lucide-react";
import Link from "next/link";

interface TemplateCardProps {
  template: Template;
}

export const TemplateCard = ({ template }: TemplateCardProps) => {
  const showArrow = template.link;

  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
      className="group bg-white dark:bg-gray-800/50 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm"
    >
      <div className="p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 group-hover:bg-blue-100 dark:group-hover:bg-blue-900 group-hover:text-blue-700 dark:group-hover:text-blue-200 transition-colors duration-300">
              {template.icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              {template.title}
            </h3>
          </div>
          {showArrow && (
            <Link
              href={template.route}
              className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-200 transition-all duration-300 hover:scale-105"
              title="Avaa kategoria"
            >
              <MoveUpRight className="w-6 h-6" />
            </Link>
          )}
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 leading-relaxed">
          {template.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {template.tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 text-sm font-medium border border-gray-100 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {tag}
            </span>
          ))}
        </div>

        {template.subTemplates && (
          <div className="mt-6 space-y-4 pt-6 border-t border-gray-100 dark:border-gray-700/50">
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Sisältää:
            </p>
            {template.subTemplates.map((sub) => (
              <Link
                key={sub.route}
                href={sub.route}
                className="block p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 border border-gray-100 dark:border-gray-600 hover:border-gray-200 dark:hover:border-gray-500"
              >
                <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  {sub.title}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {sub.description}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};
