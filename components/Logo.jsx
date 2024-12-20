import logo from "@/assets/images/logo.svg";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <Image className="h-20 w-20" src={logo} alt="DriveLoop" priority={true} />
    </Link>
  );
};

export default Logo;
