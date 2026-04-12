import { GetCharData, GetOcids } from "@/game_datas/Fetchs";
import { redirect } from "next/navigation";
import styles from "../_style/addtodos.module.css";
import AddToDosLayout from "@/app/addtodos/[charNm]/_component/AddToDosLayout";
import CharDataBox from "@/components/pages/commons/CharDataBox";

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
        <div className={styles.addtodos_pagewrapper}>
            <CharDataBox 
                charname={CharData?.character_name}
                charlevel={CharData.character_level}
                charExpRate={CharData.character_exp_rate}
                charclass={CharData.character_class}
                charimgurl={CharData.character_image}
                worldname={CharData.world_name}
            />
            {
                CharData ? (
                    <AddToDosLayout 
                        ocid={Ocids.ocid}
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