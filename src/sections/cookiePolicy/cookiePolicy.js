import { CookiePolicyDetails } from "@/styles/cookiePolicy";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";

const CookiePolicy = ({ data = [] }) => {
  return (
    <>
      <Container sx={{ pb: 10, pt: 5 }}>
        <Grid container>
          <Grid item xs={12}>
            <CookiePolicyDetails
              component="div"
              dangerouslySetInnerHTML={{
                __html: data?.PARENT?.description,
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

CookiePolicy.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default CookiePolicy;
