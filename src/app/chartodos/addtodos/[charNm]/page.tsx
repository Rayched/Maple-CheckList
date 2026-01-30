import Link from "next/link";
import styles from "../../../../styles/addtodos.module.css";
import {  GetCharData, GetOcids } from "@/utils/Fetchs";
import CharacterBox from "@/components/chartodos/addtodos/CharacterBox";
import { redirect } from "next/navigation";
import AddToDosLayout from "@/components/chartodos/addtodos/AddToDosLayout";

interface I_AddToDosPage {
    params: {
        charNm: string
    }
};

export default async function AddToDosPage({params}: I_AddToDosPage){
    const {charNm} = await params;
    
    const OcidData = await GetOcids(charNm);
    const CharBasicData = await GetCharData(OcidData?.ocid);

    console.log(CharBasicData);

    if((!OcidData)||(!CharBasicData)){
        redirect(`/chartodos?error=invalid-parameters&name=${charNm}`);
    }
        
    return (
        <div className={styles.Wrapper}>
            <CharacterBox 
                charNm={CharBasicData.character_name}
                charLV={CharBasicData.character_level}
                charClass={CharBasicData.character_class}
                charImg={CharBasicData.character_image}
                worldNm={CharBasicData.world_name}
            />
            <AddToDosLayout />
        </div>
    );
}

/**
 * 
 */