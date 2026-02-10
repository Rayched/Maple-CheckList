import { BossContentsData, RankInfo } from "@/game_datas/contentsData";
import { I_AddToDoForms } from "./WeeklyForms";
import styled from "styled-components";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RankColorInfos } from "@/game_datas/bossrank_colordata";

interface I_RankIcon {
    textcolor: string;
    bgcolor: string;
    bordercolor: string;
};

interface I_ContentsData {
    bossId: string;
    rankId: string;
};

interface I_SelectEvent {
    Itemkey: string;
    isChecked: boolean;
};

type BossFormValueType = {
    selectedTargets: string[];
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
    width: 15%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 25px;
        height: 25px;
    }
`;

const RanksBox = styled.div`
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const RankItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export default function BossForms({ToDosData, setToDosData}: I_AddToDoForms){
    const BossContents = BossContentsData;

    const {register, watch} = useForm<BossFormValueType>({
        defaultValues: {
            selectedTargets: []
        },
        mode: "onChange"
    });

    const [isClosed, setClosed] = useState(true);
    const [Selected, setSelected] = useState<String[]>([]);
    const [ContentsData, setContentsData] = useState<I_ContentsData[]>([]);

    const SelectEvent = ({Itemkey, isChecked}: I_SelectEvent) => {
        const BossData = Itemkey.split("_");
        const idx = ContentsData.findIndex((data) => data.bossId === BossData[0]);
        if(!isChecked){
            if(!Selected.includes(BossData[0]) || idx === -1) return;

            const SelectedFilter = Selected.filter((data) => data !== BossData[0]);
            const ContentsFilter = ContentsData.filter((data) => data.bossId !== BossData[0]);

            setSelected(SelectedFilter);
            setContentsData(ContentsFilter);
        } else {
            if(!Selected.includes(BossData[0]) && idx === -1){
                const NewValue: I_ContentsData = {
                    bossId: BossData[0],
                    rankId: BossData[1]
                };
                setSelected([...Selected, BossData[0]]);
                setContentsData([...ContentsData, NewValue]);
            } else if(Selected.includes(BossData[0]) && idx !== -1){
                const ContentsCheck = ContentsData.some((data) => data.bossId === BossData[0] && data.rankId !== BossData[1]);

                switch(ContentsCheck){
                    case true:
                        const UpdateValue: I_ContentsData = {
                            bossId: BossData[0],
                            rankId: BossData[1]
                        };
                        setContentsData([
                            ...ContentsData.slice(0, idx),
                            UpdateValue,
                            ...ContentsData.slice(idx + 1)
                        ])
                        break;
                    case false:
                        break;
                }
            }
        }
    };

    useEffect(() => console.log(ContentsData), [ContentsData]);

    return (
        <Container>
            <CloseToggleBar onClick={() => setClosed((prev) => !prev)}>
                <div className="messagebox">주간 보스 목록</div>
                <div className="toggleicon">{isClosed ? "▼" : "▲"}</div>
            </CloseToggleBar>
            {
                !isClosed ? (
                    <BossForm>
                        {
                            BossContents.map((data) => {
                                return (
                                    <FormItem key={data.BossId}>
                                        <BossIcons>
                                            <img src={`/imgs/boss_monsters/${data.BossId}.png`} />
                                        </BossIcons>
                                        <RanksBox>
                                            {
                                                data.Ranks.map((rankdata) => {
                                                    const Keys = `${data.BossId}_${rankdata.rank}`;
                                                    return (
                                                        <RankItem key={Keys}>
                                                            <input 
                                                                type="checkbox" 
                                                                value={Keys}
                                                                {...register("selectedTargets", {
                                                                    onChange: (e: ChangeEvent<HTMLInputElement>) => {
                                                                        const {currentTarget: {value}} = e;
                                                                        const {target: {checked}} = e;
                                                                        SelectEvent({Itemkey: value, isChecked: checked});
                                                                    }  
                                                                })}
                                                                checked={
                                                                    Selected.includes(data.BossId) && ContentsData.some((state) => state.rankId === rankdata.rank)
                                                                }
                                                            />
                                                        </RankItem>
                                                    );
                                                })
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