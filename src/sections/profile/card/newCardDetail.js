import { useAuthContext } from "@/auth/useAuthContext";
import { CustomLink } from "@/components/link";
import { useDispatch } from "@/redux/store";
import { CardSaveCardTitles } from "@/styles/auth";
import { apiDataService } from "@/utils/apiDataService";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useState } from "react";

const NewCardDetail = ({ data, getCardPayment }) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const router = useRouter();
  const { locale } = router;
  const { t: translate } = useTranslation();
  const { state } = useAuthContext();
  const { cookies } = state;
  const { JWTAuthToken, user } = cookies || {};

  const [cardDelete, setCardDelete] = useState({
    open: false,
    data: null,
  });

  const handleCardDetailOpen = (data) => {
    setCardDelete({ open: true, data: data });
  };

  const handleCardDetailClose = () => {
    setCardDelete({ open: false });
  };

  const deleteCard = async (data) => {
    await dispatch(
      apiDataService.Delete(`dashboard/customerCard/${data?.SCC_SYS_ID}`, {
        cust_user_id: user?.cust_email_id,
        auth_token: JWTAuthToken,
      })
    )
      .then((response) => {
        if (response?.status === 200) {
          enqueueSnackbar(response?.data?.error_message, {
            variant: "success",
            autoHideDuration: 4000
          });
          handleCardDetailClose();
          if (user) {
            getCardPayment({
              cust_user_id: user?.cust_email_id,
              auth_token: JWTAuthToken,
            });
          }
        }
      })
      .catch((error) => {
        console.log(`${translate("SomethingWentWrong")}`, error);
      });
  };
  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <Grid
        container
        spacing={5}
        pl={{ lg: 3, md: 3, sm: 6, xs: 0, xxs: 0 }}
        pr={{ lg: 3, md: 3, sm: 6, xs: 0, xxs: 0 }}
      >
        {data &&
          data?.result &&
          data?.result?.length > 0 &&
          data.result.map((item, index) => (
            <Grid
              item
              lg={6}
              md={6}
              sm={12}
              xs={12}
              xxs={12}
              key={`BANK-CARD-${index}`}
            >
              <Card
                variant="outlined"
                sx={{
                  borderRadius: "5px",
                  border: "2px solid lightgrey",
                  opacity: item?.SCC_ACTIVE_YN == "Y" ? 1 : 0.5,
                }}
              >
                <CardContent>
                  <Box
                    component="abbr"
                    sx={{
                      textDecoration: "none !important",
                    }}
                    title={
                      item?.SCC_ACTIVE_YN == "Y"
                        ? "This card is active"
                        : "This card is inactive"
                    }
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box>
                        <Typography
                          sx={(theme) => ({
                            fontFamily: theme.fontFaces.helveticaNeueRegular,
                            fontSize: theme.typography.typography16,
                            fontWeight: 600,
                          })}
                        >
                          {item?.SCC_BANK_NAME}
                        </Typography>
                      </Box>
                    </Stack>
                    <Box my={2}>
                      <CardSaveCardTitles pt={1}>
                        {translate("Debit_Credit_Card_Number")}
                      </CardSaveCardTitles>
                      <Typography
                        pt={0.2}
                        sx={(theme) => ({
                          fontFamily: theme.fontFaces.helveticaNeueBold,
                          fontSize: theme.typography.typography24,
                          fontWeight: 200,
                          color: theme.palette.grey[6400],
                        })}
                      >
                        {item?.SCC_CARD_NUMBER}
                      </Typography>
                    </Box>
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Box>
                        <CardSaveCardTitles pt={1}>
                          {translate("Name_On_card")}
                        </CardSaveCardTitles>
                        <Typography
                          pt={0.2}
                          sx={(theme) => ({
                            fontFamily: theme.fontFaces.helveticaNeueBold,
                            fontSize: theme.typography.typography24,
                            fontWeight: 200,
                            color: theme.palette.grey[6400],
                          })}
                        >
                          {item?.SCC_CARD_HOLDER}
                        </Typography>
                      </Box>
                      <Box>
                        <CardSaveCardTitles pt={1}>
                          {translate("Validity")}
                        </CardSaveCardTitles>
                        <Typography
                          pt={0.2}
                          sx={(theme) => ({
                            fontFamily: theme.fontFaces.helveticaNeueBold,
                            fontSize: theme.typography.typography24,
                            fontWeight: 200,
                            color: theme.palette.grey[6400],
                          })}
                        >
                          {item?.SCC_EXP_MONTH}/{item?.SCC_EXP_YEAR}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                </CardContent>
              </Card>
              <Stack
                direction={"row"}
                spacing={6}
                textAlign="center!important"
                display="block"
                pt={2}
              >
                <Button
                  onClick={() =>
                    router.push(
                      `/${locale}/dashboard/card/form/${item?.SCC_SYS_ID}`
                    )
                  }
                  variant="outlined"
                  color="dark"
                  sx={(theme) => ({
                    width: "32%",
                    fontFamily: theme.fontFaces.helveticaNeueBold,
                    fontSize: theme.typography.typography24,
                    color: theme.palette.common.black,
                    fontWeight: 200,
                    py: 0.8,
                    px: 6,
                    borderRadius: "2px",
                    "&:hover": {
                      background: "none",
                      borderColor: (theme) => theme.palette.grey[7100],
                    },
                  })}
                  size="large"
                >
                  {translate("Edit")}
                </Button>
                <Button
                  onClick={() => handleCardDetailOpen(item)}
                  variant="outlined"
                  color="dark"
                  sx={(theme) => ({
                    fontFamily: theme.fontFaces.helveticaNeueBold,
                    fontSize: theme.typography.typography24,
                    color: theme.palette.common.black,
                    fontWeight: 200,
                    py: 0.8,
                    px: 6,
                    borderRadius: "2px",
                    "&:hover": {
                      background: "none",
                      borderColor: (theme) => theme.palette.grey[7100],
                    },
                  })}
                  size="large"
                >
                  {translate("Remove")}
                </Button>
              </Stack>
            </Grid>
          ))}
      </Grid>
      <Box m={4} mb={4}>
        <CustomLink link="/dashboard/card/form/add" lang={locale}>
          <Button
            variant="contained"
            color="warning"
            sx={(theme) => ({
              py: 1.8,
              borderRadius: "0px",
              width: {
                lg: "30%",
                md: "30%",
                sm: "100%",
                xs: "100%",
                xxs: "100%",
              },
              ...theme.typography.typography16,
              fontFamily: theme.fontFaces.helveticaNeueBold,
              "&:hover": { background: (theme) => theme.palette.primary.light },
            })}
          >
            {translate("AddCards")}
          </Button>
        </CustomLink>
      </Box>
      <Dialog
        open={cardDelete.open}
        onClose={handleCardDetailClose}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "8px",
          },
        }}
      >
        <DialogContent sx={{ p: 8 }}>
          <Typography
            mb={2}
            letterSpacing={0.5}
            textAlign="center"
            sx={(theme) => ({
              fontSize: theme.typography.typography16,
              fontFamily: theme.fontFaces.helveticaNeue,
              color: theme.palette.grey[8000],
              lineHeight: "40px",
            })}
          >
            {translate("AreyousureremovethisCard")}
          </Typography>
          <Stack
            direction={{
              lg: "row",
              md: "row",
              sm: "column",
              xs: "column",
              xxs: "column",
            }}
            spacing={2}
            justifyContent="center"
            my={4}
          >
            <Button
              fullWidth
              variant="contained"
              size="medium"
              onClick={handleCardDetailClose}
              sx={{
                fontFamily: (theme) => theme.fontFaces.helveticaNeueBold,
                fontWeight: 200,
                backgroundColor: (theme) => theme.palette.common.black,
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.common.black,
                },
              }}
            >
              {translate("Cancel")}
            </Button>
            <Button
              fullWidth
              variant="contained"
              size="medium"
              onClick={() => deleteCard(cardDelete?.data)}
              sx={{
                fontFamily: (theme) => theme.fontFaces.helveticaNeueBold,
                fontWeight: 200,
                backgroundColor: (theme) => theme.palette.common.black,
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.common.black,
                },
              }}
            >
              {translate("Delete")}
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </Container>
  );
};
export default NewCardDetail;
