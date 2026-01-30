import ErrorMessages from "@/components/chartodos/ErrorMessages";
import SearchBar from "@/components/chartodos/SearchBar";
import styles from "../../styles/chartodos.module.css";
interface I_CharToDosLayout {
    children: React.ReactNode;
};

export default function CharToDosLayout({children}: I_CharToDosLayout){
    return (
        <div className={styles.Wrapper}>
            <div className={styles.ChartodosHeads}>
                <SearchBar />
            </div>
            <div className={styles.ChartodosBodys}>
                {children}
            </div>
        </div>
    );
}