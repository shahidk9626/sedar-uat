import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import { CustomLink } from "@/components/link";
import {
  ContractsExploreProject,
  ContractsExploreProjectViewAll,
} from "@/styles/contracts";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import NextLink from "next/link";
import PropTypes from "prop-types";

const ExploreProjectSection = ({ data = [] }) => {
  const { t: translate } = useTranslation();
  return (
    <ContractsExploreProject py={6}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {data?.PARENT?.CHILD?.map((elem, index) => {
            return (
              <Grid
                item
                md={6}
                sm={6}
                xs={6}
                xxs={6}
                key={`PROJECT_EXPLORE-${index}`}
              >
                <Box py={2}>
                  <Box>
                    <NextLazyLoadImage
                      src={elem?.image_path}
                      alt={elem?.image_path}
                      width={594}
                      height={697}
                      sx={{
                        width: "100%!important",
                        height: "100%!important",
                        objectFit: "cover!important",
                      }}
                      sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
                      objectFit="contain"
                      upLgWidth={594}
                      downLgWidth={594}
                      downMdWidth={594}
                      downSmWidth={248}
                      downXsWidth={230}
                    />
                  </Box>
                  <Box mt={2}>
                    <Box mb={1}>
                      <Typography
                        component="div"
                        sx={(theme) => ({
                          fontFamily:
                            theme.fontFaces.helveticaNeue,
                          color: theme.palette.common.black,

                        })}

                        fontSize={{
                          lg: "18px",
                          md: "18px",
                          sm: "16px",
                          xs: "16px",
                          xxs: "16px",
                        }}
                        lineHeight={{
                          lg: "25px",
                          md: "25px",
                          sm: "20px",
                          xs: "20px",
                          xxs: "20px",
                        }}
                        fontWeight={{
                          lg: "400",
                          md: "400",
                          sm: "600",
                          xs: "600",
                          xxs: "600",
                        }}
                      >
                        {elem?.title}
                      </Typography>
                    </Box>
                    <Box>
                      <Link
                        component={NextLink}
                        href={`/contracts/${elem?.link_url}`}
                        sx={{
                          textDecoration: "none",
                          color: "inherit",
                          "&:hover": { textDecoration: "none" },
                        }}
                      >
                        <ContractsExploreProjectViewAll component="span">
                          {translate(elem?.link_title)}
                        </ContractsExploreProjectViewAll>
                      </Link>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            );
          })}
          <Grid
            item
            lg={6}
            md={6}
            sm={4}
            xs={6}
            xxs={6}
            sx={{ textAlign: "center" }}
          >
            <Stack
              width="100%"
              height={{
                lg: "100vh",
                md: "100vh",
                sm: "40vh",
                xs: "40vh",
                xxs: "40vh",
              }}
              alignItems="center"
              justifyContent="center"
            >
              <CustomLink link={data?.PARENT.link_url ? data?.PARENT.link_url : '/contracts'}>
                {/* <ContractsExploreProjectViewAll component="span">
                  {data?.PARENT.link_title ? data?.PARENT.link_title :
                    translate("ViewAllCategories")}
                </ContractsExploreProjectViewAll> */}
              </CustomLink>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </ContractsExploreProject>
  );
};

ExploreProjectSection.propTypes = {
  data: PropTypes.array,
};


export default ExploreProjectSection;
