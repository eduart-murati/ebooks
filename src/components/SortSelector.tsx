import { Button, Menu, Portal } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

interface Props {
  onSelectSortOrder: (sortOrder: string) => void;
  sortOrder: string;
  isDisabled?: boolean;
}

const SortSelector = ({ onSelectSortOrder, sortOrder, isDisabled }: Props) => {
  const sortOrders = [
    { value: "rating.desc", label: "Më të vlerësuarit" },
    { value: "new", label: "Botime të reja" },
    { value: "old", label: "Botime të vjetra" },
    { value: "title.asc", label: "Titulli (A-Z)" },
    // { value: "title.desc", label: "Titulli (Z-A)" },
  ];

  const currentSortOrder = sortOrders.find(
    (order) => order.value === sortOrder
  );

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button size="sm" disabled={isDisabled}>
          Rendit sipas: {currentSortOrder?.label || "Më të vlerësuarit"}
          <BsChevronDown />
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {sortOrders.map((order) => (
              <Menu.Item
                key={order.value}
                onClick={() => onSelectSortOrder(order.value)}
                value={order.value}
                disabled={isDisabled}
              >
                {order.label}
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export default SortSelector;
