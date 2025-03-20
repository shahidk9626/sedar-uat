import Breadcrumbs from "@mui/material/Breadcrumbs";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import React from "react";

const CustomBreadCrumb = () => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" color="inherit" href="/">
        <Typography
          color="inherit"
          typography="typography14"
          fontFamily={(theme) => theme.fontFaces.helveticaNeue}
        >
          Home
        </Typography>
      </Link>
      <Typography
        color="inherit"
        fontFamily={(theme) => theme.fontFaces.helveticaNeue}
      >
        Tips & Threads
      </Typography>
    </Breadcrumbs>
  );
};

export default CustomBreadCrumb;
