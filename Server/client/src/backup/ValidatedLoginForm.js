import React from "react";
import { Formik } from "formik";


const ValidatedLoginForm = () => (
  <div>
    <h1>Validated Form Component</h1>
    <Formik
  initialValues={{ email: "", password: "" }}
  onSubmit={(values, { setSubmitting }) => {
    setTimeout(() => {
      console.log("Logging in", values);
      setSubmitting(false);
    }, 500);
  }}
>
</Formik>
  </div>
);


export default ValidatedLoginForm;
