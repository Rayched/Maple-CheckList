
import BookmarkList from "@/components/pages/chartodos/BookmarkList";
import styles from "./_styles/chartodos.module.css";
import CreateNewCharTodo from "@/components/pages/chartodos/CreateToDoBtn";

export default function CharToDosPage(){
    return (
        <div className={styles.chartodos_pagewrapper}>
            <CreateNewCharTodo />
            <BookmarkList />
        </div>
    );
}