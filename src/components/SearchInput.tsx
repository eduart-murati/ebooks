// components/SearchInput.tsx
import { useRef } from "react";
import type { ChangeEvent } from "react";

interface Props {
  searchText: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (value: string) => void;
}

// Zëvendësues për ikonën e kërkimit
const SearchIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="1.2em"
    height="1.2em"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      position: "absolute",
      left: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#6B7280",
    }}
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const SearchInput = ({ searchText, onSearchChange, onSearchSubmit }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) onSearchSubmit(ref.current.value);
      }}
      style={{ width: "100%", position: "relative" }}
    >
      {/* Imitimi i InputGroup */}
      <div style={{ position: "relative", width: "100%" }}>
        <SearchIcon />

        {/* Inputi me stilim për t'u dukur si Chakra UI Input */}
        <input
          value={searchText ?? ""}
          ref={ref}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onSearchChange(e.target.value)
          }
          placeholder="Kërko libra..."
          style={{
            width: "100%",
            borderRadius: "999px", // full
            padding: "8px 16px 8px 40px", // Hapesirë për ikonën
            border: "1px solid #D1D5DB",
            backgroundColor: "#F3F4F6", // Ngjyrë sfondi e lehtë
            color: "#1F2937",
          }}
        />
      </div>
    </form>
  );
};

export default SearchInput;
