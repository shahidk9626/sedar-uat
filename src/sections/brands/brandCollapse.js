import { BrandsProductionText } from "@/styles/brands";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import PropTypes from "prop-types";

const BrandCollapse = ({ data = {} }) => {
  return (
    <Container sx={{ marginTop: "30px" }}>
      <Typography
        sx={(theme) => ({
          pl: 3,
          borderLeft: `2px solid ${theme.palette.primary.light}`,
          letterSpacing: 0,
          ...theme.typography.typography20,
          fontWeight: "normal",
          fontFamily: theme.fontFaces.helveticaNeueMedium,
          mb: 0,
        })}
      >
        {data?.title}
      </Typography>
      <BrandsProductionText
        component="div"
        dangerouslySetInnerHTML={{
          __html: data?.description,
        }}
      />
      <Button
        variant="contained"
        color="warning"
        LinkComponent={NextLink}
        sx={(theme) => ({
          py: "0.82rem",
          width: "100%",
          borderRadius: 0,
          height: "auto",
          ...theme.typography.subtitle1,
          fontFamily: theme.fontFaces.helveticaNeueBold,
          ":hover": {
            color: (theme) => `${theme.palette.common.white}!important`,
          },
        })}
        href={`/${data?.link_url}`}
      >
        {data?.link_title}
      </Button>
    </Container>
  );
};

BrandCollapse.propTypes = {
  data: PropTypes.object,
};

export default BrandCollapse;
