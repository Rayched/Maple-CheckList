
import Link from "next/link";
import styles from "../../styles/chartodos.module.css";
import SearchBar from "@/components/chartodos/SearchBar";
import ErrorMessages from "@/components/chartodos/ErrorMessages";

export default function CharToDosPage(){
    return (
        <div className={styles.Wrapper}>
            <SearchBar />
            <ErrorMessages />
        </div>
    );
};