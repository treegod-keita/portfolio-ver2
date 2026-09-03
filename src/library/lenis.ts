import Lenis from "lenis";
import { SWUP_CONTAINER } from "@/library/swup";

/**
 * #swup がスクロールコンテナ（h-screen + overflow-y-scroll）のため、
 * window ではなく #swup 要素を wrapper に指定する必要がある。
 */
const setLenis = (): (() => void) => {
    const wrapper = document.querySelector<HTMLElement>(SWUP_CONTAINER);

    const lenis = new Lenis({
        wrapper: wrapper ?? window,
        autoRaf: true,
        anchors: true,
    });

    lenis.scrollTo(0, {
        duration: 0.1,
    });

    return () => {
        lenis.destroy();
    };
};

export default setLenis;