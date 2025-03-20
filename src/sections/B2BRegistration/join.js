import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

const Join = ({ data = {} }) => {
  return (
    <>
      <Container maxWidth="xl">
        <Box my={{ lg: 10, md: 10, sm: 2, xs: 2, xxs: 2 }}>
          <Grid container>
            <Grid item lg={7} md={7} sm={6}>
              <Typography
                component="div"
                dangerouslySetInnerHTML={{
                  __html: data?.CHILD?.[0]?.description,
                }}
                sx={(theme) => ({
                  "& h1": {
                    ...theme.typography.typography39,
                    letterSpacing: 0.5,
                    fontWeight: 400,
                    borderLeft: `2px solid ${theme.palette.primary.light}`,
                    paddingLeft: "30px",
                    fontFamily: theme.fontFaces.helveticaNeueMedium,
                    marginBlockStart: "8px!important",
                    marginBlockEnd: "8px!important",
                    color: "common.black",
                  },
                })}
              />
              <Typography
                py={3}
                component="div"
                dangerouslySetInnerHTML={{
                  __html: data?.CHILD?.[1]?.description,
                }}
                sx={(theme) => ({
                  "& p": {
                    ...theme.typography.typography18,
                    letterSpacing: 0.5,
                    fontWeight: 400,
                    fontFamily: theme.fontFaces.helveticaNeueLight,
                    marginBlockStart: "8px!important",
                    marginBlockEnd: "8px!important",
                    color: "common.black",
                  },
                })}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

Join.propTypes = {  
  data: PropTypes.object,
};

export default Join;
