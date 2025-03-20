import { MUICheckBox, SelectBox, TextBox } from "@/components/form";
import { AddressLocation } from "@/modules/location";
import GeoLocation from "@/modules/location/geoLocation";
import { ReasonSelect } from "@/utils/constant";
import Grid from "@mui/material/Grid";
import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";


const YourDetail = ({ formik = {}, fieldRefs }) => {
  const { t: translate } = useTranslation();
  return (
    <>
      <Grid container spacing={4}>
        <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
          <SelectBox
            fullWidth
            label={translate("Type")}
            type="text"
            variant="standard"
            name="business_type"
            value={formik.values.business_type}
            inputRef={fieldRefs.business_type}
            onChange={(e) => {
              formik.setFieldValue("business_type", e.target.value);
            }}
            options={ReasonSelect(translate)}
            inputLabelProps={{
              shrink: true,
            }}
            helperText={
              formik.touched.business_type && formik.errors.business_type
            }
            error={formik.touched.business_type && formik.errors.business_type}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
          <TextBox
            fullWidth
            label={translate("CompanyName")}
            type="text"
            variant="standard"
            name="company_name"
            inputRef={fieldRefs.company_name}
            value={formik.values.company_name}
            onChange={formik.handleChange}
            helperText={
              formik.touched.company_name && formik.errors.company_name
            }
            required
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
          <TextBox
            fullWidth
            label={translate("ContactPerson")}
            type="text"
            variant="standard"
            name="contact_person"
            inputRef={fieldRefs.contact_person}
            value={formik.values.contact_person}
            onChange={formik.handleChange}
            helperText={
              formik.touched.contact_person && formik.errors.contact_person
            }
            required
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
          <TextBox
            fullWidth
            label={translate("Email")}
            type="email"
            variant="standard"
            name="email"
            inputRef={fieldRefs.email}
            value={formik.values.email}
            onChange={formik.handleChange}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12} xxs={12}>
          <GeoLocation
            name="geo_location"
            fieldRefs={fieldRefs}
            handleChange={formik.handleChange}
            defaultValue={formik.setFieldValue}
            helperText={
              formik.touched.geo_location && formik.errors.geo_location
            }
            value={formik.values.geo_location}
          />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12} xxs={12}></Grid>
        <AddressLocation
          formik={formik}
          isArea={true}
          fieldRefs={fieldRefs}
          countryKeyName="cad_country"

        />
        <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
          <TextBox
            fullWidth
            label={translate("AddressLabel")}
            type="text"
            variant="standard"
            name="address"
            inputRef={fieldRefs.address}
            value={formik.values.address}
            onChange={formik.handleChange}
            helperText={formik.touched.address && formik.errors.address}
            required
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
          <TextBox
            fullWidth
            label={translate("PhoneNumber")}
            type="text"
            variant="standard"
            name="phone_no"
            inputRef={fieldRefs.phone_no}
            value={formik.values.phone_no}
            onChange={formik.handleChange}
            helperText={formik.touched.phone_no && formik.errors.phone_no}
            required
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
          <TextBox
            fullWidth
            label={translate("MobileNumber")}
            type="text"
            variant="standard"
            name="mobile_no"
            inputRef={fieldRefs.mobile_no}
            value={formik.values.mobile_no}
            onChange={formik.handleChange}
            helperText={formik.touched.mobile_no && formik.errors.mobile_no}
            required
          />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12} xxs={12}>
          <TextBox
            fullWidth
            label={translate("Subject")}
            type="text"
            variant="standard"
            name="remarks"
            inputRef={fieldRefs.remarks}
            value={formik.values.remarks}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12} xxs={12}>
          <MUICheckBox
            fullWidth
            label={translate("CheckOutText")}
            inputRef={fieldRefs.i_agree}
            value={formik.values.i_agree}
            checked={Boolean(formik.values.i_agree)}
            onChange={(e) => {
              formik.setFieldValue("i_agree", e.target.checked);
            }}
            name="i_agree"
            helperText={formik.touched.i_agree && formik.errors.i_agree}
          />
        </Grid>
      </Grid>
    </>
  );
};

YourDetail.propTypes = {
  formik: PropTypes.object,
};

export default YourDetail;
