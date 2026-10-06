"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
  { id: 1, question: "How do I request for a survey?", answer: "In the header you can see the Request a Button. Click it and you will be a page. You can also search in the search bar. You can also search in the search bar." },
  { id: 2, question: "How do I request for a survey?", answer: "Answer details go here..." },
  { id: 3, question: "How do I request for a survey?", answer: "Answer details go here..." },
  { id: 4, question: "How do I request for a survey?", answer: "Answer details go here..." },
  { id: 5, question: "How do I request for a survey?", answer: "Answer details go here..." },
  { id: 6, question: "How do I request for a survey?", answer: "Answer details go here..." },
];

type FaqItem = {
  id: number;
  question: string;
  answer: string;
};

// Animation variants for the entrance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }, // Delay between each card appearing
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleId = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="bg-[#FBFBFB] py-16 md:py-24">
      <motion.div 
        className="mx-auto max-w-7xl px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }} // Triggers when 100px into view
        variants={containerVariants}
      >
        {/* HEADER ANIMATION */}
        <motion.div variants={cardVariants} className="mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1B2A] md:text-5xl">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg font-medium text-gray-500">
            Find Answers to Common Questions About Our Services
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-6">
            {faqData.filter((_, index) => index % 2 === 0).map((item) => (
              <motion.div key={item.id} variants={cardVariants}>
                <FAQCard 
                  item={item} 
                  isOpen={openId === item.id} 
                  toggle={() => toggleId(item.id)} 
                />
              </motion.div>
            ))}
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-6">
            {faqData.filter((_, index) => index % 2 !== 0).map((item) => (
              <motion.div key={item.id} variants={cardVariants}>
                <FAQCard 
                  item={item} 
                  isOpen={openId === item.id} 
                  toggle={() => toggleId(item.id)} 
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function FAQCard({ item, isOpen, toggle }: Readonly<{ item: FaqItem; isOpen: boolean; toggle: () => void }>) {
  return (
    <motion.div 
      layout
      onClick={toggle}
      className={`cursor-pointer rounded-2xl p-8 transition-all duration-500 ${
        isOpen
          ? "bg-gradient-to-br from-[#EDDBCF] to-[#C29C84] text-white shadow-xl"
          : "bg-white text-[#0D1B2A] shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-xl hover:-translate-y-1"
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold leading-tight pr-4">{item.question}</h3>
        <motion.div 
          animate={{ rotate: isOpen ? 180 : 0 }}
          /* Square background is back here */
          className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-500 ${
            isOpen ? "bg-black/20" : "bg-[#F1F5F9]"
          }`}
        >
          <motion.span className="absolute" animate={{ opacity: isOpen ? 0 : 1 }}>+</motion.span>
          <motion.span className="absolute" animate={{ opacity: isOpen ? 1 : 0 }}>−</motion.span>
        </motion.div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-sm leading-relaxed opacity-90">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}