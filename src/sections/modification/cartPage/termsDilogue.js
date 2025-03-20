import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import CartDilogue from "./addToCartDilogue";

const TermsConditionDilogue = ({ open = false, setOpen = false }) => {
  return (
    <CartDilogue
      title={open?.data?.checkoutPolicy?.title}
      open={open.open}
      setOpen={setOpen}
    >
      <Box>
        <Box>
          <Typography
            component="div"
            dangerouslySetInnerHTML={{
              __html: open?.data?.checkoutPolicy?.description,
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

TermsConditionDilogue.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.bool,
};


export default TermsConditionDilogue;
