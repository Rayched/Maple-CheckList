"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { CloseToggleBar, FormItem } from "../FormCommons";
import { useFormContext } from "react-hook-form";
import { I_WeeklyToDoData } from "../AddToDosLayout";
import { I_WeeklyContents } from "@/game_datas/contentsData";
import { I_FormValue, I_SelectTarget } from "./WeeklyForms";
import { WeeklyToDoSort } from "@/utils/SortFuncs";

interface I_UnitsBoxProps {
    titles: string;
    contentsdata: I_WeeklyContents[];
    SelectTargets: I_SelectTarget[];
    setSelectTargets: Function;
};

interface I_CheckedEventListener {
    weeklyId: string;
    weeklyNm: string;
    contentsUnit?: string;
    isChecked: boolean;
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    border-radius: 10px;
`;

const CloseBar = styled(CloseToggleBar)`
    .messagebox {
        justify-content: flex-start;
        padding-left: 5px;
    };
`;

const ChildrenBox = styled.div`
    width: 100%;
    margin-top: 2px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const WeeklyItem = styled(FormItem)``;

export default function UnitsBox({titles, contentsdata, SelectTargets, setSelectTargets}: I_UnitsBoxProps){
    const {register, watch} = useFormContext<I_FormValue>();
    const [isShow, setShow] = useState(false);

    const CheckedEventListener = ({weeklyId, weeklyNm, contentsUnit, isChecked}: I_CheckedEventListener) => {
        if(!isChecked){
            const Idx = SelectTargets.findIndex((data) => data.weeklyId === weeklyId)

            if(Idx === -1) return;

            setSelectTargets((prev: I_SelectTarget[]) => [
                ...prev.slice(0, Idx),
                ...prev.slice(Idx + 1)
            ]);
        } else {
            const NewWeeklyData: I_SelectTarget = {
                weeklyId: weeklyId,
                weeklyNm: weeklyNm,
                weeklyUnits: String(contentsUnit)
            };
            setSelectTargets((prev: I_SelectTarget[]) => [
                ...prev,
                NewWeeklyData
            ]);
        }
    };

    return (
        <Container>
            <CloseBar>
                <div className="messagebox">{titles}</div>
                <div className="toggleicon" onClick={() => setShow((prev) => !prev)}>
                    {isShow ? "▼" : "▲"}
                </div>
            </CloseBar>
            {
                isShow ? (
                    <ChildrenBox>
                        {
                            contentsdata.map((data) => {
                                const isChecked = SelectTargets.find((selects) => selects.weeklyId === data.ContentsId);

                                return (
                                    <WeeklyItem key={data.ContentsId}>
                                        <input 
                                            type="checkbox" 
                                            defaultChecked={isChecked ? true : false}
                                            value={data.ContentsId}
                                            data-contentsname={data.ContentsNm}
                                            data-contentsunits={data.Units}
                                            {...register("WeeklySelect", {
                                                onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                                                    const {
                                                        currentTarget: {value},
                                                        target: {
                                                            checked,
                                                            dataset: {contentsname, contentsunits}
                                                        }
                                                    } = event;

                                                    if(!checked){
                                                        CheckedEventListener({
                                                            weeklyId: value,
                                                            weeklyNm: String(contentsname),
                                                            isChecked: false
                                                        });
                                                    } else {
                                                        CheckedEventListener({
                                                            weeklyId: value,
                                                            weeklyNm: String(contentsname),
                                                            contentsUnit: contentsunits,
                                                            isChecked: true
                                                        })
                                                    }
                                                }
                                            })}
                                        />
                                        {data.ContentsNm}
                                    </WeeklyItem>
                                );
                            })
                        }
                    </ChildrenBox>
                ) : null
            }
        </Container>
    )
};

/**
 * const isChecked = SelectTargets.find((selects) => selects.weeklyId === data.ContentsId);
 * defaultChecked={isChecked ? true : false}
 */