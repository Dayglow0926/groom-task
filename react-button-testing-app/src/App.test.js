import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("the counter starts at 0", () => {
  render(<App />);
  const counterElement = screen.getByTestId("counter");
  expect(counterElement).toHaveTextContent(0);
});

test("minus button has correct text", () => {
  render(<App />);
  const counterElement = screen.getByTestId("minus-button");
  expect(counterElement).toHaveTextContent("-");
});

test("plus button has correct text", () => {
  render(<App />);
  const counterElement = screen.getByTestId("plus-button");
  expect(counterElement).toHaveTextContent("+");
});

test("When the + button is pressed, the counter changes to 1", () => {
  render(<App />);
  const buttonElement = screen.getByTestId("plus-button");
  fireEvent.click(buttonElement);
  const counterElement = screen.getByTestId("counter");
  expect(counterElement).toHaveTextContent(1);
});

test("on/off button has blue color", () => {
  render(<App />);
  //screen object를 이용해서 원하는 엘리먼트레 접근
  const buttonElement = screen.getByTestId("on/off-button");
  // on/off 버튼 색깔을 블루색으로 ...
  expect(buttonElement).toHaveStyle({ backgroundColor: "blue" });
});
