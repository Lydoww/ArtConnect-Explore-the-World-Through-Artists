import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Check, User } from "lucide-react";
import hals from "../../assets/hals.jpg";
import jozef from "../../assets/JozefIsraels.jpg";
import rembrandt from "../../assets/rembrandt.jpg";
import vangogh from "../../assets/vanGogh.jpg";
import vermeer from "../../assets/vermeer.webp";

export const AvatarSelector = ({
  selectedAvatar,
  onSelect,
  className = "",
}) => {
  const avatars = [
    { id: 1, name: "Frans Hals", url: hals },
    { id: 2, name: "Jozef Israëls", url: jozef },
    { id: 3, name: "Rembrandt", url: rembrandt },
    { id: 4, name: "Van Gogh", url: vangogh },
    { id: 5, name: "Vermeer", url: vermeer },
  ];

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          data-cy="avatar-trigger"
          className={`h-36 w-36 rounded-full border-4 border-[#0a0a0c] overflow-hidden bg-black/30 backdrop-blur-sm flex items-center justify-center cursor-pointer ${className}`}
          aria-label="Change avatar"
        >
          {selectedAvatar ? (
            <img
              src={selectedAvatar.url}
              alt={selectedAvatar.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <User size={48} className="text-white/70" />
          )}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={10}
          align="center"
          className="z-50 min-w-[200px] bg-slate-800 rounded-md shadow-lg p-2 space-y-1 border border-gray-700"
        >
          {avatars.map((avatar) => (
            <DropdownMenu.Item
              key={avatar.id}
              data-cy={`avatar-item-${avatar.id}`}
              onSelect={() => onSelect(avatar)}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-900 cursor-pointer outline-none"
            >
              <img
                src={avatar.url}
                alt={avatar.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-sm text-white">{avatar.name}</span>
              {selectedAvatar?.id === avatar.id && (
                <Check className="ml-auto w-4 h-4 text-green-500" />
              )}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
