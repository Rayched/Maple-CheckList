"use client"

import { BookmarkStore, I_BookmarkData } from "@/stores/BookmarkStore";
import styles from "../_styles/incomeSearchbar.module.css";
import { useState } from "react";
import { useStore } from "zustand";
import styled from "styled-components";
import { WorldDatas } from "@/game_datas/contentsData";

interface I_Targets {
    charname: string;
    charclass: string;
    charlevel: number;
    charimgurl: string;
    worldId?: string;
};

const Searchoutputs = styled.div`
    width: 100%;
    height: 40%;
    min-width: 250px;
    max-width: 340px;
    padding: 2px 4px;
    background-color: inherit;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .charimage {
        width: 30%;
        height: 90%;
        min-width: 90px;
        max-width: 100px;
        min-height: 95px;
        max-height: 100px;
    }

    .chardatabox {
        width: 70%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .chardata {
            width: 90%;
            height: 50%;
            margin: 2px 0px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
        };
    }
`;

export default function IncomeSearchBar(){
    const [SearchName, setSearchName] = useState("");
    const [ShowSearchOutput, setShowSearchOutput] = useState(false);
    const [Targets, setTargets] = useState<I_Targets|null>(null);

    const {Bookmarks} = useStore(BookmarkStore);

    const onChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            currentTarget: {value}
        } = e;
 
        if(value === ""){
            setShowSearchOutput(false);
            setTargets(null);
        } else {
            setShowSearchOutput(true);

            const idx = Bookmarks.findIndex((data) => data.charname === value);

            if(idx === -1){
                setTargets(null);
            } else {
                const GetWorldId = WorldDatas.find((data) => data.worldNm === Bookmarks[idx].worldname)?.worldId;

                setTargets({
                    charname: Bookmarks[idx].charname,
                    charlevel: Bookmarks[idx].charlevel,
                    charimgurl: Bookmarks[idx].charimgurl,
                    charclass: Bookmarks[idx].charclass,
                    worldId: GetWorldId
                });
            }
        }
        
        setSearchName(value);
    };

    const TargetDelete = () => {
        setShowSearchOutput(false);
        setTargets(null);
    };

    return (
        <div className={styles.Wrapper}>
            {
                !Targets ? (
                    <div className={styles.searchbar_container}>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={"20"} height={"20"}>
                                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                            </svg>
                        </span>
                        <input 
                            type="text" 
                            placeholder="캐릭터 이름을 입력해주세요." 
                            value={SearchName}
                            onChange={onChangeEvent}
                        />
                    </div>
                ) : null
            }
            {
                ShowSearchOutput && Targets ? (
                    <div className={styles.searchoutput_wrapper} onClick={TargetDelete}>
                        <div className={styles.searchoutput_container}>
                            <div className={styles.searchoutput_searchbar}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={"20"} height={"20"}>
                                        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                                    </svg>
                                </span>
                                <input 
                                    type="text" 
                                    placeholder="캐릭터 이름을 입력해주세요." 
                                    value={SearchName}
                                    readOnly
                                />
                            </div>
                            <Searchoutputs>
                                <img src={Targets.charimgurl} className="charimage" />
                                <div className="chardatabox">
                                    <div className="chardata">
                                        <img src={`/imgs/worlds/${Targets.worldId}.png`} />
                                        <span>{Targets.charname}</span>
                                    </div>
                                    <div className="chardata">
                                        {`LV.${Targets.charlevel} / ${Targets.charclass}`}
                                    </div>
                                </div>
                            </Searchoutputs>
                        </div>
                    </div>
                ) : null
            }
        </div>
    );
}

/**
 * 매커니즘 정리 (초안)
 * 
 * 1. 화면 상단의 검색창에 캐릭터명을 입력을 한다.
 * - 만약 기존에 만들어둔 해당 캐릭터의 chartodo가 있다면
 *   그것을 검색바 하단에 보여준다. (구글이나 네이버 같은 미리보기 형식으로)
 * - 없는 경우에는 '캐릭터 추가하기'라고 써있는 버튼 출력
 * - 어느쪽이든 클릭 시, 보스 추가 화면으로 넘어간다
 *   (별도의 페이지 이동 or 임의의 form 컴포넌트 출력)
 * 
 * 2. 보스 수익 추가 화면에서 출력할 데이터는 다음과 같다
 * - 캐릭터 이미지, 닉네임, 서버, 레벨, 직업 등
 * - 개별 보스 form은 메이플 도구의 디자인을 참고할것
 *   (보스 수익을 추가하는 form의 경우에는
 *    todolist에서 썼던 '보스 선택 - 난이도 select'에 더불어
 *    '파티원 수, select'가 추가된다.)
 *   ('보스 선택 - 난이도 선택 - 파티원 수 선택'
 *    이 패턴을 고집하는 것보다는 
 *    '보스 / 난이도 선택 - 파티원 수 선택', 이러한 형태로 하는 것이
 *    실제로 쓰는 입장에선 더 편할 것 같다는 생각이 들어서
 *    '메이플 도구'라는 사이트에서 보스 수익 페이지의 form 디자인을
 *    참고하기로 했다.)
 * - [보스 (난이도 checkbox's) | (파티원 수)] <= form 형태 (예상)
 * - 다만 난이도 checkbox는 보스 당 하나의 난이도만 체크가 가능해야 함.
 *   (체크박스가 4개 있을때, 4개 다 동시에 클릭되는게 아닌
 *    4개 중 택 1이 되야함.)
 */