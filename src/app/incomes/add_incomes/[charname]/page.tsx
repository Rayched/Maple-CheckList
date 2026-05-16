import { GetCharData, GetOcids } from "@/game_datas/Fetchs";
import { redirect } from "next/navigation";
import styles from "../_styles/EditIncomes.module.css"
import Link from "next/link";
import CharDataBox from "@/components/CharDataBox";
import AddBossIncomeForms from "./_components/AddBossIncomeForms";

interface I_EditIncomeCharnamePageProps {
    params: {
        charname: string;
    }
};

export default async function EditIncomeCharnamePage({params}: I_EditIncomeCharnamePageProps){
    const {charname} = await params;

    const Ocids = await GetOcids(charname);
    const CharData = await GetCharData(Ocids?.ocid);

    return (
        <div className={styles.wrapper}>
            {
                !Ocids && !CharData ? (
                    <div className={styles.errormessagebox}>
                        <div className={styles.errormessagebox_header}>
                            <Link href={'/incomes'}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={"18"} height={"18"} fill="#ffffff">
                                    <path d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"/>
                                </svg>
                            </Link>
                        </div>
                        <div className={styles.errormessagebox_bodys}>
                            <h4>입력하신 닉네임을 다시 확인해주세요.</h4>
                            <h4>입력한 닉네임: {decodeURIComponent(charname)}</h4>
                        </div>
                    </div>
                ) : (
                    <div className={styles.EditIncomes_Container}>
                        <div className={styles.Container_header}>
                            <Link href={'/incomes'}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={"18"} height={"18"} fill="rgb(0, 0, 0)">
                                    <path d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"/>
                                </svg>
                            </Link>
                        </div>
                        <div className={styles.Container_bodys}>
                            <CharDataBox 
                                charname={CharData?.character_name}
                                charclass={CharData?.character_class}
                                charlevel={CharData?.character_level}
                                charimgurl={CharData?.character_image}
                                worldname={CharData?.world_name}
                                charExpRate={CharData?.character_exp_rate}
                            />
                            <AddBossIncomeForms 
                                charname={CharData?.character_name}
                                ocid={Ocids?.ocid}
                            />
                        </div>
                    </div>
                )
            }
        </div>
    );
}