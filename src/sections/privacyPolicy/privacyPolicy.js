import { PrivacyPolicyDetails } from "@/styles/privacyPolicy";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";

const PrivacyPolicy = ({ data = {} }) => {

  return (
    <Box my={5}>
      <Container sx={{ pb: 10 }}>
        <Grid container>
          <Grid item xs={12}>
            <PrivacyPolicyDetails
              component="div"
              dangerouslySetInnerHTML={{
                __html: data?.PARENT?.description,
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

PrivacyPolicy.propTypes = {
  data: PropTypes.object,
};

export default PrivacyPolicy;
