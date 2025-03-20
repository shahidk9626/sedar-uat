import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CartDilogue from "./addToCartDilogue";

const InfoDialog = ({ open, handleClose }) => {
  return (
    <CartDilogue
      title={open?.data?.policyDataList?.[1]?.title}
      open={open.open}
      setOpen={handleClose}
    >
      <Box>
        <Box>
          <Typography
            component="div"
            dangerouslySetInnerHTML={{
              __html: open?.data?.policyDataList?.[1]?.description,
            }}
            sx={(theme) => ({
              "& p": {
                fontFamily: theme.fontFaces.helveticaNeueRegular,
                margin: 0,
              },
              "& ul": {
                padding: "0 15px",
              },
              "& ol": {
                pl: "18px",
                m: 0,
              },
            })}
          />
        </Box>
      </Box>
    </CartDilogue>
  );
};

export default InfoDialog;
