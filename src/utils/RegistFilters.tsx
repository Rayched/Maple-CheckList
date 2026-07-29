"use client"

import { BossContentsType } from "@/game_datas/Fetchs"
import { RegistFlagStore } from "@/stores/RegistFlagStore";
import { useEffect, useState } from "react";
import { useStore } from "zustand";

interface I_useBossToDoRegistFilter {
    boss_contents_data?: BossContentsType[];
}

export function useBossToDoRegistFilter({boss_contents_data}: I_useBossToDoRegistFilter){
    const [ContentsData, setContentsData] = useState<BossContentsType[]>([]);
    const {ShowAllRegist} = useStore(RegistFlagStore);

    const BossRegistFilter = (cycles: string) => {
        if(!boss_contents_data || boss_contents_data.length === 0){
            console.log("보스 컨텐츠 데이터를 등록해주세요.");
            return;
        } else if(!ShowAllRegist){
            const DataFilter = boss_contents_data.filter((data) => data.registration_flag === "true" && data.cycle === cycles);
            setContentsData(DataFilter);
        } else {
            const DataFilter = boss_contents_data.filter((data) => data.cycle === cycles);
            setContentsData(DataFilter);
        }
    };

    return {
        contents_data: ContentsData,
        registFilter: BossRegistFilter
    }
}