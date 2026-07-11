/**
 * 일일 및 주간 컨텐츠 data 정의
 */

interface I_ContentsData {
    contentsId: string; //contents data id (컴포넌트 key 값)
    contentsName: string; //contents name (화면 표시할 내용)
    littlename?: string;
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
    {contentsId: "daily00", littlename: "몬파", contentsName: "몬스터 파크", contents_type: "contents"},
    {contentsId: "daily01", littlename: "여로 일퀘", contentsName: "[일일 퀘스트] 소멸의 여로 조사", contents_type: "quest"},
    {contentsId: "daily02", littlename: "츄츄 일퀘", contentsName: "[일일 퀘스트] 츄츄 아일랜드 최고의 요리", contents_type: "quest"},
    {contentsId: "daily03", littlename: "레헬른 일퀘", contentsName: "[일일 퀘스트] 레헬른의 평온한 밤", contents_type: "quest"},
    {contentsId: "daily04", littlename: "아르카나 일퀘", contentsName: "[일일 퀘스트] 아르카나의 평온한 바람", contents_type: "quest"},
    {contentsId: "daily05", littlename: "모라스 일퀘", contentsName: "[일일 퀘스트] 모라스의 안정을 위해", contents_type: "quest"},
    {contentsId: "daily06", littlename: "에스페라 일퀘", contentsName: "[일일 퀘스트] 에스페라 연구 명령", contents_type: "quest"},
    {contentsId: "daily07", littlename: "문브릿지 일퀘", contentsName: "[일일 퀘스트] 문브릿지 조사", contents_type: "quest"},
    {contentsId: "daily08", littlename: "미궁 일퀘", contentsName: "[일일 퀘스트] 고통의 미궁 조사", contents_type: "quest"},
    {contentsId: "daily09", littlename: "리멘 일퀘", contentsName: "[일일 퀘스트] 리멘 조사", contents_type: "quest"},
    {contentsId: "daily10", littlename: "세르니움 일퀘", contentsName: "[일일 퀘스트] 세르니움 조사", contents_type: "quest"},
    {contentsId: "daily11", littlename: "아르크스 일퀘", contentsName: "[일일 퀘스트] 호텔 아르크스 주변 청소", contents_type: "quest"},
    {contentsId: "daily12", littlename: "오디움 일퀘", contentsName: "[일일 퀘스트] 오디움 일대 탐사", contents_type: "quest"},
    {contentsId: "daily13", littlename: "도원경 일퀘", contentsName: "[일일 퀘스트] 도원경 오염 정화", contents_type: "quest"},
    {contentsId: "daily14", littlename: "아르테리아 일퀘", contentsName: "[일일 퀘스트] 아르테리아 잔당 처치", contents_type: "quest"},
    {contentsId: "daily15", littlename: "카르시온 일퀘", contentsName: "[일일 퀘스트] 카르시온 복구 지원", contents_type: "quest"},
    {contentsId: "daily16", littlename: "탈라하트 일퀘", contentsName: "[일일 퀘스트] 탈라하트 고대신의 힘 조사", contents_type: "quest"},
    {contentsId: "daily17", littlename: "기어드락 일퀘", contentsName: "[일일 퀘스트] 기어드락 크로노스의 잔재 수집", contents_type: "quest"},
];

const WeeklyContentsData: I_ContentsData[] = [
    {contentsId: "weekly00", contentsName: "에픽 던전 : 하이마운틴", littlename: "하이마운틴", contents_type: "epic"},
    {contentsId: "weekly01", contentsName: "에픽 던전 : 앵글러 컴퍼니", littlename: "앵글러 컴퍼니",contents_type: "epic"},
    {contentsId: "weekly02", contentsName: "에픽 던전 : 악몽선경", littlename: "악몽선경", contents_type: "epic"},
    {contentsId: "weekly03", littlename: "유니온 주간퀘", contentsName: "[메이플 유니온] 주간 드래곤 퇴치", contents_type: "quest"},
    {contentsId: "weekly04", littlename: "유니온 PC방 주간퀘", contentsName: "[메이플 유니온] PC방 주간 드래곤 퇴치", contents_type: "quest"},
    {contentsId: "weekly05", littlename: "익몬 주간퀘", contentsName: "[몬스터파크] 익스트림 몬스터파커에 도전해보겠나?", contents_type: "quest"},
    {contentsId: "weekly06", contentsName: "에르다 스펙트럼", contents_type: "contents"},
    {contentsId: "weekly07", contentsName: "배고픈 무토", contents_type: "contents"},
    {contentsId: "weekly08", contentsName: "미드나잇 체이서", contents_type: "contents"},
    {contentsId: "weekly09", contentsName: "스피릿 세이비어", contents_type: "contents"},
    {contentsId: "weekly10", contentsName: "엔하임 디펜스", contents_type: "contents"},
    {contentsId: "weekly11", contentsName: "프로텍트 에스페라", contents_type: "contents"},
    {contentsId: "weekly12", littlename: "여로 주간퀘", contentsName: "[주간 퀘스트] 성실한 조사에 대한 보답", contents_type: "quest"},
    {contentsId: "weekly13", littlename: "크리티아스 주간퀘", contentsName: "[주간 퀘스트] 크리티아스 주간 임무", contents_type: "quest"},
    {contentsId: "weekly14", littlename: "세계수 주간퀘 1", contentsName: "[주간 퀘스트] 타락한 세계수 주간 임무", contents_type: "quest"},
    {contentsId: "weekly15", littlename: "세계수 주간퀘 2", contentsName: "[주간 퀘스트] 타락한 세계수 정화에 대한 보답", contents_type: "quest"},
    {contentsId: "weekly16", littlename: "헤이븐 주간퀘 1", contentsName: "[주간 퀘스트] 헤이븐 주간 임무", contents_type: "quest"},
    {contentsId: "weekly17", littlename: "헤이븐 주간퀘 2", contentsName: "[주간 퀘스트] 꾸준한 의뢰에 대한 보답", contents_type: "quest"},
    {contentsId: "weekly18", littlename: "무릉", contentsName: "무릉도장", contents_type: "contents"},
    {contentsId: "weekly19", littlename: "길드 주간미션", contentsName: "[길드] 주간 미션 포인트", contents_type: "guild"},
    {contentsId: "weekly20", littlename: "지하수로", contentsName: "[길드] 지하 수로", contents_type: "guild"},
    {contentsId: "weekly21", littlename: "플래그 레이스", contentsName: "[길드] 플래그 레이스", contents_type: "guild"},
];

export const DailyAndWeeklyData = {
    dailys: DailyContentsData,
    weeklys: WeeklyContentsData
};