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

// Ikona për butonin X
const ClearIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
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
      <div style={{ position: "relative", width: "100%" }}>
        <SearchIcon />

        <input
          value={searchText ?? ""}
          ref={ref}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onSearchChange(e.target.value)
          }
          placeholder="Kërko libra..."
          style={{
            width: "100%",
            borderRadius: "999px",
            padding: "8px 40px 8px 40px", // hapësirë për ikonat
            border: "1px solid #D1D5DB",
            backgroundColor: "#F3F4F6",
            color: "#1F2937",
          }}
        />

        {searchText && (
          <button
            type="button"
            onClick={() => {
              onSearchChange("");
              ref.current?.focus();
            }}
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#6B7280",
              padding: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ClearIcon />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchInput;
