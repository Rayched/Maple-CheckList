"use client"

import { useFormContext } from "react-hook-form";
import styled from "styled-components";

interface I_BossRankSelectProps {
    bossId: string;
    bossrankdatas: string[];
    
};

const SelectBox = styled.select``;

/**
 * boss data, bossform select target state and setState function
 */
export default function BossRankSelect(){
    const {register} = useFormContext();

    return (
        <SelectBox></SelectBox>
    );
};