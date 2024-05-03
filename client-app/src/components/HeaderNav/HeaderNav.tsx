import Image from "next/image";
import module from "./HeaderNav.module.scss";

export const HeaderNav = () => {
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
        />
      </a>
      <div>This is header navigation</div>
    </nav>
  );
};
