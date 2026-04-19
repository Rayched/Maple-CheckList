"use client"

import { FormContainer, FormHeader, FormItem, FormSliderBox } from "@/components/commons/FormCommons";
import { RankColorInfos } from "@/game_datas/bossrank_colordata";
import { BossContentsData } from "@/game_datas/contentsData";
import { I_BossToDos } from "@/stores/CharToDoStore";
import { BossToDoSort } from "@/utils/SortFuncs";
import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

//주간 보스 ToDos 편집 components

interface I_EditBossToDosProps {
    EditBossToDoDatas: I_BossToDos[];
    setEditBossToDoDatas: React.Dispatch<React.SetStateAction<I_BossToDos[]>>;
    setNowCategory: React.Dispatch<React.SetStateAction<string>>;
};

interface I_FormValue {
    selectTarget: string[];
    bossrankselect: string[];
};

interface I_CheckedEventProps {
    bossid: string;
    ischecked: boolean;
    bossname?: string;
    defaultRank?: string;
};

interface I_SingleRankBoxProps {
    textcolor?: string;
    bgcolor?: string;
    border_color?: string;
};

const Container = styled(FormContainer)``;
const Titles = styled(FormHeader)``;

const ScrollBox = styled(FormSliderBox)`
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

    .FormDataBox {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 45%;
        height: 100%;
        min-width: 100px;
        max-width: 150px;

        input {
            width: 17px;
            height: 18px;
        };

        img {
            width: 25px;
            height: 25px;
            margin: 0px 5px;
        };

        .bossnamebox {
            font-size: 16.5px;
            font-weight: bold;
        };
    };

    .RankDataBox {
        width: 45%;
        height: 100%;
        padding-right: 5px;
        display: flex;
        justify-content: flex-end;
    };
`;

const SingleRankBox = styled.div<I_SingleRankBoxProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px 3px;
    color: ${(props) => props.textcolor};
    background-color: ${(props) => props.bgcolor};
    border: 3px solid ${(props) => props.border_color};
    border-radius: 8px;
    width: 20%;
    height: 20%;
    min-width: 20px;
    max-width: 20px;
    min-height: 20px;
    max-height: 20px;
`;

const RankSelectBox = styled.select`
    display: flex;
    text-align: center;
    width: 70%;
    min-width: 70px;
    max-width: 90px;
    font-weight: bold;
    font-size: 14px;
    border-radius: 5px;
`;

export default function EditBossToDos({EditBossToDoDatas, setEditBossToDoDatas, setNowCategory}: I_EditBossToDosProps){
    const ContentsData = BossContentsData;

    const {register} = useForm<I_FormValue>({
        defaultValues: {
            selectTarget: []
        }
    });

    const CheckedEvent = ({bossid, bossname, defaultRank, ischecked}: I_CheckedEventProps) => {
        if(!ischecked){
            const TargetFilters = EditBossToDoDatas.filter((data) => data.contentsId !== bossid || data.contentsNm !== bossname);

            setEditBossToDoDatas(TargetFilters);
        } else {
            const NewData: I_BossToDos = {
                contentsId: bossid,
                contentsNm: String(bossname),
                bossrank: String(defaultRank),
                ToDoDone: false
            };

            const UpdateValue = BossToDoSort({
                BossToDoDatas: [
                    ...EditBossToDoDatas,
                    NewData
                ]
            });

            setEditBossToDoDatas(UpdateValue);
        }
    };

    const RankChangeEvent = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const {currentTarget: {value}} = event;
        const [GetBossId, GetBossRank] = value.split("_");

        if(!GetBossId || !GetBossRank) return;

        const idx = EditBossToDoDatas.findIndex((data) => data.contentsId === GetBossId);

        if(idx === -1){
            console.log("boss data 조회 실패");
            return;
        } else {
            const UpdateValue: I_BossToDos = {
                contentsId: EditBossToDoDatas[idx].contentsId,
                contentsNm: EditBossToDoDatas[idx].contentsNm,
                bossrank: GetBossRank,
                ToDoDone: EditBossToDoDatas[idx].ToDoDone
            };

            setEditBossToDoDatas((state) => [
                ...state.slice(0, idx),
                UpdateValue,
                ...state.slice(idx + 1)
            ]);
        }
    }

    return (
        <Container>
            <Titles>주간 보스 목록 {`(${EditBossToDoDatas.length} / 12)`}</Titles>
            <ScrollBox>
                {
                    ContentsData.map((data) => {
                        const isAdds = EditBossToDoDatas?.find((todos) => todos.contentsId === data.BossId || todos.contentsNm === data.BossNm);

                        const ColorData = RankColorInfos.find((color) => color.rankId === data.Ranks[0].rankId);

                        return (
                            <BossFormItem key={data.BossId}>
                                <div className="FormDataBox">
                                    <input 
                                        type="checkbox"
                                        value={data.BossId}
                                        data-bossname={data.BossNm}
                                        data-defaultrank={isAdds ? isAdds.bossrank : data.Ranks[0].rankId}
                                        defaultChecked={isAdds ? true : false}
                                        disabled={!isAdds && EditBossToDoDatas.length >= 12 ? true : false}
                                        {...register("selectTarget", {
                                            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                                                const {
                                                    currentTarget: {value},
                                                    target: {
                                                        checked,
                                                        dataset: {bossname, defaultrank}
                                                    }
                                                } = e;

                                                CheckedEvent({
                                                    bossid: value,
                                                    bossname: bossname,
                                                    defaultRank: defaultrank,
                                                    ischecked: checked
                                                });
                                            }
                                        })}
                                    />
                                    <img src={`/imgs/boss_monsters/${data.BossId}.png`} />
                                    <div className="bossnamebox">{!data.SubName ? data.BossNm : data.SubName}</div>
                                </div>
                                <div className="RankDataBox">
                                    {
                                        isAdds && data.Ranks.length <= 1 ? (
                                            <SingleRankBox textcolor={ColorData?.fontColor} bgcolor={ColorData?.bgColor} border_color={ColorData?.borderColor}>
                                                {data.Ranks[0].rankId.slice(0, 1)}
                                            </SingleRankBox>
                                        ): null
                                    }
                                    {
                                        isAdds && data.Ranks.length > 1 ? (
                                            <RankSelectBox
                                                key={`${data.BossId}_rankselect`} 
                                                defaultValue={`${data.BossId}_${isAdds.bossrank}`}
                                                onChange={RankChangeEvent}
                                            >
                                                {
                                                    data.Ranks.map((rank, idx) => {
                                                        return (
                                                            <option key={`${data.BossId}_rank${idx}`} value={`${data.BossId}_${rank.rankId}`}>
                                                                {rank.rankNm}
                                                            </option>
                                                        );
                                                    })
                                                }
                                            </RankSelectBox>
                                        ) : null
                                    }
                                </div>
                            </BossFormItem>
                        );
                    })
                }
            </ScrollBox>
        </Container>
    );
}