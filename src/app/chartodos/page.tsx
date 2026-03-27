
import BookmarkList from "@/components/pages/chartodos/BookmarkList";
import sytles from "../../styles/chartodos.module.css";
import CreateNewCharTodo from "@/components/pages/chartodos/CreateToDoBtn";

export default function CharToDosPage(){
    return (
        <div className={sytles.Wrapper}>
            <CreateNewCharTodo />
            <BookmarkList />
        </div>
    );
}