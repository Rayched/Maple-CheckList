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

    const PrevData = cookieStore.get("charnames");

    if(!PrevData){
        cookieStore.set("charnames", `${charname}`);
    } else {
        const UpdateValue = PrevData.value + `,${charname}`;
        cookieStore.set("charnames", UpdateValue);
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