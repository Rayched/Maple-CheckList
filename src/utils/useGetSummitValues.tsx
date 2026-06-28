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

export const ModifyIncomedata = (pricedata: number) => {
    const Values = String(pricedata);

    if(Values.length >= 9 && Values.length <= 12){
        const Length = Values.length;

        return `${Values.slice(0, Length - 8)}억 ${Values.slice(Length - 8, Length - 4)}만`;
    } else if(Values.length >= 13 && Values.length <= 16){
        const Length = Values.length;

        return `${Values.slice(0, Length - 12)}조 ${Values.slice(Length - 12, Length - 8)}억 ${Values.slice(Length - 8, Length - 4)}만`
    }
    else {
        const Length = Values.length;

        return `${Values.slice(0, Length-4)}만`;
    } 
};

export default function useGetSummitValues(){
    const [SummitValue, setSummitValue] = useState(0);
    const {CharIncomeDatas} = useStore(CharIncomeStore);

    const GetSummitData = ({IncomeDatas}: {IncomeDatas: I_IncomeData[]}) => {
        const Values = IncomeSummit(IncomeDatas);

        return ModifyIncomedata(Values);
    };

    const GetTotals = ({NowSelectWorld}: {NowSelectWorld: string}) => {
        if(NowSelectWorld === "all"){
            const PriceSummit = CharIncomeDatas.map((data) => {
                if(data.incomeData.length === 0){
                    return null;
                } else {
                    const values = IncomeSummit(data.incomeData);
                    return values;
                }
            }).filter((data) => data !== null).reduce((accumulator, currentValue) => accumulator + currentValue, 0);

            setSummitValue(PriceSummit);
        } else {
            const PriceSummit = CharIncomeDatas.map((data) => {
                if(data.worldId !== NowSelectWorld){
                    return null;
                } else if(data.incomeData.length === 0){
                    return null;
                } else {
                    const values = IncomeSummit(data.incomeData);
                    return values;
                }
            }).filter((data) => data !== null).reduce((acc, current) => acc + current, 0);
            setSummitValue(PriceSummit);
        }
    };

    return {
        TotalValue: SummitValue,
        SummitData: GetSummitData, 
        GetTotals: GetTotals,
    };
}