import { gsap } from "gsap";

// SPA内で一度再生したら記録しておき、home に戻ってきたときは再生しない（フルリロード時は
// モジュールごと読み直されるためリセットされ、再度アニメーションが実行される）
let hasPlayedOnce = false;

const setOpeningAnimation = (): (() => void) => {
    const lines = document.querySelectorAll<HTMLDivElement>("[data-page-line]");
    const introText = document.querySelector<HTMLElement>("[data-text='intro']");
    const homeItem = document.querySelectorAll<HTMLElement>("[data-opening-item='home']");
    const header = document.querySelector<HTMLElement>("[data-page-item='header']");
    const footer = document.querySelector<HTMLElement>("[data-page-item='footer']");

    if (hasPlayedOnce) {
        // 非表示→表示のアニメーションを飛ばし、再生完了後の状態に直接固定する
        gsap.set(introText, { y: 0, filter: "blur(0px)", opacity: 0 });
        gsap.set([homeItem, header, footer], { opacity: 1, pointerEvents: "all" });
        gsap.set(lines, { clipPath: "inset(0% 0% 0% 0%)" });
        return () => gsap.killTweensOf([lines, homeItem, introText, header, footer]);
    }
    hasPlayedOnce = true;

    const tl = gsap.timeline();

    gsap.to([header, footer], {
        opacity: 0,
        duration: 0.8,
    });

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
            [homeItem, header, footer],
            {
                opacity: 1,
                pointerEvents: "all",
                duration: 1.5,
                ease: "power1.inOut",
                onComplate: () => {
                    console.log("ヘッダー表示");
                },
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

    return () => gsap.killTweensOf([lines, homeItem, introText, header, footer]);
};

export default setOpeningAnimation;
