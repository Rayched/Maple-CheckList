//월드(서버) 및 직업군 아이콘 reference data

interface I_WorldDatas {
    worldId: string;
    worldNm: string;
};

interface I_ClassDatas {
    class_category: string;
    class_fullNm: string;
    class_littleNm?: string;
};

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