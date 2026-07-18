/**
 * 일일 및 주간 컨텐츠 data 정의
 */

interface I_ContentsData {
    contentsId: string; //contents data id (컴포넌트 key 값)
    contentsName: string; //contents name (화면 표시할 내용)
    little_name: string;
    max_count: number;
    contents_type: string;
    /**
     * 콘텐츠 타입
     * 에픽 던전 => epic
     * 주간 컨텐츠 => contents
      - 아케인리버 주간 컨텐츠, 무릉도장 등
     * 주간 퀘스트 => quest
     * 길드 컨텐츠 => guild
     */
};

//일일 컨텐츠 데이터 목록 (일퀘 포함)
const DailyContentsData: I_ContentsData[] = [
    {
        contentsId: "daily00", 
        contentsName: "몬스터파크", 
        little_name: "몬스터파크",
        max_count: 14,
        contents_type: "contents"
    },
    {
        contentsId: "daily01", 
        contentsName: "[일일 퀘스트] 소멸의 여로 조사", 
        little_name: "[일퀘] 소멸의 여로",
        max_count: 100,
        contents_type: "quest"
    },
    {
        contentsId: "daily02", 
        contentsName: "[일일 퀘스트] 츄츄 아일랜드 최고의 요리", 
        little_name: "[일퀘] 츄츄 아일랜드",
        max_count: 100,
        contents_type: "quest"
    },
    {
        contentsId: "daily03", 
        contentsName: "[일일 퀘스트] 레헬른의 평온한 밤", 
        little_name: "[일퀘] 레헬른",
        max_count: 100,
        contents_type: "quest"
    },
    {
        contentsId: "daily04", 
        contentsName: "[일일 퀘스트] 아르카나의 평온한 바람", 
        little_name: "[일퀘] 아르카나",
        max_count: 100,
        contents_type: "quest"
    },
    {
        contentsId: "daily05", 
        contentsName: "[일일 퀘스트] 모라스의 안정을 위해", 
        little_name: "[일퀘] 모라스",
        max_count: 100,
        contents_type: "quest"
    },
    {
        contentsId: "daily06", 
        contentsName: "[일일 퀘스트] 에스페라 연구 명령", 
        little_name: "[일퀘] 에스페라",
        max_count: 100,
        contents_type: "quest"
    },
    {
        contentsId: "daily07", 
        contentsName: "[일일 퀘스트] 문브릿지 조사", 
        little_name: "[일퀘] 문브릿지",
        max_count: 100,
        contents_type: "quest"
    },
    {
        contentsId: "daily08", 
        contentsName: "[일일 퀘스트] 고통의 미궁 조사", 
        little_name: "[일일] 고통의 미궁",
        max_count: 100,
        contents_type: "quest"
    },
    {
        contentsId: "daily09", 
        contentsName: "[일일 퀘스트] 리멘 조사", 
        little_name: "[일퀘] 리멘",
        max_count: 100,
        contents_type: "quest"
    },
    {
        contentsId: "daily10", 
        contentsName: "[일일 퀘스트] 세르니움 조사", 
        little_name: "[일퀘] 세르니움",
        max_count: 100,
        contents_type: "quest"
    },
    {
        contentsId: "daily11",
        contentsName: "[일일 퀘스트] 호텔 아르크스 주변 청소",
        little_name: "[일퀘] 호텔 아르크스",
        max_count: 100,
        contents_type: "quest"
    }, 
    {
        contentsId: "daily12", 
        contentsName: "[일일 퀘스트] 오디움 일대 탐사", 
        little_name: "[일퀘] 오디움",
        max_count: 100,
        contents_type: "quest"
    },
    {
        contentsId: "daily13", 
        contentsName: "[일일 퀘스트] 도원경 오염 정화", 
        little_name: "[일퀘] 도원경",
        max_count: 100,
        contents_type: "quest"
    },
    {
        contentsId: "daily14", 
        contentsName: "[일일 퀘스트] 아르테리아 잔당 처치", 
        little_name: "[일퀘] 아르테리아",
        max_count: 100,
        contents_type: "quest"
    },
    {
        contentsId: "daily15", 
        contentsName: "[일일 퀘스트] 카르시온 복구 지원", 
        little_name: "[일퀘] 카르시온",
        max_count: 100,
        contents_type: "quest"
    },
    {
        contentsId: "daily16", 
        contentsName: "[일일 퀘스트] 탈라하트 고대신의 힘 조사", 
        little_name: "[일퀘] 탈라하트",
        max_count: 100,
        contents_type: "quest"
    },
    {
        contentsId: "daily17", 
        contentsName: "[일일 퀘스트] 기어드락 크로노스의 잔재 수집", 
        little_name: "[일퀘] 기어드락",
        max_count: 100,
        contents_type: "quest"
    },
];

