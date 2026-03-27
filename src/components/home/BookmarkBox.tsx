"use client"

import { MapleToDoDataStore } from "@/stores";
import Link from "next/link";
import { useStore } from "zustand";

export default function BookmarkBox(){
    const {CharToDos} = useStore(MapleToDoDataStore);

    return (
        <ul>
            {
                CharToDos.map((data, idx) => {
                    return (
                        <li key={`Bmk${idx}`}>
                            <Link href={`/chartodos/${data.charNm}`}>{data.charNm}</Link>
                        </li>
                    );
                })
            }
        </ul>
    );
}