import { render, fireEvent } from "@testing-library/react";
import Form from "./Form";

describe("Form component", () => {
  it("should render the component", () => {
    const { container } = render(<Form onSubmit={jest.fn()} />);
    expect(container).toBeTruthy();
  });

  it("should call the onSubmit function", () => {
    const onSubmit = jest.fn();
    const { getByText, getByLabelText } = render(<Form onSubmit={onSubmit} />);

    fireEvent.change(getByLabelText("Cart Value"), { target: { value: "50" } });
    fireEvent.change(getByLabelText("Delivery Distance"), { target: { value: "500" } });
    fireEvent.change(getByLabelText("Amount of Items"), { target: { value: "5" } });
    fireEvent.change(getByLabelText("Time"), { target: { value: "2023-01-01T12:00" } });

    fireEvent.click(getByText("Calculate Delivery Price"));

    expect(onSubmit).toHaveBeenCalled();
  });
});