"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

interface IMessageFAQProps {
  data: FAQItem[];
  title?: string;
  subtitle?: string;
  profileImage?: string;
  senderName?: string;
  className?: string;
}

const springTransition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 35,
  mass: 0.8,
};

export default function ScrollFAQAccordion({
  data,
  title = "Questions fr\u00e9quentes",
  subtitle,
  profileImage,
  senderName = "Yugo Le Ouedec",
  className,
}: IMessageFAQProps) {
  const [openItems, setOpenItems] = React.useState<Set<number>>(new Set([data[0]?.id]));

  const toggleItem = (id: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className={cn("max-w-4xl mx-auto text-center py-16", className)}>
      <h2 className="text-[2.6rem] font-extrabold tracking-[0.02em] sm:text-[3.25rem] lg:text-[3.9rem] mb-2 whitespace-nowrap">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[#404040]/70 mb-6">{subtitle}</p>
      )}

      <div className="mt-10 rounded-2xl bg-white p-6 sm:p-8">
        <div className="flex flex-col gap-3 sm:gap-4 font-sans">
          {data.map((item) => {
            const isOpen = openItems.has(item.id);

            return (
              <div key={item.id} className="flex flex-col gap-0">
                {/* Question — sent bubble (right) */}
                <div className="flex justify-end">
                  <div className="imsg-sent relative max-w-[85%] sm:max-w-[70%] lg:max-w-[60%]">
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="relative z-[1] w-full rounded-[18px] bg-[#007AFF] px-4 py-3 text-white text-[16px] font-normal font-sans leading-[1.4] text-left cursor-pointer transition-opacity hover:opacity-90"
                    >
                      {item.question}
                    </button>
                  </div>
                </div>

                {/* Answer — always in DOM, animated height */}
                <motion.div
                  animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                    marginTop: isOpen ? 8 : 0,
                  }}
                  initial={false}
                  transition={springTransition}
                  className="overflow-hidden"
                >
                  <div className="flex justify-start">
                    <div className="flex flex-col items-start max-w-[85%] sm:max-w-[70%] lg:max-w-[60%]">
                      {/* Sender name */}
                      <span
                        className="text-[13px] font-semibold font-sans mb-1 ml-11 sm:ml-12"
                        style={{ color: 'rgba(0,0,0,0.45)' }}
                      >
                        {senderName}
                      </span>

                      <div className="flex items-end gap-2">
                        {/* Profile picture */}
                        <div className="flex-shrink-0">
                          {profileImage ? (
                            <Image
                              src={profileImage}
                              alt={senderName}
                              width={32}
                              height={32}
                              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover"
                              style={{ border: '1px solid rgba(0,0,0,0.05)' }}
                            />
                          ) : (
                            <div
                              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[11px] sm:text-[13px] font-bold text-white"
                              style={{
                                background: 'linear-gradient(135deg, #2D5016 0%, #3A6B1F 100%)',
                                border: '1px solid rgba(0,0,0,0.05)',
                              }}
                            >
                              YL
                            </div>
                          )}
                        </div>

                        {/* Bubble */}
                        <div className="imsg-received relative">
                          <div
                            className="relative z-[1] rounded-[18px] bg-[#E5E5EA] px-4 py-3 text-black text-[16px] font-normal font-sans leading-[1.4] text-left"
                          >
                            <span className="whitespace-pre-line">{item.answer}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
