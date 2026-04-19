//CharToDo Store
import { WeeklyContentsData } from "@/game_datas/contentsData";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface I_WeeklyToDos {
    contentsId: string;
    contentsNm: string;
    contentsUnit: string;
    ToDoDone: boolean;
};

export interface I_BossToDos {
    contentsId: string;
    contentsNm: string;
    bossrank: string;
    ToDoDone: boolean; 
}

export interface I_CharToDo {
    charname: string;
    ocid: string;
    weeklyToDos: I_WeeklyToDos[];
    bossToDos: I_BossToDos[];
};

interface I_updateAccWeeklyToDos {
    contentsId: string;
    contentsNm?: string;
    tododone: boolean;
};

interface I_ChartodoStore {
    chartodos: I_CharToDo[];
    accWeeklyToDos: I_WeeklyToDos[];
    addNewCharToDo: (NewToDo: I_CharToDo) => void;
    editCharToDo: (EditToDo: I_CharToDo) => void;
    deleteCharToDo: (targetNm: string) => void;
    updateAccWeeklyToDos: ({contentsId, contentsNm, tododone}: I_updateAccWeeklyToDos) => void
    DoneRecordReset: () => void;
};

const GetAccWeeklyContentsData = WeeklyContentsData.map((data) => {
    if(data.Units === "account"){
        const Convert: I_WeeklyToDos = {
            contentsId: data.ContentsId,
            contentsNm: data.ContentsNm,
            contentsUnit: data.Units,
            ToDoDone: false
        };

        return Convert;
    } else {
        return null;
    }
}).filter((data) => data !== null);

export const CharToDoStore = create<I_ChartodoStore>()(
    persist((set) => ({
        chartodos: [],
        accWeeklyToDos: [
            ...GetAccWeeklyContentsData
        ],
        addNewCharToDo: (NewToDo) => set((state) => {
            return {
                chartodos: [
                    ...state.chartodos,
                    NewToDo
                ]
            };
        }),
        editCharToDo: (EditToDo) => set((state) => {
            const idx = state.chartodos.findIndex((data) => data.charname === EditToDo.charname);

            if(idx === -1){
                return {
                    chartodos: [
                        ...state.chartodos
                    ]
                }
            } else {
                return {
                    chartodos: [
                        ...state.chartodos.slice(0, idx),
                        EditToDo,
                        ...state.chartodos.slice(idx + 1)
                    ]
                }
            }
        }),
        deleteCharToDo: (targetNm) => set((state) => {
            const idx = state.chartodos.findIndex((data) => data.charname === targetNm);

            if(idx === -1){
                return {
                    chartodos: [
                        ...state.chartodos
                    ]
                }
            } else {
                return {
                    chartodos: [
                        ...state.chartodos.slice(0, idx),
                        ...state.chartodos.slice(idx + 1)
                    ]
                }
            }
        }),
        updateAccWeeklyToDos: ({contentsId, contentsNm, tododone}) => set((state) => {
            const idx = state.accWeeklyToDos.findIndex((data) => data.contentsId === contentsId || data.contentsNm === contentsNm);

            if(idx === -1){
                return {
                    accWeeklyToDos: state.accWeeklyToDos
                }
            } else {
                const Targets = state.accWeeklyToDos[idx];

                const UpdateData: I_WeeklyToDos = {
                    contentsId: Targets.contentsId,
                    contentsNm: Targets.contentsNm,
                    contentsUnit: Targets.contentsUnit,
                    ToDoDone: tododone
                };

                return {
                    accWeeklyToDos: [
                        ...state.accWeeklyToDos.slice(0, idx),
                        UpdateData,
                        ...state.accWeeklyToDos.slice(idx + 1)
                    ]
                };
            }
        }),
        //메할일 완료 기록 초기화 action
        DoneRecordReset: () => set((state) => {
            const GetChartodos = state.chartodos.map((chartodo) => {
                const GetWeeklyToDos = chartodo.weeklyToDos.map((weekly) => {
                    if(weekly.ToDoDone){
                        const UpdateValue: I_WeeklyToDos = {
                            contentsId: weekly.contentsId,
                            contentsNm: weekly.contentsNm,
                            ToDoDone: false,
                            contentsUnit: weekly.contentsUnit
                        };

                        return UpdateValue;
                    } else {
                        return weekly;
                    }
                });

                const GetBossToDos = chartodo.bossToDos.map((bosstodo) => {
                    if(bosstodo.ToDoDone){
                        const UpdateValue: I_BossToDos = {
                            contentsId: bosstodo.contentsId,
                            contentsNm: bosstodo.contentsNm,
                            bossrank: bosstodo.bossrank,
                            ToDoDone: false
                        };

                        return UpdateValue;
                    } else {
                        return bosstodo;
                    }
                });

                return {
                    charname: chartodo.charname,
                    ocid: chartodo.ocid,
                    weeklyToDos: GetWeeklyToDos,
                    bossToDos: GetBossToDos
                } as I_CharToDo;
            });

            const GetAccWeeklyToDos = state.accWeeklyToDos.map((accweekly) => {
                if(accweekly.ToDoDone){
                    return {
                        contentsId: accweekly.contentsId,
                        contentsNm: accweekly.contentsNm,
                        ToDoDone: false,
                        contentsUnit: accweekly.contentsUnit
                    } as I_WeeklyToDos;
                } else {
                    return accweekly;
                }
            });

            return {
                chartodos: GetChartodos,
                accWeeklyToDos: GetAccWeeklyToDos
            }
        })
    }), {
        name: "MapleToDo-CharToDoStore",
        partialize: (state) => ({
            chartodos: state.chartodos,
            accWeeklyToDos: state.accWeeklyToDos
        })
    })
)