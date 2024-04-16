


import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

export const Account = () => {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
    state:"",
    city:"",
    zip:""
  });
  const [rerender, setRerender] = useState(false)
  // Pet States
  const [pets, setPets] = useState([]);
  const [petFormData, setPetFormData] = useState({
    name: "",
    breed: "",
    age: "",
    description: "",
    detailed_care_info: "",
    
  });

  const [editPetIndex, setEditPetIndex] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const navigate = useNavigate();
  
  const { store, actions } = useContext(Context);
  useEffect(() => {
    const asyncGetUserFunc = async () => {
      if(store.token) {
        setUserData(await actions.getUser())
      }
    }
    asyncGetUserFunc()

    const asyncGetPetsFunc = async () => {
      if(store.token) {
        setPets(await actions.getPets())
      }
    }
    asyncGetPetsFunc()
  },[])

  


  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handlePetChange = (e) => {
    const { name, value } = e.target;
    setPetFormData({
      ...petFormData,
      [name]: value,
    });
  };

  

  const addPet = () => {
    setPets([...pets, petFormData]);
    setPetFormData({
      name: "",
      breed: "",
      age: "",
      description: "",
      detailed_care_info: "",
    });
  };

  const openEditModal = (index) => {
    setEditPetIndex(index);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditPetIndex(null);
    setEditModalOpen(false);
  };

  const handleEditPet = () => {
    if (editPetIndex !== null) {
      const updatedPets = [...pets];
      updatedPets[editPetIndex] = {
        name: petFormData.name,
        breed: petFormData.breed,
        age: petFormData.age,
        description: petFormData.description,
        detailed_care_info: petFormData.detailed_care_info,
      };
      setPets(updatedPets);
    }
    closeEditModal();
  };

  const deletePet = (index) => {
    const updatedPets = [...pets];
    updatedPets.splice(index, 1);
    setPets(updatedPets);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    actions.updateAccount(userData);
    actions.updatePet(petFormData); 
    console.log("User Form submitted:", userData);
    console.log("Pets:", pets);
    navigate("/services");
  };

  return (
    <div  className="account_form" onSubmit={handleSubmit}>
      {store.token ?  // Check if the user has a token
        <>

          <h2>Client information</h2>

          <div class="form-group">
            <div>
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={userData.first_name}
              onChange={handleUserChange}
            />
          </div>
          <div>
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={userData.last_name}
              onChange={handleUserChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData["email"]}
              onChange={handleUserChange}
            />
          </div>
          <div>
            <label htmlFor="phone_number">Phone Number</label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              value={userData.phone_number}
              onChange={handleUserChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={userData.address}
              onChange={handleUserChange}
            />
          </div>
          <div>
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={userData.city}
              onChange={handleUserChange}
            />
          </div>
          <div>
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={userData.state}
              onChange={handleUserChange}
            />
          </div>
          <div>
            <label htmlFor="zip">zip</label>
            <input
              type="text"
              id="zip"
              name="zip"
              value={userData.zip}
              onChange={handleUserChange}
            />
          </div>

          {/* Pet Section */}
          <div className="pet_form">
            <h2>Pet information</h2>
            {pets.map((pet, index) => (
              <div key={index}>
                <p>{pet.name}</p>
                <div className="editButtons">
                <button  className="editAccount" type="button" onClick={() => openEditModal(index)}>
                  Edit
                </button>
                <button  className="deleteAccountButton" type="button" onClick={() => deletePet(index)}>
                  Delete
                </button>
                </div>
              </div>
            ))}
          <div>
            <label htmlFor="name">Pet Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={petFormData.name}
              onChange={handlePetChange}
            />
          </div>
          <div>
            <label htmlFor="breed">Breed *</label>
            <input
              type="text"
              id="breed"
              name="breed"
              value={petFormData.breed}
              onChange={handlePetChange}
            />
          </div>
          <div>
            <label htmlFor="age">Age *</label>
            <input
              type="text"
              id="age"
              name="age"
              value={petFormData.age}
              onChange={handlePetChange}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={petFormData.description}
              onChange={handlePetChange}
            />
          </div>
          <div>
            <label htmlFor="detailed_care_info">Detailed care information</label>
            <input
              type="text"
              id="detailed_care_info"
              name="detailed_care_info"
              value={petFormData.detailed_care_info}
              onChange={handlePetChange}
            />
          </div>
          <div className="accountButtons">
            <button  className="addPet" type="button" onClick={addPet}>
              Add Pet
            </button>
            
              
            <button  className="accountSubmit" type="button" onClick={handleSubmit}>
            Submit
            </button>
          </div>
        </div>
      </div>
    </>
       :(   
                     <div>
                      <p>You are not authorized to view this page. Please log in.</p>
                    </div>
                    )}

                    {
                      isEditModalOpen && (
                        <div className="edit-modal">
                          <h2>Edit Pet</h2>
              
                          <button type="button" onClick={handleEditPet}>
                          Save Changes
                        </button>
                        <button type="button" onClick={closeEditModal}>
                          Cancel
                        </button>
                      </div>
              )}
    </div>
  );
};
















