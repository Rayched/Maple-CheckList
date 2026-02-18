import { useState } from "react";
import { I_ToDosData } from "../AddToDosLayout";
import styled from "styled-components";

interface I_ShowToDosDataProps {
    ToDosData: I_ToDosData;
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export default function ShowToDosData({ToDosData}: I_ShowToDosDataProps){
    const [ShowWeekly, setShowWeekly] = useState(false);
    const [ShowBoss, setShowBoss] = useState(false);

    return (
        <Container>
            <button onClick={() => setShowWeekly((prev) => !prev)}>
                주간 컨텐츠 {ShowWeekly ? "Close" : "Open"}
            </button>
            {
                ShowWeekly ? (
                    <ul key="WeeklyDisplay">
                        {
                            ToDosData.WeeklyToDos.map((data) => <li key={data.contentsId}>{data.contentsNm}</li>)
                        }
                    </ul>
                ): null
            }
            <button onClick={() => setShowBoss((prev) => !prev)}>
                주간 보스 {ShowBoss ? "Close" : "Open"}
            </button>
            {
                ShowBoss ? (
                    <ul key="BossDisplay">
                        {
                            ToDosData.BossToDos.map((data) => <li key={data.BossId}>{data.BossNm} / {data.Rank}</li>)
                        }
                    </ul>
                ) : null
            }
        </Container>
    );
}