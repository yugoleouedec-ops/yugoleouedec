import * as React from "react"
import { motion, PanInfo } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface Testimonial {
  id: number | string
  name: string
  avatar: string
  description: string
}

interface TestimonialCarouselProps
  extends React.HTMLAttributes<HTMLDivElement> {
  testimonials: Testimonial[]
  showArrows?: boolean
  showDots?: boolean
}

const TestimonialCarousel = React.forwardRef<
  HTMLDivElement,
  TestimonialCarouselProps
>(
  (
    { className, testimonials, showArrows = true, showDots = true, ...props },
    ref,
  ) => {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [exitX, setExitX] = React.useState<number>(0)
    const [direction, setDirection] = React.useState<1 | -1>(1)

    const handleNext = React.useCallback(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, [testimonials.length])

    const handlePrev = React.useCallback(() => {
      setDirection(-1)
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }, [testimonials.length])

    const handleDragEnd = (
      event: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo,
    ) => {
      if (info.offset.x > 100) {
        setDirection(-1)
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
      } else if (info.offset.x < -100) {
        setDirection(1)
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          "w-full flex flex-col items-center justify-center",
          className
        )}
        {...props}
      >
        {/* Info au-dessus : étoiles + prénom + avis */}
        <div className="w-full flex flex-col items-center text-center mb-8">
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 text-[#EA580C] fill-[#EA580C]" />
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-extrabold text-[#292929]">
                {testimonials[currentIndex]?.name}
              </h3>
              {testimonials[currentIndex]?.description && (
                <p className="mt-1 text-sm text-[#404040]/70 max-w-xs">
                  {testimonials[currentIndex].description}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="w-full flex items-center justify-center">
        {/* Flèche gauche */}
        {showArrows && (
          <button
            onClick={handlePrev}
            className="z-10 mr-6 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:scale-110 hover:shadow-xl active:scale-95"
            aria-label="Avis précédent"
          >
            <ChevronLeft className="h-6 w-6 text-[#1A1A1A]" />
          </button>
        )}

        <div className="relative w-72 sm:w-80 aspect-[4/5]">
          {testimonials.map((testimonial, index) => {
            const isCurrentCard = index === currentIndex
            const isPrevCard =
              index === (currentIndex + 1) % testimonials.length
            const isNextCard =
              index === (currentIndex + 2) % testimonials.length

            if (!isCurrentCard && !isPrevCard && !isNextCard) return null

            return (
              <motion.div
                key={testimonial.id}
                className={cn(
                  "absolute w-full h-full rounded-2xl cursor-grab active:cursor-grabbing",
                  "bg-white shadow-xl",
                )}
                style={{
                  zIndex: isCurrentCard ? 3 : isPrevCard ? 2 : 1,
                }}
                drag={isCurrentCard ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={isCurrentCard ? handleDragEnd : undefined}
                initial={{
                  scale: 0.95,
                  opacity: 0,
                  y: isCurrentCard ? 0 : isPrevCard ? 8 : 16,
                  rotate: isCurrentCard ? 0 : isPrevCard ? -2 : -4,
                }}
                animate={{
                  scale: isCurrentCard ? 1 : 0.95,
                  opacity: isCurrentCard ? 1 : isPrevCard ? 0.6 : 0.3,
                  x: isCurrentCard ? exitX : 0,
                  y: isCurrentCard ? 0 : isPrevCard ? 8 : 16,
                  rotate: isCurrentCard ? exitX / 20 : isPrevCard ? -2 : -4,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </motion.div>
            )
          })}
          {showDots && (
            <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    index === currentIndex
                      ? "bg-[#EA580C]"
                      : "bg-[#1A1A1A]/20",
                  )}
                />
              ))}
            </div>
          )}
        </div>

        {/* Flèche droite */}
        {showArrows && (
          <button
            onClick={handleNext}
            className="z-10 ml-6 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:scale-110 hover:shadow-xl active:scale-95"
            aria-label="Avis suivant"
          >
            <ChevronRight className="h-6 w-6 text-[#1A1A1A]" />
          </button>
        )}
        </div>
      </div>
    )
  },
)
TestimonialCarousel.displayName = "TestimonialCarousel"

export { TestimonialCarousel, type Testimonial }
