import Image from "next/image";
import module from "./Loader.module.scss";

export const Loader = (): JSX.Element => {
  return (
    <div className={module.container}>
      <Image
        src={"/loader.gif"}
        alt="Loading"
        width={100}
        height={100}
        priority
      />
    </div>
  );
};
