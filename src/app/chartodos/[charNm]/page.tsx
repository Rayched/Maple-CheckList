import { GetCharData, GetOcids } from "@/game_datas/Fetchs";
import { redirect } from "next/navigation";
import styles from "../_styles/chartodos.module.css"
import Charpage_ToDoList from "./_components/charpage_todolist"
import CharDataBox from "@/components/pages/commons/CharDataBox";

interface I_CharToDosPage {
    params: {
        charNm: string;
    }
};

export default async function CharToDosPage({params}: I_CharToDosPage){
    const {charNm} = await params;

    const Ocids = await GetOcids(charNm);
    const CharData = await GetCharData(Ocids?.ocid);

    if(!Ocids || !CharData){
        console.log("fetch error");
        redirect(`/chartodos`);
    }

    return (
        <div className={styles.chartodos_charname_pagewrapper}>
            <CharDataBox 
                charname={CharData?.character_name}
                charlevel={CharData.character_level}
                charExpRate={CharData.character_exp_rate}
                charclass={CharData.character_class}
                charimgurl={CharData.character_image}
                worldname={CharData.world_name}
            />
            <Charpage_ToDoList 
                charname={CharData.character_name}
            />
        </div>
    );
}