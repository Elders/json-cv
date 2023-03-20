import Image from "next/image";
import binIcon from "@/assets/bin.svg";

export default function CardGroup({
  addHandler,
  deleteHandler,
  children,
  ...rest
}) {
  return (
    <div {...rest}>
      <div>
        <Image
          src={binIcon}
          alt="a bin icon"
          className="pointer"
          onClick={deleteHandler}
        />
        {children}
      </div>
    </div>
  );
}
