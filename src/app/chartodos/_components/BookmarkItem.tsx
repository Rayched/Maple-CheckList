"use client"

import { useRouter } from "next/navigation";
import styles from "../_styles/bookmarkitem.module.css";
import { useStore } from "zustand";
import { BookmarkStore } from "@/stores/BookmarkStore";
import { BossContentsType, ContentsType } from "@/game_datas/Fetchs";

interface I_BookmarkItem {
    charname: string;
    charimgurl: string;
    worldId: string;
    isEditMode: boolean;

    //Scheduler api fetch data's
    daily_contents?: ContentsType[];
    weekly_contents?: ContentsType[];
    boss_contents?: BossContentsType[];
    boss_clear_count?: number;
};

export default function BookmarkItem({
    charname, charimgurl, worldId, isEditMode, daily_contents, 
    weekly_contents, boss_contents, boss_clear_count
}: I_BookmarkItem){
    const router = useRouter();
    const {DeleteBookmark} = useStore(BookmarkStore);

    const DailyContentsFilter = (
        daily_contents ? daily_contents.filter((data) => data.registration_flag === "true") : null
    );

    const WeeklyContentsFilter = (
        weekly_contents ? weekly_contents.filter((data) => data.registration_flag === "true") : null
    );

    const RedirectCharpage = () => {
        if(isEditMode){
            return;
        } else {
            router.push(`/chartodos/${charname}`);
        }
    };

    const DelBtnClicked = () => {
        const confirm = window.confirm("북마크를 삭제하겠습니까?");

        if(!confirm){
            return;
        } else {
            DeleteBookmark({
                targetname: charname
            });
        }
    };

    return (
        <div className={styles.bookmarkitem_container} onClick={RedirectCharpage}>
            <div className={styles.bookmarkitem_bookmarkdata_container}>
                <div className={styles.bookmarkitem_chardatabox_container}>
                    <img className={styles.chardatabox_charimage} src={charimgurl} />
                    <div className={styles.chardatabox_charnamebox}>
                        <img className={styles.chardatabox_worldicon} src={`/imgs/worlds/${worldId}.png`} />
                        <span>{charname}</span>
                    </div>
                </div>
                <div className={styles.bookmarkitem_scheduledatabox}>
                    <div>
                        <div>일일 및 주간 컨텐츠</div>
                        <div>
                            <span>일일 컨텐츠 개수</span>
                            <span>
                                <span>{DailyContentsFilter?.length}</span>
                            </span>
                        </div>
                        <div>
                            <span>주간 컨텐츠 개수</span>
                            <span>{WeeklyContentsFilter?.length}</span>
                        </div>
                    </div>
                    <div>
                        <span>주간 보스</span>
                        <span>
                            {
                                boss_clear_count ? boss_clear_count : 0
                            } / 12
                        </span>
                    </div>
                </div>
            </div>
            {
                isEditMode ? (
                    <div className={styles.bookmarkitem_deletebtn_container}>
                        <div className={styles.bookmarkitem_deletebutton} onClick={DelBtnClicked}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="white" width={"13"} height={"13"}>
                                <path d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"/>
                            </svg>
                        </div>
                    </div>
                ) : null
            }
        </div>
    );
}