import MuiCustomButton from "@/components/button/customButton";
import { TextBox } from "@/components/form";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import {
  Box,
  Card,
  Checkbox,
  Grid,
  Stack,
  Typography,
  alpha
} from "@mui/material";
import { useTranslation } from "next-i18next";
const SaveCreditCards = ({
  data,
  formik,
  saveCardPayment,
  handleSetSaveCard,
  saveCardData,
}) => {
  const { t: translate } = useTranslation();
  return (
    <>
      <form noValidate onSubmit={formik.handleSubmit}>
        <>
          <Grid container spacing={2}>
            {data &&
              data?.length > 0 &&
              data.map((item, index) => {
                if (item?.SCC_ACTIVE_YN == "Y") {
                  return (
                    <Grid
                      item
                      md={12}
                      sm={12}
                      xs={12}
                      xxs={12}
                      key={`CARD-LIST-SAVE-${index}`}
                    >
                      <Card
                        variant="outlined"
                        key={`SAVE-CARD-${index}`}
                        sx={{
                          borderRadius: "5px",
                          cursor: "pointer",
                          ...(saveCardData?.SCC_SYS_ID === item?.SCC_SYS_ID && {
                            backgroundColor: (theme) =>
                              theme.palette.grey[5400],
                          }),
                          boxShadow: "0",
                        }}
                        onClick={() => {
                          formik.setFieldValue("cardData", item);
                          formik.setFieldValue("card_cvv", "");
                        }}
                      >
                        <Box>
                          <Stack
                            spacing={1}
                            direction="row"
                            width="100%"
                            sx={{
                              mt: 2,
                              padding: "0.5rem",
                              flexWrap: { xs: "wrap", md: "nowrap" },
                              alignItems: { xs: "flex-start", md: "center" },
                            }}
                          >
                            <Checkbox
                              fullWidth
                              icon={<RadioButtonUncheckedIcon />}
                              checkedIcon={<CheckCircleIcon />}
                              size="small"
                              checked={
                                saveCardData?.SCC_SYS_ID === item?.SCC_SYS_ID
                              }
                              onChange={(e) => {
                                if (e.target.checked) {
                                  handleSetSaveCard(item);
                                  formik.setFieldValue("card_cvv", "");
                                }
                              }}
                            />

                            <Stack spacing={0.2} width="100%">
                              <Typography
                                component="p"
                                fontSize="16px"
                                fontWeight="400"
                                color={(theme) => theme.palette.common.black}
                                fontFamily={(theme) =>
                                  theme.fontFaces.helveticaNeue
                                }
                              >
                                {item?.SCC_BANK_NAME
                                  ? item?.SCC_BANK_NAME
                                  : translate("no_bank")}{" "}
                                {item?.SCC_CARD_TYPE} {translate("ending_in")}{" "}
                                {item?.SCC_CARD_NUMBER.slice(-4)}
                              </Typography>

                              <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="start"
                                width="100%"
                                flexWrap="wrap"
                              >
                                <Typography
                                  component="p"
                                  fontSize="16px"
                                  lineHeight="20px"
                                  fontWeight="400"
                                  color={(theme) => theme.palette.common.black}
                                  fontFamily={(theme) =>
                                    theme.fontFaces.helveticaNeueMedium
                                  }
                                  width="100%"
                                >
                                  {item?.SCC_CARD_HOLDER}
                                </Typography>

                                <Stack
                                  alignItems="start"
                                  justifyContent="space-between"
                                  direction={"row"}
                                  paddingTop="7px"
                                  width="100%"
                                >
                                  <Typography
                                    component="p"
                                    fontSize="16px"
                                    lineHeight="20px"
                                    fontWeight="400"
                                    color={(theme) =>
                                      theme.palette.common.black
                                    }
                                    fontFamily={(theme) =>
                                      theme.fontFaces.helveticaNeue
                                    }
                                  >
                                    {item?.SCC_EXP_MONTH}/{item?.SCC_EXP_YEAR}
                                  </Typography>

                                  {saveCardData?.SCC_SYS_ID ===
                                    item?.SCC_SYS_ID && (
                                      <Stack
                                        spacing={0.5}
                                        width={{ xs: "100%", md: "auto" }}
                                      >
                                        <Stack alignItems="end">
                                          <Typography
                                            component="p"
                                            variant="typography14"
                                            sx={{
                                              opacity: ".65",
                                              pr: {
                                                lg: 5,
                                                md: 5,
                                                sm: 3,
                                                xs: 3,
                                                xxs: 3,
                                              },
                                            }}
                                          >
                                            {translate("Card_CVV")}
                                          </Typography>

                                          <TextBox
                                            size="small"
                                            maxLength={3}
                                            type="text"
                                            inputMode="numeric"
                                            name="card_security_code"
                                            placeholder={translate("Card_CVV")}
                                            value={
                                              saveCardData?.SCC_SYS_ID ===
                                                item?.SCC_SYS_ID
                                                ? formik.values.card_security_code
                                                : ""
                                            }
                                            onChange={(e) => {
                                              const value = e.target.value;
                                              const regex = /^[0-9]{0,3}$/; // Allow only up to 3 digits

                                              // If value matches the regex (up to 3 digits), allow the change
                                              if (regex.test(value)) {
                                                formik.handleChange(e);
                                              }
                                            }}
                                            inputSx={(theme) => ({
                                              "& .MuiOutlinedInput-root": {
                                                "& fieldset": {
                                                  borderColor: "transparent",
                                                },
                                                "&:hover fieldset": {
                                                  borderColor: "transparent",
                                                },
                                                "&.Mui-focused fieldset": {
                                                  borderColor: "transparent",
                                                },
                                              },
                                              "& .MuiOutlinedInput-input": {
                                                background:
                                                  theme.palette.common.white,
                                              },
                                              "& ::placeholder": {
                                                color: "common.black",
                                              },
                                            })}
                                          />
                                        </Stack>
                                      </Stack>
                                    )}
                                </Stack>
                              </Stack>
                            </Stack>
                          </Stack>
                        </Box>
                      </Card>
                    </Grid>
                  );
                }
              })}
            <Grid item md={12} sm={12} xs={12} xxs={12}>
              <Box sx={{ width: "100%", textAlign: "right" }} mt={3}>
                <MuiCustomButton
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => saveCardPayment()}
                  title={translate("PAY")}
                  buttonSx={(theme) => ({
                    "&.MuiButton-root": {
                      borderRadius: "0px",
                      color: "common.black",
                      ...theme.typography.typography15,
                      width: "100%",
                      padding: "7px 0px!important",
                      maxWidth: "135px!important",
                      fontWeight: 200,
                      background: (theme) => theme.palette.primary.light,
                      ":hover": {
                        background: (theme) => theme.palette.primary.light,
                      },
                      "&.Mui-disabled": {
                        background: (theme) =>
                          alpha(theme.palette.primary.lighter, 0.65),
                      },
                    },
                  })}
                  disabled={formik?.values?.card_security_code?.length < 3}
                />
              </Box>
            </Grid>
          </Grid>
        </>
      </form>
    </>
  );
};

export default SaveCreditCards;
