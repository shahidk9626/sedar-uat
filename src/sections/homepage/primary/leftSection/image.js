import { NextImage } from "@/components/image";

const ImageSection = () => {
  return (
    <NextImage
      src="/assets/homepage/about.avif"
      objectFit="cover"
      sx={{
        height: {
          xl: "calc(100dvh - 125px)!important",
          lg: "calc(100dvh - 125px)!important",
          md: "calc(100dvh - 125px)!important",
          sm: "258px!important",
          xs: "370px!important",
          xxs: "370px!important",
        },
        width: "100%!important",
        backgroundSize: "cover",
      }}
      alt="master"
    />
  );
};

export default ImageSection;
