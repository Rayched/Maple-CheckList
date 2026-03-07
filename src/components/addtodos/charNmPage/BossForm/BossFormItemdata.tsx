"use client";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import React from "react";
import { BossFormValueType, I_SelectTarget } from "./BossForms";
import { FormRefConditionType } from "./BossFormRankBox";

interface I_BossFormItemdataProps {
    bossid: string;
    bossNm: string;
    bossSubNm?: string;
    defaultRank: string;
    selectedTargets: I_SelectTarget[];
    setSelected: Function;
    conditions: FormRefConditionType;
};

interface I_BossToDoCheckEvent {
    targetId: string;
    targetNm?: string;
    defaultRank?: string;
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

export default function BossFormItemdata({
    bossid, bossNm, bossSubNm, defaultRank, 
    selectedTargets, setSelected, conditions
}: I_BossFormItemdataProps){
    const {register, watch} = useFormContext<BossFormValueType>();

    const BossToDoCheckEvent = (Data: I_BossToDoCheckEvent) => {
        if(!Data.isChecked){
            setSelected((state: I_SelectTarget[]) => {
                const idx = state.findIndex((data) => data.bossid === Data.targetId);

                if(idx === -1){
                    return state;
                } else {
                    const prev = state.slice(0, idx);
                    const next = state.slice(idx + 1);

                    return [
                        ...prev, ...next
                    ];
                }
            });
        } else {
            if(selectedTargets.length >= 12) return;

            setSelected((prev: I_SelectTarget[]) => {
                const NewData: I_SelectTarget = {
                    bossid: Data.targetId,
                    bossNm: Data.targetNm,
                    rankid: Data.defaultRank
                };

                return [
                    ...prev, NewData
                ];
            })
        }
    };

    return (
        <Container>
            <Checkbox 
                type="checkbox"
                value={`${bossid}`}
                data-bossname={bossNm}
                data-defaultrank={defaultRank}
                defaultChecked={conditions.isToDos}
                disabled={
                    !conditions.isSelecteds && selectedTargets.length >= 12}
                {...register("selectTargets", {
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        const {
                            currentTarget: {value},
                            target: {
                                checked,
                                dataset: {
                                    defaultrank,
                                    bossname
                                }
                            }
                        } = e;

                        if(!checked){
                            const Props: I_BossToDoCheckEvent = {
                                targetId: value,
                                isChecked: checked
                            };
                            BossToDoCheckEvent(Props);
                        } else {
                            const Props: I_BossToDoCheckEvent = {
                                targetId: value,
                                targetNm: bossname,
                                isChecked: checked,
                                defaultRank: defaultrank
                            };
                            BossToDoCheckEvent(Props);
                        }
                    }
                })}
            />
            <BossIconImgs src={`/imgs/boss_monsters/${bossid}.png`}/>
            <BossNameBox>{bossSubNm !== undefined ? `${bossSubNm}` : `${bossNm}`}</BossNameBox>
        </Container>
    );
}