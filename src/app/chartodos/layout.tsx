import styles from "./_styles/chartodos.module.css";

interface I_Chartodos_layout {
    children: React.ReactNode;
};

export default function Chartodos_layout({children}: I_Chartodos_layout){
    return (
        <div className={styles.chartodos_layout}>{children}</div>
    );
}