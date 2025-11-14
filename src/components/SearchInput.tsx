import { Input, InputGroup } from "@chakra-ui/react";
import { useRef } from "react";
import type { ChangeEvent } from "react";
import { LuSearch } from "react-icons/lu";

interface Props {
  searchText: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (value: string) => void;
}

const SearchInput = ({ searchText, onSearchChange, onSearchSubmit }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) onSearchSubmit(ref.current.value);
      }}
      style={{ width: "100%" }}
    >
      <InputGroup flex="1" startElement={<LuSearch />}>
        <Input
          value={searchText ?? ""}
          ref={ref}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onSearchChange(e.target.value)
          }
          borderRadius="full"
          placeholder="Kërko libra..."
          variant="outline"
          width="100%"
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
