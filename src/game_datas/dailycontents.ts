//일일 콘텐츠 데이터

interface I_DailyContents {
    contentsId: string;
    contentsNm: string;
    contentsType: string;
    diffname: string; //스케줄러 api fetch data 비교용
};

export const DailyContentsData: I_DailyContents[] = [
    {contentsId: "daily01", contentsNm: "몬스터 파크", contentsType: "contents", diffname: "몬스터파크"},
    {contentsId: "daily02", contentsNm: "여로 일퀘", contentsType: "quest", diffname: "[일일 퀘스트] 소멸의 여로 조사"},
    {contentsId: "daily03", contentsNm: "츄츄 일퀘", contentsType: "quest", diffname: "[일일 퀘스트] 츄츄 아일랜드 최고의 요리"},
    {contentsId: "daily04", contentsNm: "레헬른 일퀘", contentsType: "quest", diffname: "[일일 퀘스트] 레헬른의 평온한 밤"},
    {contentsId: "daily05", contentsNm: "아르카나 일퀘", contentsType: "quest", diffname: "[일일 퀘스트] 아르카나의 평온한 바람"},
    {contentsId: "daily06", contentsNm: "모라스 일퀘", contentsType: "quest", diffname: "[일일 퀘스트] 모라스의 안정을 위해"},
    {contentsId: "daily07", contentsNm: "에스페라 일퀘", contentsType: "quest", diffname: "[일일 퀘스트] 에스페라 연구 명령"},
    {contentsId: "daily08", contentsNm: "문브릿지 일퀘", contentsType: "quest", diffname: "[일일 퀘스트] 문브릿지 조사"},
    {contentsId: "daily09", contentsNm: "미궁 일퀘", contentsType: "quest", diffname: "[일일 퀘스트] 고통의 미궁 조사"},
    {contentsId: "daily10", contentsNm: "리멘 일퀘", contentsType: "quest", diffname: "[일일 퀘스트] 리멘 조사"},
    {contentsId: "daily11", contentsNm: "세르니움 일퀘", contentsType: "quest", diffname: "[일일 퀘스트] 세르니움 조사"},
    {contentsId: "daily12", contentsNm: "아르크스 일퀘", contentsType: "quest", diffname: "[일일 퀘스트] 호텔 아르크스 주변 청소"},
    {contentsId: "daily13", contentsNm: "오디움 일퀘", contentsType: "quest", diffname: "[일일 퀘스트] 오디움 일대 탐사"},
    {contentsId: "daily14", contentsNm: "도원경 일퀘", contentsType: "quest", diffname: "[일일 퀘스트] 도원경 오염 정화"},
    {contentsId: "daily15", contentsNm: "아르테리아 일퀘", contentsType: "quest", diffname: "[일일 퀘스트] 아르테리아 잔당 처치"},
    {contentsId: "daily16", contentsNm: "카르시온 일퀘", contentsType: "quest", diffname: "[일일 퀘스트] 카르시온 복구 지원"},
    {contentsId: "daily17", contentsNm: "탈라하트 일퀘", contentsType: "quest", diffname: "[일일 퀘스트] 탈라하트 고대신의 힘 조사"},
    {contentsId: "daily18", contentsNm: "기어드락 일퀘", contentsType: "quest", diffname: "[일일 퀘스트] 기어드락 크로노스의 잔재 수집"},
];