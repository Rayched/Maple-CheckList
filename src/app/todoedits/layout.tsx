import styles from "./_styles/todoedits.module.css";

export default function ToDoEditsLayout({children}: {children: React.ReactNode}){
    return (
        <div className={styles.todoedits_layout}>
            {children}
        </div>
    );
};