import { I_BossToDoData } from "@/components/addtodos/charNmPage/AddToDosLayout";

interface I_BossToDoSortProps {
    BossToDoDatas: I_BossToDoData[];
};

export function BossToDoSort({BossToDoDatas}: I_BossToDoSortProps){
    const ToDoSortOutput = BossToDoDatas.sort((a, b) => {
        if(String(a.BossId) > String(b.BossId)){
            return 1;
        } else if(String(a.BossId) < String(b.BossId)){
            return -1;
        } else {
            return 0;
        }
    });

    return ToDoSortOutput;
};