// import { useNavigate } from "react-router-dom";
// import React, { useContext, useState } from "react";
// import { Context } from "../store/appContext";

// import { PetForm } from "../component/PetForm.js";

// export const Account = () => {
//   const { store, actions } = useContext(Context);

//   const [userData, setUserData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     phone_number: "",
//     address: "",
//   });

//   // Pet States
//   const [pets, setPets] = useState([]);

//   const [petFormData, setPetFormData] = useState({
//     name: "",
//     breed: "",
//     age: "",
//     description: "",
//     detailed_care_info: "",
  
//   });

//   // const [editPetIndex, setEditPetIndex] = useState(null);
//   // const [isEditModalOpen, setEditModalOpen] = useState(false);
//   // const [showModal, setShowModal] = useState(false);
//   // const [modalMessage, setModalMessage] = useState("");
//   const [showSubmissionModal, setShowSubmissionModal] = useState(false); // New state for submission modal
//   const [submissionModalMessage, setSubmissionModalMessage] = useState(""); // New state for submission modal message
//   // const navigate = useNavigate();

//   const handleUserChange = (e) => {
//     const { name, value } = e.target;
//     setUserData({
//       ...userData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const respUser = await actions.updateAccount(userData);
//     const respPet = await actions.updatePet(pets);



//     if (respUser.success && respPet.success) {
//       setSubmissionModalMessage("Update successful!");
//       setShowSubmissionModal(true);
//     } else {
//       setSubmissionModalMessage("Update unsuccessful. Please try again.");
//       setShowSubmissionModal(true);
//     }
//   };

//   const addPet = () => {
//     setPets([...pets, petFormData]);
//     setPetFormData({
//       name: "",
//       breed: "",
//       age: "",
//       description: "",
//       detailed_care_info: "",
//     });
//   };

//   const openEditModal = (index) => {
//     setEditPetIndex(index);
//     setEditModalOpen(true);
//   };

//   const closeEditModal = () => {
//     setEditPetIndex(null);
//     setEditModalOpen(false);
//   };

//   const handlePetChange = (pet, idx) => {
//     setPets((prevPets) => {
//       const updatedPets = [...prevPets];
//       updatedPets[idx] = pet;
//       return updatedPets;
//     });
//   };
//   const updatePetByIdx = (pet, idx) => {
//     setPets((prevPets) => {
//       const updatedPets = [...prevPets];
//       updatedPets.splice(idx, 1, pet);
//       return updatedPets;
//     });
//   };
//   const handleEditPet = () => {
//     if (editPetIndex !== null) {
//       const updatedPet = {
//         name: petFormData.name,
//         breed: petFormData.breed,
//         age: petFormData.age,
//         description: petFormData.description,
//         detailed_care_info: petFormData.detailed_care_info,
//       };
//       updatePetByIdx(updatedPet, editPetIndex);
//     }
//     closeEditModal();
//   };

//   const deletePet = (index) => {
//     const updatedPets = [...pets];
//     updatedPets.splice(index, 1);
//     setPets(updatedPets);
//   };

