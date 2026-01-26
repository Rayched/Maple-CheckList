//주간 컨텐츠 및 주간 보스 컨텐츠 데이터 모음집

interface I_WeeklyContents {
    ContentsId: string;
    ContentsNm: string;
    Units: string; 
    /**
     * 계정 단위 (Nexon id 단위) or 캐릭터 단위 표기
     * 계정 단위 (nexon id) => account
     * 캐릭터 단위 => character
     */
    //계정 or 캐릭터 단위 표기
};

type RankType = {
    rank: string;
    price: number;
};

interface I_BossContents {
    BossId: string;
    BossNm: string;
    Ranks: RankType[];
};

interface I_WorldDatas {
    worldId: string;
    worldNm: string;
};

export const WeeklyContentsData: I_WeeklyContents[] = [
    //익몬, 에픽던전's
    {ContentsId: "weekly01", ContentsNm: "몬스터파크 익스트림", Units: "character"},
    {ContentsId: "weekly02", ContentsNm: "하이마운틴", Units: "account"},
    {ContentsId: "weekly03", ContentsNm: "앵글러 컴퍼니", Units: "account"},
    {ContentsId: "weekly04", ContentsNm: "악몽선경", Units: "account"},
    //아케인리버 주간 컨텐츠's
    {ContentsId: "weekly05", ContentsNm: "에르다 스펙트럼", Units: "character"},
    {ContentsId: "weekly06", ContentsNm: "배고픈 무토", Units: "character"},
    {ContentsId: "weekly07", ContentsNm: "미드나잇 체이서", Units: "character"},
    {ContentsId: "weekly08", ContentsNm: "스피릿 세이비어", Units: "character"},
    {ContentsId: "weekly09", ContentsNm: "엔하임 디펜스", Units: "character"},
    {ContentsId: "weekly10", ContentsNm: "프로텍트 에스페라", Units: "character"},
    //무릉, 길드 컨텐츠's
    {ContentsId: "weekly11", ContentsNm: "무릉도장", Units: "character"},
    {ContentsId: "weekly12", ContentsNm: "지하수로", Units: "character"},
    {ContentsId: "weekly13", ContentsNm: "플래그 레이스", Units: "character"},
];

