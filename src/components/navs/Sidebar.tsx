"use client"

import { motion } from "framer-motion";
import Link from "next/link";
import styled from "styled-components";
import { PathDataTypes } from "./Navigations";
import { usePathname, useRouter } from "next/navigation";

interface SidebarProps {
    pathData: PathDataTypes[];
    setStateFn: () => void;
};

const Container = styled(motion.div)`
    width: 40%;
    height: 98%;
    background-color: rgb(220, 221, 225);
    position: absolute;
    right: 0;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CloseBtn = styled.div`
    width: 100%;
    height: 7%;
    border-top-left-radius: inherit;
    background-color: rgb(53, 59, 72);
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: bold;
`;

const LinkBox = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 85%;
    height: 25%;
    margin-top: 3em;
`;

const LinkItem = styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 95%;
    height: 40%;
    margin: 5px 0px;
    color: black;
    font-weight: bold;
    font-size: 18px;
    border-radius: 10px;
    position: relative;

    .pathNm {
        z-index: 2;
    };

    .pathmatchs {
        z-index: 1;
        background-color: red;
        display: flex;
        width: inherit;
        height: inherit;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
`;

const PathMatchs = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: darkgray;
    z-index: 1;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 10px;
`;

const Variants = {
    "init": {
        x: 40,
        opacity: 0
    },
    "animate": {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.3
        }
    },
    "exit": {
        x: 35,
        opacity: 0,
        transition: {
            duration: 0.2
        }
    }
};

export default function Sidebar({pathData, setStateFn}: SidebarProps){
    const NowPath = usePathname();
    const router = useRouter();

    const LinkClicked = (targetURL: string) => {
        router.push(targetURL);
        setStateFn();
    };

    return (
        <Container 
            variants={Variants} 
            initial="init" 
            animate="animate"
            exit={"exit"}
            transition={{type: "tween"}}
        >
            <CloseBtn onClick={setStateFn}>
                <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 640 640" fill="#ffffff">
                    <path d="M439.1 297.4C451.6 309.9 451.6 330.2 439.1 342.7L279.1 502.7C266.6 515.2 246.3 515.2 233.8 502.7C221.3 490.2 221.3 469.9 233.8 457.4L371.2 320L233.9 182.6C221.4 170.1 221.4 149.8 233.9 137.3C246.4 124.8 266.7 124.8 279.2 137.3L439.2 297.3z"/>
                </svg>
                <div>Close</div>
            </CloseBtn>
            <LinkBox>
                {
                    pathData.map((data, idx) => {
                        return (
                            <LinkItem key={`path${idx}`} onClick={() => LinkClicked(data.pathValue)}>
                                <div className="pathNm">{data.pathNm}</div>
                                {NowPath === data.pathValue ? <PathMatchs /> : null}
                            </LinkItem>
                        );
                    })   
                }
            </LinkBox>
        </Container>
    );
}