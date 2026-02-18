import { BossContentsData, WeeklyContentsData} from "@/game_datas/contentsData";
import { I_AddToDoForms } from "./WeeklyForms";
import styled from "styled-components";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Form, useForm } from "react-hook-form";
import { RankColorInfos } from "@/game_datas/bossrank_colordata";
import { I_BossToDoData, I_ToDosData } from "../AddToDosLayout";
import { select } from "framer-motion/client";
import { todo } from "node:test";

interface I_RankIcon {
    textcolor?: string;
    bgcolor?: string;
    bordercolor?: string;
};

type BossFormValueType = {
    selectedTargets: string[];
};

interface I_onSelectProps {
    isSelect: boolean;
    targetId: string;
    targetNm?: string;
    defaultRank?: string;
};

interface I_SelectTarget {
    bossid?: string;
    bossNm?: string;
    rankid?: string;
};

interface I_RankChangeProps {
    bossId: string;
    event: React.ChangeEvent<HTMLSelectElement>;
};

type I_Rankdata = {
    rankId: string;
    rankNm: string;
};

const Container = styled.div`
    width: 100%;
    margin: 5px 0px;
    min-height: 50px;
    background-color: darkgray;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CloseToggleBar = styled.div`
    width: 100%;
    height: 20px;
    padding: 3px 0px;
    background-color: #8f8d8d;
    border-top-right-radius: inherit;
    border-top-left-radius: inherit;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .messagebox {
        width: 95%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
    };
    .toggleicon {
        width: 5%;
        padding-right: 5px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    };
`;

const BossForm = styled.form`
    width: 100%;
    padding: 5px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const FormItem = styled.div`
    width: 95%;
    height: 30px;
    margin: 3px 0px;
    background-color: rgb(207, 207, 208);
    border: 2px solid rgb(212, 213, 215);
    border-radius: 8px;
    font-size: 15px;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: relative;
`;

const BossIcons = styled.div`
    width: 40%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    img {
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .bossNm {
        margin-left: 3px;
    };
`;

const RanksBox = styled.div``;

const RankSelect = styled.select`
    text-align: center;
`;

const RankIcon = styled.div<I_RankIcon>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.textcolor};
    background-color: ${(props) => props.bgcolor};
    border: 2px solid ${(props) => props.bordercolor};
