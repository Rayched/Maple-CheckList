"use client"

import { useRouter } from "next/navigation";
import styles from "../_styles/bookmarkitem.module.css";

interface I_BookmarkItem {
    charname: string;
};

export default function BookmarkItem({charname}: I_BookmarkItem){
    const router = useRouter();

    const RedirectCharpage = () => {
        router.push(`/chartodos/${charname}`);
    };

    return (
        <div className={styles.bookmarkitem_container} onClick={RedirectCharpage}>
            <h4>{charname}</h4>
        </div>
    );
}