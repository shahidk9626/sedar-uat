import { CustomLink } from "@/components/link";
import SnackbarProvider from "@/components/snackbar";
import ProductGridModule from "@/modules/product";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";

const SwiperCard = ({ offerData }) => {
  const { t: translate } = useTranslation();
  return (
    <>
      {offerData &&
        offerData?.length > 0 &&
        offerData?.map((item, index) => (
          <Container maxWidth="xl" key={`SWIPERSLIDE_HOVER-${index}`}>
            <Box mt={5} mb={1}>
              <Stack direction="row" justifyContent="space-between">
                <Box sx={{width:"80%"}}>
                  <Typography
                    variant="h4"
                    component="h4"
                    fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                  >
                    {item?.title}
                  </Typography>

                  <Typography
                    variant="body1"
                    component="p"
                    fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                    sx={{ whiteSpace: "pre-line" }} 
                    dangerouslySetInnerHTML={{ __html: item?.description }} 
                  />
                </Box>
                {item?.link_url &&
                  <CustomLink link={item?.link_url} target="_black">
                    <Typography
                      component='p'
                      sx={(theme) => ({
                        border: '2px solid',
                        pl: 1,
                        pr: 1,
                        pt: 0.5,
                        pb: 0.5,
                        borderColor: theme.palette.grey[2700],
                        color: theme.palette.grey[2700],
                        fontFamily: theme.fontFaces.helveticaNeueLight,
                        ":hover": {
                          borderColor: theme.palette.grey[2700],
                          backgroundColor: theme.palette.primary.main,
                          color: theme.palette.common.white,
                        },
                      })}
                    >
                      {item?.link_title || translate("View_All")}
                    </Typography>
                  </CustomLink>
                }
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
                  type="offers"
                  offerKey={index}
                  offerData={offerData || []}
                />
              </Box>
            </SnackbarProvider>
          </Container>
        ))}
    </>
  );
};

SwiperCard.propTypes = {
  offerData: PropTypes.array,
};

export default SwiperCard;
