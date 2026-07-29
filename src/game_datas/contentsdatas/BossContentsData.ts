/**
 * 일일, 주간, 월간 보스 Contents Data
 */

export interface I_RankType {
    rankId: string;
    rankNm: string;
    price: number;
};

interface I_BossContents {
    BossId: string;
    BossNm: string;
    SubName?: string;
    Ranks: I_RankType[];
};

export type RankIconTextType = {
    rankId: string,
    rankname_en: string;
    rankname_ko: string;
};

//일일 보스 Data
/**
 * boss icon img name 순
 * 기존 보스 icon img가 존재하는 보스 우선 배치
 * 스케줄러 api 추가에 따라 새로 가져온 일일 보스 === 후순위
 */
const DailyBossDatas: I_BossContents[] = [
    /**기존 boss icon img 남아있는 보스's */
    {
        BossId: "boss01",
        BossNm: "자쿰",
        Ranks: [
            {rankId: "easy", rankNm: "이지", price: 0},
            {rankId: "normal", rankNm: "노말", price: 0}
        ]
    },
    {
        BossId: "boss02",
        BossNm: "매그너스",
        Ranks: [
            {rankId: "easy", rankNm: "이지", price: 0},
            {rankId: "normal", rankNm: "노말", price: 0}
        ]
    },
    {
        BossId: "boss03",
        BossNm: "힐라",
        Ranks: [
            {rankId: "normal", rankNm: "노말", price: 0},
            {rankId: "hard", rankNm: "하드", price: 0}
        ]
    },
    {
        BossId: "boss04",
        BossNm: "파풀라투스",
        Ranks: [
            {rankId: "easy", rankNm: "이지", price: 0},
            {rankId: "normal", rankNm: "노말", price: 0}
        ]
    },
    {
        BossId: "boss05",
        BossNm: "피에르",
        Ranks: [{
            rankId: "normal", 
            rankNm: "노말", 
            price: 0
        }]
    },
    {
        BossId: "boss06",
        BossNm: "반반",
        Ranks: [{
            rankId: "normal", 
            rankNm: "노말", 
            price: 0
        }]
    },
    {
        BossId: "boss07",
        BossNm: "블러디퀸",
        Ranks: [{
            rankId: "normal", 
            rankNm: "노말", 
            price: 0
        }]
    },
    {
        BossId: "boss08",
        BossNm: "벨룸",
        Ranks: [{
            rankId: "normal", 
            rankNm: "노말", 
            price: 0
        }]
    },
    {
        BossId: "boss09",
        BossNm: "핑크빈",
        Ranks: [
            {rankId: "normal", rankNm: "노말", price: 0},
            {rankId: "chaos", rankNm: "카오스", price: 0}
        ]
    },
    {
        BossId: "boss10",
        BossNm: "시그너스",
        Ranks: [{
            rankId: "normal", rankNm: "노말", price: 0
        }]
    },
    {
        BossId: "d_boss01",
        BossNm: "카웅",
        Ranks: [{
            rankId: "normal",
            rankNm: "노말",
            price: 0
        }]
    },
    {
        BossId: "d_boss02",
        BossNm: "반 레온",
        Ranks: [
            {rankId: "easy", rankNm: "이지", price: 0},
            {rankId: "normal", rankNm: "노말", price: 0},
            {rankId: "hard", rankNm: "하드", price: 0}
        ]
    },
    {
        BossId: "d_boss03",
        BossNm: "혼테일",
        Ranks: [
            {rankId: "easy", rankNm: "이지", price: 0},
            {rankId: "normal", rankNm: "노말", price: 0},
            {rankId: "chaos", rankNm: "카오스", price: 0}
        ]
    },
    {
        BossId: "d_boss04",
        BossNm: "아카이럼",
        Ranks: [
            {rankId: "easy", rankNm: "이지", price: 0},
            {rankId: "normal", rankNm: "노말", price: 0},
        ]
    }
];

//주간 보스 Data
const WeeklyBossDatas: I_BossContents[] = [
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
        Ranks: [{
            rankId: "hard",
            rankNm: "하드", 
            price: 8560000
        }]
    },
    {
        BossId: "boss04",
        BossNm: "파풀라투스",
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
        Ranks: [
            {rankId: "normal",rankNm: "노말", price: 1368000000},
            {rankId: "hard", rankNm: "하드", price: 3078000000},
        ]
    },
    {
        BossId: "boss26",
        BossNm: "유피테르",
        Ranks: [
            {rankId: "normal", rankNm: "노말", price: 1615000000},
            {rankId: "hard", rankNm: "하드", price: 4845000000}
        ]
    }
];

const MonthlyBossDatas: I_BossContents[] = [
    {
        BossId: "m_boss01",
        BossNm: "검은 마법사",
        SubName: "검마",
        Ranks: [
            {rankId: "hard", rankNm: "하드", price: 0},
            {rankId: "extreme", rankNm: "익스트림", price: 0}
        ]
    }
];

const RankIconText: RankIconTextType[] = [
    {
        rankId: "easy",
        rankname_en: "Easy",
        rankname_ko: "이지"
    },
    {
        rankId: "normal",
        rankname_en: "Normal",
        rankname_ko: "노말"
    },
    {
        rankId: "hard",
        rankname_en: "Hard",
        rankname_ko: "하드"
    },
    {
        rankId: "chaos",
        rankname_en: "Chaos",
        rankname_ko: "카오스"
    },
    {
        rankId: "extreme",
        rankname_en: "Extreme",
        rankname_ko: "익스트림"
    }
];

export const BossToDoRefData = {
    dailyboss_refdata: DailyBossDatas,
    weeklyboss_refdata: WeeklyBossDatas,
    monthlyboss_refdata: MonthlyBossDatas,
    rankicontext: RankIconText
};