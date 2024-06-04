import { Image, ImageProps } from "@chakra-ui/react";
import CircleLogo from "../../../assets/logo.svg";

interface LogoProps extends ImageProps {}
export function LogoCircle(props: LogoProps) {
  return (
    <>
      <Image src={CircleLogo} {...props} />
    </>
  );
}
