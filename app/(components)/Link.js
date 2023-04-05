"use client";

import { useState, useRef } from "react";
import linkIcon from "@/assets/link.svg";
import Image from "next/image";
import styles from "@/app/(styles)/link.module.scss";

export default function Link({ link, placeholder }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const showPlaceholder = placeholder || link;
  const timeoutRef = useRef(null);

  function copyHandler() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    navigator.clipboard.writeText(link);
    setShowTooltip(true);

    timeoutRef.current = setTimeout(() => {
      setShowTooltip(false);
    }, 2000);
  }

  return (
    <div className={styles.link_holder}>
      {showTooltip ? (
        <div className={styles.link_tooltip}>Copied to clipboard!</div>
      ) : null}

      <a href={link} target="_blank">
        {showPlaceholder}
      </a>

      <Image
        src={linkIcon}
        alt=""
        className={styles.link_icon}
        onClick={copyHandler}
      />
    </div>
  );
}
