export const AuthenticatePageVariants = {
  initial: { originY: 0, scaleY: 0 },
  animate: {
    scaleY: 1,
    transition: { duration: 0.5, type: "spring" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, type: "spring" },
  },
};
