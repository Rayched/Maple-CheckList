import { BossContentsData } from "@/game_datas/contentsData";
import { I_AddToDoForms } from "./WeeklyForms";
import styled from "styled-components";
import { useEffect, useState } from "react";
import BossFormItem from "./BossFormItem";

const BossFormContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 320px;
    height: 350px;
    background-color: darkgray;
    justify-content: flex-end;
`;

const FormItems = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    height: 100%;
    margin-right: 5px;
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
            <FormItems>
                {
                    BossContents.map((data, idx) => {
                        const length = (BossContents.length / 3) - 1;

                        if(Pages === 0){
                            return (
                                idx <= length ? <BossFormItem key={data.BossId} MonsterData={data}/> : null
                            );
                        } else if(Pages === 1){
                            return (
                                idx > length && idx <= ((length * 2) + 1) ? <BossFormItem key={data.BossId} MonsterData={data}/> : null
                            );
                        } else {
                            return (
                                idx > ((length * 2)+1) ? <BossFormItem key={data.BossId} MonsterData={data}/> : null
                            )
                        }
                    })
                }
            </FormItems>
            <ScrollBar>
                <ScrollBtn onClick={UpBtnListener}>▲</ScrollBtn>
                <ScrollBtn onClick={DownBtnListener}>▼</ScrollBtn>
            </ScrollBar>
        </BossFormContainer>
    );
}