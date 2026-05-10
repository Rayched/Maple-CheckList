"use client"

import { I_RankType } from "@/game_datas/contentsData";
import { I_BossToDoData } from "./AddBossIncomeForms";

interface I_RankSelect_TypeRadio_Props {
    StateData?: I_BossToDoData[];
    setStateFn: React.Dispatch<React.SetStateAction<I_BossToDoData[]|undefined>>;
    bossid: string;
    RanksData: I_RankType[];
};

export default function RankSelect_TypeRadio({StateData ,setStateFn, RanksData, bossid}: I_RankSelect_TypeRadio_Props){
    return (
        <div>
            {
                RanksData.map((data) => {
                    return (
                        <div key={`${bossid}_${data.rankId}`}>
                            <input type="radio" value={data.rankId}/>
                            <label>{data.rankNm}</label>
                        </div>
                    );
                })
            }
        </div>
    );
}