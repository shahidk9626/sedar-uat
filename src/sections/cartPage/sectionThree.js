import { RadioBox } from "@/components/form";
import Iconify from "@/components/iconify";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
const SectionThree = ({
  handleDialogueOpen,
  checkoutFormik,
  deliveryPolicyFun,
}) => {
  const { t: translate } = useTranslation();
  return (
    <Stack
      spacing={{
        lg: 4,
        md: 4,
        sm: 3,
        xs: 1,
        xxs: 1,
      }}
      direction={{
        md: "row",
        sm: "column",
        xs: "column",
        xxs: "column",
      }}
      pl={{ lg: 3, md: 3, sm: 2, xs: 0, xxs: 0 }}
      mt={2}
      id="deliveryOption"
    >
      <Box
        sx={(theme) => ({
          backgroundColor:
            checkoutFormik.values.deliveryType == "DO02"
              ? theme.palette.grey[5500]
              : "",
          ":hover": {
            bgcolor: theme.palette.grey[5500],
            borderColor: theme.palette.primary.main,
          },
          border: `1px dashed ${checkoutFormik.values.deliveryType == "DO02"
              ? theme.palette.primary.main
              : theme.palette.grey[2800]
            }`,
          px: 5,
          py: 1,
        })}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <RadioBox
            fullWidth
            formSx={{ justifyContent: "left" }}
            label={
              <Typography
                variant="typography14"
                fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
                color={(theme) => theme.palette.grey[5800]}
              >
                {translate("delivery/installation")}
              </Typography>
            }
            name="deliveryType"
            checked={checkoutFormik.values.deliveryType == "DO02"}
            value={checkoutFormik.values.deliveryType == "DO02"}
            onChange={(e) => {
              if (e.target.checked) {
                checkoutFormik.setFieldValue("deliveryType", "DO02");
              }
            }}
            helperText={checkoutFormik.errors.deliveryType}
          />
          <Iconify
            icon="ic:outline-info"
            sx={{ cursor: "pointer" }}
            onClick={() =>
              handleDialogueOpen("deliveryOpen", deliveryPolicyFun)
            }
          />
        </Stack>
      </Box>

      <Box
        sx={(theme) => ({
          backgroundColor:
            checkoutFormik.values.deliveryType == "DO03"
              ? theme.palette.grey[5500]
              : "",
          ":hover": {
            bgcolor: theme.palette.grey[5500],
            borderColor: theme.palette.primary.main,
          },
          border: `1px dashed ${checkoutFormik.values.deliveryType == "DO03"
              ? theme.palette.primary.main
              : theme.palette.grey[2800]
            }`,

          px: 5,
          py: 1,
        })}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box
            onClick={() =>
              handleDialogueOpen("locationOpen", deliveryPolicyFun)
            }
          >
            <RadioBox
              name="deliveryType"
              formSx={{ justifyContent: "left" }}
              checked={checkoutFormik.values.deliveryType == "DO03"}
              value={checkoutFormik.values.deliveryType == "DO03"}
              onChange={(e) => {
                if (e.target.checked) {
                  checkoutFormik.setFieldValue("deliveryType", "DO03");
                }
              }}
              fullWidth
              label={
                <Typography
                  variant="typography14"
                  fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
                  color={(theme) => theme.palette.grey[5800]}
                >
                  {translate("Click_Collect")}
                </Typography>
              }
              helperText={checkoutFormik.errors.deliveryType}
            />
          </Box>

          <Box
            onClick={() => handleDialogueOpen("info", deliveryPolicyFun)}
            sx={{ mt: 0.6 }}
          >
            <Iconify icon="ic:outline-info" sx={{ cursor: "pointer" }} />
          </Box>
        </Stack>

        {checkoutFormik.values.deliveryType == "DO03" && (
          <Box width={"100%"}>
            <Typography
              fontSize={14}
              textAlign="center"
              fontFamily={(theme) => theme.fontFaces.helveticaNeue}
            >
              {checkoutFormik?.values?.showRoomVal?.SSA_ADDRESS_TITLE}{" "}
              {checkoutFormik?.values?.showRoomVal?.SSA_CITY_NAME}{" "}
              {checkoutFormik?.values?.showRoomVal?.SSA_SCN_ISO}
            </Typography>
          </Box>
        )}
      </Box>
    </Stack>
  );
};

export default SectionThree;
