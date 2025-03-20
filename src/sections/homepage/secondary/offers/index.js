import { NextFillImage } from "@/components/image";
import { CustomLink } from "@/components/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const SeasonalOffers = ({ data }) => {
  const { locale } = useRouter();
  const sliderSettings = {
    slidesPerView: 3,
    spaceBetween: 30,
    observer: false,
    observeParents: false,
  };
  return (
    <>
      <Box
        sx={{
          backgroundImage: "url(/assets/images/Mask-Group.png)",
          backgroundPosition: "right",
          backgroundPositionY: "center",
          backgroundSize: "60%",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          display: { md: "block", sm: "none", xs: "none", xxs: "none" },
        }}
      >
        <Container maxWidth="xl">
          <Box mt={5}>
            <Typography
              component="div"
              dangerouslySetInnerHTML={{
                __html: data?.title,
              }}
              sx={(theme) => ({
                pl: 3,
                letterSpacing: 0.8,
                color: theme.palette.grey[1600],
                textTransform: "uppercase",
                borderLeft: `2px solid ${theme.palette.primary.light}`,
                ...theme.typography.typography20,
                fontWeight: "normal",
                fontFamily: theme.fontFaces.helveticaNeueMedium,
                mb: 0,
              })}
            />
          </Box>
          <Box my={4}>
            <Swiper
              {...sliderSettings}
              spaceBetween={30}
              modules={[Navigation, Autoplay]}
              className="mySwiper"
            >
              {data?.CHILD?.map((item, index) => (
                <SwiperSlide key={`SWIPER_OFFER-${index}`}>
                  <Box position="relative">
                    <Box>
                      <NextFillImage
                        src={item?.image_path}
                        sx={{
                          width: "100%!important",
                          height: "100%!important",
                          objectFit: "contain",
                          backgroundSize: "contain",
                          "&.MuiCard-root": {
                            borderRadius: 0,
                            boxShadow: "none",
                            position: "relative!important",
                            width: "100%!important",
                            height: "100%!important",
                          },
                        }}
                        alt={item?.image_path}
                        sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                        objectFit="contain"
                      />
                    </Box>
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: "5%",
                        right: "45%",
                        transform: "translate(0%,-45%)",
                      }}
                    >
                      <CustomLink link={item?.link_url || "#"} lang={locale}>
                        <Typography
                          sx={(theme) => ({
                            color: theme.palette.common.white,
                            textDecoration: "underline",
                          })}
                        >
                          {item?.link_title}
                        </Typography>
                      </CustomLink>
                    </Box>
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default SeasonalOffers;
