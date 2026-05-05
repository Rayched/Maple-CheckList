
import IncomeSearchBar from "./_components/IncomeSearchbar";
import styles from "./_styles/incomes.module.css"

export default function IncomesPage(){
    return (
        <div className={styles.income_page_wrapper}>
            <IncomeSearchBar />
        </div>
    );
}