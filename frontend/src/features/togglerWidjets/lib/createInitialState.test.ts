import { createInitialState } from "./createInitialState";
import { listWidgets } from "./listWidgets";

describe("createInitialState", () => {

    test("Создание стейта со списком тоглеров для виджетов на основе обьекта со списком виджетов", () => {

        const excpectedResult = {
            "sidebar": false,
            "settings": false
        }

        const res = createInitialState(listWidgets)

        expect(res).toStrictEqual(excpectedResult)
    })


})
