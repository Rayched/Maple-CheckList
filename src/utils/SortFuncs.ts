
import { I_BossToDos, I_WeeklyToDos } from "@/stores/CharToDoStore";

interface I_BossToDoSortProps {
    BossToDoDatas: I_BossToDos[];
};

interface I_WeeklyToDoSortProps {
    WeeklyToDoDatas: I_WeeklyToDos[];
};

export function BossToDoSort({BossToDoDatas}: I_BossToDoSortProps){
    const ToDoSortOutput = BossToDoDatas.sort((a, b) => {
        if(String(a.contentsId) > String(b.contentsId)){
            return 1;
        } else if(String(a.contentsId) < String(b.contentsId)){
            return -1;
        } else {
            return 0;
        }
    });

    return ToDoSortOutput;
};

export function WeeklyToDoSort({WeeklyToDoDatas}: I_WeeklyToDoSortProps){
    const WeeklySorts = (Contents: I_WeeklyToDos[]) => {
        const Outputs = Contents.sort((a, b) => {
            if(String(a.contentsId) > String(b.contentsId)){
                return 1;
            } else if(String(a.contentsId) < String(b.contentsId)){
                return -1;
            } else {
                return 0;
            }
        })

        return Outputs;
    };
    
    const AccountFilter = WeeklySorts(
        WeeklyToDoDatas.filter((data) => data.contentsUnit === "account")
    );
    const CharFilter = WeeklySorts(
        WeeklyToDoDatas.filter((data) => data.contentsUnit !== "account")
    );

    return [...AccountFilter, ...CharFilter];
}

