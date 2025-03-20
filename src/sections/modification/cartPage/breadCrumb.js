import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";

const CustomBreadCrumb = () => {
  const { t: translate } = useTranslation();
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Box
        display={{
          lg: "block",
          md: "block",
          sm: "none",
          xs: "none",
          xxs: "none",
        }}
      >
        <Stack direction={"row"} spacing={0.5}>
          <Link underline="hover" color="inherit" href="/">
            <Typography
              color="inherit"
              typography="typography14"
              fontFamily={(theme) => theme.fontFaces.helveticaNeue}
            >
              {translate("Home")}
            </Typography>
          </Link>
          <Typography
            color="inherit"
            fontFamily={(theme) => theme.fontFaces.helveticaNeue}
          >
            /{" "}{translate("Cart")}
          </Typography>
        </Stack>
      </Box>
    </Breadcrumbs>
  );
};

export default CustomBreadCrumb;
