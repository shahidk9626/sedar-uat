import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import { FranchiseHelpHeading } from "@/styles/franchise";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import PropTypes from "prop-types";

const Help = ({ data = {} }) => {
  return (
    <Container maxWidth="lg">
      <FranchiseHelpHeading
        component="div"
        dangerouslySetInnerHTML={{
          __html: data?.PARENT?.description,
        }}
      />
      <Box pt={4}>
        <NextLazyLoadImage
          src={data?.PARENT?.image_path}
          alt={data?.PARENT?.image_path}
          width={1154}
          height={550}
          sx={{
            width: "100%!important",
            height: "100%!important",
            objectFit: "cover!important",
          }}
          sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
          objectFit="contain"
          upLgWidth={1154}
          downLgWidth={1154}
          downMdWidth={1154}
          downSmWidth={806}
          downXsWidth={506}
        />
      </Box>
    </Container>
  );
};

Help.propTypes = {
  data: PropTypes.object,
};


export default Help;
