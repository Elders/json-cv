import Image from "next/image";
import binIcon from "@/assets/bin.svg";
import cardStyles from "@/app/(styles)/card.module.scss";

export default function CardGroup({
  addHandler,
  deleteHandler,
  children,
  ...rest
}) {
  return (
    <div {...rest}>
      <div className={cardStyles.card_group}>
        <Image
          src={binIcon}
          alt="a bin icon"
          className="pointer"
          onClick={deleteHandler}
        />
        <div>{children}</div>
      </div>
    </div>
  );
}
