
import CharIncomeList from "./_components/CharIncomeList";
import IncomeSearchBar from "./_components/IncomeSearchbar";
import styles from "./_styles/incomes.module.css"

export default function IncomesPage(){
    return (
        <div className={styles.income_page_wrapper}>
            <div className={styles.income_page_searchbar_container}>
                <IncomeSearchBar />
            </div>
            <div className={styles.income_page_mains}>
                <CharIncomeList />
            </div>
        </div>
    );
}