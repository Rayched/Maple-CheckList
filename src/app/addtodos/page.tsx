import ErrorMessages from "@/components/addtodos/ErrorMessages";
import styles from "../../styles/addtodos.module.css";

export default function AddToDosPage(){
    return (
        <div className={styles.AddtodosDefaultPage}>
            <ErrorMessages />
        </div>
    );
}