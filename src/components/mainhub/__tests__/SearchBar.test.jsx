import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../SearchBar";

describe("SearchBar", () => {
  it("renders the search input with the correct placeholder", () => {
    render(<SearchBar searchInput="" handleInputChange={() => {}} />);

    const input = screen.getByPlaceholderText(
      /search artists, themes or keywords/i
    );
    expect(input).toBeInTheDocument();
  });

  it("displays the value passed via props", () => {
    render(<SearchBar searchInput="Rembrandt" handleInputChange={() => {}} />);

    const input = screen.getByDisplayValue("Rembrandt");
    expect(input).toBeInTheDocument();
  });

  it("calls handleInputChange when typing in the input", () => {
    const handleChangeMock = vi.fn();

    render(<SearchBar searchInput="" handleInputChange={handleChangeMock} />);

    const input = screen.getByPlaceholderText(/search artists/i);
    fireEvent.change(input, { target: { value: "Monet" } });

    expect(handleChangeMock).toHaveBeenCalled();
  });
});