export const BossContentsData: I_BossContents[] = [
    {
        BossId: "boss01",
        BossNm: "자쿰",
        Ranks: [{
            rank: "카오스", price: 8080000
        }]
    },
    {
        BossId: "boss02",
        BossNm: "매그너스",
        Ranks: [{
            rank: "하드", price: 8560000
        }]
    },
    {
        BossId: "boss03",
        BossNm: "힐라",
        Ranks: [
            {rank: "하드", price: 5750000}
        ]
    },
    {
        BossId: "boss04",
        BossNm: "파풀라투스",
        Ranks: [
            {rank: "카오스", price: 13800000}
        ]
    },
    {
        BossId: "boss05",
        BossNm: "피에르",
        Ranks: [
            {rank: "카오스", price: 8170000}
        ]
    },
    {
        BossId: "boss06",
        BossNm: "반반",
        Ranks: [
            {rank: "카오스", price: 8150000}
        ]
    },
    {
        BossId: "boss07",
        BossNm: "블러디퀸",
        Ranks: [
            {rank: "카오스", price: 8140000}
        ]
    },
    {
        BossId: "boss08",
        BossNm: "벨룸",
        Ranks: [
            {rank: "카오스", price: 9280000}
        ]
    },
    {
        BossId: "boss09",
        BossNm: "핑크빈",
        Ranks: [
            {rank: "카오스", price: 6580000}
        ]
    },
    {
        BossId: "boss10",
        BossNm: "시그너스",
        Ranks: [
            {rank: "이지", price: 4550000},
            {rank: "노말", price: 7500000}
        ]
    },
    {
        BossId: "boss11",
        BossNm: "스우",
        Ranks: [
            {rank: "노말", price: 17600000},
            {rank: "하드", price: 54200000},
            {rank: "익스트림", price: 0},
        ]
    },
    {
        BossId: "boss12",
        BossNm: "데미안",
        Ranks: [
            {rank: "노말", price: 18400000},
            {rank: "하드", price: 51500000},
        ]
    },
    {
        BossId: "boss13",
        BossNm: "가디언 엔젤 슬라임",
        Ranks: [
            {rank: "노말", price: 26800000},
            {rank: "카오스", price: 79100000},
        ]
    },
    {
        BossId: "boss14",
        BossNm: "루시드",
        Ranks: [
            {rank: "이지", price: 31400000},
            {rank: "노말", price: 37500000},
            {rank: "하드", price: 66200000},
        ]
    },
    {
        BossId: "boss15",
        BossNm: "윌",
        Ranks: [
            {rank: "이지", price: 34000000},
            {rank: "노말", price: 43300000},
            {rank: "하드", price: 81200000},
        ]
    },
    {
        BossId: "boss16",
        BossNm: "더스크",
        Ranks: [
            {rank: "노말", price: 46300000},
            {rank: "카오스", price: 73500000},
        ]
    },
    {
        BossId: "boss17",
        BossNm: "진힐라",
        Ranks: [
            {rank: "노말", price: 74900000},
            {rank: "하드", price: 112000000},
        ]
    },
    {
        BossId: "boss18",
        BossNm: "듄켈",
        Ranks: [
            {rank: "노말", price: 50000000},
            {rank: "하드", price: 99400000},
        ]
    },
    {
        //챌린저스 월드 전용
        BossId: "boss18-1",
        BossNm: "시즌보스 카이",
        Ranks: [
            {rank: "노말", price: 0},
            {rank: "하드", price: 0},
        ]
    },
    {
        BossId: "boss19",
        BossNm: "세렌",
        Ranks: [
            {rank: "노말", price: 266000000},
            {rank: "하드", price: 396000000},
            {rank: "익스트림", price: 3150000000},
        ]
    },
    {
        BossId: "boss20",
        BossNm: "칼로스",
        Ranks: [
            {rank: "이지", price: 311000000},
            {rank: "노말", price: 561000000},
            {rank: "카오스", price: 1340000000},
            {rank: "익스트림", price: 4320000000},
        ]
    },
    {
        BossId: "boss21",
        BossNm: "최초의 대적자",
        Ranks: [
            {rank: "이지", price: 324000000},
            {rank: "노말", price: 589000000},
            {rank: "하드", price: 1510000000},
            {rank: "익스트림", price: 4960000000},
        ]
    },
    {
        BossId: "boss22",
        BossNm: "카링",
        Ranks: [
            {rank: "이지", price: 419000000},
            {rank: "노말", price: 714000000},
            {rank: "하드", price: 1830000000},
            {rank: "익스트림", price: 5670000000},
        ]
    },
    {
        BossId: "boss23",
        BossNm: "찬란한 흉성",
        Ranks: [
            {rank: "노말", price: 658000000},
            {rank: "하드", price: 2819000000},
        ]
    },
    {
        BossId: "boss24",
        BossNm: "림보",
        Ranks: [
            {rank: "노말", price: 1080000000},
            {rank: "하드", price: 2510000000},
        ]
    },
    {
        BossId: "boss25",
        BossNm: "발드릭스",
        Ranks: [
            {rank: "노말", price: 1440000000},
            {rank: "하드", price: 3240000000},
        ]
    },
    {
        /**월간 보스 */
        BossId: "boss30",
        BossNm: "검은 마법사",
        Ranks: [
            {rank: "하드", price: 700000000},
            {rank: "익스트림", price: 9200000000},
        ]
    },
];
/** 보스 콘텐츠 양식
 * {
        BossId: "boss",
        BossNm: "",
        Ranks: [
            {rank: "", price: 0},
            {rank: "", price: 0},
            {rank: "", price: 0},
        ]
    },
 */

//월드, 서버 목록

export const WorldDatas: I_WorldDatas[] = [
    {worldId: "world01", worldNm: "헬리오스"},
    {worldId: "world02", worldNm: "에오스"},
    {worldId: "world03", worldNm: "오로라"},
    {worldId: "world04", worldNm: "레드"},
    {worldId: "world05", worldNm: "이노시스"},
    {worldId: "world06", worldNm: "유니온"},
    {worldId: "world07", worldNm: "스카니아"},
    {worldId: "world08", worldNm: "루나"},
    {worldId: "world09", worldNm: "제니스"},
    {worldId: "world10", worldNm: "크로아"},
    {worldId: "world11", worldNm: "베라"},
    {worldId: "world12", worldNm: "엘리시움"},
    {worldId: "world13", worldNm: "아케인"},
    {worldId: "world14", worldNm: "유니온"},
    {worldId: "events", worldNm: "챌린저스"},
    {worldId: "events", worldNm: "챌린저스 2"},
    {worldId: "events", worldNm: "챌린저스 3"},
    {worldId: "events", worldNm: "챌린저스 4"},
];