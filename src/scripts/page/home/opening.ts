import { gsap } from "gsap";

const setOpeningAnimation = (): (() => void) => {
    console.log("呼ばれた");
    const lines = document.querySelectorAll<HTMLDivElement>("[data-page-line]");
    const introText = document.querySelector<HTMLElement>("[data-text='intro']");
    const homeItem = document.querySelectorAll<HTMLElement>("[data-page-item='home']");

    const tl = gsap.timeline();

    tl.to(introText, {
        y: 0,
        duration: 1.8,
        ease: "power4.out",
        delay: 0.7,
    })
        .to(
            introText,
            {
                filter: "blur(4px)",
                opacity: 0,
                duration: 1.2,
                ease: "power4.out",
            },
            ">",
        )
        .to(
            homeItem,
            {
                opacity: 1.3,
                pointerEvents: "all",
                duration: 1.5,
                ease: "power1.inOut",
            },
            ">",
        )
        .to(
            lines,
            {
                clipPath: "inset(0% 0% 0% 0%)",
                delay: 0.4,
                duration: 0.7,
                // stagger: 0.4,
                ease: "linear",
            },
            "<",
        );

    return () => gsap.killTweensOf([lines, homeItem, introText]);
};

export default setOpeningAnimation;
