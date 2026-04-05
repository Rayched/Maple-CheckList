
import styles from "./_style/addtodos.module.css";

interface I_AddToDosLayout {
    children: React.ReactNode
};

export default function AddToDosLayout({children}: I_AddToDosLayout){
    return (
        <div className={styles.layout_wrapper}>
            {children}
        </div>
    );
}