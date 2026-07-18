"use client"

import { SetStateAction, useEffect, useState } from "react";
import styles from "../../_styles/charincomeitem.module.css";
import { CharIncomeStore, I_CharIncomeData } from "@/stores/CharIncomeStore";
import useGetSummitValues from "@/utils/useGetSummitValues";
import { useStore } from "zustand";
import { useRouter } from "next/navigation";
import IncomeItemBox from "./Incomeitembox";
import { ViewportWidthStore } from "@/stores/ViewportStore";

interface I_CharIncomeItemProps {
    chardata: I_CharIncomeData;
    NowSelectWorld: string;
    EditMode: boolean;
    setEditMode: React.Dispatch<SetStateAction<boolean>>;
    setNowSelectWorld: React.Dispatch<SetStateAction<string>>;
};

interface I_DelBtnClickEvent {
    targetId: string;
    targetname: string;
    targetWorldId: string;
}

export default function CharIncomeItem({chardata, EditMode, NowSelectWorld, setNowSelectWorld,setEditMode}: I_CharIncomeItemProps){
    const {SummitData} = useGetSummitValues();
    const router = useRouter();
    const {CharIncomeDatas, NowAddsWorld, setNowAddsWorld, DeleteCharIncomeData} = useStore(CharIncomeStore);
    const {NowViewportWidthValue} = useStore(ViewportWidthStore);

    const DelBtnClickEvent = ({targetId, targetname, targetWorldId}: I_DelBtnClickEvent) => {
        const DeleteConfirm = window.confirm(`'${targetname}'의 주간보스 수익 데이터를 삭제하겠습니까?`);
        const WorldLength = CharIncomeDatas.filter((chardata) => chardata.worldId === targetWorldId).length;

        if(!DeleteConfirm){
            return;
        } else {
            DeleteCharIncomeData(targetId);

            if(WorldLength > 1){
                setEditMode(false);
            } else if(WorldLength <= 1){
                const WorldsUpdate = NowAddsWorld.filter((worlds) => worlds.worldId !== targetWorldId);

                setNowAddsWorld(WorldsUpdate);
                
                if(WorldsUpdate.length >= 1){
                    setNowSelectWorld(WorldsUpdate[0].worldId);
                } else {
                    setNowSelectWorld("");
                }
                setEditMode(false);
            }
        };
    };

    const IncomeItemClickEvent = (e: React.MouseEvent<HTMLDivElement>|React.TouchEvent<HTMLDivElement>) => {
        const {
            currentTarget: {
                dataset: {charname, ocid}
            }
        } = e;

        if(!charname || !ocid || charname === "" || ocid === ""){
            return;
        } else if(EditMode === true){
            return;
        } else {
            router.push(`/incomes/edit_incomes/${charname}?ocid=${ocid}`);
        }
    };

    useEffect(() => {
        const GetWorldIds = CharIncomeDatas.map((chardata) => chardata.worldId);

        const EmptyDataFilter = NowAddsWorld.map((world) => {
            const IsIncludes = GetWorldIds.includes(world.worldId);

            if(!IsIncludes){
                return null;
            } else {
                return world;
            }
        }).filter((data) => data !== null);

        setNowAddsWorld(EmptyDataFilter);
    }, [CharIncomeDatas]);

    /**
     * viewport-width 크기 따라
     * 캐릭터 수익 아이템, 보스 표시 형태가 달라짐
     * pc => 보스 12마리 전부 다 표시
     * mobile => '하위 2마리...상위 2마리', 간략하게 표시
     */
    return (
        <div 
            className={styles.charincomeitem_container}
            onClick={IncomeItemClickEvent}
            data-charname={chardata.charname}
            data-ocid={chardata.ocid}
        >
            <div className={styles.charincomeitem_databox_charinfo}>
                <img src={chardata.charimgurl} />
                <div className={styles.charincomeitem_databox_charinfo_namebox}>
                    <img src={`/imgs/worlds/${chardata.worldId}.png`} />
                    <label>{chardata.charname}</label>
                </div>
            </div>
            <div className={styles.charincomeitem_incomedatabox}>
                {
                    NowViewportWidthValue >= 640 ? (
                        <div className={styles.charincomeitem_incomedatabox_itemlist}>
                            <IncomeItemBox incomedatas={chardata.incomeData} />
                        </div>
                    ) : null
                }
                {
                    NowViewportWidthValue <= 640 ? (
                        <div className={styles.charincomeitem_incomedatabox_itemlist}>
                            <IncomeItemBox incomedatas={chardata.incomeData.slice(0, 2)} />
                            <div className={styles.spreads}>...</div>
                            <IncomeItemBox incomedatas={chardata.incomeData.slice(chardata.incomeData.length - 2)} />
                        </div>
                    ) : null
                }
                <div className={styles.charincomeitem_incomesummitbox}>
                    <div className={styles.charincomeitem_incomesummitbox_values}>
                        <span className={styles.values}>{SummitData({IncomeDatas: chardata.incomeData})}</span>
                        <span className={styles.length}>{chardata.incomeData.length}</span>
                    </div>
                </div>
            </div>
            {
                EditMode ? (
                    <div className={styles.charincomeitem_delbtnbox}>
                        <div 
                            className={styles.charincomeitem_delbtnbox_delbtn} 
                            onClick={() => DelBtnClickEvent({
                                targetId: chardata.ocid, 
                                targetname: chardata.charname,
                                targetWorldId: chardata.worldId
                            })
                        }>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="white" width={"13"} height={"13"}>
                                <path d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"/>
                            </svg>
                        </div>
                    </div>
                ) : null
            }
        </div>
    );
};