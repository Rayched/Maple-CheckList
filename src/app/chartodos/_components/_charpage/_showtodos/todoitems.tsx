import styled from "styled-components";
import styles from "../../../_styles/_charpage/todoitem.module.css";
import { useStore } from "zustand";
import { ViewportWidthStore } from "@/stores/ViewportStore";

interface I_ToDoItem {
    contents_name: string;
    little_name: string;
};

interface I_ToDoCheckbox {
    isdone: string
};

interface I_ToDoTextBox {
    contents_name: string;
    little_name: string;
    ModifyCheck: string;
    isdone: string;
}

interface I_ToDoItemContainer {
    contents_state: string;
}

interface I_ToDoItem_Quest extends I_ToDoItem {
    quest_state: string|null;
    now_count: number;
    max_count: number;
}

interface I_ToDoItem_Contents extends I_ToDoItem {
    now_count: number;
    max_count: number;
}

interface I_BossToDoItem {
    complite_flag: string;
    contents_id: string;
    contents_name: string;
    little_name?: string;
    rank_name: string;
}

const ToDoItemContainer = styled.div<I_ToDoItemContainer>`
    width: 90%;
    height: 10%;
    min-height: 50px;
    margin: 5px 0px;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: ${(props) => props.contents_state === "true" ? "rgb(170, 170, 170)" : "rgb(220, 220, 220)"};
    border-width: 2px;
    border-style: solid;
    border-color: ${(props) => props.contents_state === "true" ? "rgb(145, 145, 145)" : "rgb(198, 199, 200)"};
    border-radius: 8px;
`;

const TextBox = styled.div<I_ToDoItemContainer>`
    text-decoration: ${(props) => props.contents_state === "true" ? "line-through" : "none"};
    text-decoration-thickness: 2px;
    font-size: 14px;
`;

const Checkbox = styled.div`
    width: 13px;
    height: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid black;
    border-radius: 3px;
`;

function ToDoTextBox({contents_name, little_name, ModifyCheck, isdone}: I_ToDoTextBox){
    const {NowViewportWidthValue} = useStore(ViewportWidthStore);

    return (
        <TextBox contents_state={isdone}>
            {NowViewportWidthValue > 600 ? contents_name : null}
            {NowViewportWidthValue <= 599 ? little_name : null}
        </TextBox>
    );
}

function ToDoCheckbox({isdone}: I_ToDoCheckbox){
    return (
        <Checkbox>
            {
                isdone === "true" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={"14"} height={"14"}>
                        <path d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"/>
                    </svg>
                ) : null
            }
        </Checkbox>
    );
}

//contents_type = quest, todoitem
export function ToDoItem_Quest({quest_state, contents_name, little_name, now_count, max_count}: I_ToDoItem_Quest){
    const ModifyCheck = (little_name.includes("주간 퀘스트") && contents_name.length >= 12);
    const contents_state = quest_state === "2" ? "true" : "false";

    return (
        <ToDoItemContainer contents_state={quest_state === "2" ? "true" : "false"}>
            <div className={styles.todoitem_checkbox_area}>
                <div className="checkbox">
                    <ToDoCheckbox isdone={contents_state} />
                </div>
            </div>
            <div className={styles.todoitem_children_area}>
                <ToDoTextBox 
                    contents_name={contents_name} 
                    little_name={little_name}
                    ModifyCheck={String(ModifyCheck)}
                    isdone={contents_state}
                />
                <div className={styles.todoitem_countbox}>
                    {`${now_count}/${max_count}`}
                </div>
            </div>
        </ToDoItemContainer>
    );
}

export function ToDoItem_Contents({contents_name, little_name, now_count, max_count}: I_ToDoItem_Contents){
    const contents_state = now_count > 0 ? "true" : "false";

    return (
        <ToDoItemContainer contents_state={contents_state}>
            <div className={styles.todoitem_checkbox_area}>
                <div className="checkbox">
                    <ToDoCheckbox isdone={contents_state} />
                </div>
            </div>
            <div className={styles.todoitem_children_area}>
                <ToDoTextBox 
                    contents_name={contents_name}
                    little_name={little_name}
                    ModifyCheck={"false"}
                    isdone={contents_state}
                />
                <div className={styles.todoitem_countbox}>
                    {max_count === 0 ? `${now_count}` : null}
                    {max_count !== 0 ? `${now_count}/${max_count}`: null}
                </div>
            </div>
        </ToDoItemContainer>
    );
}

export function BossToDoItem({
    complite_flag, contents_id, contents_name, little_name, rank_name
}: I_BossToDoItem){
    const {NowViewportWidthValue} = useStore(ViewportWidthStore);
    const contents_state = complite_flag === "true" ? "true" : "false";

    return (
        <ToDoItemContainer contents_state={contents_state}>
            <div className={styles.todoitem_checkbox_area}>
                <div className="checkbox">
                    <ToDoCheckbox isdone={complite_flag} />
                </div>
            </div>
            <div className={styles.todoitem_children_area}>
                <img src={`/imgs/boss_monsters/${contents_id}.png`} />
                <span>
                    {little_name ? little_name : null}
                    {!little_name ? contents_name : null}
                </span>
                <span>{rank_name}</span>
            </div>
        </ToDoItemContainer>
    );
}