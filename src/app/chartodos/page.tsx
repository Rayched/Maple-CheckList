import { cookies } from "next/headers";
import BookmarkList from "./_components/BookmarkList";
import styles from "./_styles/chartodos.module.css";
import { GetBookmarksSchduleData, GetCharScheduleData, GetOcids } from "@/game_datas/Fetchs";
import CookieErrorBox from "@/components/commons/CookieErrorBox";

export default function Chartodos_page(){
    const CookieStore = cookies();

    return (
        <div className={styles.chartodos_page_wrapper}>
            <BookmarkList />
        </div>
    );
}