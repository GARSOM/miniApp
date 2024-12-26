import React from "react";
import manufacture from '../assets/icons/manufacture.webp'
const CompanyInfo = () => {
  return (
    <div className="company-info">
      <div className="text-info">
        <h3>Название предприятия</h3>
        <p>Произведено: 33</p>
        <p>Продано: 4</p>
      </div>
      <div className="image-box">
        <img src={manufacture} alt="company" />
      </div>
    </div>
  );
};

export default CompanyInfo;
