interface I_ToDoEditsPage {
    params: {
        charNm: string;
    }
}
async function ToDoEditsPage({params}: I_ToDoEditsPage){
    return (
        <div>
            Edit page
        </div>
    );
};

export default ToDoEditsPage;