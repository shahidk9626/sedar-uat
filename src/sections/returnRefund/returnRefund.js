import { ReturnRefundDetails } from "@/styles/returnRefund";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";

const ReturnRefund = ({ data = {} }) => {
  return (
    <Container sx={{ pb: 10 }} maxWidth="xl">
      <Grid container>
        <Grid item xs={12}>
          <ReturnRefundDetails
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

ReturnRefund.propTypes = {
  data: PropTypes.object,
};

export default ReturnRefund;
