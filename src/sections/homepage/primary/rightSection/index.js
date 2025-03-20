/* eslint-disable jsx-a11y/alt-text */
import { useAuthContext } from "@/auth/useAuthContext";
import useResponsive from "@/hooks/useResponsive";
import { CenterContentBox, SpaceArtImage } from "@/styles/layouts";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import BGImage from "./bgImage";
import Content from "./content";
import MobileBGImage from "./mobileBgImage";

const RightSection = () => {
  const isDownMd = useResponsive("down", "md");
  const { state } = useAuthContext();
  const { cookies } = state;
  const { sedarGeoCountryName = {} } = cookies || {};

  return (
    <>
      <Stack spacing={0.5}>
        <BGImage>
          <Content />
          {!isDownMd && <SpaceArtImage src="/assets/homepage/space_art.avif" />}
        </BGImage>
        {isDownMd && (
          <MobileBGImage>
            <CenterContentBox>
              <Stack
                spacing={1}
                sx={{
                  px: {
                    md: "6rem!important",
                    sm: "0.5rem",
                    xs: "0.5rem",
                    xxs: "0.5rem",
                  },
                  alignSelf: "center",
                  transform: "scaleX(-1)",
                }}
              >
                <Typography component="p" variant="typography32">
                  {sedarGeoCountryName?.en}
                </Typography>

                <Typography
                  component="p"
                  variant="typography32"
                  fontFamily={(theme) =>
                    theme.fontFaces.helveticaNeueBoldArabic
                  }
                >
                  {sedarGeoCountryName?.ar}
                </Typography>
              </Stack>
            </CenterContentBox>
          </MobileBGImage>
        )}
      </Stack>
    </>
  );
};

export default RightSection;
