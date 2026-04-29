import IncomeContainer from "./_components/IncomeContainer";
import styles from "./_styles/incomes.module.css"

export default function IncomesPage(){
    return (
        <div className={styles.Wrapper}>
            <IncomeContainer />
        </div>
    );
}