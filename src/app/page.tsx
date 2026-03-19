import Link from "next/link";
import styles from "../styles/Root.module.css";

export default function HomePage() {
  return (
    <div className={styles.HomeWrapper}>
      <div className={styles.linkbox} id={styles.chartodos}>
        <Link href={"/chartodos"}>메할일 목록</Link>
      </div>
      <div className={styles.linkbox} id={styles.incomes}>
        <Link href={"/incomes"}>주간 수익</Link>
      </div>
    </div>
  );
}
