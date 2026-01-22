type GetOcids = {
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

export async function GetOcids(charNm:string) {
    const APIURL = BasedURL + `/id?character_name=${charNm}`;

    const GetOcidData = await(await(
        await fetch(APIURL, {
            headers: {
                "x-nxopen-api-key": `${APIKeys}`
            }
        })
    ).json()) as GetOcids;

    return GetOcidData;
};

export async function GetCharData(ocids?: string){
    const CharBasicURL = BasedURL + `/character/basic?ocid=${ocids}`

    const GetCharBasicData = await(await(
        await fetch(CharBasicURL, {
            headers: {
                "x-nxopen-api-key": `${APIKeys}`
            }
        })
    ).json()) as I_CharacterBasic;

    return GetCharBasicData;
};