"use client"

import { BossContentsData, WorldDatas } from "@/game_datas/contentsData";
import { CharToDoStore } from "@/stores/CharToDoStore";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import { useStore } from "zustand";
import { IncomeDataSort } from "@/utils/SortFuncs";
import { RankColorInfos } from "@/game_datas/bossrank_colordata";
import BossRankRadioBox from "./BossRankSelect";
import { CharIncomeStore, I_IncomeData } from "@/stores/CharIncomeStore";
import { useRouter } from "next/navigation";
import {GetRankBoxMinHeights, IncomeFormsCommons} from "../../_components/incomeform_commons";
import styles from "../../_styles/incomeforms.module.css";
import { ModifyIncomedata } from "@/utils/useGetSummitValues";

interface I_AddBossIncomeFormsProps {
    charname?: string;
    ocid?: string;
    worldname?: string;
    charimg?: string;
};

export interface I_BossIncomeData {
    bossid: string;
    bossname: string;
    bossrank: string;
    price: number;
    membercount: number;
};

export type BossRanks = "easy"|"Normal"|"Hard"|"Chaos"|"Extreme";

export interface I_FormValue {
    BossToDoCheckbox: string[];
    BossRankRadios: Record<string, string>;
    Membercounts: Record<string, number>;
};

interface I_CheckedEventProps {
    targetId: string;
    isChecked: boolean;
};

const ToDoItem = styled(IncomeFormsCommons.ToDoItem)``;

const SingleRank = styled(IncomeFormsCommons.SingleRank)``;

