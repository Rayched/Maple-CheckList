import { I_BossToDoData, I_WeeklyToDoData } from "@/components/addtodos/charNmPage/AddToDosLayout";

interface I_BossToDoSortProps {
    BossToDoDatas: I_BossToDoData[];
};

interface I_WeeklyToDoSortProps {
    WeeklyToDoDatas: I_WeeklyToDoData[];
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

export function WeeklyToDoSort({WeeklyToDoDatas}: I_WeeklyToDoSortProps){
    const WeeklySorts = (Contents: I_WeeklyToDoData[]) => {
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

