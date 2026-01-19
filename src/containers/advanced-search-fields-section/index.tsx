import type { FC } from "react";

import { mdiPlus } from "@mdi/js";
import type { TSearchField } from "@types";
import { Button, Icon } from "@ui-kit";

import { AdvancedSearchField } from "../advanced-search-field";

interface AdvancedSearchFieldsSectionProps {
  searchFields: TSearchField[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (field: TSearchField, index: number) => void;
}

export const AdvancedSearchFieldsSection: FC<AdvancedSearchFieldsSectionProps> = ({
  searchFields,
  onAdd,
  onRemove,
  onChange,
}) => {
  return (
    <section className="flex w-full flex-col items-center gap-10">
      {searchFields.map((field, i) => (
        <AdvancedSearchField
          key={i}
          field={field}
          onChange={(field) => onChange(field, i)}
          onRemove={() => onRemove(i)}
        />
      ))}

      <Button className="gap-2 w-[330px] bg-transparent shadow-none text-2xl font-light hover:bg-transparent hover:text-primary" onClick={onAdd}>
        Add Advanced Search Field
        <Icon name={mdiPlus} className="bg-secondary rounded-full" color="current" add_sf />
      </Button>
    </section>
  );
};
