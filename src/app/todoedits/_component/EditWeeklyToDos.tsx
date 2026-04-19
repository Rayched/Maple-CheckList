"use client"
import { FormContainer, FormHeader, FormItem, FormSliderBox } from "@/components/commons/FormCommons";
import { WeeklyContentsData } from "@/game_datas/contentsData";
import { I_WeeklyToDos } from "@/stores/CharToDoStore";
import { WeeklyToDoSort } from "@/utils/SortFuncs";
import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

interface I_EditWeeklyToDos {
    EditWeeklyToDosData: I_WeeklyToDos[];
    setEditWeeklyToDosData: React.Dispatch<React.SetStateAction<I_WeeklyToDos[]>>;
    setNowCategory: React.Dispatch<React.SetStateAction<string>>;
};

interface I_FormValue {
    arcane_select: string[];
    weekly_select: string[];
};

interface I_UpdateWeeklyToDoDatasProps {
    contentsId: string;
    ischecked: boolean;
};

const Container = styled(FormContainer)``;
const Titles = styled(FormHeader)``;

const ScrollBox = styled(FormSliderBox)`
    height: 80%;
    min-height: 150px;
    max-height: 220px;
`;

const WeeklyFormItemBox = styled.div`
    width: 100%;
    min-height: 150px;
    margin: 2px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .formitemtitle {
        width: 90%;
        padding-bottom: 5px;
        margin-top: 3px;
        text-align: center;
        border-bottom: 2px solid black;
        font-weight: bold;
    };
`;

const WeeklyFormItem = styled(FormItem)`
    width: 85%;
    height: 5%;
    min-height: 25px;
    margin: 3px 2px;
    padding: 3px 2px;
    
    input {
        width: 16px;
        height: 16px;
    };

    span {
        font-weight: bold;
        font-size: 15px;
        margin-left: 5px;
    };
`;

export default function EditWeeklyToDos({EditWeeklyToDosData, setEditWeeklyToDosData, setNowCategory}: I_EditWeeklyToDos){
    const {register} = useForm<I_FormValue>({
        defaultValues: {
            arcane_select: [],
            weekly_select: []
        }
    });

    const ArcaneContentsIds = ["arcane01", "arcane02", "arcane03", "arcane04", "arcane05", "arcane06"];

    const ArcaneContentsData = WeeklyContentsData.filter((data) => {
        const IDCheck = ArcaneContentsIds.includes(data.ContentsId);

        if(!IDCheck) return;
        return data;
    });

    const WeeklyData = WeeklyContentsData.filter((data) => {
        const IdCheck = ArcaneContentsIds.includes(data.ContentsId);

        if(IdCheck) return;
        return data;
    });

    const UpdateWeeklyToDoDatas = ({contentsId, ischecked}: I_UpdateWeeklyToDoDatasProps) => {
        if(!ischecked){
            const ToDosFilter = EditWeeklyToDosData?.filter((data) => data.contentsId !== contentsId);

            if(!ToDosFilter) return;

            setEditWeeklyToDosData(ToDosFilter);
        } else {
            const TargetData = WeeklyContentsData.find((data) => data.ContentsId === contentsId);

            if(!TargetData){
                return;
            } else {
                const NewWeeklyToDo: I_WeeklyToDos = {
                    contentsId: contentsId,
                    contentsNm: TargetData.ContentsNm,
                    contentsUnit: TargetData.Units,
                    ToDoDone: false
                };

                setEditWeeklyToDosData((state) => {
                    if(!state) return state;
                    
                    const UpdateValue = WeeklyToDoSort({
                        WeeklyToDoDatas: [...state, NewWeeklyToDo]
                    });

                    return UpdateValue;
                })
            };
        }
    };

    return (
        <Container>
            <Titles>주간 컨텐츠 목록 (편집)</Titles>
            <ScrollBox>
                <WeeklyFormItemBox key={"arcaneriver_weeklycontents"}>
                    <div className="formitemtitle">아케인리버 주간 컨텐츠</div>
                    {
                        ArcaneContentsData.map((data) => {
                            const isAdds = EditWeeklyToDosData?.find((todos) => todos.contentsId === data.ContentsId);

                            return (
                                <WeeklyFormItem key={data.ContentsId}>
                                    <input 
                                        type="checkbox" 
                                        value={data.ContentsId}
                                        defaultChecked={isAdds ? true : false}
                                        {...register("arcane_select", {
                                            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                                                const {
                                                    currentTarget: {value},
                                                    target: {checked}
                                                } = e;

                                                UpdateWeeklyToDoDatas({
                                                    contentsId: value,
                                                    ischecked: checked
                                                })
                                            }
                                        })}
                                    />
                                    <span>{data.ContentsNm}</span>
                                </WeeklyFormItem>
                            );
                        })
                    }
                </WeeklyFormItemBox>
                <WeeklyFormItemBox key={"weeklycontents"}>
                    <div className="formitemtitle">주간 컨텐츠</div>
                    {
                        WeeklyData.map((data) => {
                            const isAdds = EditWeeklyToDosData?.find((todos) => todos.contentsId === data.ContentsId);
                            return (
                                <WeeklyFormItem key={data.ContentsId}>
                                    <input 
                                        type="checkbox"
                                        value={data.ContentsId}
                                        defaultChecked={isAdds ? true : false}
                                        {...register("weekly_select", {
                                            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                                                const {
                                                    currentTarget: {value},
                                                    target: {checked}
                                                } = e;

                                                UpdateWeeklyToDoDatas({
                                                    contentsId: value,
                                                    ischecked: checked
                                                });
                                            }
                                        })}
                                    />
                                    <span>{data.ContentsNm}</span>
                                </WeeklyFormItem>
                            );
                        })
                    }
                </WeeklyFormItemBox>
            </ScrollBox>
        </Container>
    );
}