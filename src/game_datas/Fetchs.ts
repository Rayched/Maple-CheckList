type I_Ocids = {
    ocid?: string
};

interface I_CharacterBasic {
    access_flag?: string;
    character_class?: string;
    character_class_level?: string;
    character_date_create?: string;
    character_exp?: number;
    character_exp_rate?: string;
    character_gender?: string;
    character_guild_name?: string;
    character_image?: string;
    character_level?: number;
    character_name?: string;
    date?: null|string;
    liberation_quest_clear?: string;
    world_name?: string;
};

const BasedURL = "https://open.api.nexon.com/maplestory/v1";

const APIKeys = process.env.NEXON_API_KEY;

const headers = {
    "x-nxopen-api-key": `${APIKeys}`
};

export async function GetOcids(charNm:string) {
    const APIURL = BasedURL + `/id?character_name=${charNm}`;

    const Resp = await fetch(APIURL, {headers});

    if(!Resp.ok){
        return null;
    }

    const Json = await Resp.json() as I_Ocids;
    return Json;
};

export async function GetCharData(ocids?: string){
    const CharBasicURL = BasedURL + `/character/basic?ocid=${ocids}`

    const Resp = await fetch(
        CharBasicURL, {headers}
    );

    if(!Resp.ok){
        return null
    }

    const CharBasicData = await Resp.json() as I_CharacterBasic

    return CharBasicData;
};