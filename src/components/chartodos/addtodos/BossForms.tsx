import { BossContentsData } from "@/utils/contentsData";
import { I_AddToDoForms } from "./WeeklyForms";

export default function BossForms({setStateFn}: I_AddToDoForms){
    const BossContents = BossContentsData;

    return (
        <ul>
            {
                BossContents.map((data) => {
                    const Ranks = data.Ranks.map((data) => data.rank).join(", ")

                    return (
                        <li key={data.BossId}>
                            <span>{data.BossNm} [{Ranks}]</span>
                        </li>
                    )
                })
            }
        </ul>
    );
}