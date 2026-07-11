import { GetCharData, GetCharScheduleData, GetOcids } from "@/game_datas/Fetchs";
import styles from "../_styles/_charpage/charpage.module.css";
import Charpage_CharInfobox from "../_components/_charpage/CharInfobox";
import ShowToDos from "../_components/_charpage/Showtodos";

interface I_Chartodos_charpage {
    params: {
        charname: string;
    };
};

export default async function Chartodos_charpage({params}: I_Chartodos_charpage){
    const {charname} = await params;

    const OcidData = await GetOcids(charname);
    const CharData = await GetCharData(OcidData?.ocid);
    const ScheduleData = await GetCharScheduleData(OcidData?.ocid);

    if(ScheduleData){
        console.log(ScheduleData);
    }

    return (
        <div className={styles.charpage_wrapper}>
            {
                !CharData || !ScheduleData ? (
                    <div>캐릭터 데이터를 불러오고 있습니다...</div>
                ) : null
            }
            {
                CharData && ScheduleData ? (
                    <main className={styles.charpage_container}>
                        <Charpage_CharInfobox 
                            ocid={OcidData?.ocid}
                            charname={CharData.character_name}
                            charlevel={CharData.character_level}
                            charclass={CharData.character_class}
                            charimgurl={CharData.character_image}
                            worldname={CharData.world_name}
                        />
                        <ShowToDos 
                            dailycontentsdata={ScheduleData.daily_contents}
                            bosscontentsdata={ScheduleData.boss_contents}
                            weeklycontentsdata={ScheduleData.weekly_contents}
                        />
                    </main>
                ) : null
            }           
        </div>
    );
}