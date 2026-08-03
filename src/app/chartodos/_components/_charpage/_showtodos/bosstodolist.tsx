import { BossContentsType } from "@/game_datas/Fetchs";
import { useEffect, useState } from "react";
import styles from "../../../_styles/_charpage/todolist.module.css";
import { BossToDoItem } from "./todoitems";
import ToDoEmptyMessage from "./EmptyMessage";
import { BossToDoRefData } from "@/game_datas/contentsdatas/BossContentsData";
import { useStore } from "zustand";
import { RegistFlagStore } from "@/stores/RegistFlagStore";
import { useToDoRegistFilter } from "@/utils/RegistFilters";

interface I_BossToDoList {
    //cycles: string;  일간(bossDaily)|주간(bossWeekly)|월간(bossMonthly)
    weekly_boss_clearcount?: number;
    boss_contentsdata?: BossContentsType[];
};

type BossCycleType = {
    cycle_id: string;
    cycle_name: string;
};

const BossCycles: BossCycleType[] = [
    {cycle_id: "bossDaily", cycle_name: "일일 보스"},
    {cycle_id: "bossWeekly", cycle_name: "주간 보스"},
    {cycle_id: "bossMonthly", cycle_name: "월간 보스"}
];

export default function BossToDoList({boss_contentsdata}: I_BossToDoList){
    const [NowCategory, setNowCategory] = useState<BossCycleType>(BossCycles[0]);
    const [CompliteLength, setCompliteLength] = useState(0);

    const {ShowAllRegist} = useStore(RegistFlagStore);
    const {bossContentsData, bossFilter} = useToDoRegistFilter({boss_contents_data: boss_contentsdata});

    const {
        dailyboss_refdata, 
        weeklyboss_refdata,
        monthlyboss_refdata
    } = BossToDoRefData;

    const CategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {currentTarget: {value}} = e;
        
        const Idx = BossCycles.findIndex((data) => data.cycle_id === value);

        if(Idx === -1){
            return;
        } else {
            setNowCategory(BossCycles[Idx]);
        }
    }

    //Default Data Setting용
    useEffect(() => {
        if(!boss_contentsdata || boss_contentsdata.length === 0){
            return;
        } else {
            const NewCompliteLength = boss_contentsdata.filter((data) => data.complete_flag === "true" && data.cycle === NowCategory.cycle_id).length;

            bossFilter(NowCategory.cycle_id);
            setCompliteLength(NewCompliteLength); 
        }
    }, []);

    useEffect(() => {
        if(!boss_contentsdata || boss_contentsdata.length === 0){
            return;
        } else {
            const NewClearCount = boss_contentsdata.filter((data) => data.cycle === NowCategory.cycle_id && data.complete_flag === "true");
            setCompliteLength(NewClearCount.length);
            bossFilter(NowCategory.cycle_id);
        }
    }, [NowCategory, ShowAllRegist]);

    return (
        <div className={styles.todolist_commons_container}>
            <div className={styles.todolist_todoitems_container}>
                <div className={styles.todolist_titlebox}>
                    <select onChange={CategoryChange}>
                        {
                            BossCycles.map((data) => {
                                return (
                                    <option key={data.cycle_id} value={data.cycle_id}>
                                        {data.cycle_name}
                                    </option>
                                );
                            })
                        }
                    </select>
                    <span>{`${CompliteLength} / ${bossContentsData.length}`}</span>
                </div>
                <div className={styles.todolist_todoitems_area}>
                    <div className={styles.todolist_todoitemlist}>
                        {
                            bossContentsData.map((contents) => {
                                if(NowCategory.cycle_id === BossCycles[0].cycle_id){
                                    //일일 보스
                                    const TargetData = dailyboss_refdata.find((data) => data.BossNm === contents.content_name);

                                    if(!TargetData) return null;

                                    return (
                                        <BossToDoItem 
                                            key={`${TargetData.BossId}_${contents.difficulty}`}
                                            contents_id={TargetData.BossId}
                                            contents_name={contents.content_name}
                                            little_name={TargetData.SubName}
                                            complite_flag={contents.complete_flag}
                                            rank_name={contents.difficulty}
                                        />
                                    );
                                } else if(NowCategory.cycle_id === BossCycles[1].cycle_id){
                                    const TargetData = weeklyboss_refdata.find((data) => data.BossNm === contents.content_name);

                                    if(!TargetData) return null;

                                    return (
                                        <BossToDoItem 
                                            key={`${TargetData.BossId}_${contents.difficulty}`}
                                            contents_id={TargetData.BossId}
                                            contents_name={contents.content_name}
                                            little_name={TargetData.SubName}
                                            complite_flag={contents.complete_flag}
                                            rank_name={contents.difficulty}
                                        />
                                    );
                                } else {
                                    const TargetData = monthlyboss_refdata.find((data) => data.BossNm === contents.content_name);

                                    if(!TargetData) return null;
                                    
                                    return (
                                        <BossToDoItem 
                                            key={`${TargetData.BossId}_${contents.difficulty}`}
                                            contents_id={TargetData.BossId}
                                            contents_name={contents.content_name}
                                            little_name={TargetData.SubName}
                                            complite_flag={contents.complete_flag}
                                            rank_name={contents.difficulty}
                                        />
                                    );
                                }
                            })
                        }
                        {
                            bossContentsData.length === 0 ? (
                                <ToDoEmptyMessage 
                                    message_refname={NowCategory.cycle_name}
                                />
                            ) : null
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}