import Link from "next/link";
import styles from "../styles/Root.module.css";
import SearchBar from "@/components/addtodos/SearchBar";

export default function Home() {
  const ocid_sample = "b4bf51ad8dc345e7685fcc533e2afacc";
  return (
    <div className={styles.HomeWrapper}>
      <div className={styles.BookmarkBox}>
        <div className={styles.BookmarkItem}>
          <Link href={`/chartodos/${ocid_sample}`}>테스트</Link>
        </div>
      </div>
    </div>
  );
}
