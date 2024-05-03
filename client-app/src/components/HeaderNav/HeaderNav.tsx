import Image from "next/image";
import module from "./HeaderNav.module.scss";
import { Expander } from "../Expander";

export const HeaderNav = (): JSX.Element => {
  const authLinks = [
    { title: "Login", link: "/login" },
    { title: "Register", link: "/register" },
  ];

  return (
    <nav className={module.container}>
      <a href="/">
        <Image
          src={"/logo.png"}
          alt="logo image"
          width={0}
          height={0}
          sizes="10vw"
          style={{ width: "10vw", height: "auto" }}
          priority
        />
      </a>
      <div>This is header navigation</div>
      <Expander end={true} title="Auth options" expandedLinks={authLinks} />
    </nav>
  );
};
