import { useState, type FC } from "react";
import { Button, TextField } from "@ui-kit";
import convertLogo from "@assets/img/convert-3d-icon.svg";

/** The Convert to 3D tab: one SMILES in, a 3D structure out. */
export const Convert3dSection: FC = () => {
  const [smiles, setSmiles] = useState("");
  // Set once Convert is pressed. The converter itself is not built yet, so
  // for now the tab only says so.
  const [submitted, setSubmitted] = useState(false);

  const convert = () => {
    if (!smiles.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="flex w-full max-w-4xl flex-col gap-1">
      <TextField
        value={smiles}
        placeholder="SMILES"
        className="search-bar text-base placeholder:font-semibold"
        clearable
        hideDetails
        onChange={(e) => {
          setSmiles(e.target.value);
          setSubmitted(false);
        }}
        // The tab sits inside the home page's search form, so Enter is
        // handled here rather than by submitting that form.
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            convert();
          }
        }}
        appendInner={
          <Button type="button" variant="draw" size="draw" disabled={!smiles.trim()} onClick={convert}>
            Convert
            <img src={convertLogo} aria-hidden="true" className="h-6" />
          </Button>
        }
      />

      <p className="text-white/60 text-xs font-light text-center">
        Enter one structure as SMILES, e.g. Cl[Au][P](CC)(CC)CC
      </p>

      {submitted && (
        <p className="mt-4 text-white font-light text-center">3D conversion is coming soon.</p>
      )}
    </div>
  );
};
