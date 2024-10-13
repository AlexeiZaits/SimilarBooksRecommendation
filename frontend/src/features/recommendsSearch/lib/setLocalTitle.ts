import { titlesRecommend } from "../model/recommend-search-slice";

export const setLocalTitle = (search: string) => {
    const recommendList = getLocal<titlesRecommend[]>("recommends")
    if (search.length === 0) return;
    console.log("setLocalTitle", recommendList)
    if (!(recommendList || []).find((item)=> item.text === search)){
        setLocal("recommends", [{type: "local", text: search}, ...recommendList || []])
    }
}

export const setLocal = <IData>(key: string, data: IData): void => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const getLocal = <IData>(key: string): IData | null => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
};
