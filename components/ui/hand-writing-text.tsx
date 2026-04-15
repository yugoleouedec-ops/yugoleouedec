"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface HandWrittenTitleProps {
    title?: string;
    className?: string;
}

function HandWrittenTitle({
    title = "Hand Written",
    className,
}: HandWrittenTitleProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: false, margin: "-80px" });

    const draw = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { duration: 2.5, ease: [0.43, 0.13, 0.23, 0.96] as [number, number, number, number] },
                opacity: { duration: 0.5 },
            },
        },
    };

    return (
        <h2 ref={ref} className={`relative inline-block py-4 px-2 ${className || ""}`}>
            <span className="absolute inset-[-15px] sm:inset-[-20px] lg:inset-[-25px]">
                <motion.svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 1200 600"
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="w-full h-full"
                    preserveAspectRatio="none"
                >
                    <title>Circle</title>
                    <motion.path
                        d="M 950 90
                           C 1250 300, 1050 480, 600 520
                           C 250 520, 150 480, 150 300
                           C 150 120, 350 80, 600 80
                           C 850 80, 950 180, 950 180"
                        fill="none"
                        strokeWidth="10"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        variants={draw}
                        className="text-[#EA580C]"
                    />
                </motion.svg>
            </span>
            <span className="relative z-10">{title}</span>
        </h2>
    );
}

export { HandWrittenTitle };
