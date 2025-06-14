import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../SearchBar";

describe("SearchBar", () => {
  it("rend le champ de recherche avec le placeholder correct", () => {
    render(<SearchBar searchInput="" handleInputChange={() => {}} />);

    const input = screen.getByPlaceholderText(
      /search artists, themes or keywords/i
    );
    expect(input).toBeInTheDocument();
  });

  it("affiche la valeur passée en props", () => {
    render(<SearchBar searchInput="Rembrandt" handleInputChange={() => {}} />);

    const input = screen.getByDisplayValue("Rembrandt");
    expect(input).toBeInTheDocument();
  });

  it("appelle handleInputChange quand on tape dans le champ", () => {
    const handleChangeMock = vi.fn();

    render(<SearchBar searchInput="" handleInputChange={handleChangeMock} />);

    const input = screen.getByPlaceholderText(/search artists/i);
    fireEvent.change(input, { target: { value: "Monet" } });

    expect(handleChangeMock).toHaveBeenCalled();
  });
});
