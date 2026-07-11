//주간 컨텐츠 및 주간 보스 컨텐츠 데이터 모음집

export interface I_RankType {
    rankId: string;
    rankNm: string;
    price: number;
};

export interface I_BossContents {
    BossId: string;
    BossNm: string;
    SubName?: string;
    Ranks: I_RankType[];
};

interface I_WorldDatas {
    worldId: string;
    worldNm: string;
};

interface I_ClassDatas {
    class_category: string;
    class_fullNm: string;
    class_littleNm?: string;
};

export const BossContentsData: I_BossContents[] = [
    {
        BossId: "boss01",
        BossNm: "자쿰",
        Ranks: [{
            rankId: "chaos", 
            rankNm: "카오스", 
            price: 8080000
        }]
    },
    {
        BossId: "boss02",
        BossNm: "매그너스",
        SubName: "매그",
        Ranks: [{
            rankId: "hard",
            rankNm: "하드", 
            price: 8560000
        }]
    },
    {
        BossId: "boss04",
        BossNm: "파풀라투스",
        SubName: "파풀",
        Ranks: [{
            rankId: "chaos", 
            rankNm: "카오스", 
            price: 13100000
        }]
    },
    {
        BossId: "boss05",
        BossNm: "피에르",
        Ranks: [{
            rankId: "chaos", 
            rankNm: "카오스", 
            price: 8170000
        }]
    },
    {
        BossId: "boss06",
        BossNm: "반반",
        Ranks: [{
            rankId: "chaos", 
            rankNm: "카오스", 
            price: 8150000
        }]
    },
    {
        BossId: "boss07",
        BossNm: "블러디퀸",
        SubName: "블퀸",
        Ranks: [{
            rankId: "chaos", 
            rankNm: "카오스", 
            price: 8140000
        }]
    },
    {
        BossId: "boss08",
        BossNm: "벨룸",
        Ranks: [{
            rankId: "chaos", 
            rankNm: "카오스", 
            price: 9280000
        }]
    },
    {
        BossId: "boss11",
        BossNm: "스우",
        Ranks: [
            {rankId: "normal",rankNm: "노말", price: 16700000},
            {rankId: "hard",rankNm: "하드", price: 51500000},
            {rankId: "extreme", rankNm: "익스트림", price: 574000000},
        ]
    },
    {
        BossId: "boss12",
        BossNm: "데미안",
        Ranks: [
            {rankId: "normal",rankNm: "노말", price: 17500000},
            {rankId: "hard",rankNm: "하드", price: 48900000},
        ]
    },
    {
        BossId: "boss13",
        BossNm: "가디언 엔젤 슬라임",
        SubName: "가엔슬",
        Ranks: [
            {rankId: "normal",rankNm: "노말", price: 25500000},
            {rankId: "chaos", rankNm: "카오스", price: 75100000},
        ]
    },
    {
        BossId: "boss14",
        BossNm: "루시드",
        Ranks: [
            {rankId: "easy",rankNm: "이지", price: 29800000},
            {rankId: "normal",rankNm: "노말", price: 35600000},
            {rankId: "hard",rankNm: "하드", price: 62900000},
        ]
    },
    {
        BossId: "boss15",
        BossNm: "윌",
        Ranks: [
            {rankId: "easy",rankNm: "이지", price: 32300000},
            {rankId: "normal",rankNm: "노말", price: 41100000},
            {rankId: "hard",rankNm: "하드", price: 77100000},
        ]
    },
    {
        BossId: "boss16",
        BossNm: "더스크",
        Ranks: [
            {rankId: "normal",rankNm: "노말", price: 44000000},
            {rankId: "chaos", rankNm: "카오스", price: 69800000},
        ]
    },
    {
        BossId: "boss17",
        BossNm: "진 힐라",
        Ranks: [
            {rankId: "normal",rankNm: "노말", price: 71200000},
            {rankId: "hard",rankNm: "하드", price: 106000000},
        ]
    },
    {
        BossId: "boss18",
        BossNm: "듄켈",
        Ranks: [
            {rankId: "normal",rankNm: "노말", price: 47500000},
            {rankId: "hard",rankNm: "하드", price: 94400000},
        ]
    },
    
    {
        BossId: "boss19",
        BossNm: "선택받은 세렌",
        SubName: "세렌",
        Ranks: [
            {rankId: "normal",rankNm: "노말", price: 239000000},
            {rankId: "hard",rankNm: "하드", price: 356000000},
            {rankId: "extreme",rankNm: "익스트림", price: 2835000000},
        ]
    },
    {
        BossId: "boss20",
        BossNm: "칼로스",
        Ranks: [
            {rankId: "easy",rankNm: "이지", price: 280000000},
            {rankId: "normal",rankNm: "노말", price: 505000000},
            {rankId: "chaos", rankNm: "카오스", price: 1273000000},
            {rankId: "extreme",rankNm: "익스트림", price: 4104000000},
        ]
    },
    {
        BossId: "boss21",
        BossNm: "최초의 대적자",
        SubName: "대적자",
        Ranks: [
            {rankId: "easy",rankNm: "이지", price: 280000000},
            {rankId: "normal",rankNm: "노말", price: 560000000},
            {rankId: "hard",rankNm: "하드", price: 1435000000},
            {rankId: "extreme",rankNm: "익스트림", price: 4712000000},
        ]
    },
    {
        BossId: "boss22",
        BossNm: "카링",
        Ranks: [
            {rankId: "easy",rankNm: "이지", price: 377000000},
            {rankId: "normal",rankNm: "노말", price: 678000000},
            {rankId: "hard",rankNm: "하드", price: 1739000000},
            {rankId: "extreme",rankNm: "익스트림", price: 5387000000},
        ]
    },
    {
        BossId: "boss23",
        BossNm: "찬란한 흉성",
        SubName: "흉성",
        Ranks: [
            {rankId: "normal",rankNm: "노말", price: 625000000},
            {rankId: "hard",rankNm: "하드", price: 2678000000},
        ]
    },
    {
        BossId: "boss24",
        BossNm: "림보",
        Ranks: [
            {rankId: "normal",rankNm: "노말", price: 1026000000},
            {rankId: "hard",rankNm: "하드", price: 2385000000},
        ]
    },
    {
        BossId: "boss25",
        BossNm: "발드릭스",
        SubName: "발드",
        Ranks: [
            {rankId: "normal",rankNm: "노말", price: 1368000000},
            {rankId: "hard", rankNm: "하드", price: 3078000000},
        ]
    },
    {
        BossId: "boss26",
        BossNm: "유피테르",
        SubName: "유피",
        Ranks: [
            {rankId: "normal", rankNm: "노말", price: 1615000000},
            {rankId: "hard", rankNm: "하드", price: 4845000000}
        ]
    }
];

