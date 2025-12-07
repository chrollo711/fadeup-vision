import { motion } from "framer-motion";
import heroImage from "@/assets/hero-home.jpg";

const Hero = () => {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay,
        ease: "easeOut" as const,
      },
    }),
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury modern home at twilight"
          className="h-full w-full object-cover"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/20 to-background/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between px-6 py-8 md:px-12 lg:px-20">
        {/* Navigation */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex items-center justify-between"
        >
          <div className="font-display text-2xl tracking-wider text-foreground">
            HORIZON
          </div>
          <div className="hidden items-center gap-8 font-body text-sm tracking-wide text-foreground/80 md:flex">
            <a href="#" className="transition-colors hover:text-primary">Properties</a>
            <a href="#" className="transition-colors hover:text-primary">About</a>
            <a href="#" className="transition-colors hover:text-primary">Contact</a>
          </div>
          <button className="rounded-full border border-foreground/20 px-6 py-2 font-body text-sm text-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground">
            Get Started
          </button>
        </motion.nav>

        {/* Main Typography */}
        <div className="flex flex-1 flex-col justify-center">
          <div className="relative flex items-center justify-center">
            {/* Left text */}
            <motion.h1
              custom={0.3}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              className="font-display text-[12vw] font-normal leading-none tracking-tight text-foreground md:text-[10vw] lg:text-[9vw]"
            >
              REAL
            </motion.h1>

            {/* Spacer for image visibility */}
            <div className="w-[15vw] md:w-[18vw]" />

            {/* Right text */}
            <motion.h1
              custom={0.5}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              className="font-display text-[12vw] font-normal leading-none tracking-tight text-foreground md:text-[10vw] lg:text-[9vw]"
            >
              XSTATE
            </motion.h1>
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex items-end justify-between">
          {/* Brand badge */}
          <motion.div
            custom={0.7}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="max-w-xs"
          >
            <div className="mb-2 font-display text-xl tracking-widest text-primary">
              HORIZON REALTY
            </div>
            <div className="font-body text-sm italic text-foreground/60">
              — Your Dream Home Awaits
            </div>
          </motion.div>

          {/* Right tagline */}
          <motion.div
            custom={0.9}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="text-right"
          >
            <div className="font-display text-4xl leading-tight tracking-wider text-foreground md:text-5xl lg:text-6xl">
              ENDLESS
            </div>
            <div className="font-display text-4xl leading-tight tracking-wider text-foreground md:text-5xl lg:text-6xl">
              DISCOVERY
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="h-12 w-px animate-pulse bg-gradient-to-b from-transparent via-foreground/50 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
