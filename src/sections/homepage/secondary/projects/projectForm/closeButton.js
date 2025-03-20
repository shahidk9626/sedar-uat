import Close from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";

const CloseButton = ({ handleOpenClose = () => { } }) => {
  return (
    <Box pb={2} textAlign="right">
      <IconButton
        size="small"
        onClick={handleOpenClose}
        aria-label="close drawer"
      >
        <Close fontSize="small" />
      </IconButton>
    </Box>
  );
};

CloseButton.propTypes = {
  handleOpenClose: PropTypes.func,
};

export default CloseButton;
