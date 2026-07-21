//Registration_flag (스케줄러 등록 여부)
/**
 * true => 스케줄러 등록 O
 * false => 스케줄러 등록 X
 * 
 * 버튼 통해 전체 스케줄러, 메할일 데이터를 보여줄지
 * 아니면 스케줄러에 등록된 메할일 데이터만 보여줄 지
 * 관리하는 store (local 저장 X)
 */

import { create } from "zustand";

interface I_RegistFlagStore {
    ShowAllRegist: boolean;
    setShowAllRegist: (value: boolean) => void;
};

export const RegistFlagStore = create<I_RegistFlagStore>((set) => ({
    ShowAllRegist: false,
    setShowAllRegist: (value) => set({ShowAllRegist: value})
}))