//   return (
//     <div>
//       {store.token ? ( // Check if the user has a token
//         <div className="account_form">
//           <h2>Client information</h2>
//           <div className="form-group">
//             <div>
//               <label htmlFor="first_name">First Name</label>
//               <input
//                 type="text"
//                 id="first_name"
//                 name="first_name"
//                 value={userData.first_name}
//                 onChange={handleUserChange}
//               />
//             </div>
//             <div>
//               <label htmlFor="last_name">Last Name</label>
//               <input
//                 type="text"
//                 id="last_name"
//                 name="last_name"
//                 value={userData.last_name}
//                 onChange={handleUserChange}
//               />
//             </div>
//             <div>
//               <label htmlFor="address">Address *</label>
//               <input
//                 type="text"
//                 id="address"
//                 name="address"
//                 value={userData.address}
//                 onChange={handleUserChange}
//               />
//             </div>
//             <div>
//               <label htmlFor="city">City *</label>
//               <input
//                 type="text"
//                 id="city"
//                 name="city"
//                 value={userData.city}
//                 onChange={handleUserChange}
//               />
//             </div>
//             <div>
//               <label htmlFor="state">State *</label>
//               <input
//                 type="text"
//                 id="state"
//                 name="state"
//                 value={userData.state}
//                 onChange={handleUserChange}
//               />
//             </div>
//             <div>
//               <label htmlFor="zip">Zip *</label>
//               <input
//                 type="text"
//                 id="zip"
//                 name="zip"
//                 value={userData.zip}
//                 onChange={handleUserChange}
//               />
//             </div>
//             <div>
//               <label htmlFor="phone_number">Phone number *</label>
//               <input
//                 type="text"
//                 id="phone_number"
//                 name="phone_number"
//                 value={userData.phone_number}
//                 onChange={handleUserChange}
//               />
//             </div>
//           </div>
//           <div>
//             <label htmlFor="email">email *</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={userData.email}
//               onChange={handleUserChange}
//             />
//           </div>

//           {submissionModalMessage && <div>{submissionModalMessage}</div>}

//           <div className="pet_form">
//             <h2>Pet information</h2>
//             {pets.map((petS, idx) => (
//               <PetForm
//                 petFormData={petS}
//                 idx={idx}
//                 key={idx}
//                 handlePetChange={updatePetByIdx}
//               />
//             ))}
//             <button type="button" onClick={addPet}>
//               Add Pet
//             </button>
//             <button type="button" onClick={handleSubmit}>
//               Submit
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div>
//           <p>You are not authorized to view this page. Please log in.</p>
//         </div>
//       )}
//     </div>
//   );
// };






























// // import React, { useContext, useState } from "react";
// // import { Context } from "../store/appContext";
// // import { PetForm } from "../component/PetForm.js";

// // export const Account = () => {
// //   const { store, actions } = useContext(Context);

  
// //   const [userData, setUserData] = useState({
// //     phone_number: "",
// //     address: "",
// //     city: "",
// //     state: "",
// //     zip: "",
// //     first_name: "", 
// //     last_name: "" 
// //   });

 
// //   const [pets, setPets] = useState({
// //     name: "",
// //     breed: "",
// //     age: "",
// //     description: "",
// //     detailed_care_info: "",
// //     pet_picture: null
// //   });

  
// //   const [editPetModalOpen, setEditPetModalOpen] = useState(false);

// //   // tracks pets being added
// //   const [editPetIndex, setEditPetIndex] = useState(null);

// //   // sub modal message
// //   const [submissionModalMessage, setSubmissionModalMessage] = useState("");

// //   const handleUserChange = (e) => {
// //     const { name, value } = e.target;
// //     setUserData({
// //       ...userData,
// //       [name]: value
// //     });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const respUser = await actions.updateAccount(userData);
// //       console.log(pets)
// //       const respPet = await actions.updatePet(pets);

// //       if (respUser.success && respPet.success) {
// //         //  success
// //         setSubmissionModalMessage("Account and pet information updated successfully!");
// //       } else {
// //         // failure
// //         setSubmissionModalMessage("Failed to update account and pet information.");
// //       }
// //     } catch (error) {
// //       console.error("Error updating account:", error);
// //       setSubmissionModalMessage("Error updating account and pet information.");
// //     }
// //   };


// //   const handlePetChange = (e) => {
// //     const { name, value } = e.target;
// //     setPets((prevPets) => ({
// //       ...prevPets,
// //       [name]: value
// //     }));
// //   };

