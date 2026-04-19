import styles from "./_styles/todoedits.module.css";

export default function ToDoEditsLayout({children}: {children: React.ReactNode}){
    return (
        <div className={styles.todoedits_layout}>
            <div className={styles.todoedits_layout_wrapper}>
                <div className={styles.todoedits_charactercard}>
                    {children}
                </div>
            </div>
        </div>
    );
};