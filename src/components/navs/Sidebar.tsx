"use client"

import { motion } from "framer-motion";
import Link from "next/link";
import styled from "styled-components";

interface SidebarProps {
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
    height: 20%;
    border: 1px solid black;
    margin-top: 3em;
`;

const LinkItem = styled.li`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 95%;
    height: 45%;
    margin: 5px 0px;
    border-radius: 10px;
    background-color: red;
    a {
        text-decoration: none;
        color: black;
    }
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

export default function Sidebar({setStateFn}: SidebarProps){
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
                <LinkItem>
                    <Link href={"/chartodos"}>메할일</Link>
                </LinkItem>
                <LinkItem>
                    <Link href={"/incomes"}>주간 수익</Link>
                </LinkItem>
            </LinkBox>
        </Container>
    );
}