import SnackbarProvider from "@/components/snackbar";
import ProductGridModule from "@/modules/product";
import { useSelector } from "@/redux/store";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";


const SwiperCard = () => {
  const { curtainAndBlind = [] } = useSelector(
    (state) => state.curtainAndBlind
  );
  return (
    <>
      {curtainAndBlind &&
        curtainAndBlind?.length > 0 &&
        curtainAndBlind?.map((item, index) => (
          <Container maxWidth="xl" key={`SWIPERSLIDE_HOVER-${index}`}>
            <Box mt={5} mb={1}>
              <Stack direction="row" justifyContent="space-between">
                <Typography
                  variant="h4"
                  component="div"
                  fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
                >
                  {item?.title}
                </Typography>
                <Button
                  variant="outlined"
                  sx={(theme) => ({
                    fontFamily: theme.fontFaces.helveticaNeueMedium,
                    borderColor: theme.palette.grey[2700],
                    color: theme.palette.grey[2700],
                    ":hover": {
                      borderColor: theme.palette.grey[2700],
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.common.white,
                    },
                  })}
                >
                  {item?.link_title}
                </Button>
              </Stack>
            </Box>

            <SnackbarProvider>
              <Box sx={{ position: "relative" }} component="div">
                <ProductGridModule
                  materialData={
                    item?.CHILD && item?.CHILD && item?.CHILD?.length > 0
                      ? item?.CHILD
                      : []
                  }
                  offerData={
                    (curtainAndBlind &&
                      curtainAndBlind?.length > 0 &&
                      curtainAndBlind) ||
                    []
                  }
                  offerKey={index}
                  type="offers"
                />
              </Box>
            </SnackbarProvider>
          </Container>
        ))}
    </>
  );
};

SwiperCard.propTypes = {
  curtainAndBlind: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default SwiperCard;
