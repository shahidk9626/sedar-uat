import { MobileBgImageBox } from "@/styles/layouts";
import PropTypes from "prop-types";

const MobileBGImage = ({ children = "" }) => {
  return <MobileBgImageBox component="div">{children}</MobileBgImageBox>;
};

MobileBGImage.propTypes = {
  children: PropTypes.node,

};

export default MobileBGImage;
