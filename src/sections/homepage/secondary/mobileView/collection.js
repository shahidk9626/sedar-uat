import RightArrow from "@/assets/homepage/rightArrow";
import { useAuthContext } from "@/auth/useAuthContext";
import CommonDialogBox from "@/components/dialog/commonDialog";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import { CustomLink } from "@/components/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const MobileCollection = ({ data = [] }) => {
  const { locale } = useRouter();
  const { state } = useAuthContext();
  const { cookies } = state;
  const { themeDirection } = cookies || {};
  const { t: translate } = useTranslation();
  const [open, setOpen] = useState({ open: false, data: "" });
  const handleOpenDialog = (item) => {
    setOpen({ open: true, data: item });
  };
  const handleClose = () => {
    setOpen({ open: false, data: null });
  };

  const [swiperDir, setSwiperDir] = useState(
    themeDirection === "rtl" ? "rtl" : "ltr"
  );
  const [updateKey, setUpdateKey] = useState(0);

  useEffect(() => {
    setSwiperDir(themeDirection === "rtl" ? "rtl" : "ltr");
    setUpdateKey((prev) => prev + 1);
  }, [themeDirection, locale]);

  return (
    <Box
      my={4}
      sx={{ display: { md: "none", sm: "block", xs: "block", xxs: "block" } }}
    >
      <Container maxWidth="xl">
        <Swiper
          key={`${swiperDir}-${updateKey}`}
          spaceBetween={20}
          slidesPerView={1}
          autoHeight={true}
          loop={true}
          dir={swiperDir}
        >
          {data &&
            data.length > 0 &&
            data.map((item, index) => (
              <SwiperSlide key={`MAP-COLLECTION-MOBILE-COLLECTIONS-${index}`}>
                <Stack spacing={0}>
                  <Stack spacing={0}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography
                        component="p"
                        variant="typography16"
                        sx={{
                          letterSpacing: "1.28px",
                          color: (theme) => theme.palette.grey[1600],
                          fontWeight: 700,
                          textTransform: "uppercase",
                          paddingLeft: "1.5rem!important",
                          borderLeft: (theme) =>
                            `2px solid ${theme.palette.warning.light}`,
                          fontFamily: (theme) => theme.fontFaces.helveticaNeue,
                        }}
                      >
                        {item.title}
                      </Typography>
                      <CustomLink href={item.link_url} locale={locale}>
                        <Typography
                          component="p"
                          variant="typography16"
                          color="primary"
                          display="flex"
                          gap="5px"
                          alignItems="center"
                          fontWeight={400}
                          sx={{
                            fontFamily: (theme) =>
                              theme.fontFaces.helveticaNeueMedium,
                            letterSpacing: 0.5,
                          }}
                        >
                          {translate("View_All")}
                          <RightArrow />
                        </Typography>
                      </CustomLink>
                    </Stack>
                    {item.description && (
                      <Typography
                        component="div"
                        variant="typography18"
                        sx={{
                          "& p": {
                            fontFamily: (theme) =>
                              theme.fontFaces.helveticaNeueLight,
                            fontSize: "16px",
                            marginBottom: "0",
                            color: "common.black",
                            wordSpacing: 1,
                            py: 1,
                          },
                        }}
                        dangerouslySetInnerHTML={{
                          __html: item.description
                            ? `${item.description.slice(0, 150)}`
                            : "",
                        }}
                      />
                    )}
                    {item.description && item.description.length > 99 ? (
                      <Typography
                        component="span"
                        color={(theme) => theme.palette.primary.main}
                        fontFamily={(theme) =>
                          theme.fontFaces.helveticaNeueMedium
                        }
                        letterSpacing=".54px"
                        sx={{
                          py: 1,
                          display: "block",
                          cursor: "pointer",
                          mb: "10px",
                        }}
                        variant="typography14"
                        onClick={() => handleOpenDialog(item)}
                      >
                        {translate("More")}
                      </Typography>
                    ) : null}
                  </Stack>
                </Stack>
                <Box sx={{ mt: 0 }}>
                  <NextLazyLoadImage
                    src={item.image_path}
                    alt={item.title}
                    width={362}
                    height={502}
                    sx={{
                      width: "100%!important",
                      height: "100%!important",
                      objectFit: "cover!important",
                    }}
                    sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
                    objectFit="contain"
                    upLgWidth={362}
                    downLgWidth={362}
                    downMdWidth={362}
                    downSmWidth={362}
                    downXsWidth={362}
                  />
                </Box>
              </SwiperSlide>
            ))}
        </Swiper>
      </Container>
      <CommonDialogBox
        open={open?.open}
        handleClose={handleClose}
        title={open?.data?.title}
        content={
          <Typography
            component="div"
            variant="typography18"
            pt="0rem"
            sx={{
              "& p": {
                fontFamily: (theme) => theme.fontFaces.helveticaNeueLight,
                fontSize: "16px",
                marginBottom: "0",
              },
            }}
            dangerouslySetInnerHTML={{
              __html: open?.data?.description,
            }}
          />
        }
      />
    </Box>
  );
};

MobileCollection.propTypes = {
  data: PropTypes.array,
};

export default MobileCollection;
