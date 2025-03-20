import React, { useState } from "react";
import { ServiceQualityServiceHeading } from "@/styles/service";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import PropTypes from "prop-types";
import QualityImageComponent from "./qualityImageComponent";
import MetModal from "../../theMet/metModal";
import { useTranslation } from "next-i18next";

const QualityServices = ({ data = {} }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const closeModal = () => setModalOpen(false);
  const { t: translate } = useTranslation();

  const artModal = () => setModalOpen(true);
  console.log("test qt services", data);

  return (
    <>
      <MetModal isOpen={isModalOpen} closeModal={closeModal} />

      <Box sx={{ backgroundColor: (theme) => theme.palette.grey[200] }}>
        <Container maxWidth="xl">
          <Box>
            <ServiceQualityServiceHeading
              component="div"
              dangerouslySetInnerHTML={{
                __html: data?.PARENT?.description,
              }}
              sx={(theme) => ({
                "& span": {
                  color: theme.palette.grey[1600],
                  padding: "0px 0px 0px 22px",
                },
                "& p": {
                  marginBlockStart: "0px!important",
                },
                "& h2,h1": {
                  ...theme.typography.typography32,
                  color: theme.palette.dark.darker,
                  paddingBottom: {
                    lg: "40px",
                    md: "40px",
                    sm: "10px",
                    xs: "10px",
                    xxs: "10px",
                  },
                  // margin: 0,
                },
              })}
            />
          </Box>
          <Box>
            {data?.PARENT?.CHILD.map((elem, index) => (
              <QualityImageComponent
                key={`QUALITY_IMAGE-${elem?.title || index}`}
                direction={index % 2 ? "row-reverse" : "row"}
                title={elem?.title}
                url={elem?.link_url}
                image_path={elem?.image_path}
                description={elem?.description}
                artModal={artModal}
                buttonLabel={elem?.link_title || translate("BrowseCollection")}
              />
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
};

QualityServices.propTypes = {
  data: PropTypes.object,
};

export default QualityServices;
