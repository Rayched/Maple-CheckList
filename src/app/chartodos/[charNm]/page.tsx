interface I_CharToDosPage {
    params: {
        charNm: string;
    }
};

export default async function CharToDosPage({params}: I_CharToDosPage){
    const {charNm} = await params;

    return (
        <div>
            <h4>ocid: {charNm}</h4>
        </div>
    );
}