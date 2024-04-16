import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
// import {MobileHome.css} from "../../styles/MobileHome.css"

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setShowModal(false); // Close the modal on resize if it's open
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        console.error('Please enter both email and password.');
        return;
      }

      const loginSuccess = await actions.login(email, password);
      if (loginSuccess) {
        console.log('Login successful');
        setShowModal(false); // Close the login modal
        navigate("/");
      } else {
        console.error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
    }
  };

  let greeting;

  if (sessionStorage.getItem("token")) {
    greeting = <h1>Welcome back!</h1>;
  } else {
    greeting = <h1>Hi, already a part of the family? Welcome back!</h1>;
  }


  return (
    <div className="container-fluid homePage">
      <div className="row homePageText">
        <h6 className="col-auto">
          Having a dedicated pet caregiver provides priceless peace of mind,
          ensuring your furry friend gets the attention and care they need. As a
          committed caregiver, I address both basic needs and understand their
          emotional well-being. Daily walks are a vital commitment to your dog's
          health and happiness, fostering both interaction and exercise. This
          bond positively impacts their mental and physical well-being, ensuring
          a fulfilling life in your absence.
        </h6>
      </div>
      <div className="row homePageMiddleRow  d-md-none ">
        <div className="container d-flex">
          <div className="row row-cols-1 row-cols-md-4">
            <div className="aboutMePic">
              <img
                src="https://cdn.pixabay.com/photo/2015/03/14/05/37/beagle-672798_1280.jpg"
                className="img-fluid rounded"
                alt="Dog Pic"
              />
              <Link to="/AboutMe" className="btn btn-secondary aboutMeButton">About Me</Link>
            </div>

            <div className="center processBox">
              {greeting}
              {!sessionStorage.getItem("token") && (
                <button
                  type="button"
                  className="btn btn-secondary loginButton"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => setShowModal(true)}
                >
                  Log in
                </button>
              )}
              <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
                style={{ display: showModal ? 'block' : 'none' }}
                onClick={() => setShowModal(false)}
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      {/* Close button (x) to close the modal */}
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={() => setShowModal(false)}
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div>
                        <div className="mb-3">
                          <label
                            htmlFor="exampleInputEmail1"
                            className="form-label"
                          >
                            Email address
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <div id="emailHelp" className="form-text"></div>
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="exampleInputPassword1"
                            className="form-label"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>

                        <div
                          className={`modal fade ${showModal ? 'show' : ''}`}
                          id="exampleModal"
                          tabIndex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                          style={{ display: showModal ? 'block' : 'none' }}
                          onClick={() => setShowModal(false)}
                        ></div>
                      </div>
                    </div>
                    <div className="modal-footer d-flex justify-content-center align-items-center">
                      <button
                        type="button"
                        className="btn btn-secondary loginButton"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={handleLogin} >
                        submit
                      </button>

                      <Link to="/forgotten-password" className="forgotPasswordLink ms-2">
                        Forgot Password?
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="starNowPic">
              <img
                src="https://cdn.pixabay.com/photo/2023/10/26/15/33/dog-training-8342962_1280.jpg"
                className="img-fluid rounded"
                alt="Dog Pic"
              />
              <Link to="/signupUser" className=" btn btn-secondary StartNowText">Click here to join the family</Link>
            </div>
          </div>
        </div>
      </div>
      <br>
      </br>
      <h4 className="row servicesText">
        <ul>
          My steps to join the family:
          <br>
          </br>
          <br>
          </br>
          <li>Visit our website and sign up for Hot Doggity dog walking services.</li>
          <span></span>
          <br>
          </br>
          <li>Share your contact information and details about your pet, including preferences, habits, and any special needs.</li>
          <span></span>
          <br>
          </br>
          <li>After signing up, we'll schedule a meet-and-greet to personally connect with your pet, understand their unique personality, and discuss your specific requirements.</li>
          <span></span>
          <br>
          </br>
          <li>Once the meet-and-greet is complete, easily schedule services through our user-friendly online system. </li>
          <span></span>
          <br>
          </br>
          <li>Choose days and times that suit your pet's routine, and our professional dog walkers will provide the care, attention, and exercise your pet deserves.</li>
          <span></span>
          <br>
          </br>
          At Hot Doggity Dog Walkers, we're dedicated to creating a personalized, stress-free experience for both you and your pet. Our goal is to ensure your furry companion stays happy and healthy while you're away.
        </ul>
      </h4>
      <br>
      </br>


      {/* <div id="carouselExampleFade" className="carousel slide carousel-fade" >
        <div className=" carouselView carousel-inner">
          <div className="carousel-item active">
            <img src="https://cdn.pixabay.com/photo/2019/12/30/05/30/cockatiel-4728876_1280.jpg" className="d-block w-100" alt="" />
            <div className="carousel-caption position-absolute top-0 start-0">
              <p className=" reviewText overlay-text">
                Kelly deserves a glowing 5-star review!
                Their exceptional care for my birds during my beach trip exceeded my expectations.
                Regular updates and a relaxing return home makes her the top choice for pet sitting.
                Highly recommend this reliable and caring service! ⭐️⭐️⭐️⭐️⭐️</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="https://cdn.pixabay.com/photo/2018/04/23/14/38/dog-3344414_1280.jpg" className="d-block w-100" alt="..." />
            <div className="carousel-caption position-absolute top-0 start-0">
              <p className=" reviewText overlay-text">

                Kelly, the dog walker, is a miracle worker!
                She did an incredible job with my usually shy dog,
                making every walk a joyful experience.
                Her patience and expertise deserve a solid 5 stars.
                ⭐️⭐️⭐️⭐️⭐️</p>
            </div>

          </div>
          <div className="carousel-item">
            <img src="https://cdn.pixabay.com/photo/2017/08/02/10/01/people-2570587_1280.jpg" className="d-block w-100" alt="..." />
            <div className="carousel-caption position-absolute top-0 start-0">
              <p className=" reviewText overlay-text">

                Kelly is a lifesaver! While I was on a business trip,
                she took exceptional care of my cat, ensuring timely and nourishing meals.
                Her attention to detail and reliability earn her a well-deserved 5-star rating. ⭐️⭐️⭐️⭐️⭐️

              </p>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div> */}
    </div>
  );
};












