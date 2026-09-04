// animation.ts
import { gsap } from "gsap";

const pageTransitionAnimation = async (): Promise<void> => {
    // 入場アニメーション
    const previous = document.querySelector(".is-previous-container") as HTMLElement;
    const next = document.querySelector("#swup:not(.is-previous-container)") as HTMLElement;

    const scrollY = window.scrollY;

    // previous/next を position: absolute にするとフローから外れ、
    // その場所にあった高さが失われて Footer が繰り上がってしまう。
    // body の min-height ではなく、実際に main が占めていた場所に
    // 高さ分のスペーサーを差し込んでフローを維持する。
    const spacer = document.createElement("div");
    spacer.setAttribute("data-swup-transition-spacer", "");
    spacer.style.height = `${previous.offsetHeight}px`;
    previous.insertAdjacentElement("afterend", spacer);

    gsap.set(previous, {
        position: "absolute",
        top: scrollY,
        left: 0,
        width: "100%",
        zIndex: 0,
    });
    gsap.set(next, {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        y: "100%",
        zIndex: 1,
    });

    await Promise.all([
        gsap.fromTo(
            previous,
            { filter: "brightness(1)" },
            { y: -200, filter: "brightness(0.3)", duration: 1.4, ease: "power4.inOut" },
        ),
        gsap.to(next, { y: "0%", duration: 1.4, ease: "power4.inOut" }),
    ]);

    // gsap.set(next, { y: "" }) のように個別プロパティを空文字に戻しても
    // transform: translate(0px, 0px) が inline style に残ってしまうことがある。
    // transform が none 以外だと子要素の position: fixed の基準がこの要素になってしまい
    // （Lines コンポーネントなどが画面に固定されなくなる）、clearProps で完全に除去する。
    gsap.set(next, { clearProps: "all" });
    spacer.remove();
    window.scrollTo(0, 0); // アニメーション完了後にリセット
};

export { pageTransitionAnimation };