/**
 * '/chartodos', category
 */

type CategoriesType = {
    categoryId: string;
    categoryNm: string;
}

export const CategoriesData: CategoriesType[] = [
    {categoryId: "category01", categoryNm: "일일 콘텐츠"},
    {categoryId: "category02", categoryNm: "주간 콘텐츠"},
    {categoryId: "category03", categoryNm: "일일 보스"},
    {categoryId: "category04", categoryNm: "주간 보스"},
];

/**
 * 서버 아이콘 출력용, 서버 데이터
 */
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


/**
 * 직업군 아이콘 출력용 데이터
 */
enum Class_category {
    "warrior", "magician", "bowman", "thief", "pirate", "hybrid"
};

export const ClassDatas: I_ClassDatas[] = [
    //전사(warrior)
    {class_category: Class_category[0], class_fullNm: "히어로"},
    {class_category: Class_category[0], class_fullNm: "팔라딘"},
    {class_category: Class_category[0], class_fullNm: "다크나이트", class_littleNm: "닼나"},
    {class_category: Class_category[0], class_fullNm: "소울마스터", class_littleNm: "소마"},
    {class_category: Class_category[0], class_fullNm: "미하일"},
    {class_category: Class_category[0], class_fullNm: "블래스터", class_littleNm: "블래"},
    {class_category: Class_category[0], class_fullNm: "데몬슬레이어", class_littleNm: "데슬"},
    {class_category: Class_category[0], class_fullNm: "데몬어벤져", class_littleNm: "데벤"},
    {class_category: Class_category[0], class_fullNm: "아란"},
    {class_category: Class_category[0], class_fullNm: "카이저"},
    {class_category: Class_category[0], class_fullNm: "아델"},
    {class_category: Class_category[0], class_fullNm: "렌"},
    {class_category: Class_category[0], class_fullNm: "제로"},

    //마법사(magician)
    {class_category: Class_category[1], class_fullNm: "아크메이지(불,독)", class_littleNm: "불독"},
    {class_category: Class_category[1], class_fullNm: "아크메이지(썬,콜)", class_littleNm: "썬콜"},
    {class_category: Class_category[1], class_fullNm: "비숍"},
    {class_category: Class_category[1], class_fullNm: "플레임위자드", class_littleNm: "플위"},
    {class_category: Class_category[1], class_fullNm: "배틀메이지", class_littleNm: "배메"},
    {class_category: Class_category[1], class_fullNm: "에반"},
    {class_category: Class_category[1], class_fullNm: "루미너스", class_littleNm: "루미"},
    {class_category: Class_category[1], class_fullNm: "일리움"},
    {class_category: Class_category[1], class_fullNm: "라라"},
    {class_category: Class_category[1], class_fullNm: "키네시스", class_littleNm: "키네"},
    {class_category: Class_category[1], class_fullNm: "레테"},

    //궁수(bowman)
    {class_category: Class_category[2], class_fullNm: "보우마스터", class_littleNm: "보마"},
    {class_category: Class_category[2], class_fullNm: "신궁"},
    {class_category: Class_category[2], class_fullNm: "패스파인더", class_littleNm: "패파"},
    {class_category: Class_category[2], class_fullNm: "윈드브레이커", class_littleNm: "윈브"},
    {class_category: Class_category[2], class_fullNm: "와일드헌터", class_littleNm: "와헌"},
    {class_category: Class_category[2], class_fullNm: "메르세데스", class_littleNm: "메르"},
    {class_category: Class_category[2], class_fullNm: "카인"},

    //도적
    {class_category: Class_category[3], class_fullNm: "나이트로드", class_littleNm: "나로"},
    {class_category: Class_category[3], class_fullNm: "섀도어"},
    {class_category: Class_category[3], class_fullNm: "듀얼블레이드", class_littleNm: "듀블"},
    {class_category: Class_category[3], class_fullNm: "나이트워커", class_littleNm: "나워"},
    {class_category: Class_category[3], class_fullNm: "팬텀"},
    {class_category: Class_category[3], class_fullNm: "카데나"},
    {class_category: Class_category[3], class_fullNm: "칼리"},
    {class_category: Class_category[3], class_fullNm: "호영"},

    //해적
    {class_category: Class_category[4], class_fullNm: "바이퍼"},
    {class_category: Class_category[4], class_fullNm: "캡틴"},
    {class_category: Class_category[4], class_fullNm: "캐논슈터", class_littleNm: "캐슈"},
    {class_category: Class_category[4], class_fullNm: "스트라이커", class_littleNm: "스커"},
    {class_category: Class_category[4], class_fullNm: "메카닉"},
    {class_category: Class_category[4], class_fullNm: "은월"},
    {class_category: Class_category[4], class_fullNm: "엔젤릭버스터", class_littleNm: "엔버"},
    {class_category: Class_category[4], class_fullNm: "아크"},

    //하이브리드 (제논: 도적+해적)
    {class_category: Class_category[5], class_fullNm: "제논"},
];