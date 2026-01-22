"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import styled from "styled-components";

interface I_NavItem {

}

const Container = styled.nav`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 30%;
    height: 100%;
`;

const NavItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35%;
    height: 98%;
    font-size: 17px;
    font-weight: bold;
    margin: 0px 5px;
    padding: 0px 3px;
    border-radius: 15px;
    position: relative;
    a {
        color: white;
        text-decoration: none;
        z-index: 1;
    };
`;

const MatchBox = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    height: 98%;
    border-radius: 8px;
    margin: 0px 5px;
    padding: 0px 3px;
    background-color: rgba(83, 92, 104, 0.5);
    z-index: 0;
`;

export default function NavBar(){
    const pathNm = usePathname();

    return (
        <Container>
            <NavItem>
                <Link href={"/chartodos"}>메할일</Link>
                {pathNm === "/chartodos" ? <MatchBox /> : null}
            </NavItem>
            <NavItem>
                <Link href={"/incomes"}>주간 수익</Link>
                {pathNm === "/incomes" ? <MatchBox /> : null}
            </NavItem>
        </Container>
    );
}