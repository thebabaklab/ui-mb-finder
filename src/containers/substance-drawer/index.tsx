import { type ChangeEvent, type FC, useState } from "react";

import { Button, Dialog, DialogContent, DialogTitle, TextField } from "@ui-kit";
import { Ketcher } from "ketcher-core";
import { Editor } from "ketcher-react";
import "ketcher-react/dist/index.css";
import { StandaloneStructServiceProvider } from "ketcher-standalone";

const structServiceProvider = new StandaloneStructServiceProvider();

declare global {
  interface Window {
    ketcher?: Ketcher;
  }
}

interface SubstanceDrawerProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  onSubmit: (smiles: string) => void;
}

export const SubstanceDrawer: FC<SubstanceDrawerProps> = ({
  open,
  onOpenChange,
  onSubmit,
}) => {
  const [smiles, setSmiles] = useState("");
  const [hasError, setHasError] = useState(false);

  const handleClose = () => {
    onOpenChange(false);
  };

  const onInitialize = (ketcher: Ketcher) => {
    window.ketcher = ketcher;
  };

  const handleClick = async () => {
    if (typeof window !== "undefined" && window.ketcher) {
      const res = await window.ketcher.getSmiles();
      onSubmit(res);
    }
  };

  const handleSmilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHasError(false);
    setSmiles(e.target.value);
  };

  const generateImage = async () => {
    if (typeof window !== "undefined" && window.ketcher) {
      try {
        await window.ketcher.setMolecule(smiles);

        setTimeout(async () => {
          if (window.ketcher) {
            const smiles = await window.ketcher.getSmiles();

            if (!smiles) setHasError(true);
          }
        }, 400);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="min-h-screen max-w-[1200px] px-0 sm:min-h-auto sm:px-6"
        aria-describedby={undefined}
      >
        <DialogTitle className="hidden w-full">Substance Drawer</DialogTitle>

        <div className="flex flex-col sm:h-[calc(100vh_-_10rem)] sm:max-h-[calc(100vh_-_10rem)]">
          <div className="max-h-[calc(100vh_-_10rem)] pt-2 sm:max-h-none sm:pt-0">
            <Editor
              staticResourcesUrl=""
              errorHandler={(err) => console.log(err)}
              structServiceProvider={structServiceProvider}
              onInit={onInitialize}
            />
          </div>

          <div className="flex flex-col py-5">
            <div className="flex justify-center gap-5 sm:justify-end">
              <div className="w-[170px] sm:w-full">
                <TextField
                  value={smiles}
                  placeholder="Enter SMILES"
                  dense
                  clearable
                  errorMessage={hasError ? "Invalid SMILES" : ""}
                  onChange={handleSmilesChange}
                />
              </div>

              <Button variant="secondary" size="small" onClick={generateImage}>
                Generate Image
              </Button>
            </div>

            <div className="flex justify-center gap-5 sm:justify-end">
              <Button
                variant="outline"
                size="small"
                className="w-[170px]"
                onClick={handleClose}
              >
                Cancel
              </Button>

              <Button size="small" className="w-[170px]" onClick={handleClick}>
                Search Smiles
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
