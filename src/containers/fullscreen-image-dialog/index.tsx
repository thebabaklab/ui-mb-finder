import { mdiClose } from "@mdi/js";
import { useStore } from "@store";
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Icon } from "@ui-kit";

export const FullscreenImageDialog = () => {
  const dialogs = useStore((s) => s.dialogs);
  const setDialogs = useStore((s) => s.setDialogs);
  const selectedImage = useStore((s) => s.selectedImage);

  return (
    <Dialog
      open={dialogs.includes("fullscreenImage")}
      onOpenChange={(value) => setDialogs(value ? ["fullscreenImage"] : [])}
    >
      <DialogContent
        className="h-screen text-center bg-platinum-silver sm:h-auto lg:max-w-[800px] lg:min-w-[800px]"
        aria-describedby={undefined}
      >
        <DialogHeader className="h-[38px]">
          <DialogTitle className="w-full text-gunmetal">{selectedImage?.title}</DialogTitle>

          <Button variant="icon" size="icon" className="-mr-2" onClick={() => setDialogs([])}>
            <Icon name={mdiClose} />
          </Button>
        </DialogHeader>

        {selectedImage?.src && (
          <img src={selectedImage.src} alt="chemical substance molecule" className="h-[590px] w-[752px] object-contain" />
        )}
      </DialogContent>
    </Dialog>
  );
};
