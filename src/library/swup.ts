import Swup from "swup";
import type { Options } from "swup";
import SwupHeadPlugin from "@swup/head-plugin";
import SwupBodyClassPlugin from "@swup/body-class-plugin";
import SwupParallelPlugin from "@swup/parallel-plugin";

const SWUP_CONTAINER = "#swup";

/** トランジション中であることを示す html 要素へのクラス */
const IS_WAIT_CLASS = "is-wait";

const swupOption = (): Partial<Options> => {
    return {
        containers: [SWUP_CONTAINER],
        animationSelector: false, // CSSアニメーションの完了待機を無効化
        animateHistoryBrowsing: true, // ブラウザの戻る・進むボタンを押したときもアニメーションを実行
        plugins: [
            new SwupBodyClassPlugin(),
            new SwupParallelPlugin(),
            new SwupHeadPlugin({ persistAssets: true }),
        ],
    };
};

export { SWUP_CONTAINER, IS_WAIT_CLASS, swupOption, Swup };
