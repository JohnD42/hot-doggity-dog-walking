
import React, { useState, useEffect } from "react";

const PetForm = ({ petFormData, idx, handlePetChange }) => {
  const [petData, setPetData] = useState({});

  useEffect(() => {
    setPetFormData(petFormData);
  }, [petFormData]);


  useEffect(() => {
    handlePetChange(petData, idx);
  }, [petData, idx, handlePetChange]);

  return (
    <div>
      <div>
        <label htmlFor="name">Pet Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={petData.name}
          onChange={(e) => setPetData({ ...petData, name: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="breed">Breed *</label>
        <input
          type="text"
          id="breed"
          name="breed"
          value={petData.breed}
          onChange={(e) => setPetData({ ...petData, breed: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="age">Age *</label>
        <input
          type="text"
          id="age"
          name="age"
          value={petData.age}
          onChange={(e) => setPetData({ ...petData, age: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          value={petData.description}
          onChange={(e) => setPetData({ ...petData, description: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="detailed_care_info">Detailed care info *</label>
        <input
          type="text"
          id="detailed_care_info"
          name="detailed_care_info"
          value={petData.detailed_care_info}
          onChange={(e) => setPetData({ ...petData, detailed_care_info: e.target.value })}
        />
      </div>
    </div>
  );
};

export default PetForm;



export { PetForm };