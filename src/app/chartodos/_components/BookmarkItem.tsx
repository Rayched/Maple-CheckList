"use client"

import { useRouter } from "next/navigation";
import styles from "../_styles/bookmarkitem.module.css";

interface I_BookmarkItem {
    charname: string;
    charimgurl: string;
    worldname: string;
};

export default function BookmarkItem({charname, charimgurl, worldname}: I_BookmarkItem){
    const router = useRouter();

    const RedirectCharpage = () => {
        router.push(`/chartodos/${charname}`);
    };

    return (
        <div className={styles.bookmarkitem_container} onClick={RedirectCharpage}>
            <div>
                <span>{charname}</span>
            </div>
        </div>
    );
}