// //   const addPet = () => {
// //     setPets((prevPets) => ({
// //       ...prevPets,
// //       [Object.keys(prevPets).length]: {
// //         name: "",
// //         breed: "",
// //         age: "",
// //         description: "",
// //         detailed_care_info: "",
// //         pet_picture: null
// //       }
// //     }));
// //   };
// //   const openEditPetModal = (index) => {
// //     setPets({ ...pets[index] });
// //     setEditPetIndex(index);
// //     setEditPetModalOpen(true);
// //   };

// //   const closeEditPetModal = () => {
// //     setPets({
// //       name: "",
// //       breed: "",
// //       age: "",
// //       description: "",
// //       detailed_care_info: "",
// //       pet_picture: null
// //     });
// //     setEditPetIndex(null);
// //     setEditPetModalOpen(false);
// //   };

// //   const updatePetByIdx = (pet, idx) => {
// //     setPets((prevPets) => ({
// //       ...prevPets,
// //       [idx]: pet
// //     }));
// //   };

// //   const handleEditPet = () => {
// //     if (editPetIndex !== null) {
// //       setPets((prevPets) => ({
// //         ...prevPets,
// //         [editPetIndex]: pets
// //       }));
// //     }
// //     closeEditPetModal();
// //   };

// //   const handleDeletePet = (index) => {
// //     const { [index]: deletedPet, ...remainingPets } = pets;
// //     setPets(remainingPets);
// //   };

// //   return (
// //     <div>
// //       {store.token ? (
// //         <div className="account_form">
// //           <h2>Client information</h2>
// //           <div className="form-group">
// //             <div>
// //               <label htmlFor="first_name">First name *</label>
// //               <input
// //                 type="text"
// //                 id="first_name"
// //                 name="first_name"
// //                 value={userData.first_name}
// //                 onChange={handleUserChange}
// //               />
// //             </div>
// //             <div>
// //               <label htmlFor="last_name">Last name *</label>
// //               <input
// //                 type="text"
// //                 id="last_name"
// //                 name="last_name"
// //                 value={userData.last_name}
// //                 onChange={handleUserChange}
// //               />
// //             </div>
// //             <div>
// //               <label htmlFor="email">Email *</label>
// //               <input
// //                 type="text"
// //                 id="email"
// //                 name="email"
// //                 value={userData.email}
// //                 onChange={handleUserChange}
// //               />
// //             </div>
// //             <div>
// //               <label htmlFor="address">Address *</label>
// //               <input
// //                 type="text"
// //                 id="address"
// //                 name="address"
// //                 value={userData.address}
// //                 onChange={handleUserChange}
// //               />
// //             </div>
// //             <div>
// //               <label htmlFor="city">City *</label>
// //               <input
// //                 type="text"
// //                 id="city"
// //                 name="city"
// //                 value={userData.city}
// //                 onChange={handleUserChange}
// //               />
// //             </div>
// //             <div>
// //               <label htmlFor="state">State *</label>
// //               <input
// //                 type="text"
// //                 id="state"
// //                 name="state"
// //                 value={userData.state}
// //                 onChange={handleUserChange}
// //               />
// //             </div>
// //             <div>
// //               <label htmlFor="zip">Zip *</label>
// //               <input
// //                 type="text"
// //                 id="zip"
// //                 name="zip"
// //                 value={userData.zip}
// //                 onChange={handleUserChange}
// //               />
// //             </div>
// //             <div>
// //               <label htmlFor="phone_number">Phone number *</label>
// //               <input
// //                 type="text"
// //                 id="phone_number"
// //                 name="phone_number"
// //                 value={userData.phone_number}
// //                 onChange={handleUserChange}
// //               />
// //             </div>
// //           </div>

// //           <div className="pet_form">
// //             <h2>Pet information</h2>
// //             {Object.keys(pets).map((petKey) => (
// //               <div key={petKey}>
// //                 <PetForm petFormData={pets[petKey]} idx={petKey} handlePetChange={updatePetByIdx} />
// //                 <button type="button" onClick={() => openEditPetModal(petKey)}>
// //                   Edit Pet
// //                 </button>
// //                 <button type="button" onClick={() => handleDeletePet(petKey)}>
// //                   Delete Pet
// //                 </button>
// //               </div>
// //             ))}

