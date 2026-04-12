import { I_WeeklyContents } from "@/game_datas/contentsData";
import { I_WeeklyToDos } from "@/stores/CharToDoStore";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import { I_FormValue } from "./WeeklyForms";
import React from "react";
import { WeeklyToDoSort } from "@/utils/SortFuncs";
import { FormItem } from "@/components/commons/FormCommons";

interface I_WeeklyFormItemsProps {
    WeeklyItemsTitle: string;
    WeeklyContentsDatas: I_WeeklyContents[];
    WeeklyToDoDatas: I_WeeklyToDos[];
    setWeeklyToDoDatas: React.Dispatch<React.SetStateAction<I_WeeklyToDos[]>>;
};

interface I_CheckedEventProps {
    contentsId: string;
    contentsNm?: string;
    contentsUnit?: string;
    isChecked: boolean;
};

const Container = styled.div`
    width: 100%;
    min-height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .formitemtitle {
        width: 90%;
        padding-bottom: 5px;
        margin-top: 3px;
        text-align: center;
        border-bottom: 2px solid black;
        font-weight: bold;
    };

    ul {
        width: 90%;
        margin-top: 2px;
        display: flex;
        flex-direction: column;
        align-items: center;
    };
`;

const FormItems = styled(FormItem)`
    width: 100%;
    height: 5%;
    min-height: 25px;
    margin: 3px 0px;
    padding: 3px 2px;

    input {
        width: 16px;
        height: 16px;
    };
`;

export default function WeeklyFormItems({WeeklyItemsTitle, WeeklyContentsDatas, WeeklyToDoDatas, setWeeklyToDoDatas}: I_WeeklyFormItemsProps){
    const {register} = useFormContext<I_FormValue>();

    const CheckedEvent = ({contentsId, contentsNm, contentsUnit, isChecked}: I_CheckedEventProps) => {
        if(!isChecked){
            setWeeklyToDoDatas((state) => {
                const TargetFilter = state.filter((data) => data.contentsId !== contentsId);
                return [...TargetFilter];
            });
        } else {
            //중복 여부 확인용
            const idx = WeeklyToDoDatas.findIndex((data) => data.contentsId === contentsId || data.contentsNm === contentsNm);

            if(idx !== -1){
                const UpdateWeeklys: I_WeeklyToDos = {
                    contentsId: contentsId,
                    contentsNm: String(contentsNm),
                    contentsUnit: String(contentsUnit),
                    ToDoDone: WeeklyToDoDatas[idx].ToDoDone
                };
                setWeeklyToDoDatas((state) => {
                    return [
                        ...state.slice(0, idx),
                        UpdateWeeklys,
                        ...state.slice(idx + 1)
                    ];
                });
            } else {
                setWeeklyToDoDatas((state) => {
                    const NewWeeklys: I_WeeklyToDos = {
                        contentsId: contentsId,
                        contentsNm: String(contentsNm),
                        contentsUnit: String(contentsUnit),
                        ToDoDone: false
                    };

                    const WeeklySort = WeeklyToDoSort({
                        WeeklyToDoDatas: [...state, NewWeeklys]
                    });

                    return WeeklySort;
                })
            }
        }
    };

    return (
        <Container>
            <div className="formitemtitle">{WeeklyItemsTitle}</div>
            <ul>
                {
                    WeeklyContentsDatas.map((data) => {
                        const IsAdds = WeeklyToDoDatas.find((tododata) => tododata.contentsId === data.ContentsId || tododata.contentsNm === data.ContentsNm);
                        return (
                            <FormItems key={data.ContentsId}>
                                <input 
                                    type="checkbox" 
                                    value={data.ContentsId}
                                    data-contentsname={data.ContentsNm}
                                    data-contentsunit={data.Units}
                                    defaultChecked={!IsAdds ? false : true}
                                    {...register("WeeklySelect", {
                                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                                            const {
                                                currentTarget: {value},
                                                target: { dataset: {contentsname, contentsunit}, checked }
                                            } = e;
                                            CheckedEvent({
                                                contentsId: value,
                                                contentsNm: contentsname,
                                                contentsUnit: contentsunit,
                                                isChecked: checked
                                            })
                                        }
                                    })}
                                />
                                {data.ContentsNm}
                            </FormItems>
                        );
                    })
                }
            </ul>
        </Container>
    );
}