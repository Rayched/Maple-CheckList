"use client";

import { CharIncomeStore, I_IncomeData } from "@/stores/CharIncomeStore";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import { useStore } from "zustand";
import { I_BossIncomeData, I_FormValue } from "../../add_incomes/_components/AddIncomeForms";
import { BossContentsData } from "@/game_datas/contentsData";
import { RankColorInfos } from "@/game_datas/bossrank_colordata";
import { GetRankBoxMinHeights, IncomeFormsCommons } from "../../_components/incomeform_commons";
import styles from "../../_styles/incomeforms.module.css";
import BossRankRadioBox from "../../add_incomes/_components/BossRankSelect";
import { IncomeDataSort } from "@/utils/SortFuncs";
import { ModifyIncomedata } from "@/utils/useGetSummitValues";
import { useRouter } from "next/navigation";

interface I_EditIncomeListProps {
    charname: string;
    ocid?: string;
    charimgurl?: string;
};

interface I_EditFormValue extends I_FormValue {};

interface I_CheckedEventProps {
    targetId: string;
    isChecked: boolean;
};

interface I_MembercountUpdateProps {
    targetId: string;
    membercount: number;
};

interface I_SingleRankProps {
    textcolor?: string;
    bgcolor?: string;
    bordercolor?: string;
};

const ToDoItem = styled(IncomeFormsCommons.ToDoItem)``;

const SingleRank = styled.div<I_SingleRankProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 17px;
    height: 17px;
    padding: 2px 3px;
    color: ${(props) => props.textcolor};
    background-color: ${(props) => props.bgcolor};
    border: 3px solid ${(props) => props.bordercolor};
    font-size: 16px;
    font-weight: bold;
