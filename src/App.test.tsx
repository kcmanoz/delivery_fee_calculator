//Unit test for App Component

import { render } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  it("should render the component", () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });

  it("should render the delivery fee", () => {
    const { getByText } = render(<App />);
    const deliveryFee = getByText("Delivery Price: 0 €");
    expect(deliveryFee).toBeTruthy();
  });
});