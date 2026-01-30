
import styles from "../../styles/chartodos.module.css";
import ErrorMessages from "@/components/chartodos/ErrorMessages";

export default function CharToDosPage(){
    return (
        <div className={styles.ChartodosPageWrapper}>
            <ErrorMessages />
        </div>
    );
};