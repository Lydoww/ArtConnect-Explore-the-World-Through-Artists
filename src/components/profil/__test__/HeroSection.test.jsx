import { render, screen } from "@testing-library/react";
import { HeroSection } from "../HeroSection";

test("correctly display the title and number of works", () => {
  render(
    <HeroSection
      savedArtwork={[{ image: "art.jpg" }]}
      selectedAvatar={null}
      onAvatarSelect={() => {}}
    />
  );

  expect(screen.getByText(/Your Art Profile/i)).toBeInTheDocument();
  expect(screen.getByText(/Curator of 1 artworks/i)).toBeInTheDocument();
});
