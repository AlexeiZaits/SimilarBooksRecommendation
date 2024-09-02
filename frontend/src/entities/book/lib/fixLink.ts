export const fixLink = (link: string) => {
    const newLink = link.split("/")
    newLink[5] = "1263_576_1"
    return newLink.join("/")
}
