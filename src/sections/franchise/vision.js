import { FranchiseHeading, FranchiseText } from "@/styles/franchise";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";

const Vision = ({ data = {} }) => {

  return (
    <Container maxWidth="xl">
      <Grid container py={4}>
        <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
          <FranchiseHeading
            component="div"
            mr={20}
            sx={{
              mr: { lg: 20, md: 10, sm: 0, xs: 0, xxs: 0 },
              "& p": {
                ml: 4,
              },
            }}
            dangerouslySetInnerHTML={{
              __html: data?.PARENT?.CHILD?.[0]?.description,
            }}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
          <FranchiseText
            component="div"
            dangerouslySetInnerHTML={{
              __html: data?.PARENT?.CHILD?.[1]?.description,
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

Vision.propTypes = {
  data: PropTypes.object,
};

export default Vision;
