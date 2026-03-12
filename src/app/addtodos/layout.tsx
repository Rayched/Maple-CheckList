
import styles from "../../styles/addtodos.module.css";

interface I_AddToDosLayout {
    children: React.ReactNode
};

export default function AddToDosLayout({children}: I_AddToDosLayout){
    return (
        <div className={styles.Wrapper}>
            {children}
        </div>
    );
}