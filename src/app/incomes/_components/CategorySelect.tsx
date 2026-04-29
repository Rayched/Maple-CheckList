"use client"

import styled from "styled-components";
import { I_WorldData } from "./IncomeContainer";

interface I_CategorySelectProps {
    worldDatas: I_WorldData[];
    NowCategory: string;
    setNowCategory: React.Dispatch<React.SetStateAction<string>>;
};

const SelectBox = styled.select`
    width: 150px;
    height: 30px;
    text-align: center;
    margin-top: 5px;
    margin-left: 3px;
`;

export default function Categoryselect({worldDatas, NowCategory, setNowCategory}: I_CategorySelectProps){

    const Category_ChangeEvent = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {
            currentTarget: {value}
        } = e;

        if(NowCategory === value) return;

        setNowCategory(value);
    };

    return (
        <SelectBox onChange={Category_ChangeEvent}>
            <option key={"non-select"} value={""}>전체</option>
            {
                worldDatas.map((data) => {
                    return (
                        <option key={data.categoryId} value={data.categoryNm}>{data.categoryNm}</option>
                    );
                })
            }
        </SelectBox>
    );
}