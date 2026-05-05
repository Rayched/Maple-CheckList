import styles from "./_styles/incomes.module.css";

export default function IncomeLayout({children}: {children: React.ReactNode}){
    return (
        <div className={styles.income_layout}>
            {children}
        </div>
    );
}