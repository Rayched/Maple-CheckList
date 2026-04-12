import { BossContentsData } from "@/game_datas/contentsData";
import styled from "styled-components";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { BossToDoSort } from "@/utils/SortFuncs";
import BossFormItemdata from "./BossFormItemdata";
import { RankSelectBox, SingleRankBox } from "./BossFormRankBox";
import { I_BossToDos } from "@/stores/CharToDoStore";
import { FormHeader, FormSliderBox, FormContainer, FormItem } from "../../../../../components/commons/FormCommons";

interface I_BossFormProps {
    BossToDoData: I_BossToDos[];
    setBossToDoData: React.Dispatch<React.SetStateAction<I_BossToDos[]>>;
    setCategory: React.Dispatch<React.SetStateAction<string>>;
};

export interface I_BossFormValue {
    BossSelect: string[];
};

const Container = styled(FormContainer)``;
const BoxHeader = styled(FormHeader)``;
const Scrollbox = styled(FormSliderBox)`
    width: 95%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const BossFormItem = styled(FormItem)`
    width: 95%;
    height: 10%;
    min-height: 30px;
    max-height: 32px;
    padding: 4px 2px;
    margin: 3px 0px;
    justify-content: space-between;
`;

const RanksBox = styled.div``;

export default function BossForms({BossToDoData, setBossToDoData, setCategory}: I_BossFormProps){
    const BossData = BossContentsData;
    const FormMethods = useForm<I_BossFormValue>({
        defaultValues: {
            BossSelect: []
        }
    });
    const {watch} = FormMethods;

    return (
        <Container>
            <BoxHeader>주간 보스 목록 {`(${BossToDoData.length} / 12)`}</BoxHeader>
            <Scrollbox>
                <FormProvider {...FormMethods}>
                    {
                        BossData.map((data) => {
                            const IsAdds = BossToDoData.find((todo) => todo.contentsId === data.BossId || todo.contentsNm === data.BossNm);

                            return (
                                <BossFormItem key={data.BossId}>
                                    <BossFormItemdata 
                                        bossid={data.BossId}
                                        bossNm={data.BossNm}
                                        bossSubNm={data.SubName}
                                        defaultRank={data.Ranks[0].rankId}
                                        bosstodos={BossToDoData}
                                        isAdds={IsAdds ? true : false}
                                        setBossToDos={setBossToDoData}
                                    />
                                    {
                                        watch("BossSelect").includes(data.BossId) && (<RanksBox>
                                            {
                                                data.Ranks.length === 1 ? (
                                                    <SingleRankBox 
                                                        rankid={data.Ranks[0].rankId}
                                                        rankNm={data.Ranks[0].rankNm}
                                                    />
                                                ) : null
                                            }
                                            {
                                                data.Ranks.length >= 2 ? (
                                                    <RankSelectBox 
                                                        bossid={data.BossId}
                                                        ranks={data.Ranks}
                                                        todosData={BossToDoData}
                                                        setToDosData={setBossToDoData}
                                                    />
                                                ) : null
                                            }
                                        </RanksBox>)
                                    }
                                </BossFormItem>
                            );
                        })
                    }
                </FormProvider>
            </Scrollbox>
        </Container>
    );
}