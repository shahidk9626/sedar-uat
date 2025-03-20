import { AccessibilityDetails } from "@/styles/accessibility";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";

const Accessibility = ({ data = {} }) => {
  return (
    <Container sx={{ pt: { lg: 3, md: 3, sm: 0, xs: 0, xxs: 0 }, pb: 10 }}>
      <Grid container>
        <Grid item xs={12}>
          <AccessibilityDetails
            component="div"
            dangerouslySetInnerHTML={{
              __html: data?.PARENT?.description,
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

Accessibility.propTypes = {
  data: PropTypes.object,
};

export default Accessibility;
