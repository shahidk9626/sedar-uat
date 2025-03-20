import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
const ShortDescription = ({ data }) => {
  const { title = "", description = "" } = data;

  const mainBox = {
    marginTop: {
      lg: "2.8rem",
      md: "2.8rem",
      sm: "1rem",
      xs: "1rem",
      xxs: "1rem",
    },
    position: "relative",
  };

  const TitleStyle = {
    lineHeight: {
      lg: "normal",
      md: "normal",
      sm: "17px",
      xs: "17px",
      xxs: "17px",
    },
    color: (theme) => theme.palette.grey[1600],
    fontWeight: 400,
    textTransform: "uppercase",
    paddingLeft: "1.5rem!important",
    borderLeft: (theme) => `2px solid ${theme.palette.warning.light}`,
    mb: 1,
    letterSpacing: "0.9px",
  };

  return (
    <Box component="div" sx={mainBox}>
      <Container maxWidth="xl">
        <Typography
          component="h1"
          variant="typography16"
          sx={TitleStyle}
          fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
        >
          {title}
        </Typography>
        <Box
          component="div"
          dangerouslySetInnerHTML={{ __html: description }}
          sx={(theme) => ({
            fontFamily: theme.fontFaces.helveticaNeueLight,
            letterSpacing: 1,
            width: "100%",
            color: "common.black",
            p: "1.5rem",
            pt: "0.2rem",
            "& p": {
              ...theme.typography.typography45,
              lineHeight: "27px",
              fontWeight: 400,
            },
          })}
        />
      </Container>
    </Box>
  );
};

ShortDescription.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default ShortDescription;
