"use client"

import { CharIncomeStore, I_IncomeData } from "@/stores/CharIncomeStore";
import styled from "styled-components";
import styles from "../_styles/charincomelist.module.css";
import { useStore } from "zustand";
import { useEffect, useState } from "react";
import IncomeItemBox from "./_charincomelist/Incomeitembox";
import useGetSummitValues from "@/utils/useGetSummitValues";

interface I_DeleteBtnClickEventProps {
    targetId: string;
    targetNm: string;
};

/**
 * 정적인 부분 => css module style
 * 동적 파트 => styled-components
 */

const CharIncomeItem = styled.div`
    width: 95%;
    height: 30%;
    margin: 3px 0px;
    color: black;
    background-color: rgb(250, 250, 250);
    border: 2px solid #b0b0b0;
    border-radius: 10px;
    justify-content: space-between;

    .chardatabox {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 30%;
        max-width: 150px;
        height: 90%;
    };
    &:nth-child(1){
        margin-top: 1px;
        margin-bottom: 3px;
    };
    &:hover {
        background-color: rgb(230, 230, 230);
        border-color: #858383;
    };
`;

const CharInfos = styled.div`
    justify-content: center;
    width: 30%;
    max-width: 100px;
    height: 90%;
    .character_image {
        width: 80px;
        height: 80px;
    }
`;

const Charnamebox = styled.div`
    width: 100%;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    img {
      width: 16px;
      height: 16px;
      margin-right: 3px;
    };
`;

const IncomeDataBox = styled.div`
    width: 70%;
    height: 100%;
    justify-content: center;
`;

const IncomeItemList = styled.div`
    .spreads {
        width: 30px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 18px;
    };
`;

const BossIncomeSummitBox = styled.div`
    width: 70%;
    height: 35%;
    margin-top: 5px;
    justify-content: center;
`;

const IncomeValues = styled.div`
    width: 100%;
    max-width: 200px;
    justify-content: center;

    .values {
        font-size: 16px;
        font-weight: bold;
    };
    .length {
        font-size: 13px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0px 5px;
        padding: 1px;
        border: 2px solid black;
        background-color: darkgray;
    };
`;

const DelBtnBox = styled.div`
    width: 5%;
    height: 85%;
    margin-right: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .DelBtn {
        margin: 3px 0px;
        width: 18px;
        height: 18px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: rgb(255, 118, 117);
        border: 2px solid rgb(255, 118, 117);
        border-radius: 30px;
    };
`;

export default function CharIncomeList(){
    const {CharIncomeDatas, DeleteCharIncomeData} = useStore(CharIncomeStore);
    const [NowWidth, setNowWidth] = useState<number>(0);
    const [EditMode, setEditMode] = useState(false);

    const {SummitData, Totals} = useGetSummitValues();

    const DeleteBtnClickEvent = ({targetId, targetNm}: I_DeleteBtnClickEventProps) => {
        const DeleteConfirm = window.confirm(`'${targetNm}'의 주간보스 수익 데이터를 삭제하겠습니까?`);

        if(!DeleteConfirm){
            return;
        } else {
            DeleteCharIncomeData(targetId);
            setEditMode(false);
        }
    };

    const CharIncomeItemClickedEvent = (e: React.MouseEvent<HTMLDivElement>|React.TouchEvent<HTMLDivElement>) => {
        /**EditMode(편집 버튼 클릭 여부), true인 경우
         * 작동 X
         */
        const {
            detail
        } = e;

        console.log(detail);
        setTimeout(() => console.log(detail), 500);
    };

    useEffect(() => {
        const WidthResized = () => {
            setNowWidth(window.innerWidth);
        };

        WidthResized();

        window.addEventListener("resize", WidthResized);

        return () => {
            window.removeEventListener("resize", WidthResized);
        }
    }, []);

    return (
        <div className={styles.charincomelist_wrapper}>
            <div className={styles.charincomelistbox}>
                <div className={styles.charincomelistbox_titles}>
                    <h4>캐릭터 목록</h4>
                    <div className={styles.editmodebtn} onClick={() => setEditMode((prev) => !prev)}>
                        {!EditMode ? "편집" : "취소"}
                    </div>
                </div>
                <div className={styles.charincomelist_mains}>
                    {
                        CharIncomeDatas.map((data) => {
                            const incomeSubmit = SummitData({IncomeDatas: data.incomeData});
                            return (
                                <CharIncomeItem key={`${data.charname}_incomeItem`} className={styles.flexbox_type_row} onClick={CharIncomeItemClickedEvent}>
                                    <CharInfos className={styles.flexbox_type_column}>
                                        <img src={data.charimgurl} className="character_image"/>
                                        <Charnamebox className={styles.flexbox_type_row}>
                                            <img src={`/imgs/worlds/${data.worldId}.png`} />
                                            <h4>{data.charname}</h4>
                                        </Charnamebox>
                                    </CharInfos>
                                    <IncomeDataBox className={styles.flexbox_type_column}>
                                        {
                                            NowWidth >= 640 ? (
                                                <IncomeItemList className={styles.flexbox_type_row}>
                                                    <IncomeItemBox incomedatas={data.incomeData} />
                                                </IncomeItemList>
                                            ) : null
                                        }
                                        {
                                            NowWidth <= 640 ? (
                                                <IncomeItemList className={styles.flexbox_type_row}>
                                                    <IncomeItemBox incomedatas={data.incomeData.slice(0, 2)} />
                                                    <div className="spreads">...</div>
                                                    <IncomeItemBox incomedatas={data.incomeData.slice(data.incomeData.length - 2)} />
                                                </IncomeItemList>
                                            ) : null
                                        }
                                        <BossIncomeSummitBox className={styles.flexbox_type_row}>
                                            <IncomeValues className={styles.flexbox_type_row}>
                                                <span className="values">{incomeSubmit}</span>
                                                <span className="length">{data.incomeData.length}</span>
                                            </IncomeValues>
                                        </BossIncomeSummitBox>
                                    </IncomeDataBox>
                                    {
                                        EditMode ? (
                                            <DelBtnBox>
                                                <div className="DelBtn" onClick={() => DeleteBtnClickEvent({targetId: data.ocid, targetNm: data.charname})}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="white" width={"13"} height={"13"}>
                                                        <path d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"/>
                                                    </svg>
                                                </div>
                                            </DelBtnBox>
                                        ) : null
                                    }
                                </CharIncomeItem>
                            );
                        })
                    }
                </div>
                <div className={styles.IncomesTotal_container}>
                    <div className={styles.IncomesTotal_titles}>총합</div>
                    <div className={styles.IncomesTotal_bodys}>
                        {Totals({charincomedatas: CharIncomeDatas})}
                    </div>
                </div>
            </div>
        </div>
    );
}