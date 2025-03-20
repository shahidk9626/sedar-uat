import { useAuthContext } from "@/auth/useAuthContext";
import { ContactEnquiriesDetails } from "@/styles/contact";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import parse from "html-react-parser";
import PropTypes from "prop-types";
import React from "react";

const EnquiriesSection = ({ data = {} }) => {
  const { state } = useAuthContext();
  const { cookies } = state;
  const { langName } = cookies || {};
  const [heading, setHeading] = React.useState("");

  React.useEffect(() => {
    setHeading(data?.PARENT?.description);
  }, [data?.PARENT?.description]);
  return (
    <Card sx={{ borderRadius: "0px", py: 5 }} id="ScrollEnquiries">
      <CardContent>
        <Typography
          component="h2"
          dangerouslySetInnerHTML={{
            __html: heading,
          }}
          sx={(theme) => ({
            textAlign: "center",
            [theme.breakpoints.down("sm")]: {
              textAlign: "start",
            },
            mb: 5,
            color: theme.palette.common.black,
            fontFamily: theme.fontFaces.helveticaNeue,
            "& h2": {
              ...theme.typography.typography43,
              fontWeight: langName == "ar" ? 200 : 600,
            },
          })}
        />
        <Container maxWidth="md">
          <Grid container spacing={6} justifyContent="center">
            {data?.PARENT &&
              data?.PARENT?.CHILD?.map((item, index) => {
                return (
                  <Grid
                    item
                    md={6}
                    sm={12}
                    xs={12}
                    xxs={12}
                    key={`MORE-ENQUIRIES-FORM-${index}`}
                  >
                    <ContactEnquiriesDetails component="div">
                      {parse(item?.description)}
                    </ContactEnquiriesDetails>
                    <Typography
                      component="a"
                      href={`mailto:${item.link_url}`}
                      sx={{ textDecoration: "none" }}
                      variant="caption"
                      color="primary"
                      fontWeight={400}
                      fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                    >
                      {item?.link_title}
                    </Typography>
                    <Divider sx={{ mt: 2 }} color="lightgrey" />
                  </Grid>
                );
              })}
          </Grid>
        </Container>
      </CardContent>
    </Card>
  );
};

EnquiriesSection.propTypes = {
  data: PropTypes.object,
};

export default EnquiriesSection;
