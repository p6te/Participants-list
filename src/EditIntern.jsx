import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { NavLink, useNavigate } from "react-router-dom";
import { ArrowLeft } from "react-feather";
import ShowError from "./components/ShowError";
import "./css/editIntern.css";
import InputEdit from "./components/InputEdit";

const EditIntern = () => {
  const { id } = useParams();
  const [intern, setIntern] = useState({
    name: "",
    email: "",
    internshipStart: "",
    internshipEnd: "",
  });

  const [error, setError] = useState({
    error: true,
  });
  const [timeInterval, setTimeInterval] = useState({
    minDate: "2000-01-01",
    maxDate: "2100-01-01",
  });

  const [toggleSubmit, setToggleSubmit] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3001/interns/${id}`)
      .then((resp) => resp.json())
      .then((resp) =>
        setIntern({
          name: resp.name,
          email: resp.email,
          internshipStart: resp.internshipStart.substr(0, 10),
          internshipEnd: resp.internshipEnd.substr(0, 10),
        })
      );
  }, [id]);

  useEffect(() => {
    if (Object.keys(error).length === 0) {
      fetch(`http://localhost:3001/interns/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(intern),
      })
        .then((res) => {
          return res.json();
        })
        .then(alert("succeed update"))
        .then(comeBackHomePage())
        .catch((error) => console.log(error));
    }
  }, [toggleSubmit]);

  const handleChange = (e) => {
    setIntern({
      ...intern,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "internshipStart") {
      setTimeInterval({ minDate: e.target.value });
    } else if (e.target.name === "internshipEnd") {
      setTimeInterval({ maxDate: e.target.value });
    }
  };

  const validate = (intern) => {
    const errors = {};
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!intern.name) {
      errors.name = "This field is required";
    }
    if (!intern.email) {
      errors.email = "This field is required";
    } else if (!emailRegex.test(intern.email)) {
      errors.email = "Incorrect email format";
    }
    if (!intern.internshipStart) {
      errors.internshipStart = "This field is required";
    } else if (!dateRegex.test(intern.internshipStart)) {
      errors.internshipStart = "Incorrect date format";
    }
    if (!intern.internshipEnd) {
      errors.internshipEnd = "This field is required";
    } else if (!dateRegex.test(intern.internshipEnd)) {
      errors.internshipEnd = "Incorrect date format";
    }
    return errors;
  };

  const comeBackHomePage = () => navigate("/");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(validate(intern));
    setToggleSubmit((prev) => !prev);
  };

  return (
    <div className="editIntern">
      <NavLink className="backArrow editIntern__back" to="/">
        <ArrowLeft className="editIntern__backArrow" />
        <span className="editIntern__backTxt">Back to list</span>
      </NavLink>
      <h1 className="editIntern__title">Edit</h1>
      <form className="editIntern__form" onSubmit={handleSubmit} noValidate>
        <div className="editInput">
          <InputEdit
            handleChange={handleChange}
            intern={intern}
            error={error}
            select={"name"}
          />
          <ShowError props={error.name} className="editInput__error error" />
        </div>

        <div className="editInput">
          <InputEdit
            handleChange={handleChange}
            intern={intern}
            error={error}
            select={"email"}
          />
          <ShowError props={error.email} className="editInput__error" />
        </div>

        <div className="editIntern__form__calendars">
          <div className="editInput">
            <InputEdit
              handleChange={handleChange}
              intern={intern}
              error={error}
              select={"internshipStart"}
              min={"2000-01-01"}
              max={timeInterval.maxDate}
            />
            <ShowError
              props={error.internshipStart}
              className="editInput__error error"
            />
          </div>

          <div className="editInput">
            <InputEdit
              handleChange={handleChange}
              intern={intern}
              error={error}
              select={"internshipEnd"}
              min={timeInterval.minDate}
              max={"2100-01-01"}
            />
            <ShowError
              props={error.internshipEnd}
              className="editInput__error error"
            />
          </div>
        </div>
        <input
          type="submit"
          value="Submit"
          className="editIntern__form__submit"
        />
      </form>
    </div>
  );
};

export default EditIntern;
