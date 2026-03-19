
import BookmarkList from "@/components/chartodos/BookmarkList";
import sytles from "../../styles/chartodos.module.css";
import CreateNewCharTodo from "@/components/chartodos/CreateToDoBtn";

export default function CharToDosPage(){
    return (
        <div className={sytles.Wrapper}>
            <CreateNewCharTodo />
            <BookmarkList />
        </div>
    );
}