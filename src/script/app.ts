// swup.ts
import { gsap } from "gsap";
import type { Visit } from "swup";
import { IS_WAIT_CLASS, SWUP_CONTAINER, swupOption, Swup } from "@/library/swup";
import { pageTransitionAnimation } from "@/script/modules/animation";
// import layoutChange from "@/scripts/page/blog/layoutChange";

let cleanupExample: (() => void) | null = null;

const getPageId = (): string => {
    return document.body.dataset.page ?? "";
};

/** ページ固有スクリプトを追加するときはここに import してエントリを追加する */
const PAGE_INITS: Record<string, () => (() => void) | void> = {
    // blog: layoutChange,
};

let cleanupPageScripts: (() => void) | null = null;

/** ページ固有スクリプトを初期化する */
const initPageScripts = (): void => {
    cleanupPageScripts?.();
    const init = PAGE_INITS[getPageId()];
    const cleanup = init?.();
    cleanupPageScripts = cleanup ?? null;
};

/** Swup コンテナ内のインラインスクリプトを再実行して astro-island を再ハイドレートする */
const reexecuteInlineScripts = (): void => {
    // visit:end までは旧コンテナ（.is-previous-container）が DOM に残るため、新コンテナのみに絞り込む
    document
        .querySelectorAll<HTMLScriptElement>(
            `${SWUP_CONTAINER}:not(.is-previous-container) script:not([src])`,
        )
        .forEach((script) => {
            const clone = document.createElement("script");
            if (script.type) clone.type = script.type;
            clone.textContent = script.textContent;
            document.head.appendChild(clone);
            clone.remove();
        });
};

let swupInstance: Swup | null = null;

// トランジション中（is-wait 付与中）にリンクをクリックすると、swup が実行中の visit を
// 中断して新しい visit を即座に開始してしまう。そのとき進行中の pageTransitionAnimation の
// Promise はキャンセルされずバックグラウンドで動き続け、新しい visit の SwupParallelPlugin と
// DOM 操作が競合して #swup コンテナが重複するなどの不整合が発生する。
// これを防ぐため、トランジション中のリンククリックはキャプチャフェーズで完全に無効化する。
const preventClickWhileTransitioning = (event: MouseEvent): void => {
    if (!document.documentElement.classList.contains(IS_WAIT_CLASS)) return;
    if ((event.target as HTMLElement | null)?.closest("a[href]")) {
        event.preventDefault();
        event.stopPropagation();
    }
};

/** HMR / 再 init 前にすべて解除する */
const destroyPageTransition = (): void => {
    document.documentElement.classList.remove(IS_WAIT_CLASS);
    gsap.killTweensOf(SWUP_CONTAINER);
    document.removeEventListener("click", preventClickWhileTransitioning, true);

    cleanupExample?.();
    cleanupExample = null;

    cleanupPageScripts?.();
    cleanupPageScripts = null;

    swupInstance?.destroy();
    swupInstance = null;
};

/**
 * Swup 初期化と全フック登録。
 *
 * 使用方法:
 *   import { initPageTransition } from "./pageTransition";
 *   initPageTransition();
 */
export const initPageTransition = (): Swup => {
    destroyPageTransition();

    // 初回ロード時のみ実行したい処理はここに追加する
    // cleanupExample = setupExample() ?? null;
    initPageScripts();

    document.addEventListener("click", preventClickWhileTransitioning, true);

    swupInstance = new Swup(swupOption());
    const swup = swupInstance;

    swup.hooks.on("visit:start", () => {
        document.documentElement.classList.add(IS_WAIT_CLASS);
    });

    swup.hooks.on("content:replace", () => {
        initPageScripts();

        // SwupParallelPlugin により visit:end までは旧コンテナ（.is-previous-container）が
        // DOM に残り続けるため、単に "#swup script" で選択すると旧ページのスクリプトも
        // 再実行されてしまう。新しいコンテナのみに絞り込む。
        document
            .querySelectorAll(`${SWUP_CONTAINER}:not(.is-previous-container) script`)
            .forEach((oldScript) => {
                const newScript = document.createElement("script");
                Array.from(oldScript.attributes).forEach((attr) =>
                    newScript.setAttribute(attr.name, attr.value),
                );
                newScript.appendChild(document.createTextNode(oldScript.innerHTML));
                oldScript.parentNode?.replaceChild(newScript, oldScript);
            });
    });

    swup.hooks.on("animation:in:await", async (visit, args) => {
        args.skip = true;

        const nextWrapper = document.querySelector<HTMLElement>(SWUP_CONTAINER);
        if (!nextWrapper) return;

        await pageTransitionAnimation();

        reexecuteInlineScripts();
    });

    swup.hooks.replace("content:scroll", () => {
        return false;
        // Swupの自動スクロールリセットを無効化
    });

    swup.hooks.on("fetch:error", (visit: Visit) => {
        document.documentElement.classList.remove(IS_WAIT_CLASS);
        window.location.assign(visit.to.url);
    });

    swup.hooks.on("visit:end", () => {
        document.documentElement.classList.remove(IS_WAIT_CLASS);
    });

    swup.hooks.on("visit:abort", () => {
        document.documentElement.classList.remove(IS_WAIT_CLASS);
    });

    if (import.meta.hot) {
        import.meta.hot.dispose(destroyPageTransition);
    }

    return swup;
};
