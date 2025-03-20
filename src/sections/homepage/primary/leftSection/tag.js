import Arrow from "@/assets/homepage/arrow";
import useResponsive from "@/hooks/useResponsive";
import { AboutTag } from "@/styles/layouts";
import Typography from "@mui/material/Typography";
import { useTheme } from '@mui/material/styles';
import Link from "next/link";

const Tag = () => {
  const { locale } = useRouter();
  const theme = useTheme();
  const isDownMd = useResponsive("down", "md");

  return (
    <>
      {!isDownMd && (
        <AboutTag
          direction="row"
          alignItems="end"
          spacing={1}
          sx={{ cursor: "pointer", textDecoration: "none" }}
          component={Link}
          href="/about"
          locale={locale}
        >
          <Typography
            component="p"
            variant="typography32"
            sx={{ color: theme.palette.pink.main }}
            fontWeight={600}
          >
            About Sedar
          </Typography>
          <Arrow
            component="p"
            width="44px"
            height="32px"
            color={theme.palette.pink.main}
          />
        </AboutTag>
      )}
    </>
  );
};

export default Tag;
