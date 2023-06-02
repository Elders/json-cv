"use client";

import { useState } from "react";
import cardStyles from '@/app/(styles)/card.module.scss'

function LanguagesExternal(props) {
  const [language, setLanguage] = useState();
  const [note, setNote] = useState();
  return (
    <>
      <div>
        <label htmlFor="language-name">Language: </label>
        <input
          className={cardStyles.project_name_input}
          type="text"
          value={language ? language : props.language.name}
          onChange={(e) => {
            setLanguage(e.target.value);
            props.handler([["name", e.target.value]], props.index);
          }}
          placeholder="Language"
        />
      </div>
      <div>
        <label htmlFor="language-note">Note: </label>
        <input
          className={cardStyles.project_name_input}
          type="text"
          value={note ? note : props.language.note}
          placeholder="Note"
          onChange={(e) => {
            setNote(e.target.value);
            props.handler([["note", e.target.value]], props.index);
          }}
        />
      </div>
    </>
  );
}

export default LanguagesExternal;
