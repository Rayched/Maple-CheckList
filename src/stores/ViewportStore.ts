//Viewport-width store
/**
 * 프로젝트 전체에서 중복 선언된
 * viewport width state, 전역 상태화 (실험 단계)
 */

import { create } from "zustand";

interface I_ViewportWidth_Store {
    NowViewportWidthValue: number;
    setNowViewportWidthValue: (newValue: number) => void;
};

export const ViewportWidthStore = create<I_ViewportWidth_Store>((set) => ({
    NowViewportWidthValue: 0,
    setNowViewportWidthValue: (newValue) => set({NowViewportWidthValue: newValue})
}));