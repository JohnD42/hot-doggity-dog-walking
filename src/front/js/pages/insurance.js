import React, {useState} from "react";
import InsurancePDF from "../../../../public/insurance.pdf";


export const Insurance = () => {
    return (

      <div className="container">
         <iframe src={InsurancePDF}  style={{width: "100%", height: "900px"}} className="mb-3"/>

      </div>
    )

}
