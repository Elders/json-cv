"use client";
export default function FormWrapper({ children, ...rest }) {
  function submitHandler(e) {
    e.preventDefault();

     if (!e.target.checkValidity()) {
      return;
    }
  }

  return (
    <form onSubmit={submitHandler} id="cv-form" {...rest} noValidate>
      {children}
    </form>
  );
}
