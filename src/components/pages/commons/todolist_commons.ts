/**
 * '/addtodos', '/todoedits', '/chartodos/[charnm]'
 * 이하 페이지에서 개별적으로 만든 ToDoList components에서
 * 공통적인 부분들을 추출해서 모아둔 file
 * 
 * 작업 내역
 * 2026.03.23 월요일 
 * - '/chartodos/...', '/todoedits/...' 우선적으로 적용
 *  ('/addtodos'는 차후에 적용할 예정)
 */

import styled from "styled-components";

export const ToDoList_Container = styled.div`
    width: 100%;
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ToDoList_SelectBox = styled.select`
    display: block;
    width: 70%;
    min-width: 200px;
    max-width: 300px;
    min-height: 30px;
    margin: 5px 0px;
    text-align: center;
`;

export const ToDoList_Mains = styled.div`
    width: 95%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;