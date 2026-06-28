"use client"

import { CharIncomeStore } from "@/stores/CharIncomeStore";
import styles from "../_styles/charincomelist.module.css";
import { useStore } from "zustand";
import { useEffect, useState } from "react";
import useGetSummitValues, { ModifyIncomedata } from "@/utils/useGetSummitValues";
import CharIncomeItem from "./_charincomelist/CharIncomeItem";

interface I_DeleteBtnClickEventProps {
    targetId: string;
    targetNm: string;
};

export default function CharIncomeList(){
    const {CharIncomeDatas, NowAddsWorld} = useStore(CharIncomeStore);
    const [EditMode, setEditMode] = useState(false);
    const [NowSelectWorld, setNowSelectWorld] = useState("all");

    const {TotalValue, GetTotals} = useGetSummitValues();

    //서버(카테고리) 선택 select box change event listener
    const WorldSelectboxChangeEvent = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const {currentTarget: {value}} = event;

        if(value === NowSelectWorld) return;

        setNowSelectWorld(value);
    };

    useEffect(() => {
        GetTotals({NowSelectWorld: NowSelectWorld})
    }, [NowSelectWorld]);

    return (
        <div className={styles.charincomelist_wrapper}>
            <div className={styles.charincomelistbox}>
                <div className={styles.charincomelistbox_header}>
                    <div className={styles.charincomelistbox_titles}>
                        <h4>캐릭터 목록</h4>
                        <div className={styles.editmodebtn} onClick={() => setEditMode((prev) => !prev)}>
                            {!EditMode ? "편집" : "취소"}
                        </div>
                    </div>
                    <div className={styles.charincomelistbox_selectbox}>
                        <label>서버</label>
                        <select onChange={WorldSelectboxChangeEvent}>
                            <option value={"all"}>전체 월드</option>
                            {
                                NowAddsWorld.map((data) => {
                                    return (
                                        <option key={data.worldId} value={data.worldId}>{data.worldname}</option>
                                    );
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className={styles.charincomelist_mains}>
                    {
                        CharIncomeDatas.map((data) => {
                            if(NowSelectWorld === "all"){
                                return (
                                    <CharIncomeItem 
                                        key={`${data.charname}_incomeitem`}
                                        chardata={data}
                                        EditMode={EditMode}
                                        setEditMode={setEditMode}
                                    />
                                );
                            } else {
                                if(NowSelectWorld === data.worldId){
                                    return (
                                        <CharIncomeItem 
                                            key={`${data.charname}_incomeitem`}
                                            chardata={data}
                                            EditMode={EditMode}
                                            setEditMode={setEditMode}
                                        />
                                    );
                                } else {
                                    return null;
                                }
                            }
                        })
                    }
                </div>
                <div className={styles.IncomesTotal_container}>
                    <div className={styles.IncomesTotal_titles}>총합</div>
                    <div className={styles.IncomesTotal_bodys}>
                        {ModifyIncomedata(TotalValue)}
                    </div>
                </div>
            </div>
        </div>
    );
}