import type { FC } from "react";
import { TextField } from "@ui-kit";
import { LogicalOperatorSelect } from "../logical-operator-select";

interface AuthorProps {
    lastIndex: boolean;
    logicalOperator: string;
    onLogicalOperatorChange: (value: string) => void;
    value: string;
    onChange: (value: string) => void;
}

export const Author: FC<AuthorProps> = ({
    lastIndex,
    logicalOperator,
    onLogicalOperatorChange,
    value,
    onChange,
}) => {
    return (
        <div className="flex grow gap-5">
            <div className="grow">
                <TextField
                    value={value}
                    placeholder="Authors:"
                    hideDetails
                    full_p={true}
                    prependInner={
                        <div className="text-gunmetal font-light mr-3 hidden items-center gap-3 text-sm whitespace-nowrap">
                            Authors
                        </div>
                    }
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>

            {!lastIndex && (
                <LogicalOperatorSelect value={logicalOperator} onChange={onLogicalOperatorChange} />
            )}
        </div>
    );
};
