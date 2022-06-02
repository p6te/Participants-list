import React from "react";
import "../css/inputEdit.css";

const InputEdit = ({ handleChange, intern, error, select, min, max }) => {
  let inputValues = {};
  let valueName;
  let errorName;

  if (select === "name") {
    inputValues = { type: "text", name: "name", label: "Full name *" };
    valueName = intern.name;
    errorName = error.name;
  } else if (select === "email") {
    inputValues = { type: "text", name: "email", label: "Email address *" };
    valueName = intern.email;
    errorName = error.email;
  } else if (select === "internshipStart") {
    inputValues = {
      type: "date",
      name: "internshipStart",
      label: "Internship start *",
      minDate: min,
      maxDate: max,
    };
    valueName = intern.internshipStart;
    errorName = error.internshipStart;
  } else if (select === "internshipEnd") {
    inputValues = {
      type: "date",
      name: "internshipEnd",
      label: "Internship end *",
      minDate: min,
      maxDate: max,
    };
    valueName = intern.internshipEnd;
    errorName = error.internshipEnd;
  }

  let { type, name, label, minDate, maxDate } = inputValues;

  return (
    <>
      <label htmlFor={name} className="editInput__label">
        {label}
      </label>

      <input
        onChange={handleChange}
        type={type}
        name={name}
        id={name}
        value={valueName}
        min={minDate}
        max={maxDate}
        className={
          errorName ? "editInput__input errorInput" : "editInput__input"
        }
      />
    </>
  );
};

export default InputEdit;
