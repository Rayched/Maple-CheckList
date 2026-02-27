"use client";
import { styled } from "styled-components";
import { I_AddToDoForms } from "../WeeklyForm/WeeklyForms";
import { CloseToggleBar, FormContainer, FormItem, Forms } from "../Commons";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { BossContentsData } from "@/game_datas/contentsData";
import BossFormItemdata from "./BossFormItemdata";

interface I_AddTarget {
    bossId: string;
    bossNm: string;
    rankId: string;
};

type I_FormValues = {
    AddTargets: string[];
};

const BossFormContainer = styled(FormContainer)``;

const BossFormBox = styled(Forms)``;

const BossFormCloseBar = styled(CloseToggleBar)``;

const BossFormItem = styled(FormItem)``;

export default function BossForms({ToDosData, setToDosData, setCategory}: I_AddToDoForms){
    const [IsFormClose, setFormClose] = useState(false);
    const ContentsData = BossContentsData;

    const FormMethods = useForm<I_FormValues>({
        defaultValues: {
            AddTargets: []
        }
    });

    return (
        <BossFormContainer>
            <CloseToggleBar>
                <div className="messagebox">주간 보스 목록</div>
                <div 
                    className="toggleicon"
                    onClick={() => setFormClose(!IsFormClose)}
                >{IsFormClose ? "▼" : "▲"}</div>
            </CloseToggleBar>
            <FormProvider {...FormMethods}>
                {
                    IsFormClose ? null : (
                        <BossFormBox>
                            {
                                ContentsData.map((origindata) => {
                                    const isToDoAdds = ToDosData.BossToDos.find((tododata) => tododata.BossId === origindata.BossId);

                                    return (
                                        <BossFormItem key={origindata.BossId}>
                                            <BossFormItemdata 
                                                bossid={origindata.BossId}
                                                bossNm={origindata.BossNm}
                                                bossSubNm={origindata.SubName}
                                                defaultRank={origindata.Ranks[0].rankId}
                                                IsToDoAdds={isToDoAdds !== undefined}
                                            />
                                        </BossFormItem>
                                    );
                                })
                            }
                        </BossFormBox>
                    )
                }
            </FormProvider>
        </BossFormContainer>
    );
}