import NextLazyFillImage from "@/components/image/nextLazyFillLoadImage";
import { FreeSampleSteps, FreeSampleStepsTitle } from "@/styles/freeSample";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import ScrollInto from "react-scroll-into-view";

const Step1 = ({ freeSampleCategory }) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const handleClick = (e, item) => {
    e.preventDefault();
    const { product, id, parent_category, link_url } = item;
    router.push(
      {
        pathname: router.pathname,
        query: {
          slug_url: product?.[0]?.link_url,
          sub_category: link_url,
          productId: id,
          category: parent_category,
          product: product?.[0]?.item_code,
        },
        shallow: true,
      },
      undefined,
      { scroll: false }
    );
  };

  // Memoize translated texts
  const translatedTexts = useMemo(
    () => ({
      step1: translate("STEP1"),
      chooseAProduct: translate("CHOOSEAPRODUCT"),
      explore: translate("Explore"),
    }),
    [translate]
  );

  return (
    <Container maxWidth="xl">
      <Box pt={8} pb={3}>
        <Divider />
        <Box py={2}>
          <FreeSampleSteps>{translatedTexts.step1}</FreeSampleSteps>
          <FreeSampleStepsTitle>
            {translatedTexts.chooseAProduct}
          </FreeSampleStepsTitle>
        </Box>
        <Divider />
      </Box>
      <Grid container spacing={3}>
        {freeSampleCategory &&
          (freeSampleCategory?.result || [])?.map((item, index) => (
            <Grid
              item
              lg={3}
              md={3}
              sm={6}
              xs={6}
              xxs={6}
              key={`CATEGORY_FREE_SAMPLE${index}`}
            >
              <ScrollInto selector="#SelectModelOf">
                <Box
                  component="div"
                  onClick={(e) => handleClick(e, item)}
                  sx={{ cursor: "pointer" }}
                >
                  <Box
                    component="div"
                    sx={{ position: "relative", width: "100%", height: "100%" }}
                  >
                    <NextLazyFillImage
                      src={item.image_path}
                      objectFit="cover"
                      sx={{
                        width: "100%!important",
                        height: "100%!important",
                        objectFit: "cover",
                      }}
                      width={1400}
                      height={1400}
                      upLgWidth={1400}
                      downLgWidth={1400}
                      downMdWidth={1400}
                      downSmWidth={200}
                      downXsWidth={200}
                      alt={item.image_path}
                      sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                      aspectRatio="15 / 8"
                    />
                    <Box
                      sx={{
                        transition: ".5s ease",
                        opacity: "0",
                        position: "absolute",
                        top: "0",
                        left: "0",
                        right: "0",
                        bottom: "0",
                        textAlign: "center",
                        backgroundColor: "rgba(0,0,0,.78)",
                        "&:hover": {
                          opacity: "1",
                        },
                      }}
                    >
                      <ScrollInto selector="#SelectModelOf">
                        <Box
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%,-50%)",
                          }}
                        >
                          <Button
                            onClick={(e) => handleClick(e, item)}
                            variant="contained"
                            sx={{
                              borderRadius: "0",
                              fontFamily: (theme) =>
                                theme.fontFaces.helveticaNeueLight,
                              letterSpacing: 0.5,
                            }}
                          >
                            {translatedTexts.explore}
                          </Button>
                        </Box>
                      </ScrollInto>
                    </Box>
                  </Box>
                  <Typography
                    mt={2}
                    component="p"
                    variant="typography17"
                    sx={(theme) => ({
                      fontFamily: theme.fontFaces.helveticaNeueMedium,
                      color: theme.palette.common.black,
                      letterSpacing: 0.5,
                      fontWeight: 500,
                    })}
                  >
                    {item?.desc}
                  </Typography>
                </Box>
              </ScrollInto>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default React.memo(Step1);
