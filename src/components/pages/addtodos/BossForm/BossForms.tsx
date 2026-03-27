import { BossContentsData } from "@/game_datas/contentsData";
import { I_AddToDoForms } from "../WeeklyForm/WeeklyForms";
import styled from "styled-components";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { I_BossToDoData } from "../AddToDosLayout";
import { BossToDoSort } from "@/utils/SortFuncs";
import BossFormItemdata from "./BossFormItemdata";
import { RankSelectBox, SingleRankBox } from "./BossFormRankBox";

export type BossFormValueType = {
    selectTargets: string[];
};

export interface I_SelectTarget {
    bossid?: string;
    bossNm?: string;
    rankid?: string;
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

const RanksBox = styled.div``;

export default function BossForms({ToDosData, setToDosData, setCategory}: I_AddToDoForms){
    const BossContents = BossContentsData;
    const [isClosed, setClosed] = useState(false);
    const [Selected, setSelected] = useState<I_SelectTarget[]>([]);

    const BossFormMethods = useForm<BossFormValueType>({
        defaultValues: {
            selectTargets: [],
        },
    });

    const {handleSubmit, watch, setValue} = BossFormMethods;

    const onValid = () => {
        const DataConvert = Selected.map((data) => {
            const PrevData = ToDosData.BossToDos.find((tododata) => tododata.BossId === data.bossid);

            if(!PrevData){
                const NewToDoData: I_BossToDoData = {
                    BossId: data.bossid,
                    BossNm: data.bossNm,
                    Rank: data.rankid,
                    IsDone: false,
                };
                return NewToDoData;
            } else {
                const UpdateToDoData: I_BossToDoData = {
                    BossId: data.bossid,
                    BossNm: data.bossNm,
                    Rank: data.rankid,
                    IsDone: PrevData.IsDone
                };
                return UpdateToDoData;
            }
        });

        if(DataConvert.length === 0){
            setToDosData({
                WeeklyToDos: ToDosData.WeeklyToDos,
                BossToDos: ToDosData.BossToDos
            });
            alert("data submit error");
        } else {
            const DataSort = BossToDoSort({BossToDoDatas: DataConvert});
            setToDosData({
                WeeklyToDos: ToDosData.WeeklyToDos,
                BossToDos: DataSort
            });
        }
        setCategory("");
    };

    const DefaultValueSetting = () => {
        if(ToDosData.BossToDos.length <= 0){
            return;
        } else {
            const BossToDosConvert = ToDosData.BossToDos.map((data) => {
                const modifys: I_SelectTarget = {
                    bossid: data.BossId,
                    bossNm: data.BossNm,
                    rankid: data.Rank
                };

                return modifys;
            });
            setSelected(BossToDosConvert);
        }
    }

    useEffect(() => {
        console.clear();
        console.log(Selected);
    }, [Selected]);

    useEffect(() => {
        DefaultValueSetting();
    }, []);

    return (
        <Container>
            <CloseToggleBar onClick={() => setClosed((prev) => !prev)}>
                <div className="messagebox">주간 보스 목록</div>
                <div className="toggleicon">{isClosed ? "▼" : "▲"}</div>
            </CloseToggleBar>
            {
                !isClosed && (
                    <BossForm onSubmit={handleSubmit(onValid)}>
                        <FormProvider {...BossFormMethods}>
                        {
                            BossContents.map((data) => {
                                const ToDosCheck = ToDosData.BossToDos.find((tododata) => tododata.BossId === data.BossId);
                                const SelectCheck = watch("selectTargets").includes(data.BossId);

                                return (
                                    <FormItem key={data.BossId}>
                                        <BossFormItemdata 
                                            bossid={data.BossId}
                                            bossNm={data.BossNm}
                                            bossSubNm={data.SubName}
                                            defaultRank={data.Ranks[0].rankId}
                                            conditions={{isSelecteds: SelectCheck, isToDos: !ToDosCheck ? false : true}}
                                            selectedTargets={Selected}
                                            setSelected={setSelected}
                                        />
                                        <RanksBox>
                                            {
                                                data.Ranks.length < 2 && SelectCheck ? (
                                                    <SingleRankBox 
                                                        rankid={data.Ranks[0].rankId}
                                                        rankNm={data.Ranks[0].rankNm}
                                                    />
                                                ) : null
                                            }
                                            {
                                                data.Ranks.length >= 2 && SelectCheck ? (
                                                    <RankSelectBox 
                                                        key={`${data.BossId}_rankselect`}
                                                        bossid={data.BossId}
                                                        todosData={ToDosCheck}
                                                        ranks={data.Ranks}
                                                        SelectedTargets={Selected}
                                                        setSelected={setSelected}
                                                    />
                                                ) : null
                                            }
                                        </RanksBox>
                                    </FormItem>
                                );
                            })
                        }
                        </FormProvider>
                        <button>저장</button>
                    </BossForm>
                )
            }
        </Container>
    );
}