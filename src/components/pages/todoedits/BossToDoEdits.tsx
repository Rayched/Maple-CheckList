"use client"

import { useForm } from "react-hook-form";
import { I_EditToDoDatas } from "./EditToDoList";
import { BossContentsData } from "@/game_datas/contentsData";
import { useState } from "react";

/**
 * 주보 편집 form
 */

interface I_BossToDoEdits {
    BossToDoData?: I_BossEditData[];
    setEditToDos: React.Dispatch<React.SetStateAction<I_EditToDoDatas|undefined>>;
    setCategory: React.Dispatch<React.SetStateAction<string>>;
};

export interface I_BossEditData {
    bossId: string;
    bossNm: string;
    bossRank: string;
};

interface I_FormValue {
    SelectTarget: string[];
};

export default function BossToDoEdits({BossToDoData, setEditToDos, setCategory}: I_BossToDoEdits){
    const {register, handleSubmit, watch} = useForm<I_FormValue>({
        defaultValues: {
            SelectTarget: []
        }
    });

    /**
     * setEditToDos와 연결된 state의 값은 해당 컴포넌트에서만
     * 사용하는 것이 아니기 때문에 단순히 보스 난이도를 변경하는 등의
     * 이벤트 발생했을 때 setEditToDos를 통해 state의 값을 조정하면
     * 예기치 못한 문제가 발생할 수도 있음.
     * setEditToDos는 최종적으로 form, submit event가 발생 시에만
     * 호출을 하고, 그외의 change event가 발생하는 경우에는
     * 
     * 해당 컴포넌트의 local state의 값을 조정하는 편이
     * 그나마 더 안전한 방법일 것 같아서
     * 별도의 state를 하나 추가하였음.
     */
    const [BossToDos, setBossToDos] = useState<I_BossEditData[]>(
        BossToDoData as I_BossEditData[]
    );

    const BossDatas = BossContentsData;
    //전체 보스 데이터 불러오기

    return (
        <div>
            <h4>주간 보스 목록 (편집)</h4>
            <form>
                {
                    BossDatas.map((data) => {
                        const IsAdds = BossToDoData?.find((todo) => todo.bossId === data.BossId || todo.bossNm === data.BossNm);

                        if(data.Ranks.length <= 1){
                            return (
                                <div key={data.BossId}>
                                    <input 
                                        type="checkbox" 
                                        value={data.BossId}
                                        defaultChecked={!IsAdds ? false : true}
                                        {...register("SelectTarget")}
                                    />
                                    <span>{data.BossNm}</span>
                                    <span className="rankbox">{data.Ranks[0].rankId}</span>
                                </div>
                            );
                        } else {
                            return (
                                <div key={data.BossId}>
                                    <input 
                                        type="checkbox" 
                                        value={data.BossId}
                                        defaultChecked={!IsAdds ? false : true}
                                        {...register("SelectTarget")}
                                    />
                                    <span>{data.BossNm}</span>
                                    <select defaultValue={IsAdds?.bossRank}>
                                        {
                                            data.Ranks.map((rank) => {
                                                return <option value={rank.rankId}>{rank.rankNm}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            );
                        }
                    })
                }
                <button>저장</button>
            </form>
        </div>
    );
}