import Arrow from "@/assets/homepage/arrow";
import { useAuthContext } from "@/auth/useAuthContext";
import useResponsive from "@/hooks/useResponsive";
import { CenterContentBox } from "@/styles/layouts";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
const Content = () => {
  const { state } = useAuthContext();
  const { cookies } = state;
  const { sedarGeoCountryName = {} } = cookies || {};

  const isDownMd = useResponsive("down", "md");

  return (
    <>
      <CenterContentBox>
        <Stack
          direction="row"
          justifyContent={!isDownMd ? "space-between" : "center"}
          width="100%"
          alignItems={!isDownMd ? "end" : "center"}
        >
          <Stack spacing={1}>
            <Typography
              component={Link}
              color="common.white"
              textDecoration="none"
              sx={{
                textDecoration: "none",
              }}
              href="/"
              locale={EnUrl}
            >
              <Typography
                component="h1"
                variant="h1"
                sx={{
                  cursor: "pointer",
                  ":hover": {
                    color: (theme) => theme.palette.pink.light,
                  },
                }}
              >
                Get inspired
              </Typography>
            </Typography>
            <Typography
              component={Link}
              color="common.white"
              textDecoration="none"
              sx={{
                textDecoration: "none",
              }}
              href="/"
              locale={ArUrl}
            >
              <Typography
                component="h2"
                variant="h2"
                sx={{
                  cursor: "pointer",
                  ":hover": {
                    color: (theme) => theme.palette.pink.light,
                  },
                }}
                fontFamily={(theme) => theme.fontFaces.helveticaNeueBoldArabic}
              >
                تصفح التصاميم
              </Typography>
            </Typography>
          </Stack>
          {!isDownMd && (
            <Typography
              component={Link}
              color="common.white"
              textDecoration="none"
              sx={{
                textDecoration: "none",
              }}
              href="/"
              locale={EnUrl}
            >
              <Arrow sx={{ cursor: "pointer" }} />
            </Typography>
          )}
        </Stack>
      </CenterContentBox>
      {!isDownMd && (
        <Stack
          spacing={1}
          sx={{
            px: {
              md: "6rem!important",
              sm: "0.5rem",
              xs: "0.5rem",
              xxs: "0.5rem",
            },
            alignSelf: "end",
          }}
        >
          <Typography component="p" variant="typography32">
            {sedarGeoCountryName?.en}
          </Typography>

          <Typography
            component="p"
            variant="typography32"
            fontFamily={(theme) => theme.fontFaces.helveticaNeueBoldArabic}
          >
            {sedarGeoCountryName?.ar}
          </Typography>
        </Stack>
      )}
    </>
  );
};

export default Content;
