import { useAuthContext } from "@/auth/useAuthContext";
import NextLazyFillImage from "@/components/image/nextLazyFillLoadImage";
import useResponsive from "@/hooks/useResponsive";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import parse from "html-react-parser";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const BannerDialog = dynamic(() => import("@/sections/product/bannerDialog"), {
  ssr: false,
});

function parseSCMore(scMore) {
  if (!scMore) return { h1Content: null, description: null };

  const h1Match = scMore.match(/<h1>(.*?)<\/h1>/);
  const h1Content = h1Match ? decodeHtml(h1Match[1].trim()) : null;

  const description = decodeHtml(scMore.replace(/<h1>.*?<\/h1>/, "").trim());

  return { h1Content, description };
}


function decodeHtml(html) {
  if (typeof document === "undefined") {
    return html; 
  }
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}



const Banner = ({ firstData }) => {
  const isDownMd = useResponsive("down", "md");
  const [open, setOpen] = useState(false);
  const { t: translate } = useTranslation();
  const handleOpenClose = () => setOpen(!open);
  const { state } = useAuthContext();
  const { cookies } = state;
  const { themeDirection } = cookies || {};
  const { locale } = useRouter();
  const [selectedItem, setSelectedItem] = useState(null);
  const [swiperDir, setSwiperDir] = useState(
    themeDirection === "rtl" ? "rtl" : "ltr"
  );
  const [updateKey, setUpdateKey] = useState(0);

  useEffect(() => {
    setSwiperDir(themeDirection === "rtl" ? "rtl" : "ltr");
    setUpdateKey((prev) => prev + 1); // Force update on theme change
  }, [themeDirection, locale]);

  return (
    <>
      <Box sx={{ position: "relative" }} component="section">
        <Swiper
          key={`${swiperDir}-${updateKey}-${isDownMd}`} // Combine to ensure re-render
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          speed={500}
          navigation={false}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              const bulletColor = isDownMd ? "black" : "white";
              return `<span class="${className}" style="background-color: ${bulletColor};"></span>`;
            },
          }}
          modules={[Pagination]}
          className="mySwiper"
          autoHeight={true}
          dir={swiperDir}
        >
          {firstData &&
            firstData.map((childItem, childIndex) => {
              const h1Content = parseSCMore(childItem?.SC_MORE);
              return (
                <SwiperSlide
                  component="div"
                  key={`CHILD_SLIDER_INDEX_${childIndex}`}
                >
                  <Box component="div" position="relative">
                    <NextLazyFillImage
                      src={childItem?.SC_IMAGE_PATH}
                      alt={childItem?.SC_DESC}
                      sx={{
                        width: "100%!important",
                        height: "100%!important",
                        objectFit: "cover",
                        position: "relative!important",
                      }}
                      width={1400}
                      height={385}
                      upLgWidth={1400}
                      downLgWidth={1400}
                      downMdWidth={800}
                      downSmWidth={400}
                      downXsWidth={300}
                      priority={false}
                      loading="lazy"
                      aspectRatio="16 / 4"
                    />

                    <Box
                      sx={(theme) => ({
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        [theme.breakpoints.down("md")]: {
                          // top: "75%",
                        },
                      })}
                    >
                      <Typography
                        component="h1"
                        variant="typography10"
                        fontFamily={(theme) =>
                          theme.fontFaces.helveticaNeueMedium
                        }
                        color="common.white"
                        fontWeight="400"
                        textAlign="center"
                        mb="15px"
                        letterSpacing={0.5}
                      >
                        {h1Content?.h1Content}
                      </Typography>
                      <Typography
                        component="div"
                        variant="typography14"
                        color="common.white"
                        fontFamily={(theme) =>
                          theme.fontFaces.helveticaNeueLight
                        }
                        textAlign="center"
                        letterSpacing={0.5}
                        display={{
                          lg: "block",
                          md: "block",
                          sm: "none",
                          xs: "none",
                          xxs: "none",
                        }}
                      >
                        {parse(
                          typeof childItem?.SC_MORE === "string" &&
                            childItem?.SC_MORE.length > 380
                            ? `${h1Content?.description.slice(0, 380)}...`
                            : h1Content?.description || ""
                        )}
                        {childItem?.SC_MORE?.length > 380 && (
                          <Typography
                            component="span"
                            color={(theme) => theme.palette.primary[200]}
                            fontFamily={(theme) =>
                              theme.fontFaces.helveticaNeueLight
                            }
                            letterSpacing=".54px"
                            sx={{ cursor: "pointer", fontWeight: 400, pl: 1 }}
                            variant="typography14"
                            display="inline-block"
                            onClick={() => {
                              setSelectedItem(h1Content);
                              setOpen(!open);
                            }}
                          >
                            {translate("ReadMore")}
                          </Typography>
                        )}
                      </Typography>
                    </Box>
                  </Box>

                  {isDownMd && (
                    <CardContent sx={{ mb: 4 }}>
                      <Typography
                        component="div"
                        variant="typography14"
                        color="common.black"
                        fontFamily={(theme) =>
                          theme.fontFaces.helveticaNeueLight
                        }
                        
                        letterSpacing={0.5}
                        display={{
                          lg: "none",
                          md: "none",
                          sm: "block",
                          xs: "block",
                          xxs: "block",
                        }}
                        top={"50%!important"}
                      >
                        {parse(
                          typeof childItem?.SC_MORE === "string" &&
                            childItem?.SC_MORE.length > 80
                            ? `${h1Content?.description.slice(0, 80)}...`
                            : h1Content?.description || ""
                        )}
                        {childItem?.SC_MORE?.length > 80 && (
                          <Typography
                            component="span"
                            color={(theme) => theme.palette.primary[200]}
                            fontFamily={(theme) =>
                              theme.fontFaces.helveticaNeueLight
                            }
                            letterSpacing=".54px"
                            sx={{ cursor: "pointer", fontWeight: 400, pl: 1 }}
                            variant="typography14"
                            display="inline-block"
                            onClick={() => {
                              setSelectedItem(h1Content);
                              setOpen(!open);
                            }}
                          >
                            {translate("ReadMore")}
                          </Typography>
                        )}
                      </Typography>
                    </CardContent>
                  )}
                </SwiperSlide>
              );
            })}
        </Swiper>
      </Box>

      <BannerDialog
        open={open}
        handleOpenClose={handleOpenClose}
        firstData={selectedItem}
      />
    </>
  );
};

export default Banner;
