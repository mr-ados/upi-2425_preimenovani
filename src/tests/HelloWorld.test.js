import { render, screen } from "@testing-library/react";
import HelloWorld from "../components/HelloWorld";
import React from "react";


test("renders the message", () => {
  render(<HelloWorld message="Hello, Jest!" />);
  expect(screen.getByText("Hello, Jest!")).toBeInTheDocument();
});
