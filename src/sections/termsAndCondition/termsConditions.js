import { TermsAndConditionDetails } from "@/styles/termsAndConditions";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";

const TermsConditions = ({ data = {} }) => {
  return (
    <>
      <Container>
        <Grid container>
          <Grid item xs={12} mb={6}>
            <TermsAndConditionDetails
              component="div"
              dangerouslySetInnerHTML={{
                __html: data?.PARENT?.CHILD?.[0]?.description,
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

TermsConditions.propTypes = {
  data: PropTypes.object,
};

export default TermsConditions;