export default function AddBossIncomeForms({charname, ocid, charimg, worldname}: I_AddBossIncomeFormsProps){
    const CharToDoData = useStore(CharToDoStore).chartodos.find((data) => data.ocid === ocid || data.charname === charname);
    const {CharIncomeDatas, AddNewCharIncomeData} = useStore(CharIncomeStore);
    const ContentsData = BossContentsData;

    const [IncomeDatas, setIncomeDatas] = useState<I_BossIncomeData[]>([]);
    const [TotalValues, setTotalValues] = useState(0);
    const MemberCountArr = [1, 2, 3, 4, 5, 6];

    const FormMethods = useForm<I_FormValue>({
        defaultValues: {
            BossToDoCheckbox: [],
            BossRankRadios: {}
        }
    });

    const {register, setValue, watch, handleSubmit} = FormMethods;
    const {push} = useRouter();

    const CheckedEvent = ({targetId, isChecked}: I_CheckedEventProps) => {
        if(!isChecked){
            const idx = IncomeDatas.findIndex((data) => data.bossid === targetId);

            if(idx === -1) return;

            setIncomeDatas((prev) => [
                ...prev.slice(0, idx),
                ...prev.slice(idx + 1)
            ]);
        } else {
            const GetData = ContentsData.find((data) => data.BossId === targetId);
            
            if(!GetData) return;

            const NewToDoData: I_BossIncomeData = {
                bossid: GetData.BossId,
                bossname: GetData.BossNm,
                bossrank: GetData.Ranks[0].rankId,
                price: GetData.Ranks[0].price,
                membercount: 1
            };

            setIncomeDatas((prev) => {
                const UpdateValue = IncomeDataSort({
                    IncomeDatas: [...prev, NewToDoData]
                });

                return UpdateValue;
            });

            setValue(`BossRankRadios.${GetData.BossId}`, `${GetData.Ranks[0].rankId}`);
        }
    };

    const MembersChangeEvent = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {
            currentTarget: {value}
        } = e;

        const [TargetId, Counts] = value.split("_");

        const idx = IncomeDatas.findIndex((data) => data.bossid === TargetId);

        if(idx === -1){
            console.log("수정 대상을 찾지 못했습니다.");
            return;
        } else {
            const UpdateValue: I_BossIncomeData = {
                bossid: IncomeDatas[idx].bossid,
                bossname: IncomeDatas[idx].bossname,
                bossrank: IncomeDatas[idx].bossrank,
                price: IncomeDatas[idx].price,
                membercount: Number(Counts)
            };

            setIncomeDatas((prev) => [
                ...prev.slice(0, idx),
                UpdateValue,
                ...prev.slice(idx + 1)
            ]);
        }
    };

    const SaveCharIncomeData = () => {
        if(!charname || !ocid || !charimg || !worldname) return;

        const IsDuplicate = CharIncomeDatas.find((data) => data.charname === charname || data.ocid === ocid);
        const GetWorldData = WorldDatas.find((world) => world.worldNm === worldname);

        if(IsDuplicate){
            alert(`'${charname}'의 주간보스 수익 데이터가 존재합니다.`);
            return;
        } else {
            if(!GetWorldData){
                console.log('World data를 가져오지 못했습니다.');
                return;
            }

            const BossIncomeDataConvert = IncomeDatas.map((data) => {
                const Convert: I_IncomeData = {
                    bossid: data.bossid,
                    bossname: data.bossname,
                    bossrank: data.bossrank,
                    boss_price: data.price,
                    members: data.membercount
                };

                return Convert;
            });

            AddNewCharIncomeData({
                charname: charname,
                ocid: ocid,
                charimgurl: charimg,
                worldId: GetWorldData.worldId,
                incomeData: BossIncomeDataConvert
            });

            push("/incomes");
        }
    };

    /**
     * 해당 닉네임의 캐릭터의 메할일, 주간 보스 todo가
     * 존재하는 경우, defaultdata setting하는 Side effect
     */
    useEffect(() => {
        if(!CharToDoData){
            return;
        } else if(CharToDoData.bossToDos.length <= 0){
            return;
        } else {
            const TargetData = ContentsData.map((data) => {
                const IsInclude = CharToDoData.bossToDos.find((todo) => todo.contentsId === data.BossId);

                if(!IsInclude){
                    return null;
                } else {
                    const RankData = data.Ranks.find((ranks) => ranks.rankId === IsInclude.bossrank);

                    if(!RankData) return null;

                    const Format: I_BossIncomeData = {
                        bossid: data.BossId,
                        bossname: data.BossNm,
                        bossrank: IsInclude.bossrank,
                        price: RankData.price,
                        membercount: 1
                    };

                    return Format;
                }
            }).filter((data) => data !== null);

            const CheckboxDefaultData = CharToDoData.bossToDos.map((data) => data.contentsId);
            const BossRankDefaultData = Object.fromEntries(
                CharToDoData.bossToDos.map((data) => [
                    data.contentsId, data.bossrank
                ])
            );

            setValue("BossToDoCheckbox", CheckboxDefaultData);
            setValue("BossRankRadios", BossRankDefaultData)

            setIncomeDatas(TargetData);
        }
    }, []);

    useEffect(() => {
        let outputs = 0;

        IncomeDatas.forEach((data) => outputs += data.price);

        if(outputs === 0){
            return;
        } else {
            setTotalValues(outputs);
        }
    }, [IncomeDatas]);

    return (
        <div className={styles.incomeforms_container}>
            <div className={styles.incomeforms_title}>
                주간 보스 목록
                <span className={styles.incomeforms_title_bosstodocount}>
                    {`( ${IncomeDatas.length} / 12 )`}
                </span>
            </div>
            <form className={styles.incomeforms_formcomponents} onSubmit={handleSubmit(SaveCharIncomeData)}>
                <div className={styles.incomeforms_todolist}>
                    {
                        ContentsData.map((data) => {
                            //const MinHeights = GetRankBoxMinHeights(data.Ranks.length);
                            const MinHeights = GetRankBoxMinHeights(data.Ranks.length);
                            const IsIncludes = IncomeDatas.find((todos) => todos.bossid === data.BossId); 

                            const ColorData = RankColorInfos.find((colors) => {
                                const RankLength = data.Ranks.length;

                                if(RankLength >= 2){
                                    return undefined;
                                } else if(data.Ranks[0].rankId === colors.rankId){
                                    return colors;
                                } else {
                                    return undefined
                                }
                            });

                            const DisabledValue = (!watch("BossToDoCheckbox").includes(data.BossId) && IncomeDatas.length >= 12 ? "1" : "0");

                            return (
                                <ToDoItem key={data.BossId} min_height={MinHeights} isdisabled={DisabledValue} className={styles.incomeforms_todoitem}>
                                    <div className={styles.incomeforms_todoitem_bossdatabox}>
                                        <input 
                                            type="checkbox"
                                            value={data.BossId}
                                            defaultChecked={!IsIncludes ? false : true}
                                            disabled={IncomeDatas.length >= 12 && !watch("BossToDoCheckbox").includes(data.BossId)}
                                            {...register("BossToDoCheckbox", {
                                                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                                                    const {
                                                        currentTarget: {value},
                                                        target: {checked}
                                                    } = e;
                                                    CheckedEvent({targetId: value, isChecked: checked})
                                                }
                                            })}
                                        />
                                        <img src={`/imgs/boss_monsters/${data.BossId}.png`} />
                                    </div>
                                    <FormProvider {...FormMethods}>
                                        {
                                            watch("BossToDoCheckbox").includes(data.BossId) ? (
                                                <div className={styles.incomeforms_todoitem_bossranks}>
                                                    <div className={styles.bossrankbox}>
                                                        {
                                                            data.Ranks.length <= 1 ? (
                                                                <SingleRank textcolor={ColorData?.fontColor} bgcolor={ColorData?.bgColor} bordercolor={ColorData?.borderColor}>
                                                                    {data.Ranks[0].rankId.slice(0, 1)}
                                                                </SingleRank>
                                                            ) : null
                                                        }
                                                        {
                                                            data.Ranks.length > 1 ? (
                                                                <BossRankRadioBox 
                                                                    StateData={IncomeDatas}
                                                                    setStateFn={setIncomeDatas}
                                                                    bossid={data.BossId}
                                                                    RanksData={data.Ranks}
                                                                />
                                                            ) : null
                                                        }
                                                    </div>
                                                    <div className={styles.incomeforms_todoitem_countbox}>
                                                        <span className={styles.incomeforms_todoitem_members}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={"15"} height={"15"}>
                                                                <path d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"/>
                                                            </svg>
                                                            <select key={`${data.BossId}_membercount`} defaultValue={1} onChange={MembersChangeEvent}>
                                                                {
                                                                    MemberCountArr.map((value, idx) => {
                                                                        return (
                                                                            <option key={`count${idx}`} value={`${data.BossId}_${value}`}>{value}</option>
                                                                        );
                                                                    })
                                                                }
                                                            </select>
                                                        </span>
                                                        <span className={styles.incomeforms_pricedata}>
                                                            {
                                                                IsIncludes && ModifyIncomedata(IsIncludes.price)
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            ) : null
                                        }
                                    </FormProvider>
                                </ToDoItem>
                            );
                        })
                    }
                </div>
                <div className={styles.incomeforms_incometotals}>
                    <span className={styles.incometotals_title}>총합</span>
                    <span className={styles.incometotals_values}>
                        {
                            TotalValues !== 0 && ModifyIncomedata(TotalValues)
                        }
                    </span>
                </div>
                <button className={styles.incomeforms_submitbutton}>저장</button>
            </form>
        </div>
    );
}