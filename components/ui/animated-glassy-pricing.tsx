import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { RippleButton } from "@/components/ui/multi-type-ripple-buttons";

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="3"
    strokeLinecap="round" strokeLinejoin="round"
    className={className}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export interface FeatureSection {
  title: string;
  items: string[];
}

export interface PricingCardProps {
  planName: string;
  description: string;
  price: string;
  features: string[];
  featureSections?: FeatureSection[];
  bottomNote?: string;
  buttonText: string;
  buttonHref?: string;
  isPopular?: boolean;
  buttonVariant?: 'primary' | 'secondary';
  discountPrice?: string;
  discountLabel?: string;
  secondaryLinkText?: string;
  secondaryLinkHref?: string;
  buttonDisabled?: boolean;
}

export const PricingCard = ({
  planName, description, price, features, featureSections, bottomNote, buttonText, buttonHref, isPopular = false, buttonVariant = 'primary', discountPrice, discountLabel, secondaryLinkText, secondaryLinkHref, buttonDisabled = false, index = 0,
}: PricingCardProps & { index?: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, margin: '-60px' });
  const cardClasses = `
    backdrop-blur-[14px] bg-gradient-to-br rounded-2xl shadow-xl flex-1 max-w-xs px-7 py-8 flex flex-col transition-all duration-300
    from-white/80 to-white/40 border border-[#1A1A1A]/10
    ${isPopular ? 'scale-105 relative ring-2 ring-[#EA580C]/30 from-white/90 to-white/60 border-[#EA580C]/20 shadow-[0_0_30px_rgba(234,88,12,0.25),0_0_60px_rgba(234,88,12,0.1)]' : ''}
  `;
  const buttonClasses = `
    mt-auto w-full py-2.5 rounded-xl font-semibold text-[14px] transition font-sans
    ${buttonVariant === 'primary'
      ? 'bg-[#EA580C] hover:bg-[#b8531e] text-white'
      : 'bg-[#1A1A1A]/10 hover:bg-[#1A1A1A]/20 text-[#1A1A1A] border border-[#1A1A1A]/20'
    }
  `;

  const handleClick = () => {
    if (!buttonHref) return;
    if (buttonHref.startsWith('#')) {
      const el = document.querySelector(buttonHref);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (buttonHref.startsWith('/')) {
      window.location.href = buttonHref;
    } else {
      window.open(buttonHref, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={`${cardClasses.trim()} ${isPopular ? 'overflow-visible' : ''}`}
      style={isPopular ? { position: 'relative' } : undefined}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView
        ? { opacity: 1, y: 0, scale: isPopular ? 1.05 : 1 }
        : { opacity: 0, y: 16 }
      }
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {isPopular && (
        <>
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes orbit-glow {
              0%    { top: 0;    left: 0;    }
              12.5% { top: 0;    left: 50%;  }
              25%   { top: 0;    left: 100%; }
              37.5% { top: 50%;  left: 100%; }
              50%   { top: 100%; left: 100%; }
              62.5% { top: 100%; left: 50%;  }
              75%   { top: 100%; left: 0;    }
              87.5% { top: 50%;  left: 0;    }
              100%  { top: 0;    left: 0;    }
            }
          `}} />
          <div
            className="absolute -z-10 pointer-events-none rounded-full"
            style={{
              width: 24,
              height: 24,
              background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.6) 35%, transparent 70%)',
              boxShadow: '0 0 24px 10px rgba(255,255,255,0.5), 0 0 50px 20px rgba(255,255,255,0.2)',
              animation: 'orbit-glow 12s linear infinite',
              transform: 'translate(-50%, -50%)',
            }}
          />
          <div className="absolute -top-4 right-4 px-3 py-1 text-[12px] font-semibold rounded-full bg-[#EA580C] text-white z-10">
            Le plus Populaire
          </div>
        </>
      )}
      <div className="mb-3">
        <h2 className="text-[2rem] font-extrabold tracking-[-0.02em] text-[#1A1A1A]">{planName}</h2>
        <p className="text-[14px] text-[#404040]/70 mt-1 font-sans">{description}</p>
      </div>
      <div className="my-6 flex items-baseline gap-2 flex-wrap">
        <span className="text-[2.5rem] font-normal text-[#1A1A1A]">{price}</span>
        {discountPrice && (
          <>
            <span className="text-[1.1rem] text-[#404040]/50 line-through">{discountPrice}</span>
            {discountLabel && <span className="text-[0.8rem] font-semibold"><span className="text-[#404040]/50">avec </span><span className="text-[#EA580C]">Yugo Access</span></span>}
          </>
        )}
      </div>
      <div className="w-full mb-5 h-px bg-[linear-gradient(90deg,transparent,rgba(0,0,0,0.1)_50%,transparent)]" />
      {featureSections ? (
        <div className="flex flex-col gap-4 text-[14px] text-[#404040] mb-6 font-sans">
          {featureSections.map((section, si) => (
            <div key={si}>
              <p className="text-[12px] font-bold text-[#1A1A1A] uppercase tracking-wide mb-2">{section.title}</p>
              <ul className="flex flex-col gap-1.5 ml-1">
                {section.items.map((item, ii) => (
                  <li key={ii} className="flex items-start gap-2">
                    <CheckIcon className="text-[#EA580C] w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span className="text-[13px] leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {bottomNote && (
            <p className="text-[12px] text-[#404040]/60 text-center mt-2 font-medium">{bottomNote}</p>
          )}
        </div>
      ) : (
        <ul className="flex flex-col gap-2 text-[14px] text-[#404040] mb-6 font-sans">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <CheckIcon className="text-[#EA580C] w-4 h-4 flex-shrink-0" /> {feature}
            </li>
          ))}
        </ul>
      )}
      <RippleButton className={`${buttonClasses.trim()} ${buttonDisabled ? 'opacity-70 cursor-default' : ''}`} onClick={buttonDisabled ? undefined : handleClick}>{buttonText}</RippleButton>
      {secondaryLinkText && secondaryLinkHref && (
        <a href={secondaryLinkHref} className="mt-2 block text-center text-[13px] text-[#404040]/50 hover:text-[#404040]/80 transition-colors font-sans">
          {secondaryLinkText}
        </a>
      )}
    </motion.div>
  );
};

interface PricingSectionProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  plans: PricingCardProps[];
}

export const PricingSection = ({
  title,
  subtitle,
  plans,
}: PricingSectionProps) => {
  return (
    <div className="w-full">
      <div className="w-full max-w-5xl mx-auto text-center mb-14">
        <h2 className="text-[2.6rem] font-extrabold tracking-[0.02em] text-[#1A1A1A] sm:text-[3.25rem] lg:text-[3.9rem] -mt-[30px]">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-[16px] md:text-[18px] text-[#404040]/70 max-w-2xl mx-auto font-sans">
            {subtitle}
          </p>
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-8 md:gap-6 justify-center items-center w-full max-w-4xl mx-auto">
        {plans.map((plan, i) => <PricingCard key={plan.planName} {...plan} index={i} />)}
      </div>
    </div>
  );
};
