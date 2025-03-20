import { BgImageBox } from "@/styles/layouts";
import PropTypes from "prop-types";

const BGImage = ({ children = "" }) => {
  return <BgImageBox component="div">{children}</BgImageBox>;
};
BGImage.propTypes = {
  children: PropTypes.node,

};

export default BGImage;
