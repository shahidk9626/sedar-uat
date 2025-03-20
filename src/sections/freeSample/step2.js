import Iconify from "@/components/iconify/Iconify";
import NextLazyFillImage from "@/components/image/nextLazyFillLoadImage";
import { FreeSampleSteps, FreeSampleStepsTitle } from "@/styles/freeSample";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import ScrollInto from "react-scroll-into-view";

const Step2 = ({ freeSampleProducts }) => {
  const router = useRouter();
  const { t: translate } = useTranslation();
  const handleProductClick = (elem) => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          slug_url: elem.link_url,
          sub_category: router.query.sub_category || "",
          category: router.query.category || "",
          product: elem.item_code,
          productId: router.query.productId || "",
        },
        shallow: true,
      },
      undefined,
      { scroll: false }
    );
  };

  return (
    <Container maxWidth="xl">
      <Box py={8}>
        <Divider />
        <Box py={2}>
          <FreeSampleSteps>{translate("STEP2")}</FreeSampleSteps>
          <FreeSampleStepsTitle id="SelectModelOf">
            {translate("SELECTMODELOFROLLERSHADES", {
              itemName: freeSampleProducts?.link_url?.toUpperCase(),
            })}
          </FreeSampleStepsTitle>
        </Box>
        <Divider />
      </Box>
      <Grid container spacing={3}>
        {freeSampleProducts?.product?.map((elem, index) => (
          <Grid
            item
            md={3}
            sm={3}
            xs={6}
            xxs={6}
            key={`FREE_SAMPLE_STEP_TWO-${index}`}
          >
            <ScrollInto selector="#OrderYourDesiredSample">
              <Box
                sx={{
                  position: "relative",
                  cursor: "pointer",
                }}
                onClick={() => handleProductClick(elem)}
              >
                <NextLazyFillImage
                  src={elem?.image_path}
                  objectFit="cover"
                  sx={{
                    width: "100%!important",
                    height: "100%!important",
                    objectFit: "cover",
                  }}
                  width={293}
                  height={322}
                  upLgWidth={293}
                  downLgWidth={293}
                  downMdWidth={293}
                  downSmWidth={163}
                  downXsWidth={170}
                  alt={elem?.image_path}
                  sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                  aspectRatio="293 / 322"
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
                    backgroundColor: "rgba(0,0,0,.64)",
                    opacity: elem?.item_code == router.query.product ? 1 : 0,
                    "&:hover": {
                      opacity: "1",
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <Box
                      sx={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: "common.white",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Iconify
                        icon="iconamoon:check-bold"
                        width={25}
                        color="primary.main"
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </ScrollInto>
            <Box my={2}>
              <Typography
                component="h3"
                variant="typography17"
                sx={(theme) => ({
                  fontFamily: theme.fontFaces.helveticaNeueMedium,
                  color: theme.palette.common.black,
                  letterSpacing: 0.5,
                  fontWeight: 500,
                })}
              >
                {elem?.desc}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Step2;