`;

export default function EditIncomeList({charname, ocid, charimgurl}: I_EditIncomeListProps){
    const {CharIncomeDatas, EditCharIncomeData} = useStore(CharIncomeStore);
    const [BossIncomeData, setBossIncomeData] = useState<I_BossIncomeData[]>([]);
    const [TotalValues, setTotalValues] = useState(0);
    const ContentsData = BossContentsData;

    const FormMethods = useForm<I_EditFormValue>({
        defaultValues: {
            BossToDoCheckbox: [],
            BossRankRadios: {},
            Membercounts: {}
        }
    });
    
    const {register, setValue, handleSubmit, watch} = FormMethods;
    const MembercountArr = [1, 2, 3, 4, 5, 6];
    const router = useRouter();

    //Boss form item, checkbox event listener
    /**
     * 수정 데이터 저장하둔 배열 BossIncomeData (state)
     * 체크박스 체크 시, state에 데이터 추가
     * 체크박스 체크 해제 시, state 데이터 삭제하는 기능 수행
     */
    const CheckedEvent = ({targetId, isChecked}: I_CheckedEventProps) => {
        const TargetData = ContentsData.find((data) => data.BossId === targetId);

        if(!isChecked){
            const idx = BossIncomeData.findIndex((data) => data.bossid === targetId);

            if(idx === -1) return;

            setBossIncomeData((state) => [
                ...state.slice(0, idx),
                ...state.slice(idx + 1)
            ]);
        } else if(isChecked && TargetData !== undefined){
            const NewToDoData: I_BossIncomeData = {
                bossid: TargetData.BossId,
                bossname: TargetData.BossNm,
                bossrank: TargetData.Ranks[0].rankId,
                price: TargetData.Ranks[0].price,
                membercount: 1
            };

            setBossIncomeData((state) => {
                const Outputs = IncomeDataSort({IncomeDatas: [...state, NewToDoData]});

                return Outputs
            });
            setValue(`BossRankRadios.${TargetData.BossId}`, `${TargetData.Ranks[0].rankId}`);
        } else {
            console.log("cannot find targetdata");
            return;
        }
    };

    /**
     * BossIncomeData (state)에서 특정 보스 form의
     * 파티원 수를 가리키는 '💂‍♂️ [select]'의 값이 변했을때 (1~6)
     * '결정석 가격 / 파티원 수'(소수점 버림 처리) 한 값을
     * BossIncomeData에 반영하는 기능 수행
     */
    const MembercountUpdate = ({targetId, membercount}: I_MembercountUpdateProps) => {
        const idx = BossIncomeData.findIndex((data) => data.bossid === targetId);
        const TargetData = ContentsData.find((data) => data.BossId === targetId);

        if(idx === -1){
            console.log(`'${targetId}'와 일치한 income data 찾지 못했습니다.`);
            return;
        } else if(!TargetData){
            console.log("Cannot find contents data");
            return;
        } else {
            const PriceData = TargetData.Ranks.find((ranks) => ranks.rankId === BossIncomeData[idx].bossrank);

            if(!PriceData) return;

            const UpdateValue: I_BossIncomeData = {
                bossid: BossIncomeData[idx].bossid,
                bossname: BossIncomeData[idx].bossname,
                bossrank: BossIncomeData[idx].bossrank,
                price: Math.floor(PriceData.price / membercount),
                membercount: membercount
            }

            setBossIncomeData((state) => [
                ...state.slice(0, idx),
                UpdateValue,
                ...state.slice(idx + 1)
            ]);
        }
    };

    /**
     * 주보 수익, 편집 내용 store 저장하는 submit event listener 
    */
    const SaveCharIncomeData = () => {
        const idx = CharIncomeDatas.findIndex((data) => data.charname === charname || data.ocid === ocid);

        if(idx === -1 || !ocid){
            console.log(`'${charname}'의 결정 수익 데이터를 찾지 못했습니다.`);
            return;
        } else {
            const ModifyIncomeData = BossIncomeData.map((data) => {
                const Convert: I_IncomeData = {
                    bossid: data.bossid,
                    bossname: data.bossname,
                    bossrank: data.bossrank,
                    members: data.membercount,
                    boss_price: data.price
                };

                return Convert;
            });

            EditCharIncomeData({
                charname: CharIncomeDatas[idx].charname,
                ocid: ocid,
                worldId: CharIncomeDatas[idx].worldId,
                charimgurl: CharIncomeDatas[idx].charimgurl,
                incomeData: ModifyIncomeData
            });

            router.push("/incomes");
        }
    };

    //기존 charincomedata의 개별 캐릭터의 incomedata를 
    //state에 저장하는 side effect
    useEffect(() => {
        if(charname === "" || !ocid){
            console.log("'charname', 'ocid' props value error");
            return;
        } else {
            const TargetData = CharIncomeDatas.find((data) => data.charname === charname || data.ocid === ocid);

            if(!TargetData){
                console.log(`Cannot find target data\n(charname:${charname}, ocid:${ocid})`);
                return;
            } else {
                const DefaultIncomeData = TargetData.incomeData.map((data) => {
                    const Convert : I_BossIncomeData = {
                        bossid: data.bossid,
                        bossname: data.bossname,
                        bossrank: data.bossrank,
                        price: data.boss_price,
                        membercount: data.members
                    };

                    return Convert;
                });

                const DefaultCheckboxData = TargetData.incomeData.map((data) => data.bossid);
                const DefaultRadioboxdata = Object.fromEntries(
                    TargetData.incomeData.map((data) => [data.bossid, data.bossrank])
                );

                setBossIncomeData(DefaultIncomeData);
                setValue("BossToDoCheckbox", DefaultCheckboxData);
                setValue("BossRankRadios", DefaultRadioboxdata);
            }
        }
    }, []);

    //결정 수익 총합 state 저장
    useEffect(() => {
        let outputs = 0;

        BossIncomeData.forEach((data) => outputs += data.price);

        if(outputs === 0){
            return;
        } else {
            setTotalValues(outputs);
        }
    }, [BossIncomeData]);

    return (
        <div className={styles.incomeforms_container}>
            <div className={styles.incomeforms_title}>
                주간 보스 목록
                <span>{`( ${watch("BossToDoCheckbox").length} / 12 )`}</span>
            </div>
            <form className={styles.incomeforms_formcomponents} onSubmit={handleSubmit(SaveCharIncomeData)}>
                <div className={styles.incomeforms_todolist}>
                    {
                        ContentsData.map((bossdata) => {
                            const MinHeight = GetRankBoxMinHeights(bossdata.Ranks.length);
                            const DisabledCondition = (!watch("BossToDoCheckbox").includes(bossdata.BossId) && watch("BossToDoCheckbox").length >= 12);
                            const TargetData = BossIncomeData.find((data) => data.bossid === bossdata.BossId);

                            const ColorData = RankColorInfos.find((color) => {
                                const RankLength = bossdata.Ranks.length;

                                if(RankLength >= 2){
                                    return undefined;
                                } else if(bossdata.Ranks[0].rankId === color.rankId){
                                    return color;
                                } else {
                                    return undefined
                                }
                            });

                            return (
                                <ToDoItem key={bossdata.BossId} min_height={MinHeight} isdisabled={DisabledCondition ? "1" : "0"} className={styles.incomeforms_todoitem}>
                                    <div className={styles.incomeforms_todoitem_bossdatabox}>
                                        <input 
                                            type="checkbox"
                                            value={bossdata.BossId}
                                            disabled={DisabledCondition}
                                            defaultChecked={watch("BossToDoCheckbox").includes(bossdata.BossId)}
                                            {...register("BossToDoCheckbox", {
                                                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                                                    const {
                                                        currentTarget: {value},
                                                        target: {checked}
                                                    } = e;

                                                    CheckedEvent({targetId: value, isChecked: checked});
                                                }
                                            })}
                                        />
                                        <img src={`/imgs/boss_monsters/${bossdata.BossId}.png`} />
                                    </div>
                                    <FormProvider {...FormMethods}>
                                        {
                                            watch("BossToDoCheckbox").includes(bossdata.BossId) ? (
                                                <div className={styles.incomeforms_todoitem_bossranks}>
                                                    <div className={styles.bossrankbox}>
                                                        {
                                                            bossdata.Ranks.length <= 1 ? (
                                                                <SingleRank textcolor={ColorData?.fontColor} bgcolor={ColorData?.bgColor} bordercolor={ColorData?.borderColor}>
                                                                    {bossdata.Ranks[0].rankId.slice(0, 1)} 
                                                                </SingleRank> 
                                                            ) : null
                                                        }
                                                        {
                                                            bossdata.Ranks.length > 1 ? (
                                                                <BossRankRadioBox 
                                                                    StateData={BossIncomeData}
                                                                    setStateFn={setBossIncomeData}
                                                                    bossid={bossdata.BossId}
                                                                    RanksData={bossdata.Ranks}
                                                                />
                                                            ) : null
                                                        }
                                                    </div>
                                                    <div className={styles.incomeforms_todoitem_countbox}>
                                                        <span className={styles.incomeforms_todoitem_members}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={"15"} height={"15"}>
                                                                <path d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"/>
                                                            </svg>
                                                            <select 
                                                                key={`${bossdata.BossId}_membercount`} 
                                                                data-bossid={bossdata.BossId}
                                                                defaultValue={1}
                                                                {...register(`Membercounts.${bossdata.BossId}`, {
                                                                    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => {
                                                                        const {
                                                                            currentTarget: {value},
                                                                            target: {
                                                                                dataset: {bossid}
                                                                            }
                                                                        } = event;

                                                                        if(!bossid) return;

                                                                        MembercountUpdate({targetId: bossid, membercount: Number(value)})
                                                                    }
                                                                })}
                                                            >
                                                                {
                                                                    MembercountArr.map((value, idx) => {
                                                                        return (
                                                                            <option key={`count${idx}`} value={value}>{value}</option>
                                                                        );
                                                                    })
                                                                }
                                                            </select>
                                                        </span>
                                                        <span className={styles.incomeforms_pricedata}>
                                                            {TargetData && ModifyIncomedata(TargetData.price)}
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