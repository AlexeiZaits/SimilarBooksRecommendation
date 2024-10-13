import {fireEvent, render, screen} from "@testing-library/react";
import { Button } from "../ui/Button";
import { ClearImg } from "shared/assets/icons/ClearImg";

const text = "Hello world";

describe("Button", () => {

    test("Должен отрендериться с svg, text", () => {
        const {container} = render(<Button svg={<ClearImg/>} text={text}/>)

        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
        expect(screen.getByText(text)).toBeInTheDocument();
    })

    test("Должен отрендериться с children", () => {
        render(<Button >{text}</Button>)

        expect(screen.getByText(text)).toBeInTheDocument();
    })

    test("Должен отрендериться с определенным типом", () => {
        render(<Button type="submit"/>)
        const submitButton = screen.getByRole('button');
        expect(submitButton).toHaveAttribute('type', 'submit');
    })

    test("Должен рендерить button с корректными классами", () => {
        render(<Button secondary={true} noActive={true}>{text}</Button>)

        const element = screen.getByText(text);

        expect(element).toBeInTheDocument();
        expect(element).toHaveClass("button")
        expect(element).toHaveClass("secondary")
        expect(element).toHaveClass("noActive")
    })

    test("Должен отработать с events: onClick, onSubmit, onMouseEnter, onMouseLeave", () => {
        const onClick = jest.fn();
        const onSubmit = jest.fn();
        const onMouseEnter = jest.fn();
        const onMouseLeave = jest.fn();

        render(<Button onClick={onClick} onSubmit={onSubmit} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} type="submit"/>)
        const submitButton = screen.getByRole('button');

        fireEvent.click(submitButton)
        fireEvent.submit(submitButton)
        fireEvent.mouseEnter(submitButton)
        fireEvent.mouseLeave(submitButton)

        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onMouseEnter).toHaveBeenCalledTimes(1);
        expect(onMouseLeave).toHaveBeenCalledTimes(1);
    })

    test
})
