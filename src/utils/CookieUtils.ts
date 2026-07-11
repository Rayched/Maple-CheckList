"use server";

interface I_CookieOptions {
    expires: Date|number;
    maxAge: Date|number;
    path: string;
    domain: string;
    secure: boolean;
    httpOnly: boolean;
    sameSite: "lax"|"strict"|"none";
};