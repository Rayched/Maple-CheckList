"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { CloseToggleBar, FormItem } from "../FormCommons";
import { useFormContext } from "react-hook-form";
import { I_WeeklyToDoData } from "../AddToDosLayout";
import { I_WeeklyContents } from "@/game_datas/contentsData";
import { I_FormValue } from "./WeeklyForms";

interface I_UnitsBoxProps {
    titles: string;
    contentsdata: I_WeeklyContents[];
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

export default function UnitsBox({titles, contentsdata}: I_UnitsBoxProps){
    const {register} = useFormContext<I_FormValue>();
    const [isShow, setShow] = useState(false);

    const ClickEvent = () => {
        setShow((prev) => !prev);
    }

    return (
        <Container>
            <CloseBar>
                <div className="messagebox">{titles}</div>
                <div className="toggleicon" onClick={ClickEvent}>
                    {isShow ? "▼" : "▲"}
                </div>
            </CloseBar>
            {
                isShow ? (
                    <ChildrenBox>
                        {
                            contentsdata.map((data) => {
                                return (
                                    <WeeklyItem key={data.ContentsId}>
                                        <input 
                                            type="checkbox" 
                                            value={data.ContentsId}
                                            {...register("WeeklySelect")}
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
}