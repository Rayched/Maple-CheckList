"use client"
import Link from "next/link";
import styles from "../../styles/forms/api_errorbox.module.css";

export default function CookieErrorBox(){
    return (
        <div className={styles.errorbox_container}>
            <div className={styles.errorbox_header}>
                <Link href={"/chartodos"}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={"18"} height={"18"} fill="#ffffff">
                        <path d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"/>
                    </svg>
                </Link>
            </div>
            <div className={styles.errorbox_contentsbox}>
                <h4>스케줄러 API를 사용할 수 없습니다.</h4>
                <h4>cookie를 확인해주세요.</h4>
            </div>
        </div>
    );
}