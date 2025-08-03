import gsap from "gsap";

// Import GSAP plugins
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

export const handleScrambleHover = (textEl: HTMLParagraphElement | null) => {
  if (!textEl || gsap.isTweening(textEl)) return;

  gsap.to(textEl, {
    duration: 0.5,
    ease: "sine.in",
    scrambleText: {
      text: textEl.innerHTML,
      speed: 1,
      chars: "ABCDEMNOPQRSTUVWXYZabcdefghijklmnopqrstuv",
    },
  });
};


export const animateWithGsap = (
  target: any,
  animationProps: any,
  scrollProps: any
) => {
  gsap.to(target, {
    ...animationProps,
    scrollTrigger: {
      trigger: target,
      toggleActions: "restart reverse restart reverse",
      start: "top 85%",
      ...scrollProps,
    },
  });
};

