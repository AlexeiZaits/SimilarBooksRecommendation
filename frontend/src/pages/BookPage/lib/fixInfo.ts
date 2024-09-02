interface NewInfo {
    [key: string]: string;
}

export const fixInfo = (info: string) => {
    const splitInfo = info.split(" ")
    const newInfo: NewInfo = {
        author: "",
        publish: "",
        yearPublish: "",
        binding: "",
        pages: "",
        format: "",
        language: "",
        ISBN: "",
        article: "",
    }
    let currentIndex = 0;
    let infoIndex = 0;
    const keysInfo: string[] = Object.keys(newInfo);
    const titleList = ["Издательство", "Год", "Переплет", "Страниц","Формат", "Язык", "ISBN", "Артикул"]

    splitInfo.map((item, index) => {
        if (item === titleList[infoIndex]){
            newInfo[keysInfo[infoIndex]] = splitInfo.slice(currentIndex, index).join(" ")
            currentIndex = index;
            infoIndex++
        }
    })

    return newInfo
}
