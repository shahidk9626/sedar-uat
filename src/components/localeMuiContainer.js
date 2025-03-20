import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import React from 'react'

const LocaleMuiContainer = ({ children }) => {
  const { locale } = useRouter()
  // const isRu = locale != "default" &&
  //   locale.split("-")?.[1] &&
  //   locale.split("-")?.[1] === "ru" ? true : false;
  return (
    <Container maxWidth={"xxl"}>{children}</Container>
  )
}

export default LocaleMuiContainer