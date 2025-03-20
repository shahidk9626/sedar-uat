import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import PointsPayPayment from "./PointsPayPayment";

const RedeemPoints = () => {
  return (
    <>
      <Stack divider={<Divider orientation="horizontal" />} spacing={1.5}>
        <PointsPayPayment />
      </Stack>
    </>
  );
};

export default RedeemPoints;
