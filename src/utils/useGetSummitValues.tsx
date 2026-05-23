import { CharIncomeStore, I_CharIncomeData, I_IncomeData } from "@/stores/CharIncomeStore";
import { useState } from "react";
import { useStore } from "zustand";

function IncomeSummit(incomedatas: I_IncomeData[]){
    let Outputs = 0;

    for(let i = 0; i < incomedatas.length; i++){
        Outputs += incomedatas[i].boss_price;
    };

    return Outputs;
};

const ModifyIncomedata = (Values: string) => {
    if(Values.length >= 9 && Values.length <= 12){
        const Length = Values.length;

        return `${Values.slice(0, Length - 8)}억 ${Values.slice(Length - 8, Length - 4)}만`;
    } else if(Values.length >= 13 && Values.length <= 16){
        const Length = Values.length;

        return `${Values.slice(0, Length - 12)}조 ${Values.slice(Length - 12, Length - 8)}억 ${Values.slice(Length - 8, Length - 4)}만`
    }
    else {
        const Length = Values.length;

        return `${Values.slice(0, Length - 4)}만`;
    } 
};

export default function useGetSummitValues(){
    const [TotalValue, setTotalValue] = useState(0);
    const GetSummitData = ({IncomeDatas}: {IncomeDatas: I_IncomeData[]}) => {
        const Values = String(IncomeSummit(IncomeDatas));

        return ModifyIncomedata(Values);
    };

    const GetTotals = ({charincomedatas}: {charincomedatas: I_CharIncomeData[]}) => {
        const SummitValues = charincomedatas.map((charincomedata) => {
            if(charincomedata.incomeData.length === 0){
                return null;
            } else {
                const values = IncomeSummit(charincomedata.incomeData);

                return values;
            };
        }).filter((data) => data !== null);

        let Outputs = 0;

        SummitValues.forEach((value) => Outputs += value);

        return ModifyIncomedata(String(Outputs));
    };

    return {
        SummitData: GetSummitData, 
        Totals: GetTotals,
    };
}