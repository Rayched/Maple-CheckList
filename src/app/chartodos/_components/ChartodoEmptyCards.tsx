"use client"

import { useStore } from "zustand";
import styles from "../_styles/emptycard.module.css";
import { BookmarkStore } from "@/stores/BookmarkStore";
import { useRouter } from "next/navigation";

//PC 화면용
export function EmptyCardTypeA(){
    return (
        <div className={styles.emptycard_container}>
            
        </div>      
    );
}

//모바일 화면용
export function EmptyCardTypeB(){
    return (
        <div className={styles.emptycard_container}>
            <div className={styles.emptycard_imagebox}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={"30"} height={"30"} fill="rgb(0, 0, 0)">
                    <path d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"/>
                </svg>
            </div>
            <div className={styles.emptycard_chardatabox}>
                <div className={styles.emptycard_chardatabox_namedata}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={"15"} height={"13"}>
                        <path d="M447.6 175c-31.6-74.6-105.5-127-191.6-127-22.1 0-43.4 3.5-63.4 9.8-.4 2-.6 4.1-.6 6.2l0 73.4c0 12.5 10.1 22.6 22.6 22.6 6 0 11.8-2.4 16-6.6l16-16c6-6 14.1-9.4 22.6-9.4l5.5 0c28.5 0 42.8 34.5 22.6 54.6-6 6-14.1 9.4-22.6 9.4l-61.5 0c-8.5 0-16.6 3.4-22.6 9.4l-21.3 21.3c-6 6-9.4 14.1-9.4 22.6l0 42.7c0 17.7 14.3 32 32 32l32 0c17.7 0 32 14.3 32 32l0 32c0 17.7 14.3 32 32 32l2.7 0c8.5 0 16.6-3.4 22.6-9.4l29.3-29.3c6-6 9.4-14.1 9.4-22.6l0-18.7c0-8.8 7.2-16 16-16s16-7.2 16-16l0-34.7c0-8.5-3.4-16.6-9.4-22.6l-16-16c-4.2-4.2-6.6-10-6.6-16 0-12.5 10.1-22.6 22.6-22.6l45 0c12.4 0 22.7-7.1 28-17zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z"/>
                    </svg>
                    <span>캐릭터 명</span>
                </div>
                <div className={styles.emptycard_chardatabox_classdata}>
                    <div className={styles.charclassdata_child} id={styles.level}>{`LV.???`}</div>
                    <div className={styles.charclassdata_child} id={styles.charclass}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={"15"} height={"13"}>
                            <path d="M384 512L96 512c-53 0-96-43-96-96L0 96C0 43 43 0 96 0L400 0c26.5 0 48 21.5 48 48l0 288c0 20.9-13.4 38.7-32 45.3l0 66.7c17.7 0 32 14.3 32 32s-14.3 32-32 32l-32 0zM96 384c-17.7 0-32 14.3-32 32s14.3 32 32 32l256 0 0-64-256 0zm32-232c0 13.3 10.7 24 24 24l176 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-176 0c-13.3 0-24 10.7-24 24zm24 72c-13.3 0-24 10.7-24 24s10.7 24 24 24l176 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-176 0z"/>
                        </svg>
                        <span>직업</span>
                    </div>
                </div>
            </div>
        </div>
    );
}