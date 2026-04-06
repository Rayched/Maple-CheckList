
import styles from "./_styles/chartodos.module.css";
import CharToDosBookmarkListBox from "./_components/BookmarkList_layout";

export default function CharToDosPage(){
    return (
        <div className={styles.chartodos_pagewrapper}>
            <CharToDosBookmarkListBox />
        </div>
    );
}