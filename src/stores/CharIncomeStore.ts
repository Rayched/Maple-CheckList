/**
 * '/incomes' page, 전역 상태
 * - 캐릭터 별 주간보스 수익 데이터를 관리하는 store
 * - localstorage에 저장 (db 연동할 의향 없음)
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface I_IncomeData {
    bossid: string;
    bossname: string;
    bossrank: string;
    boss_price: number;
    members: number;
};

export interface I_CharIncomeData {
    charname: string;
    charimgurl: string;
    worldId: string;
    ocid: string;
    incomeData: I_IncomeData[];
};

interface I_CharIncomeStore {
   CharIncomeDatas: I_CharIncomeData[];
   AddNewCharIncomeData: (NewData: I_CharIncomeData) => void;
   EditCharIncomeData: (UpdateData: I_CharIncomeData) => void;
   DeleteCharIncomeData: (ocid: string) => void;
};

export const CharIncomeStore = create<I_CharIncomeStore>()(
    persist((set, get) => ({
        CharIncomeDatas: [] as I_CharIncomeData[],
        AddNewCharIncomeData: (NewData) => set((state) => {
            return {
                CharIncomeDatas: [...state.CharIncomeDatas, NewData]
            };
        }),
        EditCharIncomeData: (UpdateData) => set((state) => {
            const idx = state.CharIncomeDatas.findIndex((data) => data.charname === UpdateData.charname || data.ocid === UpdateData.ocid);

            if(idx === -1){
                return {
                    CharIncomeDatas: [...state.CharIncomeDatas]
                }
            } else {
                return {
                    CharIncomeDatas: [
                        ...state.CharIncomeDatas.slice(0, idx),
                        UpdateData,
                        ...state.CharIncomeDatas.slice(idx + 1)
                    ]
                }
            }
        }),
        DeleteCharIncomeData: (ocid) => set((state) => {
            const TargetIdx = state.CharIncomeDatas.findIndex((chardata) => chardata.ocid === ocid);

            if(TargetIdx === -1){
                console.log("Cannont find target index");
                return {
                    CharIncomeDatas: [...state.CharIncomeDatas]
                };
            } else {
                return {
                    CharIncomeDatas: [
                        ...state.CharIncomeDatas.slice(0, TargetIdx),
                        ...state.CharIncomeDatas.slice(TargetIdx + 1)
                    ]
                }
            }
        })
    }), {
        name: "MapleToDo-CharIncomeStore",
        partialize: (state) => ({
            CharIncomeDatas: state.CharIncomeDatas
        })
    })
)