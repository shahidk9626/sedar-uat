import { SelectBox } from "@/components/form";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { addToCartFunScene } from "../../sceneCanvas3D";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "@/redux/store";
import { useTranslation } from "next-i18next";
import { setCustomizationFun } from "@/redux/slices/customization";
import { useAuthContext } from "@/auth/useAuthContext";


const Quantity = ({ data, formik }) => {

  const { t: translate } = useTranslation();
  const dispatch = useDispatch();
  const { query,locale } = useRouter();
  const [selected, setSelected] = useState(1);

  const customization_info = useSelector((state) => state.customization);
  const { state } = useAuthContext();
  const { cookies } = state;
  const { stepsArray, editStepData } = customization_info;


  let qut_options = Array.from(Array(100), (e, i) => {
    let val = i + 1;
    return { label: val, value: val }
  })

  const quantityFn = (qty) => {
    let qunt_data = { ...data, QTY: qty }
    dispatch(
      setCustomizationFun(qunt_data)
    );
    setSelected(qty);
  }

  useEffect(() => {
    if (editStepData.info_result && editStepData.info_result.QUANTITY && editStepData.info_result.QUANTITY.SOI_PCS > 0) {
      quantityFn(editStepData.info_result.QUANTITY.SOI_PCS);
    } else if (editStepData.line_result && editStepData.line_result.SOL_QTY && editStepData.line_result.SOL_QTY > 0) {
      quantityFn(editStepData.line_result.SOL_QTY);
    } else {
      quantityFn(1);
    }
  }, []);
  useEffect(() => {
    setTimeout(function () {
      addToCartFunScene({ ...cookies, ...customization_info,locale:locale }, dispatch);
    }.bind(this), 500);
  }, [selected]);

  return (
    <Box py={1}>
      <Box>
        <Typography
          sx={(theme) => ({
            fontFamily: theme.fontFaces.helveticaNeueBold,
            fontSize: theme.typography.typography15,
            color: theme.palette.common.black,
          })}
        >
          {data && data?.SPS_DESC}
        </Typography>
      </Box>
      <Box
        sx={{
          borderBottom: (theme) => `1px dashed ${theme.palette.grey[2800]}`,
          padding: "10px 0px",
        }}
      >
        <Stack
          direction="row"
          pt={2}
          justifyContent="space-between"
          alignItems="center"
          spacing={16}
        >
          <Box>
            <Typography
              sx={(theme) => ({
                fontFamily: theme.fontFaces.helveticaNeue,
                fontSize: theme.typography.typography16,
                color: theme.palette.common.black,
              })}
            >
              QTY
            </Typography>
          </Box>
          <Box sx={{ width: "100%" }}>
            <SelectBox
              fullWidth
              size="small"
              label=""
              name="qtys"
              value={stepsArray.QUANTITY && stepsArray.QUANTITY.QTY ? stepsArray.QUANTITY.QTY : 1}
              onChange={(e) => { quantityFn(e.target.value) }}
              options={qut_options}
              setLabel="label"
              setValue="value"
              // color="primary"s

              formSx={(theme) => ({
                marginBottom: "0px!important",

                "& .MuiSelect-select": {
                  color: theme.palette.common.black,
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.common.black,
                  borderRadius: "0px",
                  color: theme.palette.common.black,
                },
              })}
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default Quantity;
