import styles from "../_styles/todoedits.module.css";

export default function ToDoEditsLoading(){
    return (
        <div className={styles.todoedits_loading_wrapper}>
            <h4>캐릭터 데이터를 가져오고 있습니다...</h4>
        </div>
    );
}