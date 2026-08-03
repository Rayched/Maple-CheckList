import { ContentsType } from "@/game_datas/Fetchs";
import styles from "../../../_styles/_charpage/todolist.module.css";
import { DailyAndWeeklyData } from "@/game_datas/contentsdatas/DailyAndWeeklys";
import { useStore } from "zustand";
import { RegistFlagStore } from "@/stores/RegistFlagStore";
import { useEffect, useState } from "react";
import { useToDoRegistFilter } from "@/utils/RegistFilters";
import { ToDoItem_Contents, ToDoItem_Guilds, ToDoItem_Quest } from "./todoitems";

interface I_WeeklyToDoList {
    weeklycontentsdata?: ContentsType[];
};

export type ContentsCategoryType = {
    category_id: string;
    category_name: string;
};

const WeeklyCategory: ContentsCategoryType[] = [
    {category_id: "contents", category_name: "주간 컨텐츠"},
    {category_id: "quest", category_name: "주간 퀘스트"}
];

export default function WeeklyToDoList({weeklycontentsdata}: I_WeeklyToDoList){
    const {weeklys} = DailyAndWeeklyData;
    const [NowCategory, setNowCategory] = useState<ContentsCategoryType>(WeeklyCategory[0]);
    const [ClearCount, setClearCount] = useState(0);

    const {ShowAllRegist} = useStore(RegistFlagStore);
    const {ContentsData, weeklyFilter} = useToDoRegistFilter({contents_data: weeklycontentsdata})

    const CategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {currentTarget: {value}} = e;

        if(value === NowCategory.category_id){
            return;
        } else if(value === WeeklyCategory[0].category_id){
            setNowCategory(WeeklyCategory[0]);
        } else {
            setNowCategory(WeeklyCategory[1]);
        }
    };

    useEffect(() => {
        if(!weeklycontentsdata || weeklycontentsdata.length === 0){
            return;
        } else if(!ShowAllRegist){
            const Filters = weeklycontentsdata.filter((data) => data.registration_flag === "true" && data.type === "contents" && data.now_count > 0);
            console.log(Filters);
            setClearCount(Filters.length);
            weeklyFilter(NowCategory.category_id);
        } else {
            const Filters = weeklycontentsdata.filter((data) => data.now_count > 0 && data.type === "contents");
            console.log(Filters);
            setClearCount(Filters.length);
            weeklyFilter(NowCategory.category_id);
        }
    }, []);

    useEffect(() => {
        if(!weeklycontentsdata || weeklycontentsdata.length === 0){
            return;
        } else if(NowCategory.category_id === "quest"){
            if(!ShowAllRegist){
                const Filters = weeklycontentsdata.filter((data) => data.quest_state === "2" && data.type === "quest" && data.registration_flag === "true");
                setClearCount(Filters.length);
            } else {
                const Filters = weeklycontentsdata.filter((data) => data.quest_state === "2" && data.type === "quest");
                setClearCount(Filters.length);
            }
            weeklyFilter(NowCategory.category_id);
        } else {
            if(!ShowAllRegist){
                const Filters = weeklycontentsdata.filter((data) => data.now_count > 0 && data.type === "contents" && data.registration_flag === "true");
                setClearCount(Filters.length);
            } else {
                const Filters = weeklycontentsdata.filter((data) => data.now_count > 0 && data.type === "contents");
                setClearCount(Filters.length);
            }
            weeklyFilter(NowCategory.category_id);
        }
    }, [NowCategory, ShowAllRegist]);

    return (
        <div className={styles.todolist_commons_container}>
           <div className={styles.todolist_todoitems_container}>
                <div className={styles.todolist_titlebox}>
                    <select onChange={CategoryChange}>
                        {
                            WeeklyCategory.map((data) => {
                                return (
                                    <option key={data.category_id} value={data.category_id}>
                                        {data.category_name}
                                    </option>
                                );
                            })
                        }
                    </select>
                    <span>{`${ClearCount} / ${ContentsData.length}`}</span>
                </div>
                <div className={styles.todolist_todoitems_area}>
                    <div className={styles.todolist_todoitemlist}>
                        {
                            ContentsData.map((data) => {
                                const idx = weeklys.findIndex((refdata) => refdata.contentsName === data.content_name);

                                if(idx === -1){
                                    return null;
                                } else if(NowCategory.category_id === "quest"){
                                    //NowCategory.category_id === "quest"
                                    //'주간 퀘스트' 선택한 경우

                                    return (
                                        <ToDoItem_Quest 
                                            key={weeklys[idx].contentsId}
                                            contents_name={data.content_name}
                                            quest_state={data.quest_state}
                                            little_name={weeklys[idx].little_name}
                                            now_count={data.now_count}
                                            max_count={weeklys[idx].max_count}
                                        />
                                    );
                                } else {
                                    //NowCategory.category_id === "contents"
                                    //'주간 컨텐츠' 선택한 경우

                                    if(data.content_name.includes("길드")){
                                        return (
                                            <ToDoItem_Guilds 
                                                key={weeklys[idx].contentsId}
                                                contents_name={data.content_name}
                                                little_name={weeklys[idx].little_name}
                                                now_count={data.now_count}
                                                max_count={data.max_count}
                                            />
                                        );
                                    } else {
                                        return (
                                            <ToDoItem_Contents 
                                                key={weeklys[idx].contentsId}
                                                contents_name={data.content_name}
                                                little_name={weeklys[idx].little_name}
                                                now_count={data.now_count}
                                                max_count={weeklys[idx].max_count}
                                            />
                                        );
                                    }
                                }
                            })
                        }
                    </div>
                </div>
           </div>
        </div>
    );
}