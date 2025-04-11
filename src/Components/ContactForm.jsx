import { useState } from "react";
import SuccessState from "./SuccessState";
import PropTypes from "prop-types";
export default function ContactForm() {
  // form Data object
  const initFormData = {
    firstName: "",
    lastName: "",
    email: "",
    queryType: "",
    message: "",
    agree: false,
  };

  // error default state
  const initErrorState = Object.keys(initFormData).reduce((acc, cur) => {
    acc[cur] = false;
    return acc;
  }, {});

  const [formData, setFormData] = useState(initFormData);
  // error state
  const [errorState, setErrorState] = useState(initErrorState);
  // show success message
  const [success, setSuccess] = useState(false);

  // for input like text , email ,password to be DRY === Don't Repeat Your self"
  function handelInputChange(key, value) {
    // update form data on input change
    setFormData((formData) => ({ ...formData, [key]: value }));
    // update error state on input change
    setErrorState((formData) => ({ ...formData, [key]: false }));
  }

  function vaildateFrom(data) {
    const errors = {};

    if (!data.firstName) errors.firstName = true;
    if (!data.lastName) errors.lastName = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = true;
    if (!data.queryType) errors.queryType = true;
    if (!data.message) errors.message = true;
    if (!data.agree) errors.agree = true;

    return errors;
  }

  // handel submit btn for form
  function handelSubmit(e) {
    // prevent default action
    e.preventDefault();
    // update error state
    const errors = vaildateFrom(formData);
    setErrorState(errors);

    // if there is no error show the pop up
    if (Object.keys(errors).length === 0) {
      setSuccess(true);

      // empty field after message sent
      setFormData(initFormData);

      // hide the success message
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    }

    // back to the top of page
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      {/* if the success state is true ==> render the SuccessState component  */}
      {success && <SuccessState />}
      <form>
        {/* form title */}
        <h2 className="form__title">Contact Us</h2>
        {/* start form field */}
        {/* full name */}
        <div className="form__fullName">
          <Input
            type="text"
            inputName={"firstName"}
            inputActualName={"first name"}
            valueFromForm={formData.firstName}
            onChange={handelInputChange}
            erroMessage={"This field is required"}
            errorState={errorState.firstName}
          />

          <Input
            type="text"
            inputName={"lastName"}
            inputActualName={"last name"}
            valueFromForm={formData.lastName}
            onChange={handelInputChange}
            erroMessage={"This field is required"}
            errorState={errorState.lastName}
          />
        </div>
        {/* end full name */}

        {/* email */}
        <Input
          type="email"
          inputName={"email"}
          inputActualName={"email address"}
          valueFromForm={formData.email}
          onChange={handelInputChange}
          erroMessage={"Please enter a valid email address"}
          errorState={errorState.email}
        ></Input>
        {/* end email */}

        {/* radio */}
        <div className="form__queryType">
          <label htmlFor="queryType">query type</label>
          {/* 1st */}
          <label
            htmlFor="genralEnquiry"
            className={
              formData.queryType == "Genral Enquiry" ? "greenBorder" : ""
            }
          >
            <input
              type="radio"
              name="queryType"
              id="genralEnquiry"
              value={"Genral Enquiry"}
              checked={formData.queryType == "Genral Enquiry"}
              onChange={(e) => {
                setFormData({ ...formData, queryType: e.target.value });
                setErrorState((errorState) => ({
                  ...errorState,
                  queryType: false,
                }));
              }}
            />
            <span className="radio__icon"></span>
            genral enquiry
          </label>
          {/* 2nd */}
          <label
            htmlFor="supportRequest"
            className={
              formData.queryType == "Support Request" ? "greenBorder" : ""
            }
          >
            <input
              type="radio"
              name="queryType"
              id="supportRequest"
              value={"Support Request"}
              checked={formData.queryType == "Support Request"}
              onChange={(e) => {
                setFormData({ ...formData, queryType: e.target.value });
                setErrorState((errorState) => ({
                  ...errorState,
                  queryType: false,
                }));
              }}
            />
            <span className="radio__icon"></span>
            support request
          </label>
          <p className={errorState.queryType ? "errorMsg" : "hidden"}>
            Please select a query type
          </p>
        </div>
        {/* end radio */}

        {/* text area */}
        <label htmlFor="message">message</label>
        <textarea
          className={errorState.message ? "error" : ""}
          name="message"
          id="message"
          rows={7}
          value={formData.message}
          onChange={(e) => {
            setFormData({ ...formData, message: e.target.value });
            setErrorState((errorState) => ({ ...errorState, message: false }));
          }}
        />
        <p className={errorState.message ? "errorMsg" : "hidden"}>
          This field is required
        </p>
        {/* end text area */}

        {/* check box */}
        <div className="form__checkbox">
          <label htmlFor="checkbox">
            <input
              type="checkbox"
              name="checkbox"
              id="checkbox"
              checked={formData.agree}
              onChange={(e) => {
                setFormData({ ...formData, agree: e.target.checked });
                setErrorState((errorState) => ({
                  ...errorState,
                  agree: false,
                }));
              }}
            />
            <span className="checkbox__icon"></span>i consent to being contacted
            by the team
          </label>
          <p className={errorState.agree ? "errorMsg" : "hidden"}>
            To sumbit this form,please consent to be contacted
          </p>
        </div>
        {/* end check box */}

        {/* submit btn */}
        <button type="submit" onClick={handelSubmit}>
          Submit
        </button>
        {/* end submit btn */}
      </form>
    </>
  );
}

function Input({
  inputName,
  inputActualName,
  type,
  valueFromForm,
  onChange,
  erroMessage,
  errorState,
}) {
  return (
    <div className="inputWrapper">
      <label htmlFor={inputName}>{inputActualName}</label>
      <input
        className={errorState ? "error" : ""}
        type={type}
        name={inputName}
        id={inputName}
        value={valueFromForm}
        required
        onChange={(e) => {
          onChange(inputName, e.target.value);
        }}
      />

      <p className={errorState ? "errorMsg" : "hidden"}>{erroMessage}</p>
    </div>
  );
}

Input.PropTypes = {
  inputName: PropTypes.string.isRequired,
  inputActualName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  valueFromForm: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  erroMessage: PropTypes.string.isRequired,
  errorState: PropTypes.bool.isRequired,
};
