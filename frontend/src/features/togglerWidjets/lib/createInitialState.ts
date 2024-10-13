import { ListWidgetsType } from "./listWidgets";

export interface INewInitialState {
    [key: string]: boolean;
}

export function createInitialState(state: ListWidgetsType){
    const newState: INewInitialState = {}

    Object.values(state).forEach(element => {
            newState[element] = false
    });

    return newState
}
