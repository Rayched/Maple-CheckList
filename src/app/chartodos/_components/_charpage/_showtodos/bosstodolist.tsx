import { BossContentsData, I_BossContents } from "@/game_datas/contentsData";
import { BossContentsType } from "@/game_datas/Fetchs";
import { useEffect, useState } from "react";
import styles from "../../../_styles/_charpage/todolist.module.css";
import { BossToDoItem } from "./todoitems";
import ToDoEmptyMessage from "./EmptyMessage";

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
]

export default function BossToDoList({weekly_boss_clearcount, boss_contentsdata}: I_BossToDoList){
    const [ContentsData, setContentsData] = useState<BossContentsType[]>([]);
    const [NowCategory, setNowCategory] = useState<BossCycleType>(BossCycles[0]);
    const [CompliteLength, setCompliteLength] = useState(0);

    const CategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {currentTarget: {value}} = e;

        const GetBossCycleData = BossCycles.find((data) => data.cycle_id === value);

        if(!GetBossCycleData){
            return;
        } else {
            setNowCategory(GetBossCycleData);
        }
    };

    //Default Data Setting용
    useEffect(() => {
        if(!boss_contentsdata || !weekly_boss_clearcount){
            return;
        } else {
            const Regist_Filter = boss_contentsdata.filter((data) => NowCategory.cycle_id === data.cycle && data.registration_flag === "true");

            setContentsData(Regist_Filter);
            setCompliteLength(weekly_boss_clearcount);
        }
    }, []);

    //Boss Cycle Category Change 대응 data update
    useEffect(() => {
        const {cycle_id} = NowCategory;

        if(!boss_contentsdata){
            return;
        } else {
            const UpdateData = boss_contentsdata.filter((data) => cycle_id === data.cycle && data.registration_flag === "true");
            const GetComplites = UpdateData.filter((data) => data.complete_flag === "true");

            console.log(UpdateData);

            setContentsData(UpdateData);
            setCompliteLength(GetComplites.length);
        }
    }, [NowCategory]);

    return (
        <div className={styles.todolist_commons_container}>
            <div className={styles.bosstodolist_todoitems_container}>
                <div className={styles.bosstodolist_todoitems_titlebox}>
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
                    <span>{`${CompliteLength} / ${ContentsData.length}`}</span>
                </div>
                <div className={styles.bosstodolist_todoitems_area}>
                    {
                        ContentsData.map((contents) => {
                            const TargetData = BossContentsData.find((bossdata) => bossdata.BossNm === contents.content_name);

                            if(!TargetData){
                                return null;
                            } else {
                                return (
                                    <BossToDoItem 
                                        key={TargetData.BossId}
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
                        ContentsData.length === 0 ? (
                            <ToDoEmptyMessage 
                                message_refname={NowCategory.cycle_name}
                            />
                        ) : null
                    }
                </div>
            </div>
        </div>
    );
}