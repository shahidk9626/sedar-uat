import {
  FreeConsultationButton,
  FreeConsultationCheckList,
  FreeConsultationHeading,
  FreeConsultationListItem,
} from "@/styles/freeConsultation";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import ScrollInto from "react-scroll-into-view";

const Content = ({ data = {} }) => {
  return (
    <Box component="div">
      <Container maxWidth="xl">
        <Grid container spacing={2} my={4}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Box component="div">
              <FreeConsultationHeading
                component="div"
                dangerouslySetInnerHTML={{
                  __html: data?.PARENT?.CHILD[0]?.description,
                }}
                sx={{
                  "& p": {
                    paddingLeft: {
                      lg: "30px",
                      md: "30px",
                      sm: "0px",
                      xs: "0px",
                      xxs: "0px",
                    },
                    color: "common.black"
                  },
                }}
              />
            </Box>

            <Box
              mt={5}
              component="div"
              mb={{ lg: 0, md: 0, sm: 2, xs: 2, xxs: 2 }}
            >
              <ScrollInto selector="#scrollConsultation">
                <FreeConsultationButton
                  fullWidth
                  variant="contained"
                  color="warning"
                  sx={{
                    px: { md: "3rem", sm: "2.5rem", xs: "2rem", xxs: "2rem" },
                    py: "0.82rem",
                    marginLeft: {
                      lg: "30px",
                      md: "30px",
                      sm: "0",
                      xs: "0",
                      xxs: "0",
                    },
                    maxWidth: {
                      lg: "300px",
                      md: "300px",
                      sm: "100%",
                      xs: "100%",
                      xxs: "100%",
                    },
                    bgcolor: (theme) => theme.palette.primary.lighter,
                    "&:hover": {
                      color: (theme) => theme.palette.common.white,
                      backgroundColor: (theme) => theme.palette.warning.dark,
                    },
                  }}
                >
                  {data?.PARENT?.CHILD[0]?.link_title}
                </FreeConsultationButton>
              </ScrollInto>
            </Box>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Box pl={4}>
              <Typography
                component="div"
                variant="typography45"
                fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                letterSpacing=".54px"
                color="common.black"
              >
                {data?.PARENT?.CHILD[1]?.title}
              </Typography>
              <List>
                <ListItem disablePadding>
                  <FreeConsultationListItem>
                    <FreeConsultationCheckList
                      component="div"
                      dangerouslySetInnerHTML={{
                        __html: data?.PARENT?.CHILD[1]?.description,
                      }}
                    />
                  </FreeConsultationListItem>
                </ListItem>
              </List>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

Content.propTypes = {
  data: PropTypes.object,
};


export default Content;
