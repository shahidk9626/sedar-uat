import { TextBox } from "@/components/form";
import DatePickerBox from "@/components/form/datePicker";
import DragDrop from "@/components/form/dragDrop";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

const DocumentDetail = ({ formik = {}, fieldRefs }) => {
  const { t: translate } = useTranslation();
  const { locale } = useRouter();
  const isAr =
    locale != "default" &&
      locale.split("-")?.[1] &&
      locale.split("-")?.[1] === "ar"
      ? true
      : false;

  return (
    <>
      <Grid container spacing={4}>
        <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
          <TextBox
            fullWidth
            label={translate("TradeLicenceNo")}
            type="text"
            variant="standard"
            name="tl_no"
            inputRef={fieldRefs.tl_no}
            value={formik.values.tl_no}
            onChange={formik.handleChange}
            helperText={formik.touched.tl_no && formik.errors.tl_no}
            required
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
          <DatePickerBox
            currentDate={true}
            disablePast={true}
            fullWidth
            label={translate("ExpiryDate")}
            variant="standard"
            name="tl_exp_dt"
            value={formik.values.tl_exp_dt}
            onChange={(e) => {
              formik.setFieldValue("tl_exp_dt", dayjs(e).format("YYYY-MM-DD"));
            }}
            format={isAr ? "YYYY-MMM-DD" : "DD-MMM-YYYY"}
            placeholder="DD/MM/YYYY"
            helperText={formik.touched.tl_exp_dt && formik.errors.tl_exp_dt}
          />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12} xxs={12}>
          <DragDrop
            fullWidth
            name="tl_file_path"
            inputRef={fieldRefs.tl_file_path}
            value={formik?.values?.tl_file_path}
            onChange={(e) => {
              formik.setFieldValue("tl_file_path", e);
            }}
            helperText={
              formik.touched.tl_file_path && formik.errors.tl_file_path
            }
            label={translate("UploadDocument")}
            documentText={translate("MaximumFileMBFileFormatB2B")}
            maxSize={1}
            onSizeError={(file) => {
              formik.setFieldError(
                "tl_file_path",
                translate("Youneedtoprovideafilevalidsize")
              );
            }}
            accept={[
              "jpg",
              "JPG",
              "png",
              "PNG",
              "gif",
              "GIF",
              "jpeg",
              "JPEG",
              "pdf",
              "PDF",
            ]}
          />
        </Grid>
        <Grid
          item
          lg={12}
          md={12}
          sm={12}
          xs={12}
          xxs={12}
          sx={{ textAlign: "-webkit-center" }}
        >
          <Stack
            width={50}
            height={50}
            alignItems={"center"}
            justifyContent={"center"}
            sx={{
              backgroundColor: (theme) => theme.palette.primary.light,
              borderRadius: "50%",
            }}
          >
            <Typography sx={(theme) => ({ ...theme.typography.typography18 })}>
              {translate("OR")}
            </Typography>
          </Stack>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
          <TextBox
            fullWidth
            label={translate("TaxCertificateNo")}
            type="text"
            variant="standard"
            name="tc_no"
            inputRef={fieldRefs.tc_no}
            value={formik.values.tc_no}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
          <DatePickerBox
            currentDate={true}
            disablePast={true}
            fullWidth
            label={translate("ExpiryDate")}
            variant="standard"
            name="tc_exp_dt"
            inputRef={fieldRefs.tc_exp_dt}
            value={formik.values.tc_exp_dt}
            onChange={(e) => {
              formik.setFieldValue("tc_exp_dt", dayjs(e).format("YYYY-MM-DD"));
            }}
            format={isAr ? "YYYY-MMM-DD" : "DD-MMM-YYYY"}
            placeholder="DD/MM/YYYY"
          />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12} xxs={12}>
          <DragDrop
            fullWidth
            name="tc_file_path"
            inputRef={fieldRefs.tc_file_path}
            value={formik?.values?.tc_file_path}
            onChange={(e) => {
              formik.setFieldValue("tc_file_path", e);
            }}
            label={translate("UploadDocument")}
            documentText={translate("MaximumFileMBFileFormatB2B")}
            maxSize={1}
            onSizeError={(file) => {
              formik.setFieldError(
                "tc_file_path",
                translate("Youneedtoprovideafilevalidsize")
              );
            }}
            accept={[
              "jpg",
              "JPG",
              "png",
              "PNG",
              "gif",
              "GIF",
              "jpeg",
              "JPEG",
              "pdf",
              "PDF",
            ]}
          />
        </Grid>
        <Grid
          item
          lg={12}
          md={12}
          sm={12}
          xs={12}
          xxs={12}
          sx={{ textAlign: "-webkit-center" }}
        >
          <Stack
            width={50}
            height={50}
            alignItems={"center"}
            justifyContent={"center"}
            sx={{
              backgroundColor: (theme) => theme.palette.primary.light,
              borderRadius: "50%",
            }}
          >
            <Typography sx={(theme) => ({ ...theme.typography.typography18 })}>
              {translate("OR")}
            </Typography>
          </Stack>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
          <TextBox
            fullWidth
            label={translate("PassportNumber")}
            type="text"
            variant="standard"
            name="pp_no"
            inputRef={fieldRefs.pp_no}
            value={formik.values.pp_no}
            onChange={formik.handleChange}
            helperText={formik.touched.pp_no && formik.errors.pp_no}
            required
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
          <DatePickerBox
            disablePast={true}
            currentDate={true}
            fullWidth
            label={translate("ExpiryDate")}
            variant="standard"
            name="pp_exp_dt"
            inputRef={fieldRefs.pp_exp_dt}
            value={formik.values.pp_exp_dt}
            onChange={(e) => {
              formik.setFieldValue("pp_exp_dt", dayjs(e).format("YYYY-MM-DD"));
            }}
            format={isAr ? "YYYY-MMM-DD" : "DD-MMM-YYYY"}
            placeholder="DD/MM/YYYY"
            helperText={formik.touched.pp_exp_dt && formik.errors.pp_exp_dt}
          />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12} xxs={12}>
          <DragDrop
            fullWidth
            name="pp_file_path"
            inputRef={fieldRefs.pp_file_path}
            value={formik?.values?.pp_file_path}
            onChange={(e) => {
              formik.setFieldValue("pp_file_path", e);
            }}
            helperText={
              formik.touched.pp_file_path && formik.errors.pp_file_path
            }
            label={translate("UploadDocument")}
            documentText={translate("MaximumFileMBFileFormatB2B")}
            maxSize={1}
            onSizeError={(file) => {
              formik.setFieldError(
                "tc_file_path",
                translate("Youneedtoprovideafilevalidsize")
              );
            }}
            accept={[
              "jpg",
              "JPG",
              "png",
              "PNG",
              "gif",
              "GIF",
              "jpeg",
              "JPEG",
              "pdf",
              "PDF",
            ]}
          />
        </Grid>
      </Grid>
    </>
  );
};

DocumentDetail.propTypes = {
  formik: PropTypes.object,
};

export default DocumentDetail;
