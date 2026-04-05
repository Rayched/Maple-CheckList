"use client";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import React from "react";
import { FormRefConditionType } from "./BossFormRankBox";
import { I_BossToDos } from "@/stores/CharToDoStore";
import { I_BossFormValue } from "./BossForms";
import { BossToDoSort } from "@/utils/SortFuncs";

interface I_BossFormItemdataProps {
    bossid: string;
    bossNm: string;
    bossSubNm?: string;
    defaultRank: string;
    isAdds: boolean;
    bosstodos: I_BossToDos[];
    setBossToDos: React.Dispatch<React.SetStateAction<I_BossToDos[]>>;
};

interface I_CheckedEventProps {
    bossId: string;
    bossNm?: string;
    rank?: string;
    isChecked: boolean;
};

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const BossIconImgs = styled.img`
    width: 25px;
    height: 25px;
    margin: 0px 5px;
`;

const Checkbox = styled.input`
    width: 17px;
    height: 18px;
`;

const BossNameBox = styled.div``;

export default function BossFormItemdata({bossid, bossNm, bossSubNm, defaultRank, isAdds, bosstodos, setBossToDos}: I_BossFormItemdataProps){
    const {register} = useFormContext<I_BossFormValue>();

    const CheckedEvent = ({bossId, bossNm, rank, isChecked}: I_CheckedEventProps) => {
        if(!isChecked){
            setBossToDos((state) => {
                const idx = state.findIndex((data) => data.contentsId === bossId || data.contentsNm === bossNm);

                if(idx === -1){
                    return state;
                } else {
                    return [
                        ...state.slice(0, idx),
                        ...state.slice(idx + 1)
                    ];
                }
            });
        } else {
            const idx = bosstodos.findIndex((data) => data.contentsId === bossId || data.contentsNm === bossNm);

            if(idx !== -1){
                const UpdateData: I_BossToDos = {
                    contentsId: bossId,
                    contentsNm: String(bossNm),
                    bossrank: String(rank),
                    ToDoDone: bosstodos[idx].ToDoDone
                };

                setBossToDos((state) => [
                    ...state.slice(0, idx),
                    UpdateData,
                    ...state.slice(idx + 1)
                ]);
            } else {
                const NewBossData: I_BossToDos = {
                    contentsId: bossId,
                    contentsNm: String(bossNm),
                    bossrank: String(rank),
                    ToDoDone: false
                };

                setBossToDos((state) => {
                    const ToDoSort = BossToDoSort({
                        BossToDoDatas: [...state, NewBossData]
                    });

                    return ToDoSort;
                })
            }
        }
    };

    return (
        <Container>
            <Checkbox 
                type="checkbox"
                value={`${bossid}`}
                data-bossname={bossNm}
                data-defaultrank={defaultRank}
                defaultChecked={isAdds}
                disabled={!isAdds && bosstodos.length >= 12 ? true : false}
                {...register("BossSelect", {
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        const {
                            currentTarget: {value},
                            target: {checked, dataset: {defaultrank, bossname}}
                        } = e;
                        CheckedEvent({
                            bossId: value,
                            bossNm: bossname,
                            rank: defaultrank,
                            isChecked: checked
                        })
                    }
                })}
            />
            <BossIconImgs src={`/imgs/boss_monsters/${bossid}.png`}/>
            <BossNameBox>{bossSubNm !== undefined ? `${bossSubNm}` : `${bossNm}`}</BossNameBox>
        </Container>
    );
}