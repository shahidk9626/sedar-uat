import { BrandsProductionHeading, BrandsProductionText } from "@/styles/brands";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";

const Production = ({ data = {} }) => {
  return (
    <>
      <Container maxWidth="xl">
        <Grid
          container
          p={{ lg: 4, md: 4, sm: 0, xs: 0, xxs: 0 }}
          mt={5}
          spacing={4}
        >
          <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
            <BrandsProductionHeading component="div">
              {data?.PARENT?.CHILD?.[0]?.title}
            </BrandsProductionHeading>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
            <BrandsProductionText
              component="div"
              dangerouslySetInnerHTML={{
                __html: data?.PARENT?.CHILD[0]?.description,
              }}
              sx={{
                "& p": {
                  color: (theme) => theme.palette.dark.darker,
                  margin: 0,
                },
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

Production.propTypes = {
  data: PropTypes.object,
};

export default Production;
