export const landingModalVariants = {
  initial: { scaleY: 0 },
  animate: {
    scaleY: 1.4,
    transition: { duration: 0.3, type: "spring", stiffness: 100 },
  },
  exit: {
    translateX: "110%",
    transition: { delay: 0.15, duration: 0.2, type: "spring", stiffness: 100 },
  },
};

export const landingHeaderVariants = {
  initial: { translateX: "-20%" },
  animate: {
    translateX: 0,
    transition: {
      duration: 0.4,
      type: "spring",
      stiffness: 100,
      delayChildren: 0.2,
    },
  },
  exit: {
    translateX: "-150%",
    transition: {
      duration: 0.4,
      type: "spring",
      stiffness: 100,
    },
  },
};
