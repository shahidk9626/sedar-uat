import CustomBreadCrumb from "@/components/breadCrumb";
import Iconify from "@/components/iconify";
import { CustomLink } from "@/components/link";
import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import { useState } from "react";
import TabMagzine from "./tabMagzine";

const TipsAndThreads = ({ data = [] }) => {
  const [value, setValue] = useState(0);
  
  return (
    <Box pb={10} mt={{ md: 5, sm: 2, xs: 2, xxs: 2 }}>
      <TabContext value={value}>
        <Container maxWidth="lg">
          <Grid container rowSpacing={{ md: 4, sm: 0, xs: 0, xxs: 0 }}>
            <Grid item md={12} sm={12} xs={12} xxs={12}>
              <CustomBreadCrumb
                boxSx={{ paddingTop: "0px" }}
                data={data?.PARENT?.breadcrumbs}
              />
            </Grid>
            <Grid item md={4} sm={12} xs={12} xxs={12}>
              <Box
                sx={{
                  display: {
                    lg: "block",
                    md: "block",
                    sm: "none",
                    xs: "none",
                    xxs: "none",
                  },
                }}
              >
                <Typography
                  component="p"
                  sx={(theme) => ({
                    pl: 3,
                    letterSpacing: 0,
                    ...theme.typography.typography43,
                    fontWeight: "normal",
                    fontFamily: theme.fontFaces.helveticaNeueMedium,
                    borderLeft: `2px solid ${theme.palette.primary.light}`,
                    color: theme.palette.common.black,
                    m: 0,
                    mb: 0,
                  })}
                >
                  {data?.PARENT?.title}
                </Typography>
              </Box>
            </Grid>
            <Grid item md={8} sm={12} xs={12} xxs={12}>
              <Stack
                mt={2}
                mb={2}
                alignItems="center"
                divider={<Divider orientation="vertical" flexItem />}
                direction="row"
                justifyContent={{
                  lg: "right",
                  md: "right",
                  sm: "center",
                  xs: "center",
                  xxs: "center",
                }}
                spacing={3}
                flexWrap="wrap"
              >
                <Typography
                  component={CustomLink}
                  sx={{
                    fontSize: "18px",
                    fontFamily: (theme) => theme.fontFaces.helveticaNeue,
                    color: "common.black",
                  }}
                  href="/blog"
                >
                  All
                </Typography>

                {data?.PARENT?.CHILD &&
                  data?.PARENT?.CHILD?.length > 0 &&
                  data?.PARENT?.CHILD?.map((elem, index) => (
                    <Typography
                      key={`CARD_TAB-${index}`}
                      component={CustomLink}
                      sx={{
                        fontSize: "18px",
                        fontFamily: (theme) => theme.fontFaces.helveticaNeue,
                        color: "common.black",
                      }}
                      href={`blog/${elem?.link_url}`}
                    >
                      {" "}
                      {elem?.title}
                    </Typography>
                  ))}
                <Box
                  component="div"
                  sx={{
                    display: {
                      md: "block",
                      sm: "none",
                      xs: "none",
                      xxs: "none",
                    },
                  }}
                >
                  <Iconify
                    icon="teenyicons:search-outline"
                    sx={(theme) => ({
                      ...theme.typography.typography32,
                    })}
                  />
                </Box>
              </Stack>
            </Grid>
            <Grid item md={12} sm={12} xs={12} xxs={12}>
              <Box>
                <TabMagzine data={data?.PARENT} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </TabContext>
    </Box>
  );
};

TipsAndThreads.propTypes = {
  data: PropTypes.array,
};

export default TipsAndThreads;
