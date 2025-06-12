import { User } from "lucide-react";

export const HeroSection = ({ savedArtwork }) => (
  <div className="relative">
    <div
      className="h-32 w-full bg-cover bg-center"
      style={{
        backgroundImage:
          savedArtwork.length > 0
            ? `url(${
                savedArtwork[0].image ||
                "/placeholder.svg?height=400&width=800"
              })`
            : "url('/placeholder.svg?height=400&width=800')",
      }}
    ></div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-24">
      <div className="flex flex-col md:flex-row md:items-end gap-6">
        <div className="h-36 w-36 rounded-full border-4 border-[#0a0a0c] overflow-hidden bg-black/30 backdrop-blur-sm flex items-center justify-center">
          <User size={48} className="text-white/70" />
        </div>

        <div className="pb-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            <span className="bg-gradient-to-r from-fuchsia-600 to-orange-600 bg-clip-text text-transparent">
              Your Art Profile
            </span>
          </h1>
          <p className="text-slate-300 mt-1">
            Curator of {savedArtwork.length} artworks
          </p>
        </div>
      </div>
    </div>
  </div>
);