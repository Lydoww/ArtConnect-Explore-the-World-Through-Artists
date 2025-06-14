import { render, screen, fireEvent } from "@testing-library/react";
import SearchableList from "../SearchBarList";

describe("SearchableList", () => {
  it("filters the list based on the search input in the SearchBar", () => {
    render(<SearchableList />);

    expect(screen.getByText("Vermeer")).toBeInTheDocument();
    expect(screen.getByText("Hendrik Voogd")).toBeInTheDocument();
    expect(screen.getByText("Van Gogh")).toBeInTheDocument();

    // Get the input element
    const input = screen.getByPlaceholderText(/search artists/i);

    fireEvent.change(input, { target: { value: "van" } });

    expect(screen.getByText("Van Gogh")).toBeInTheDocument();

    expect(screen.queryByText("Vermeer")).toBeNull();
    expect(screen.queryByText("Hendrik Voogd")).toBeNull();
  });
});