const WeeklyContentsData: I_ContentsData[] = [
    {
        contentsId: "weekly00", 
        contentsName: "에픽 던전 : 하이마운틴", 
        little_name: "하이마운틴",
        max_count: 5,
        contents_type: "contents"
    },
    {
        contentsId: "weekly01", 
        contentsName: "에픽 던전 : 앵글러 컴퍼니", 
        little_name: "앵글러 컴퍼니",
        max_count: 5,
        contents_type: "contents"
    },
    {
        contentsId: "weekly02", 
        contentsName: "에픽 던전 : 악몽선경", 
        little_name: "악몽선경",
        max_count: 5,
        contents_type: "contents"
    },
    {
        contentsId: "weekly03", 
        contentsName: "[메이플 유니온] 주간 드래곤 퇴치",
        little_name: "주간 드래곤 퇴치",
        max_count: 1,
        contents_type: "quest"
    },
    {
        contentsId: "weekly04", 
        contentsName: "[메이플 유니온] PC방 주간 드래곤 퇴치", 
        little_name: "PC방 주간 드래곤 퇴치",
        max_count: 1,
        contents_type: "quest"
    },
    {
        contentsId: "weekly05", 
        contentsName: "[몬스터파크] 익스트림 몬스터파커에 도전해보겠나?", 
        little_name: "익스몬파",
        max_count: 5,
        contents_type: "quest"
    },
    {
        contentsId: "weekly06", 
        contentsName: "에르다 스펙트럼", 
        little_name: "에르다 스펙트럼",
        max_count: 1,
        contents_type: "contents"
    },
    {
        contentsId: "weekly07", 
        contentsName: "배고픈 무토", 
        little_name: "배고픈 무토",
        max_count: 1,
        contents_type: "contents"
    },
    {
        contentsId: "weekly08", 
        contentsName: "미드나잇 체이서", 
        little_name: "미드나잇 체이서",
        max_count: 1,
        contents_type: "contents"
    },
    {
        contentsId: "weekly09", 
        contentsName: "스피릿 세이비어", 
        little_name: "스피릿 세이비어",
        max_count: 1,
        contents_type: "contents"
    },
    {
        contentsId: "weekly10", 
        contentsName: "엔하임 디펜스", 
        little_name: "엔하임 디펜스",
        max_count: 1,
        contents_type: "contents"
    },
    {
        contentsId: "weekly11",
        contentsName: "프로텍트 에스페라", 
        little_name: "프로텍트 에스페라",
        max_count: 1,
        contents_type: "contents"
    },
    {
        contentsId: "weekly12", 
        contentsName: "[주간 퀘스트] 성실한 조사에 대한 보답", 
        little_name: "[주간] 여로 보답 퀘스트",
        max_count: 2,
        contents_type: "quest"
    },
    {
        contentsId: "weekly13", 
        contentsName: "[주간 퀘스트] 크리티아스 주간 임무", 
        little_name: "크리티아스 주간 퀘스트",
        max_count: 1,
        contents_type: "quest"
    },
    {
        contentsId: "weekly14", 
        contentsName: "[주간 퀘스트] 타락한 세계수 주간 임무", 
        little_name: "타락한 세계수 주간 퀘스트",
        max_count: 1,
        contents_type: "quest"
    },
    {
        contentsId: "weekly15", 
        contentsName: "[주간 퀘스트] 타락한 세계수 정화에 대한 보답", 
        little_name: "타락한 세계수 보답 퀘스트",
        max_count: 1,
        contents_type: "quest"
    },
    {
        contentsId: "weekly16", 
        contentsName: "[주간 퀘스트] 헤이븐 주간 임무", 
        little_name: "헤이븐 주간 퀘스트",
        max_count: 1,
        contents_type: "quest"
    },
    {
        contentsId: "weekly17", 
        contentsName: "[주간 퀘스트] 꾸준한 의뢰에 대한 보답", 
        little_name: "헤이븐 보답 퀘스트",
        max_count: 1,
        contents_type: "quest"
    },
    {
        contentsId: "weekly18", 
        contentsName: "무릉도장", 
        little_name: "무릉도장",
        max_count: 0,
        contents_type: "contents"
    },
    {
        contentsId: "weekly19", 
        contentsName: "[길드] 주간 미션 포인트", 
        little_name: "[길드] 주간 미션",
        max_count: 10,
        contents_type: "guild"
    },
    {
        contentsId: "weekly20", 
        contentsName: "[길드] 지하 수로", 
        little_name: "지하 수로",
        max_count: 0,
        contents_type: "guild"
    },
    {
        contentsId: "weekly21", 
        contentsName: "[길드] 플래그 레이스", 
        little_name: "플래그 레이스",
        max_count: 0,
        contents_type: "guild"
    },
];

export const DailyAndWeeklyData = {
    dailys: DailyContentsData,
    weeklys: WeeklyContentsData
};