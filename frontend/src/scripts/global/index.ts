import setLenis from "@/library/lenis";

type GlobalInit = () => (() => void) | void;

/** 全ページ共通で実行するスクリプトを追加するときはここに import してエントリを追加する */
const GLOBAL_INITS: GlobalInit[] = [setLenis];

let cleanups: Array<() => void> = [];

/** 全ページ共通スクリプトを初期化する */
export const initGlobalScripts = (): void => {
    cleanupGlobalScripts();
    cleanups = GLOBAL_INITS.map((init) => init()).filter(
        (fn): fn is () => void => typeof fn === "function",
    );
};

/** 全ページ共通スクリプトを破棄する */
export const cleanupGlobalScripts = (): void => {
    cleanups.forEach((fn) => fn());
    cleanups = [];
};
