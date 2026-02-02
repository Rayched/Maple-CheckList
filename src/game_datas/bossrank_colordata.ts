
type RankColorType = {
    rankId: string,
    fontColor: string,
    bgColor: string,
    borderColor: string
};

const Rank_Easy: RankColorType = {
    rankId: "easy",
    fontColor: "#ffffff",
    bgColor: "#666666",
    borderColor: "#bbbbbb"
};

const Rank_Normal: RankColorType = {
    rankId: "Normal",
    fontColor: "#ffffff",
    bgColor: "#319DBC",
    borderColor: "#319DBC"
};

const Rank_Hard: RankColorType = {
    rankId: "Hard",
    fontColor: "#ffffff",
    bgColor: "#aa3355",
    borderColor: "#aa3355"
};

const Rank_Chaos: RankColorType = {
    rankId: "Chaos",
    fontColor: "#ffe1be",
    bgColor: "#222233",
    borderColor: "#ffe1be"
};

const Rank_Extreme: RankColorType = {
    rankId: "Extreme",
    fontColor: "#ee3355",
    bgColor: "#222233",
    borderColor: "#ee3355"
};

export const RankColorInfos: RankColorType[] = [
    Rank_Easy, Rank_Normal, Rank_Hard, Rank_Chaos, Rank_Extreme
];