// //             {/* Edit pet modal */}
// //             {editPetModalOpen && (
// //               <div>
// //                 <h2>Edit Pet</h2>
// //                 <PetForm petFormData={pets[editPetIndex]} handlePetChange={handlePetChange} />
// //                 <button type="button" onClick={handleEditPet}>
// //                   Save Changes
// //                 </button>
// //                 <button type="button" onClick={closeEditPetModal}>
// //                   Cancel
// //                 </button>
// //               </div>
// //             )}

// //             {/* Buttons for adding new pet + submitting the form */}
// //             {!editPetModalOpen && (
// //               <>
// //                 <button type="button" onClick={addPet}>
// //                   Add Pet
// //                 </button>
// //                 <button type="button" onClick={handleSubmit}>
// //                   Submit
// //                 </button>
// //               </>
// //             )}
// //           </div>

// //           {/* Sub modal message */}
// //           {submissionModalMessage && <p>{submissionModalMessage}</p>}
// //         </div>
// //       ) : (
// //         <div>
// //           <p>You are not authorized to view this page. Please log in.</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

























// // // import React, { useContext, useState } from "react";
// // // import { Context } from "../store/appContext";
// // // import { PetForm } from "../component/PetForm.js";

// // // export const Account = () => {
// // //   const { store, actions } = useContext(Context);

// // //   // State for user data
// // //   const [userData, setUserData] = useState({
// // //     phone_number: "",
// // //     address: "",
// // //     city: "",
// // //     state: "",
// // //     zip: ""
// // //   });

// // //   // State for pets
// // //   const [pets, setPets] = useState({
// // //     name: "",
// // //     breed: "",
// // //     age: "",
// // //     description: "",
// // //     detailed_care_info: "",
// // //     pet_picture: null
// // //   });

// // //   // State for modal
// // //   const [editPetModalOpen, setEditPetModalOpen] = useState(false);

// // //   // State for tracking the index of the pet being edited
// // //   const [editPetIndex, setEditPetIndex] = useState(null);

// // //   // State for submission modal message
// // //   const [submissionModalMessage, setSubmissionModalMessage] = useState("");

// // //   // Handle user data change
// // //   const handleUserChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setUserData({
// // //       ...userData,
// // //       [name]: value
// // //     });
// // //   };

// // //   // Handle form submission
// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();


// // //     try {
// // //       const respUser = await actions.updateAccount(userData);
// // //       const respPet = await actions.updatePet(pets);

// // //       if (respUser.success && respPet.success
// // //       ) {

// // //       } else {

// // //       }
// // //     } catch (error) {
// // //       console.error("Error updating account:", error);

// // //     }
// // //   };

// // //   // Handle pet data change
// // //   const handlePetChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setPets((prevPets) => ({
// // //       ...prevPets,
// // //       [name]: value
// // //     }));
// // //   };

// // //   // Handle adding a new pet
// // //   const addPet = () => {
// // //     setPets({
// // //       name: "",
// // //       breed: "",
// // //       age: "",
// // //       description: "",
// // //       detailed_care_info: "",
// // //       pet_picture: null
// // //     });
// // //   };

// // //   // Handle opening the edit pet modal
// // //   const openEditPetModal = (index) => {
// // //     setPets({ ...pets[index] });
// // //     setEditPetIndex(index);
// // //     setEditPetModalOpen(true);
// // //   };

// // //   // Handle closing the edit pet modal
// // //   const closeEditPetModal = () => {
// // //     setPets({
// // //       name: "",
// // //       breed: "",
// // //       age: "",
// // //       description: "",
// // //       detailed_care_info: "",
// // //       pet_picture: null
// // //     });
// // //     setEditPetIndex(null);
// // //     setEditPetModalOpen(false);
// // //   };

// // //   // Handle updating the pet at a specific index
// // //   const updatePetByIdx = (pet, idx) => {
// // //     setPets((prevPets) => ({
// // //       ...prevPets,
// // //       [idx]: pet
// // //     }));
// // //   };

// // //   // Handle editing a pet
// // //   const handleEditPet = () => {
// // //     if (editPetIndex !== null) {
// // //       setPets((prevPets) => ({
// // //         ...prevPets,
// // //         [editPetIndex]: pets
// // //       }));
// // //     }
// // //     closeEditPetModal();
// // //   };

// // //   // Handle deleting a pet
// // //   const handleDeletePet = (index) => {
// // //     const { [index]: deletedPet, ...remainingPets } = pets;
// // //     setPets(remainingPets);
// // //   };

