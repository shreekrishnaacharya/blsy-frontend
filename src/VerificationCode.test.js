import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import VerificationCode from "./VerificationCode"; // Assuming the component is in the same directory
import { MemoryRouter, Route, Routes } from "react-router-dom";
import '@testing-library/jest-dom';

describe("VerificationCode Component", () => {
  const getRenderedComponent = () =>
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<VerificationCode />} />
          <Route path="/success" element={<div>Success Page</div>} />
        </Routes>
      </MemoryRouter>
    );
  it("renders 6 input fields, submit button and info alert", () => {
    const { getByRole, getAllByRole } = getRenderedComponent();
    const inputFields = getAllByRole("textbox");
    const submitButton = getByRole("button", { name: /submit/i });
    expect(inputFields).toHaveLength(6);
    expect(submitButton).toBeInTheDocument();
  });

  it("allows only one digit per input and focuses on the next input", () => {
    const { getAllByRole } = getRenderedComponent();
    const inputFields = getAllByRole("textbox");

    fireEvent.change(inputFields[0], { target: { value: "1" } });
    expect(inputFields[0]).toHaveValue("1");
    expect(document.activeElement).toBe(inputFields[1]);

    fireEvent.change(inputFields[1], { target: { value: "2" } });
    expect(inputFields[1]).toHaveValue("2");
    expect(document.activeElement).toBe(inputFields[2]);
  });

  it("handles backspace to clear the current field and move focus to the previous field", async() => {
    const { getAllByRole } = getRenderedComponent();
    const inputFields = getAllByRole("textbox");

    fireEvent.change(inputFields[0], { target: { value: "0" } });
    fireEvent.change(inputFields[1], { target: { value: "1" } });
    fireEvent.change(inputFields[2], { target: { value: "2" } });

    fireEvent.keyDown(inputFields[2], { key: "Backspace" });
    fireEvent.keyDown(inputFields[2], { key: "Backspace" });
    expect(inputFields[2]).toHaveValue("");
    expect(document.activeElement).toBe(inputFields[1]);
    fireEvent.keyDown(inputFields[1], { key: "Backspace" });
    expect(inputFields[1]).toHaveValue("");
    expect(document.activeElement).toBe(inputFields[0]);
  });

  // it("navigates to success page on successful verification", async () => {
  //   const { getByRole, getAllByRole, findByText } = getRenderedComponent();
  //   const inputFields = getAllByRole("textbox");
  //   const submitButton = getByRole("button", { name: /submit/i });
  //   for (let i = 0; i < 6; i++) {
  //     fireEvent.change(inputFields[i], { target: { value: "1" } });
  //   }
  //   fireEvent.click(submitButton);

  //   // Mocking successful verification
  //   await waitFor(() => {
  //     const successMessage = findByText(/success/i);
  //     expect(successMessage).toBeInTheDocument();
  //   });
  // });

  it("displays validation errors for empty or non-numeric inputs", () => {
    const { getAllByRole } = getRenderedComponent();
    const inputFields = getAllByRole("textbox");
    fireEvent.change(inputFields[0], { target: { value: "a" } });
    expect(inputFields[0]).toHaveValue("a");
    expect(inputFields[0].parentElement).toHaveClass("Mui-error"); // Ensures validation styling is applied
  });

  it("handles pasting 6-digit code and auto-populates input fields", () => {
    const { getAllByRole } = getRenderedComponent();
    const inputFields = getAllByRole("textbox");
    const pasteData = "123456";
    fireEvent.paste(inputFields[0], {
      clipboardData: { getData: () => pasteData },
    });
    for (let i = 0; i < 6; i++) {
      expect(inputFields[i]).toHaveValue(pasteData[i]);
    }
  });
});
