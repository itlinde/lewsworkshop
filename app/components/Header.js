"use client";

import BigLogo from "../../public/logo/big-logo.svg";
import LogoFlower from "../../public/logo/logo-flower.svg";

const Header = () => {
  return (
    <div>
      <BigLogo className="h-10 hidden md:block"/>
      <LogoFlower className="h-10 md:hidden"/>
    </div>
  )
};

export default Header;