import { render, screen, cleanup } from "@testing-library/react"
import SignUp from "./SignUp";

describe("Sign Up Page", () => {
    test("Should render Sign Up component", () => {
        render(<SignUp/>)
    });
});
