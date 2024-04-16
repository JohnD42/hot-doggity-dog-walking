import React from 'react';
import { useLocation, Link } from "react-router-dom";

export const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/"; // Adjust the path accordingly
 

  if (!isHomePage) {
    return null; // Do not render the footer on pages other than the home page
  }

  return (
    <footer className="footer mt-auto py-3 text-center">
      <div className="container">
        <div className="dataRow row" onResize={()=> {resizeHandle()}} id ='dataRow'>
          
          <div className="col-sm-4">
          <div className="card" style={{width: '25rem', height: '55vh'}}>
            <img src="https://cdn.pixabay.com/photo/2019/12/30/05/30/cockatiel-4728876_1280.jpg" className="card-img-top" alt="" />
            <div className="card-body">
            <p className="card-text">
              Kelly deserves a glowing 5-star review!
              Their exceptional care for my birds during my beach trip exceeded my expectations.
              Regular updates and a relaxing return home make he the top choice for pet sitting.
              Highly recommend this reliable and caring service! ⭐️⭐️⭐️⭐️⭐️
            </p>
            </div>
            </div>
          </div>

          <div className="col-sm-4">
          <div className="card" style={{width: '25rem', height: '55vh'}} >
            <img src="https://cdn.pixabay.com/photo/2018/04/23/14/38/dog-3344414_1280.jpg" className="card-img-top" alt="..." />
            <div className="card-body">
              <p className="card-text">
              Kelly, the dog walker, is a miracle worker!
              She did an incredible job with my usually shy dog,
              making every walk a joyful experience.
              Her patience and expertise deserve a solid 5 stars.
              ⭐️⭐️⭐️⭐️⭐️
            </p>
            </div>
            </div>
          </div>

          <div className="col-sm-4">
          <div className="card"style={{width: '25rem', height: '55vh'}}>
            <img src="https://cdn.pixabay.com/photo/2017/08/02/10/01/people-2570587_1280.jpg" className="card-img-top" alt="..." />
            <div className="card-body">
            <p className="card-text">
              Kelly is a lifesaver! While I was on a business trip,
              she took exceptional care of my cat, ensuring timely and nourishing meals..
              Her attention to detail and reliability earn her a well-deserved 5-star rating. ⭐️⭐️⭐️⭐️⭐️
            </p>
          </div>
          </div>
          </div>
          <div className="col-sm-4">
          <div className="card"style={{width: '25rem', height: '55vh'}}>
            <img src="https://cdn.pixabay.com/photo/2022/01/27/23/35/rabbit-6973396_1280.jpg" className="card-img-top" alt="..." />
            <div className="card-body">
            <p className="card-text">
             Kelly did an amazing job watching my pet rabbit Rocky.. I will be using her services again! ⭐️⭐️⭐️⭐️⭐️
            </p>
          </div>
          </div>
        </div>
        </div>
      </div>

      <p style={{ marginTop: '50px' }}>
        Made with <i className="fa fa-heart text-danger" /> by{" "}
        <a>John Durtka, Whitney Heacock, and Anastasiia Ivanova</a>
      </p>
    </footer>
  );
};





















