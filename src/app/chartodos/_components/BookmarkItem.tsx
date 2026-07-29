"use client"

import { useRouter } from "next/navigation";
import styles from "../_styles/bookmarkitem.module.css";
import { useStore } from "zustand";
import { BookmarkStore } from "@/stores/BookmarkStore";

interface I_BookmarkItem {
    charname: string;
    charimgurl: string;
    worldname: string;
    isEditMode: boolean;
};

export default function BookmarkItem({charname, charimgurl, worldname, isEditMode}: I_BookmarkItem){
    const router = useRouter();
    const {DeleteBookmark} = useStore(BookmarkStore);

    const RedirectCharpage = () => {
        if(isEditMode){
            return;
        } else {
            router.push(`/chartodos/${charname}`);
        }
    };

    return (
        <div className={styles.bookmarkitem_container} onClick={RedirectCharpage}>
            <div className={styles.bookmarkitem_bookmarkdata_container}>
                <span>{charname}</span>
            </div>
            {
                isEditMode ? (
                    <div className={styles.bookmarkitem_deletebtn_container}>
                        <div className={styles.bookmarkitem_deletebutton} onClick={() => DeleteBookmark({targetname: charname})}>
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