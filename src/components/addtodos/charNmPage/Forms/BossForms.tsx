import { BossContentsData } from "@/utils/contentsData";
import { I_AddToDoForms } from "./WeeklyForms";
import styled from "styled-components";
import { useEffect, useState } from "react";

const BossFormContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 300px;
    height: 350px;
    background-color: darkgray;
    justify-content: flex-end;
`;

const ScrollBar = styled.div`
    width: 7%;
    height: 100%;
    background-color: red;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;

const ScrollBtn = styled.div`
    width: 20px;
    height: 20px;
    color: white;
    background-color: blue;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default function BossForms({ToDosData, setToDosData}: I_AddToDoForms){
    const BossContents = BossContentsData;
    

    const [Pages, setPages] = useState(0);

    const UpBtnListener = () => {
        if(Pages === 0){
            setPages(2);
        } else {
            setPages((prev) => prev - 1);
        }
    };

    const DownBtnListener = () => {
        if(Pages === 2){
            setPages(0);
        } else {
            setPages((prev) => prev + 1);
        }
    };

    return (
        <BossFormContainer>
            <ul>
                {
                    BossContents.map((data, idx) => {
                        const length = (BossContents.length / 3) - 1;

                        if(Pages === 0){
                            return (
                                idx <= length ? <li key={data.BossId}>{data.BossNm}</li> : null
                            );
                        } else if(Pages === 1){
                            return (
                                idx > length && idx <= ((length * 2) + 1) ? <li key={data.BossId}>{data.BossNm}</li> : null
                            );
                        } else {
                            return (
                                idx > ((length * 2)+1) ? <li key={data.BossId}>{data.BossNm}</li> : null
                            )
                        }
                    })
                }
            </ul>
            <ScrollBar>
                <ScrollBtn onClick={UpBtnListener}>▲</ScrollBtn>
                <ScrollBtn onClick={DownBtnListener}>▼</ScrollBtn>
            </ScrollBar>
        </BossFormContainer>
    );
}