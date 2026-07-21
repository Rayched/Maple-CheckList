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

//daily contents, weekly contents type
export interface ContentsType {
    content_name: string;
    max_count: number;
    now_count: number;
    quest_state: string|null;
    registration_flag: string;
    type: string;
    /**
     * contents_name: 콘텐츠/퀘스트명
     * type: 타입 (contents/quest)
     * registration_flag: 스케줄러 등록 여부 (true/false)
     * now_count: 현재 완료 횟수/점수
     * max_count: 최대 완료 가능 횟수/점수
     * quest_state: 퀘스트인 경우 진행 상태 
        ("0": 기타, "1": 진행중, "2": 완료)
     */
};

export interface BossContentsType {
    content_name: string;
    cycle: string;
    difficulty: string;
    list_order_no: number;
    registration_flag: string;
    complete_flag: string;
    /**
     * complete_flag: 보스명
     * content_name: 보스 난이도
     * cycle: 보스 초기화 주기
     * difficulty: 리스트 순서
     * list_order_no: 리스트 순서
     * registration_flag: 스케줄러 등록 여부 (true/false)
     * complite_flag: 완료 여부 (true/false)
     */
};

interface I_SchedulerData {
    character_name?: string;
    character_level?: number;
    character_class?: string;
    world_name?: string;
    weekly_boss_clear_count?: number;
    weekly_boss_clear_limit_count?: number;
    date?: string;
    daily_contents?: ContentsType[];
    weekly_contents?: ContentsType[];
    boss_contents?: BossContentsType[];
};

const BasedURL = "https://open.api.nexon.com/maplestory/v1";

const APIKeys = process.env.NEXON_API_KEY;

const headers = {
    "x-nxopen-api-key": `${APIKeys}`
};

//ocid fetch function
export async function GetOcids(charNm:string) {
    const APIURL = BasedURL + `/id?character_name=${charNm}`;

    const Resp = await fetch(APIURL, {headers});

    if(!Resp.ok){
        return null;
    }

    const Json = await Resp.json() as I_Ocids;
    return Json;
};

//character data fetch
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

//스케쥴러 데이터 fetch funtion
export async function GetCharScheduleData(ocid?: string){
    const APIURL = BasedURL + `/scheduler/character-state?ocid=${ocid}`;

    const Resp = await fetch(APIURL, {headers});

    if(!Resp.ok) return null;

    const scheduleData = await Resp.json() as I_SchedulerData;

    return scheduleData;
};

/**
 * 'chartodos' page 전용 fetch function
 * 
 * - 북마크 등록된 캐릭터들의 스케줄러 데이터 return하는 함수
 */

export async function GetBookmarksSchduleData(charnames: string[]){
    /**
     * cookie data, charnames (북마크 등록된 캐릭터 명 list)
     */
    const Ocids = await Promise.all(
        charnames.map((value) => GetOcids(value).then((resp) => resp?.ocid))
    );

    if(Ocids && Ocids.length > 0){
        const ScheduleData = await Promise.all(
            Ocids.map((value) => GetCharScheduleData(value).then((resp) => resp))
        );

        if(ScheduleData === null || !ScheduleData) return;

        const ModifyScheduleData = ScheduleData.map((data) => {
            if(data === null){
                return null;
            } else {
                const NewScheduleData: I_SchedulerData = {
                    character_name: data.character_name,
                    character_class: data.character_class,
                    world_name: data.world_name,
                    daily_contents: data.daily_contents,
                    weekly_contents: data.weekly_contents,
                    boss_contents: data.boss_contents,
                    weekly_boss_clear_count: data.weekly_boss_clear_count,
                    weekly_boss_clear_limit_count: data.weekly_boss_clear_limit_count
                };

                return NewScheduleData;
            }
        });

        return ModifyScheduleData;
    } else {
        console.log("fetch error");
        return;
    }
}