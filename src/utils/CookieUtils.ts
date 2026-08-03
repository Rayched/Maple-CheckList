"use server";

import { cookies } from "next/headers";

interface I_CookieOptions {
    expires: Date|number;
    maxAge: Date|number;
    path: string;
    domain: string;
    secure: boolean;
    httpOnly: boolean;
    sameSite: "lax"|"strict"|"none";
};

export async function AddNewCookies(charname: string){
    const cookieStore = await cookies();

    const PrevData = cookieStore.get("mapletodos_charnames");

    if(!PrevData){
        cookieStore.set("mapletodos_charnames", `[${charname},]`);
    } else {
        /**
         * PrevData (기존 cookie data, charname list)
         * - 기존 데이터, 배열 형태로 변경
         * - param 전달받은 charname 값의 중복 여부 따라
         *   각기 다른 기능 수행
         */
    }
}

export async function DeleteCookies(charname: string){
    const CookieStore = await cookies();

    const PrevData = CookieStore.get("charnames");

    if(!PrevData){
        return;
    } else {
        const Charnames = PrevData.value.split(",").filter((data) => decodeURI(data) !== charname);
        const UpdateValue = Charnames.join(",");
        CookieStore.set("charnames", UpdateValue);
    };
}