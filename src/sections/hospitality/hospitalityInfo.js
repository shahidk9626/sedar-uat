import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

const HospitalityInfo = ({ data = [] }) => {
  console.log('hospitality info',data);
  const router = useRouter();
  return (
    <>
      <Container maxWidth="xl">
        <Box py={5}>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <Box
                sx={{
                  borderLeft: (theme) =>
                    `2px solid ${theme.palette.primary.light}`,
                  pl: 3,
                }}
              >
                <Typography
                  sx={(theme) => ({
                    ...theme.typography.typography39,
                    lineHeight: {
                      lg: "49px",
                      md: "49px",
                      sm: "normal",
                      xs: "normal",
                      xxs: "normal",
                    },
                    color: (theme) => theme.palette.common.black,
                    fontFamily: theme.fontFaces.helveticaNeueMedium,
                    mb: 0,
                    width: {
                      lg: "50%",
                      md: "50%",
                      sm: "100%",
                      xs: "100%",
                      xxs: "100%",
                    },
                  })}
                >
                  {data?.PARENT?.title ? data?.PARENT?.title: data?.PARENT?.CHILD?.[0]?.title }
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12} xxs={12}>
              <Box>
                <Typography
                  component="div"
                  dangerouslySetInnerHTML={{
                    __html: data?.PARENT?.CHILD?.[0]?.description ? data?.PARENT?.CHILD?.[0]?.description : data?.PARENT?.description,
                  }}
                  sx={(theme) => ({
                    "& h2": {
                      letterSpacing: 0,
                      ...theme.typography.typography40,
                      fontWeight: "normal",
                      fontFamily: theme.fontFaces.helveticaNeueMedium,
                      mb: 0,
                    },
                    "& p": {
                      ...theme.typography.h6,
                      lineHeight: "31px",
                      letterSpacing: 0,
                      fontWeight: 300,
                      color: (theme) => theme.palette.common.black,
                      fontFamily: theme.fontFaces.helveticaNeueLight,
                      marginBlockStart: "8px!important",
                      marginBlockEnd: "8px!important",
                    },
                  })}
                />
              </Box>
              <Box
                sx={{
                  maxWidth: { md: "40%", sm: "100%", xs: "100%", xxs: "100%" },
                  mt: 3,
                }}
              >
                <Button
                  color="warning"
                  onClick={() => router.push(`/${data?.PARENT?.link_url}`)}
                  variant="contained"
                  fullWidth
                  size="medium"
                  sx={(theme) => ({
                    borderRadius: "0px",
                    py: 1.4,
                    fontSize: 16,
                    ":hover": {
                      color: "common.white",
                    },
                    fontFamily: theme.fontFaces.helveticaNeueBold,
                    color: theme.palette.common.black,
                    ...theme.typography.typography15,
                    fontWeight: 200,
                    backgroundColor: theme.palette.primary.lighter,
                  })}
                >
                  {data?.PARENT?.CHILD?.[0]?.link_title ? data?.PARENT?.CHILD?.[0]?.link_title : data?.PARENT?.link_title}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

HospitalityInfo.propTypes = {
  data: PropTypes.array,
};

export default HospitalityInfo;
