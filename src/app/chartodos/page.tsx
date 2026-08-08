import { cookies } from "next/headers";
import BookmarkList from "./_components/BookmarkList";
import styles from "./_styles/chartodos.module.css";
import { GetBookmarksSchduleData, GetCharScheduleData, GetOcids } from "@/game_datas/Fetchs";
import CookieErrorBox from "@/components/commons/CookieErrorBox";
import { getCookie } from "cookies-next/server";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";

export default async function Chartodos_page(){
    const CookieStore = await cookies();
    const Charnames = await CookieStore.get("mapletodos_bookmarknames")

    if(!Charnames){
        return (
            <div className={styles.chartodos_page_wrapper}>
                <CookieErrorBox />
            </div>
        );
    }

    const Names: string[] = JSON.parse(decodeURIComponent(Charnames.value));
    const GetAllSchedules = await GetBookmarksSchduleData(Names);
    console.log(GetAllSchedules);

    return (
        <div className={styles.chartodos_page_wrapper}>
            {
                GetAllSchedules ? (
                    <BookmarkList 
                        AllScheduleData={GetAllSchedules}
                    />
                ) : <CookieErrorBox />
            }
        </div>
    );
}