import { NextImage } from "@/components/image";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

const CheckedCard = ({ title = "", description = "", src = "", alt = "" }) => {
  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: "0px",
        borderColor: (theme) => theme.palette.common.black,
        cursor: "pointer",
      }}
      variant="outlined"
    >
      <CardContent>
        <Stack spacing={4}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Checkbox size="small" />

            <NextImage
              src={src}
              alt={alt}
              objectFit="contain"
              imageSx={{
                width: "29.66px",
                height: "29.66px",
              }}
            />
          </Stack>
          <Box>
            <Typography
              component="h5"
              variant="typography16"
              fontWeight={600}
              mb={0.5}
            >
              {title}
            </Typography>
            <Typography component="p" variant="typography16">
              {description}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

CheckedCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
};


export default CheckedCard;
