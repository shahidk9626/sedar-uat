
import AddressListForm from "@/modules/form/addressListForm";
import Close from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { useTranslation } from "next-i18next";

const AddNewAddressDialog = ({ newAddress, handleClose2 }) => {
  const { t: translate } = useTranslation();
  return (
    <>
      <Dialog
        open={newAddress.open}
        onClose={() => {
          handleClose2();
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <IconButton
          aria-label="close"
          onClick={() => {
            handleClose2();
          }}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
        <DialogTitle
          id="alert-dialog-title"
          fontFamily={(theme) => theme.fontFaces.helveticaNeueBold}
          variant="typography16"
        >
          {translate("AddNewAddress")}
        </DialogTitle>
        <DialogContent>
          <AddressListForm
            newAddress={newAddress}
            handleClose2={handleClose2}
            submitButtonName={
              newAddress.id != "new"
                ? translate("Update")
                : translate("Save")}
            isRedirect={false}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddNewAddressDialog;
