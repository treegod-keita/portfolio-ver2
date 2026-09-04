import setOpeningAnimation from "@/scripts/page/home/opening";

type PageInit = () => (() => void) | void;

const getPageId = (): string => {
    return document.body.dataset.page ?? "";
};

/** ページ固有スクリプトを追加するときはここに import してエントリを追加する */
const PAGE_INITS: Record<string, PageInit> = {
    home: setOpeningAnimation,
};

let cleanup: (() => void) | null = null;

/** 現在の pageId に対応するページ固有スクリプトを初期化する */
export const initPageScripts = (): void => {
    cleanupPageScripts();
    const init = PAGE_INITS[getPageId()];
    const result = init?.();
    cleanup = result ?? null;
};

/** ページ固有スクリプトを破棄する */
export const cleanupPageScripts = (): void => {
    cleanup?.();
    cleanup = null;
};
