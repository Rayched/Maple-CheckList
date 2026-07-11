
import { I_BossIncomeData } from "@/app/incomes/add_incomes/_components/AddIncomeForms";

interface I_IncomeDataSortProps {
    IncomeDatas: I_BossIncomeData[];
}; 

/**
 * '/incomes' page, data sort function
 */

export function IncomeDataSort({IncomeDatas}: I_IncomeDataSortProps){
    const ToDoSortOutput = IncomeDatas.sort((a, b) => {
        if(String(a.bossid) > String(b.bossid)){
            return 1;
        } else if(String(a.bossid) < String(b.bossid)){
            return -1;
        } else {
            return 0;
        }
    });

    return ToDoSortOutput;
}