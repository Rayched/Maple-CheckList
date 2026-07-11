import BookmarkList from "./_components/BookmarkList";
import styles from "./_styles/chartodos.module.css";

export default function Chartodos_page(){
    return (
        <div className={styles.chartodos_page_wrapper}>
            <BookmarkList />
        </div>
    );
}