// // //   return (
// // //     <div>
// // //       {store.token ? (
// // //         <div className="account_form">
// // //           <h2>Client information</h2>
// // //           {/* ... (user data form fields) */}

// // //           <div className="form-group">
// // //             <div>
// // //               <label htmlFor="fisrt_name">first name *</label>
// // //               <input
// // //                 type="text"
// // //                 id="first_name"
// // //                 name="first_name"
// // //                 value={userData.first_name}
// // //                 onChange={handleUserChange}
// // //                 <div>
// // //                 <label htmlFor="last_name"> last name *</label>
// // //                 <input
// // //                   type="text"
// // //                   id="last_name"
// // //                   name="last_name"
// // //                   value={userData.last_name}
// // //                   onChange={handleUserChange}
// // //                 />
// // //               </div>
// // //               />
// // //             </div>
// // //             <div>
// // //               <label htmlFor="email">email *</label>
// // //               <input
// // //                 type="text"
// // //                 id="email"
// // //                 name="email"
// // //                 value={userData.email}
// // //                 onChange={handleUserChange}
// // //               />
// // //             </div>

// // //             <div>
// // //               <label htmlFor="address">Address *</label>
// // //               <input
// // //                 type="text"
// // //                 id="address"
// // //                 name="address"
// // //                 value={userData.address}
// // //                 onChange={handleUserChange}
// // //               />
// // //             </div>
// // //             <div>
// // //               <label htmlFor="city">City *</label>
// // //               <input
// // //                 type="text"
// // //                 id="city"
// // //                 name="city"
// // //                 value={userData.city}
// // //                 onChange={handleUserChange}
// // //               />
// // //             </div>
// // //             <div>
// // //               <label htmlFor="state">State *</label>
// // //               <input
// // //                 type="text"
// // //                 id="state"
// // //                 name="state"
// // //                 value={userData.state}
// // //                 onChange={handleUserChange}
// // //               />
// // //             </div>
// // //             <div>
// // //               <label htmlFor="zip">Zip *</label>
// // //               <input
// // //                 type="text"
// // //                 id="zip"
// // //                 name="zip"
// // //                 value={userData.zip}
// // //                 onChange={handleUserChange}
// // //               />
// // //             </div>
// // //             <div>
// // //               <label htmlFor="phone_number">Phone number *</label>
// // //               <input
// // //                 type="text"
// // //                 id="phone_number"
// // //                 name="phone_number"
// // //                 value={userData.phone_number}
// // //                 onChange={handleUserChange}
// // //               />
// // //             </div>
// // //           </div>
// // //           <div className="pet_form">
// // //             <h2>Pet information</h2>
// // //             {Object.keys(pets).map((petKey) => (
// // //               <div key={petKey}>
// // //                 <PetForm petFormData={pets[petKey]} idx={petKey} handlePetChange={updatePetByIdx} />
// // //                 <button type="button" onClick={() => openEditPetModal(petKey)}>
// // //                   Edit Pet
// // //                 </button>
// // //                 <button type="button" onClick={() => handleDeletePet(petKey)}>
// // //                   Delete Pet
// // //                 </button>
// // //               </div>
// // //             ))}
// // //             {/* Edit pet modal */}
// // //             {editPetModalOpen && (
// // //               <div>
// // //                 editPetModalOpen && (
// // //                 <div>
// // //                   <h2>Edit Pet</h2>
// // //                   <PetForm petFormData={pets[editPetIndex]} handlePetChange={handlePetChange} />
// // //                   <button type="button" onClick={handleEditPet}>
// // //                     Save Changes
// // //                   </button>
// // //                   <button type="button" onClick={closeEditPetModal}>
// // //                     Cancel
// // //                   </button>
// // //                 </div>
// // // )}
// // //                 {!editPetModalOpen && (
// // //                   <>
// // //                     <button type="button" onClick={addPet}>
// // //                       Add Pet
// // //                     </button>
// // //                     <button type="button" onClick={handleSubmit}>
// // //                       Submit
// // //                     </button>
// // //                   </>
// // //                 )}
// // //               </div>
// // //             ) : (
// // //             <div>
// // //               <p>You are not authorized to view this page. Please log in.</p>
// // //             </div>
// // //       )}
// // //           </div>
// // //           );
// // // };
