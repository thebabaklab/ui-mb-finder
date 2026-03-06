import type { FC } from "react";
import { mdiPlus } from "@mdi/js";
import type { TSearchField, TTabValue } from "@types";
import { Button, Icon } from "@ui-kit";
import { AdvancedSearchField } from "../advanced-search-field";
import { fieldTypes } from "../advanced-search-field/advanced-search-field.consts";

interface AdvancedSearchFieldsSectionProps {
  searchFields: TSearchField[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (field: TSearchField, index: number) => void;
  activeTab: TTabValue;
}

export const AdvancedSearchFieldsSection: FC<AdvancedSearchFieldsSectionProps> = ({
  searchFields,
  onAdd,
  onRemove,
  onChange,
  activeTab
}) => {
  return (
    <section className="flex w-full flex-col items-center gap-10">
      {searchFields.map((field, i) => (
        <AdvancedSearchField
          key={i}
          lastIndex={i === searchFields.length - 1}
          field={field}
          onChange={(field) => onChange(field, i)}
          onRemove={() => onRemove(i)}
          items={fieldTypes[activeTab].filter(
            (fieldType) =>
              fieldType.id === field.type || !searchFields.some(f => f.type === fieldType.id)
          )}
        />
      ))}

      {searchFields.length !== fieldTypes[activeTab].length && (
        <Button className="gap-2 w-[330px] bg-transparent shadow-none text-xl font-light hover:bg-transparent hover:text-primary" onClick={onAdd}>
          Add Advanced Search Field
          <Icon name={mdiPlus} className="bg-secondary rounded-full" color="current" add_sf />
        </Button>
      )}
    </section>
  );
};
