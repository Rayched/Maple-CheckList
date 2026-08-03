"use client"

import { BossContentsType, ContentsType } from "@/game_datas/Fetchs"
import { RegistFlagStore } from "@/stores/RegistFlagStore";
import { useEffect, useState } from "react";
import { useStore } from "zustand";

interface I_useBossToDoRegistFilter {
    contents_data?: ContentsType[];
    boss_contents_data?: BossContentsType[];
};

export function useRegistFilter(){}

export function useToDoRegistFilter({contents_data, boss_contents_data}: I_useBossToDoRegistFilter){
    const [ToDoData, setToDoData] = useState<ContentsType[]>([]);
    const [BossToDoData, setBossToDoData] = useState<BossContentsType[]>([]);
    const {ShowAllRegist} = useStore(RegistFlagStore);

    /**보스 컨텐츠 필터링 함수 */
    const BossRegistFilter = (cycles: string) => {
        if(!boss_contents_data || boss_contents_data.length === 0){
            console.log("보스 컨텐츠 데이터를 등록해주세요.");
            return;
        } else if(!ShowAllRegist){
            const DataFilter = boss_contents_data.filter((data) => data.registration_flag === "true" && data.cycle === cycles);
            setBossToDoData(DataFilter);
        } else {
            const DataFilter = boss_contents_data.filter((data) => data.cycle === cycles);
            setBossToDoData(DataFilter);
        }
    };

    /**주간 컨텐츠 데이터 필터링 함수 */
    const WeeklyRegistFilter = (contents_type: string) => {
        if(!contents_data || contents_data.length === 0){
            console.log("주간 컨텐츠 데이터를 등록해주세요.");
            return;
        } else if(!ShowAllRegist){
            const DataFilter = contents_data.filter((data) => data.registration_flag === "true" && data.type === contents_type);
            setToDoData(DataFilter);
        } else {
            const DataFilter = contents_data.filter((data) => data.type === contents_type);
            setToDoData(DataFilter);
        };
    }

    /**일일 컨텐츠 필터링 함수 */
    const DailyRegistFilter = () => {
        if(!contents_data || contents_data.length === 0){
            console.log("일일 컨텐츠 데이터를 등록해주세요.")
            return;
        } else if(!ShowAllRegist){
            const Filters = contents_data.filter((data) => data.registration_flag === "true");
            setToDoData(Filters);
        } else {
            setToDoData(contents_data);
        }
    };

    return {
        ContentsData: ToDoData,
        bossContentsData: BossToDoData,
        bossFilter: BossRegistFilter,
        weeklyFilter: WeeklyRegistFilter,
        dailyFilter: DailyRegistFilter
    }
}