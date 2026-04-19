import styled from "styled-components";
import { ShowToDos_Commons } from "../../../addtodos/[charNm]/_component/_showtodos/Showtodos_commons";
import { I_BossToDos } from "@/stores/CharToDoStore";
import { BossContentsData } from "@/game_datas/contentsData";
import { RankColorInfos } from "@/game_datas/bossrank_colordata";

interface I_ShowEditBossToDosProps {
    BossToDoDatas: I_BossToDos[];
};

interface I_RankIconProps {
    textcolor?: string;
    bgcolor?: string;
    bordercolor?: string;
};

const Container = styled(ShowToDos_Commons.ItemListContainer)``;
const Titles = styled(ShowToDos_Commons.ItemListTitle)``;
const ItemList = styled(ShowToDos_Commons.ItemListBox)``;

const BossToDoItem = styled(ShowToDos_Commons.ToDoItem)`
    justify-content: space-between;
    .BossDataBox {
        width: 30%;
        min-width: 100px;
        margin-left: 5px;
        display: flex;
        flex-direction: row;
        align-items: center;

        img {
            min-width: 20px;
            max-width: 23px;
            min-height: 20px;
            max-height: 23px;
        }

        span {
            margin-left: 2px;
        }
    };

    .BossRankBox {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-right: 5px;
        border: 2px solid black;
    };
`;

const RankIcon = styled.div<I_RankIconProps>`
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.textcolor};
    background-color: ${(props) => props.bgcolor};
    border: 2px solid ${(props) => props.bordercolor};
`;

export default function ShowEditBossToDos({BossToDoDatas}: I_ShowEditBossToDosProps){
    return (
        <Container>
            <Titles>주간 보스 목록 {`(${BossToDoDatas.length} / 12)`}</Titles>
            <ItemList>
                {
                    BossToDoDatas.map((data) => {
                        const littlename = BossContentsData.find((origins) => origins.BossId === data.contentsId || origins.BossNm === data.contentsNm)?.SubName;
                        const RankColorData = RankColorInfos.find((color) => color.rankId === data.bossrank);

                        return (
                            <BossToDoItem key={data.contentsId}>
                                <div className="BossDataBox">
                                    <img src={`/imgs/boss_monsters/${data.contentsId}.png`} />
                                    <span>{!littlename ? data.contentsNm : littlename}</span>
                                </div>
                                <div className="BossRankBox">
                                    <RankIcon 
                                        textcolor={RankColorData?.fontColor}
                                        bgcolor={RankColorData?.bgColor}
                                        bordercolor={RankColorData?.borderColor}
                                    >{data.bossrank.slice(0, 1)}</RankIcon>
                                </div>
                            </BossToDoItem>
                        );
                    })
                }
            </ItemList>
        </Container>
    );
}