import { useAuthContext } from "@/auth/useAuthContext";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";

const Banner = ({ data = {} }) => {
  const { state } = useAuthContext();
  const { cookies } = state;
  const { themeDirection } = cookies || {};
  return (
    <Box
      component="div"
      className="player-wrapper"
      sx={{
        ...(themeDirection === "rtl" && {
          direction: "ltr!important",
        }),
      }}
    >
      <Box
        component="video"
        className="react-player"
        src={data?.PARENT.CHILD?.[0]?.image_path}
        width="100%"
        height="100%"
        playing={"true"}
        autoPlay={true}
        muted={true}
        loop={true}
        controls={true}
      />
    </Box>
  );
};

Banner.propTypes = {
  data: PropTypes.object,
};

export default Banner;