`;

export default function BossForms({ToDosData, setToDosData, setCategory}: I_AddToDoForms){
    const BossContents = BossContentsData;
    const [isClosed, setClosed] = useState(false);
    const [Selected, setSelected] = useState<I_SelectTarget[]>([]);

    const {register, watch, handleSubmit} = useForm<BossFormValueType>({
        defaultValues: {
            selectedTargets: [],
        },
    });

    const BossSelect = ({isSelect, targetId, targetNm, defaultRank}: I_onSelectProps) => {
        if(!isSelect){
            const Filter = Selected.filter((data) => data.bossid !== targetId);
            setSelected(Filter);
        } else {
            if(Selected.length >= 12) return;

            const NewToDo: I_SelectTarget = {
                bossid: targetId,
                bossNm: targetNm,
                rankid: defaultRank
            };

            setSelected((prevData) => [
                ...prevData,
                NewToDo
            ]);
        };
    };

    const RankChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {currentTarget: {value}} = e;

        const BossId = value.split("_")[0];
        const RankId = value.split("_")[1];

        const idx = Selected.findIndex((data) => data.bossid === BossId);

        if(idx === -1){
            const GetName = BossContents.find((origin) => origin.BossId === BossId)?.BossNm;
            const NewData: I_SelectTarget = {
                bossid: BossId,
                bossNm: GetName,
                rankid: RankId
            };
            setSelected((state) => [...state, NewData]);
        } else {
            const UpdateData: I_SelectTarget = {
                bossid: Selected[idx].bossid,
                bossNm: Selected[idx].bossNm,
                rankid: RankId
            };

            setSelected((state) => [
                ...state.slice(0, idx),
                UpdateData,
                ...state.slice(idx + 1)
            ]);
        }
    };

    const onValid = () => {
        /*
        const NewBossToDoData = Selected.map((selectdata) => {
            const convert: I_BossToDoData = {
                BossId: selectdata.bossid,
                BossNm: selectdata.bossNm,
                Rank: selectdata.rankid,
                IsDone: false
            };Contents

            return convert;
        });

        const UpdateToDos: I_ToDosData = {
            WeeklyToDos: ToDosData.WeeklyToDos,
            BossToDos: NewBossToDoData
        };

        setToDosData(UpdateToDos);
        setCategory("");
        /**
         * 현 방식, 새로 덮어쓰기 방식
         * - 기존 데이터 상태 존중하지 않음
         * - 기존 데이터 + Selected, update data
         */
        const PrevData = ToDosData.BossToDos.filter((tododata) => {
            const IdCheck = BossContents.find((origindata) => origindata.BossId !== tododata.BossId);
            const NmCheck = Selected.find((selectdata) => selectdata.bossNm === tododata.BossNm);

            /**
             * bossid update 여부 체크
             * - idcheck/undefined * NmCheck/undefined => id만 update return
             * - idcheck/undefined * Nmcheck/true => update 대상, return (종료)
             * - idcheck/true * NmCheck/undefined => tododata return
             * - idcheck/true * NmCheck/true => update 대상, return (종료)
             */

            if(!IdCheck && !NmCheck){
                //boss contents 추가 인해, bossid 변동사항이 생긴 경우
                const GetNewId = BossContents.find((origin) => origin.BossNm === tododata.BossNm)?.BossId;

                const IdUpdate: I_BossToDoData = {
                    BossId: GetNewId,
                    BossNm: tododata.BossNm,
                    IsDone: tododata.IsDone,
                    Rank: tododata.Rank
                };

                return IdUpdate;
            } else if(IdCheck && !NmCheck){
                return tododata;
            } else if((IdCheck && NmCheck)||(!IdCheck && NmCheck)){
                return;
            } 
        });

        const UpdateData = Selected.map((data) => {
            /**
             * Nmcheck, rankcheck
             * Nmcheck/undefined * rankcheck/undefined => data return
             * Nmcheck/true * rankcheck/undefined => updatedata return
             * Nmcheck/true * rankcheck/true => return null
             */

            const NmCheck = ToDosData.BossToDos.find((todos) => todos.BossNm === data.bossNm);
            const RankCheck = ToDosData.BossToDos.find((todos) => todos.Rank === data.rankid);

            if(!NmCheck && !RankCheck){
                const NewData: I_BossToDoData = {
                    BossId: data.bossid,
                    BossNm: data.bossNm,
                    Rank: data.rankid,
                    IsDone: false
                };
                return NewData;
            } else if(NmCheck && !RankCheck){
                const RankUpdate: I_BossToDoData = {
                    BossId: data.bossid,
                    BossNm: NmCheck.BossNm,
                    Rank: data.rankid,
                    IsDone: NmCheck.IsDone
                };

                return RankUpdate;
            } else {
                return null;
            }
        }).filter((data) => data !== null);

        const ToDosUpdate: I_ToDosData = {
            WeeklyToDos: ToDosData.WeeklyToDos,
            BossToDos: [
                ...PrevData, ...UpdateData
            ]
        };

        setToDosData(ToDosUpdate);
        setCategory("");
    };

    return (
        <Container>
            <CloseToggleBar onClick={() => setClosed((prev) => !prev)}>
                <div className="messagebox">주간 보스 목록</div>
                <div className="toggleicon">{isClosed ? "▼" : "▲"}</div>
            </CloseToggleBar>
            {
                !isClosed ? (
                    <BossForm onSubmit={handleSubmit(onValid)}>
                        {
                            BossContents.map((data) => {
                                const ColorData = RankColorInfos.find((color) => color.rankId === data.Ranks[0].rankId);
                                const ToDosCheck = ToDosData.BossToDos.findIndex((tododata) => tododata.BossId === data.BossId);
                                const SelectCheck = watch("selectedTargets").includes(data.BossId);

                                const RankDefaultRef = ToDosData.BossToDos.map((tododata) => {
                                    const OptionValue = tododata.BossId + "_" + tododata.Rank;

                                    return OptionValue;
                                })

                                return (
                                    <FormItem key={data.BossId}>
                                        <BossIcons>
                                            <input 
                                                key={`checkbox_${data.BossId}`}
                                                type="checkbox"
                                                value={data.BossId}
                                                defaultChecked={ToDosCheck !== -1}
                                                data-bossname={data.BossNm}
                                                data-defaultrank={data.Ranks[0].rankId}
                                                disabled={watch("selectedTargets").length === 12 && !SelectCheck}
                                                {...register("selectedTargets", {
                                                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                                                        const {
                                                            currentTarget: {value}
                                                        } = e;
                                                        const {
                                                            target: {
                                                                checked,
                                                                dataset: {defaultrank, bossname}
                                                            }
                                                        } = e;

                                                        if(!checked){
                                                            BossSelect({isSelect: false, targetId: value});
                                                        } else {
                                                            BossSelect({
                                                                isSelect: true,
                                                                targetId: value,
                                                                targetNm: bossname,
                                                                defaultRank: defaultrank
                                                            });
                                                        }
                                                    } 
                                                })}
                                            />
                                            <img src={`/imgs/boss_monsters/${data.BossId}.png`} />
                                            <div className="bossNm">
                                                {data.SubName === undefined ? data.BossNm : null}
                                                {data.SubName !== undefined ? data.SubName : null}
                                            </div>
                                        </BossIcons>
                                        <RanksBox>
                                            {
                                                data.Ranks.length < 2 && SelectCheck ? (
                                                    <RankIcon 
                                                        textcolor={ColorData?.fontColor} 
                                                        bgcolor={ColorData?.bgColor} 
                                                        bordercolor={ColorData?.borderColor}
                                                    >
                                                        {data.Ranks[0].rankNm}
                                                    </RankIcon>
                                                ) : null
                                            }
                                            {
                                                data.Ranks.length >= 2 && SelectCheck ? (
                                                    <select 
                                                        key={`${data.BossId}_rankselect`} 
                                                        onChange={RankChange} 
                                                    >
                                                        {
                                                            data.Ranks.map((rankdata) => {
                                                                const Keys = `${data.BossId}_${rankdata.rankId}`;
                                                                return (
                                                                    <option 
                                                                        key={Keys} 
                                                                        value={Keys}
                                                                        /**'selected' error 생길 가능성 有 */
                                                                        selected={RankDefaultRef.includes(Keys)}
                                                                    >
                                                                        {rankdata.rankNm}
                                                                    </option>
                                                                );
                                                            })
                                                        }
                                                    </select>
                                                ) : null
                                            }
                                        </RanksBox>
                                    </FormItem>
                                );
                            })
                        }
                        <button>저장</button>
                    </BossForm>
                ): null
            }
        </Container>
    );
}