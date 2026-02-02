import CharacterBox from "@/components/addtodos/charNmPage/CharacterBox";
import { GetCharData, GetOcids } from "@/game_datas/Fetchs";
import { redirect } from "next/navigation";
import styles from "../../../styles/addtodos.module.css";
import AddToDosLayout from "@/components/addtodos/charNmPage/AddToDosLayout";

interface I_AddtodosNestedPage {
    params: {
        charNm: string;
    }
};

export default async function AddtodosNestedPage({params}: I_AddtodosNestedPage){
    const {charNm} = await params;

    const Ocids = await GetOcids(charNm);
    const CharData = await GetCharData(Ocids?.ocid);

    if(!Ocids || !CharData){
        redirect(`/addtodos?error=invalid-parameters&name=${charNm}`);
    }

    console.log(Ocids.ocid);

    return (
        <div className={styles.AddtodosPage}>
            <CharacterBox 
                charNm={CharData.character_name}
                charLV={CharData.character_level}
                charClass={CharData.character_class}
                worldNm={CharData.world_name}
                charImg={CharData.character_image}
            />
            {
                CharData ? (
                    <AddToDosLayout 
                        charNm={CharData?.character_name}
                        charLv={CharData?.character_level}
                        charClass={CharData.character_class}
                        charImg={CharData?.character_image}
                        worldNm={CharData.world_name}
                    />
                ) : null
            }
        </div>
    );
}