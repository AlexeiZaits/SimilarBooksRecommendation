export const setLocalTitle = (search: string) => {
    if (search.length === 0) return
    if (!JSON.parse(localStorage.getItem("recommends") || "[]").includes(search)){
        localStorage.setItem("recommends", JSON.stringify([search, ...JSON.parse(localStorage.getItem("recommends") || "[]")]))
    }
}
