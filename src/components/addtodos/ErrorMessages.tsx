"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";

const MessageBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: red;
    color: white;
    width: 85%;
    max-width: 400px;
    height: 10%;
    border-radius: 8px;
    margin-top: 5px;
    position: relative;

    .MessageBoxHeader {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
    };
`;

const CloseBtn = styled.div`
    border-radius: 30px;
    background-color: gray;
    width: 23px;
    height: 23px;
    position: absolute;
    top: -5px;
    right: -5px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default function ErrorMessages(){
    const [isErrors, setErrors] = useState(false);
    const params = useSearchParams();
    const charNm = params.get("name");
    const error = params.get("error");
    const router = useRouter();

    const Checks = () => {
        if(error === "invalid-parameters"){
            setErrors(true);
        } else {
            setErrors(false);
        }
    };

    const MessageBoxClosed = () => {
        setErrors(false);
        router.push("/addtodos");
    }

    useEffect(() => {
        Checks();
    }, []);

    return (
        <>
            {
                isErrors ? (
                    <MessageBox>
                        <div className="MessageBoxHeader">
                            <CloseBtn onClick={MessageBoxClosed}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="#ffffff" width={"20"} height={"20"}>
                                    <path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z"/>
                                </svg>
                            </CloseBtn>
                            <span>'{charNm}' 캐릭터를 찾을 수 없습니다.</span>
                            <span>입력하신 닉네임을 다시 확인해주세요.</span>
                        </div>
                    </MessageBox>
                ) : null
            }
        </>
    );
}