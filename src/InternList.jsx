import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Edit3 } from "react-feather";
import "./css/internList.css";

const InternList = ({showInfo}) => {
  const [interns, setInterns] = useState([]);


  useEffect(() => {
    const fetchInterns = async () => {
      const response = await fetch("http://localhost:3001/interns");

      const interns = await response.json();
      setInterns(interns);
    };
    fetchInterns();
  }, []);




  return (
    <div className="internList">
      

      <h1 className="internList__title">Participants</h1>

      <ul className="internList__list">
        {interns.map((u) => (
          <li key={u.id} className="internList__participant participant">
            <span className="participant__name">{u.name} </span>
            <NavLink className="participant__link" to={`/interns/${u.id}`}>
              <button className="participant__editBtn">
                <i className="participant__editIcon">
                  <Edit3 />
                </i>
                <span className="participant__editTxt">Edit</span>
              </button>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InternList;
