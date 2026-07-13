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
}

interface I_ToDoItem_Quest extends I_ToDoItem {
    quest_state: string|null;
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

const TextBox = styled.div`
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

function ToDoTextBox({contents_name, little_name}: I_ToDoTextBox){
    const {NowViewportWidthValue} = useStore(ViewportWidthStore);

    return (
        <TextBox>
            {NowViewportWidthValue > 500 ? contents_name : null}
            {NowViewportWidthValue <= 500 ? little_name : null}
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
export function ToDoItem_Quest({quest_state, contents_name, little_name}: I_ToDoItem_Quest){
    return (
        <div className={styles.todoitem_container}>
            <div className={styles.todoitem_checkbox_area}>
                <div className="checkbox">
                    <ToDoCheckbox isdone={quest_state === "2" ? "true" : "false"} />
                </div>
            </div>
            <div className={styles.todoitem_children_area}>
                <ToDoTextBox 
                    contents_name={contents_name} 
                    little_name={little_name}
                />
            </div>
        </div>
    );
}

export function ToDoItem_Contents({contents_name, little_name, now_count, max_count}: I_ToDoItem_Contents){
    return (
        <div className={styles.todoitem_container}>
            <div className={styles.todoitem_checkbox_area}>
                <div className="checkbox">
                    <ToDoCheckbox isdone={now_count > 0 ? "true" : "false"} />
                </div>
            </div>
            <div className={styles.todoitem_children_area}>
                <ToDoTextBox 
                    contents_name={contents_name}
                    little_name={little_name}
                />
            </div>
        </div>
    );
}

export function BossToDoItem({
    complite_flag, contents_id, contents_name, little_name, rank_name
}: I_BossToDoItem){
    const {NowViewportWidthValue} = useStore(ViewportWidthStore);

    return (
        <div className={styles.bosstodoitem_container}>
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
        </div>
    );
}