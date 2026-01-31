import Link from "next/link";
import styles from "../styles/Root.module.css";
import SearchBar from "@/components/addtodos/SearchBar";
import BookmarkBox from "@/components/home/BookmarkBox";

export default function Home() {
  return (
    <div className={styles.HomeWrapper}>
      <BookmarkBox />
    </div>
  );
}
