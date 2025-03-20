import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { color } from "framer-motion";

export const ProductDetailsCheckList = styled(Typography)(({ theme }) => ({
  "& h1": {
    paddingLeft: "30px",
    borderLeft: `2px solid ${theme.palette.primary.light}`,
    letterSpacing: 0,
    ...theme.typography.typography39,
    fontWeight: "normal",
    fontFamily: theme.fontFaces.helveticaNeueMedium,
    marginBottom: "0px",
  },
  "& p": {
    ...theme.typography.typography18,
    letterSpacing: 1.2,
    color: theme.palette.common.black,
    fontFamily: theme.fontFaces.helveticaNeueLight,
    marginBlockStart: "8px!important",
    marginBlockEnd: "8px!important",
  },
  "& span": {
    ...theme.typography.typography16,
    letterSpacing: 0.5,
    fontWeight: 200,
    color: theme.palette.common.black,
    fontFamily: `${theme.fontFaces.helveticaNeueMedium} !important`,
    marginBlockStart: "8px!important",
    marginBlockEnd: "8px!important",
  },
  "& li": {
    ...theme.typography.typography15,
    color: "#333333AB",
    padding: "3px",
    fontFamily: theme.fontFaces.helveticaNeue,
    marginBlockStart: "8px!important",
    marginBlockEnd: "8px!important",
  },
}));

export const ProductDetailListItem = styled(ListItemText)(({ theme }) => ({
  "& ul": {
    padding: 0, 
    margin: 0,
    listStyle: "none", 
  },
  "& li": {
    display: "flex", 
    alignItems: "center", 
    gap: "10px", 
    marginBottom: "8px", 
  },
  "& li::before": {
    content: `""`,
    display: "inline-block",
    width: "16px", 
    height: "16px",
    backgroundImage: `url(/assets/freeConsultation/tick.png)`, 
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain", 
    flexShrink: 0, 
  },
}));


