"use client"

import { ViewportWidthStore } from "@/stores/ViewportStore";
import { useEffect } from "react";
import { useStore } from "zustand";

export default function ViewportListener(){
    const {setNowViewportWidthValue} = useStore(ViewportWidthStore);

    useEffect(() => {
        const WidthResized = () => {
            setNowViewportWidthValue(window.innerWidth);
        };

        WidthResized();

        window.addEventListener("resize", WidthResized);

        return () => {
            window.removeEventListener("resize", WidthResized);
        }
    }, []);
    return null;
}