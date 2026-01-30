type BookmarkData = {
    charNm: string;
    charWorld: string;
    charImg: string;
    charLV: string;
};

interface I_MapleToDoDatas {
    Bookmarks: BookmarkData[];
};

type CategoryType = {
    categoryId: string;
    categoryNm: string;
};

export const Categories: CategoryType[] = [
    {categoryId: "category00", categoryNm: "주간 컨텐츠"},
    {categoryId: "category01", categoryNm: "주간 보스"}
];