import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import TransactionFilters from "./TransactionFilters";
import { TransactionFiltersProps } from "./TransactionFilters";

export function FilterPopover(props: TransactionFiltersProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="ml-2">
          <Filter className="mr-2 h-4 w-4" />
          Filtres
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-4">
        <TransactionFilters {...props} />
      </PopoverContent>
    </Popover>
  );
}