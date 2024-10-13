import {render, screen} from "@testing-library/react";
import { withModal } from "../ui/Modal";
import { Preloader } from "shared/ui";

const PreloaderWithModal = withModal(Preloader)

describe("withModal", () => {
    test("Должен отрендериться с классом modal", () => {
        render(<PreloaderWithModal/>)

        const withModal = screen.getByTestId("withModal")
        expect(withModal).toBeInTheDocument();
        expect(withModal).toHaveClass("modal");
    })

    test("Должен отрендериться с компонентом", () => {
        render(<PreloaderWithModal/>);

        const withModal = screen.getByTestId("withModal");

        expect(withModal).toHaveTextContent("loading")
    })
})
