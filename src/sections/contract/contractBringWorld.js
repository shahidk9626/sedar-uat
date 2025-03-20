import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import {
  ContractBringWorldHeading,
  ContractBringWorldText,
} from "@/styles/contracts";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import ScrollInto from "react-scroll-into-view";

const ContractBringWorld = ({ data = [] }) => {
  console.log(data,'contract data');
  return (
    <Box sx={{ backgroundColor: (theme) => theme.palette.grey[2900], py: 5 }}>
      <Container maxWidth="xl">
        <Grid container spacing={{ md: 8, sm: 0, xs: 0, xxs: 0 }}>
          <Grid item md={6} sm={12} xs={12} xxs={12}>
            <Box>
              <ContractBringWorldHeading
                sx={{
                  width: {
                    lg: "80%!important",
                    md: "80%!important",
                    sm: "100%!important",
                    xs: "100%!important",
                    xxs: "100%!important",
                  },
                  fontSize: {
                    lg: "5vh",
                    md: "5vh",
                    sm: "3vh",
                    xs: "3vh",
                    xxs: "3vh",
                  },
                }}
                fontWeight= "bold"
                marginTop="10%"
                component="h1"
                borderLeft={(theme) =>
                  `2px solid ${theme.palette.primary.light}`
                }
                pl={2}
                dangerouslySetInnerHTML={{
                  __html:
                    data?.PARENT?.CHILD?.[0]?.title ||
                    data?.PARENT?.title,
                }}
              />
            </Box>
            <Box pl={{ md: 8, sm: 0, xs: 0, xxs: 0 }} mt={5}>
              <NextLazyLoadImage
                src={data?.PARENT?.[0]?.image_path || data?.PARENT?.image_path}
                alt={data?.PARENT?.[0]?.image_path || data?.PARENT?.image_path}
                width={514}
                height={525}
                sx={{
                  width: "100%!important",
                  height: "100%!important",
                  objectFit: "cover!important",
                }}
                sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
                objectFit="contain"
                upLgWidth={514}
                downLgWidth={514}
                downMdWidth={514}
                downSmWidth={778}
                downXsWidth={489}
              />
            </Box>
          </Grid>
          <Grid item md={6} sm={12} xs={12} xxs={12}>
            <Box mt={8}>
              <ContractBringWorldText
                component="div"
                dangerouslySetInnerHTML={{
                  __html:
                    data?.PARENT?.CHILD?.[1]?.description ||
                    data?.PARENT?.description,
                }}
              />
              <Box sx={{ maxWidth: "100%", mt: 4 }}>
                <ScrollInto selector="#StartProjectContract">
                  <Button
                    variant="contained"
                    sx={(theme) => ({
                      fontFamily: theme.fontFaces.helveticaNeueBold,
                      fontSize: "15px",
                      color: theme.palette.common.black,
                      borderRadius: "0px",
                      py: 1.5,
                      width: {
                        md: "300px",
                        sm: "100%",
                        xs: "100%",
                        xxs: "100%",
                      },
                      backgroundColor: theme.palette.primary.lighter,
                      "&:hover": {
                        backgroundColor: theme.palette.warning.dark,
                        color: theme.palette.common.white,
                      },
                      fontWeight: 200,
                    })}
                  >
                    {data?.PARENT?.CHILD?.[1]?.link_title ||
                      data?.PARENT?.link_title}
                  </Button>
                </ScrollInto>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

ContractBringWorld.propTypes = {
  data: PropTypes.array,
};

export default ContractBringWorld;
