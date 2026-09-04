// src/scripts/constants/easing.ts

/**
 * プロジェクト全体で使うカスタムイージング(cubic-bezier)を一元管理する。
 * GSAPの ease オプションにそのまま渡せる文字列として定義する。
 */
export const EASE = {
    customInOut3: "cubic-bezier(0.65, 0.05, 0.36, 1)",
} as const;
