"use client"
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useId, useState } from "react";
import { FAQ } from "../../utils/constants/faq";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section className="relative w-full px-6 py-24 bg-gray-50">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mb-4 inline-flex rounded-full  p-3"
            aria-hidden="true"
          >
            <HelpCircle
              className="h-8 w-8 text-black"
              aria-hidden="true"
            />
          </motion.div>
          <h2 className="mb-4 text-gray-800 text-3xl font-bold sm:text-4xl md:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-gray-800 text-[var(--foreground)]/70 sm:text-base md:text-lg">
            Everything you need to know about our product
          </p>
        </motion.div>

        <div className="space-y-4">
          {FAQ.map((faq, index) => {
            const questionId = `${baseId}-question-${index}`;
            const answerId = `${baseId}-answer-${index}`;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                  <div className="overflow-hidden rounded-xl bg-white border border-gray-200 px-6 py-5 transition hover:border-gray-300 text-gray-600">
                  <div>
                    <motion.button
                      type="button"
                      onClick={() =>
                        setOpenIndex(openIndex === index ? null : index)
                      }
                      className="flex w-full items-center justify-between gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-md"
                      whileHover={{ x: 4 }}
                      aria-expanded={openIndex === index}
                      aria-controls={answerId}
                      id={questionId}
                    >
                  <span className="text-lg font-semibold ">
                        {faq.question}
                      </span>
                      <motion.div
                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        aria-hidden="true"
                      >
                        <ChevronDown className="h-5 w-5 text-[var(--foreground)]/60" />
                      </motion.div>
                    </motion.button>
                  </div>

                  <AnimatePresence initial={false}>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        role="region"
                        id={answerId}
                        aria-labelledby={questionId}
                      >
                        <div className="pt-4">
                              <p className="text-sm leading-relaxed ">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
