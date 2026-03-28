import { I_LayoutProps } from "../layout";
import styles from "./_styles/chartodos.module.css"

export default function CharToDosLayout({children}: I_LayoutProps){
    return (
        <div className={styles.layoutwrapper}>
            {children}
        </div>
    );
}