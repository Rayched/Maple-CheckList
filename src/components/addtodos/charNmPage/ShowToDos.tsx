import { useState } from "react";
import { I_ToDosData } from "./AddToDosLayout";
import styled from "styled-components";
import { CloseToggleBar, FormContainer, FormItem } from "./FormCommons";
import { BossContentsData } from "@/game_datas/contentsData";
import { RankColorInfos } from "@/game_datas/bossrank_colordata";

interface I_ShowToDosDataProps {
    ToDosData: I_ToDosData;
};

interface I_UnitsBox {
    isaccounts: boolean;
};

interface I_BossRankbox {
    font_color: string;
    bg_color: string;
    border_color: string;
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: auto;
`;

const ShowDataHeaders = styled(CloseToggleBar)`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

const ShowDataBodys = styled(FormContainer)``;

const ToDoItemList = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 3px 0px;
`;

const WeeklyItem = styled(FormItem)`
    .contentsNm {
        margin-left: 4px;
    };
    justify-content: space-between;
`;

const UnitsBox = styled.div<I_UnitsBox>`
    color: white;
    background-color: ${(props) => props.isaccounts ? "#aa3355" : "#319DBC"};
    font-weight: bold;
    margin-right: 5px;
    padding: 4px;
    border-radius: 5px;
`;

const BossItem = styled(FormItem)`
    justify-content: space-between;
    .bossdatabox {
        display: inherit;
        align-items: inherit;
        margin-left: 5px;

        img {
            margin-right: 3px;
        }
    };
`;

const BossRankbox = styled.div<I_BossRankbox>`
    color: ${(props) => props.font_color};
    background-color: ${(props) => props.bg_color};
    border: 2px solid ${(props) => props.border_color};
    border-radius: 5px;
    font-size: 14px;
    margin-right: 3px;
    padding: 3px;
    width: 60px;
    height: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default function ShowToDosData({ToDosData}: I_ShowToDosDataProps){
    const [ShowWeekly, setShowWeekly] = useState(false);
    const [ShowBoss, setShowBoss] = useState(false);

    const GetBossOriginData = BossContentsData;

    return (
        <Container>
            <ShowDataBodys key="WeeklyToDoList">
                <ShowDataHeaders>
                    <div className="messagebox">주간 컨텐츠 목록</div>
                    <button onClick={() => setShowWeekly((prev) => !prev)}>
                        {ShowWeekly ? "Close" : "Open"}
                    </button>
                </ShowDataHeaders>
                {
                    ShowWeekly ? (
                        <ToDoItemList>
                            {
                                ToDosData.WeeklyToDos.map((data) => {
                                    return (
                                        <WeeklyItem key={data.contentsId}>
                                            <div className="contentsNm">{data.contentsNm}</div>
                                            {data.contentsUnit === "account" ? <UnitsBox isaccounts={true}>계정</UnitsBox> : null} 
                                            {data.contentsUnit === "character" ? <UnitsBox isaccounts={false}>캐릭터</UnitsBox> : null}
                                        </WeeklyItem>
                                    );
                                })
                            }
                        </ToDoItemList>
                    ): null
                }
            </ShowDataBodys>
            <ShowDataBodys key="BossToDoList">
                <CloseToggleBar>
                    <div className="messagebox">
                        주간 보스 목록 {`(${ToDosData.BossToDos.length} / 12)`}
                    </div>
                    <button onClick={() => setShowBoss((prev) => !prev)}>
                        {ShowBoss ? "Close" : "Open"}
                    </button>
                </CloseToggleBar>
                {
                    ShowBoss ? (
                        <ToDoItemList>
                            {
                                ToDosData.BossToDos.map((data) => {
                                    const GetLittleName = GetBossOriginData.find((origin) => origin.BossId === data.BossId);
                                    const RankColors = RankColorInfos.find((colors) => colors.rankId === data.Rank);

                                    if(!GetLittleName || !RankColors){
                                        return null;
                                    } else {
                                        return (
                                            <BossItem key={data.BossId}>
                                                <div className="bossdatabox">
                                                    <img src={`/imgs/boss_monsters/${data.BossId}.png`} />
                                                    <div className="bossname">
                                                        {!GetLittleName.SubName ? data.BossNm : null}
                                                        {GetLittleName ? GetLittleName.SubName : null}
                                                    </div>
                                                </div>
                                                <BossRankbox font_color={RankColors.fontColor} bg_color={RankColors.bgColor} border_color={RankColors.borderColor}>
                                                    {data.Rank === "easy" ? "이지" : null}
                                                    {data.Rank === "Normal" ? "노말" : null}
                                                    {data.Rank === "Hard" ? "하드" : null}
                                                    {data.Rank === "Chaos" ? "카오스" : null}
                                                    {data.Rank === "Extreme" ? "익스트림" : null}
                                                </BossRankbox>
                                            </BossItem>
                                        );
                                    }
                                })
                            }
                        </ToDoItemList>
                    ) : null
                }
            </ShowDataBodys>
        </Container>
    );
}