import {cleanup, fireEvent, render, screen} from "@testing-library/react";
import {Input} from "../ui/Input"

describe("Input", () => {

    const onChange = jest.fn()
    const onClick = jest.fn();
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const value = "123";
    const testPlaceHolder = "Hello"

    beforeEach(() => {
        render(<Input value={value} tabIndex={0}
            onChange={onChange} onClick={onClick}
            onBlur={onBlur} onFocus={onFocus} placeholder={testPlaceHolder}
            type={"password"} secondary={true} error={true}/>);
    })

    afterEach(() => {
        jest.clearAllMocks()
        cleanup()
    })

    test("Должен отрендериться с placeholder", () => {
        expect(screen.getByPlaceholderText(testPlaceHolder)).toBeInTheDocument();
    })

    test("Должен отрендериться с определенным типом", () => {
        const passwordInput = screen.getByPlaceholderText(testPlaceHolder)
        expect(passwordInput).toHaveAttribute('type', 'password');
    })

    test("Должен рендерить input с корректными классами", () => {
        const passwordInput = screen.getByPlaceholderText(testPlaceHolder)

        expect(passwordInput).toBeInTheDocument();
        expect(passwordInput).toHaveClass("input")
        expect(passwordInput).toHaveClass("error")
        expect(passwordInput).toHaveClass("secondary")
    })

    test("Должен отработать с events: onChange, onClick, onFocus, onBlur с определленным value", () => {
        const passwordInput = screen.getByPlaceholderText(testPlaceHolder)

        fireEvent.change(passwordInput, { target: {value: "12345"}});
        fireEvent.click(passwordInput)
        fireEvent.focus(passwordInput)
        fireEvent.blur(passwordInput)

        expect(passwordInput).toHaveValue(value)
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onFocus).toHaveBeenCalledTimes(1);
        expect(onBlur).toHaveBeenCalledTimes(1);
    })

    test("Должен быть атрибут tabIndex", () => {
        const passwordInput = screen.getByPlaceholderText(testPlaceHolder);

        expect(passwordInput).toHaveAttribute("tabIndex", "0");
    })
})
