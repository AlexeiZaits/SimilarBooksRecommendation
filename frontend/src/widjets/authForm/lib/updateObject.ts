export const updateObject = <IObj, IData>(prevObj: IObj, key: keyof IObj, data: IData): IObj => {
    const newObj = {
        ...prevObj,
        [key]: data
    }

    return newObj
}
