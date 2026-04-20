import CharDataBox from "@/components/CharDataBox";
import { GetCharData, GetOcids } from "@/game_datas/Fetchs";
import { redirect } from "next/navigation";
import styles from "../_styles/todoedits.module.css";
import EditToDoList from "../_component/EditToDoList";

interface I_ToDoEditsPage {
    params: {
        charNm: string;
    }
}
async function ToDoEditsPage({params}: I_ToDoEditsPage){
    const {charNm} = await params;

    const ocids = await GetOcids(charNm);
    const chardatas = await GetCharData(ocids?.ocid);

    if(!ocids || !chardatas){
        console.log("character data 가져오기 실패");
        redirect("/chartodos");
    } else {
        console.log(ocids.ocid);
        console.log(chardatas);
    }

    return (
        <div className={styles.todoedits_page_wrapper}>
            <CharDataBox 
                charname={chardatas.character_name}
                charlevel={chardatas.character_level}
                charclass={chardatas.character_class}
                charExpRate={chardatas.character_exp_rate}
                charimgurl={chardatas.character_image}
                worldname={chardatas.world_name}
            />
            <EditToDoList 
                charname={chardatas.character_name}
                ocids={ocids.ocid}
            />
        </div>
    );
};

export default ToDoEditsPage;