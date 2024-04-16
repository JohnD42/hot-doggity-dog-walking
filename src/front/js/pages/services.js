import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import '../../styles/services.css'
import dogwalkingpic from '../../img/dogwalkingpic.jpg'
import petcheckinpic from '../../img/petcheckinpic.jpg'
import meetandgreet from '../../img/meetandgreet.jpg'
import petsittingpic from '../../img/petsittingpic.jpg'
import { Context } from "../store/appContext";

export const Services = () => {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    document.body.className = "services"

    return function cleanup() {
      document.body.classList.remove('services')
    }
  }, [])

  return (
    <div>
      {sessionStorage.getItem("token") ? (
        <div className="container-fluid mx-auto services">
          <div className="mx-auto" id="cards" onMouseMove={(e) => {
            for (const card of document.getElementsByClassName("card")) {
              const rect = card.getBoundingClientRect(),
                x = e.clientX - rect.left,
                y = e.clientY - rect.top;

              card.style.setProperty("--mouse-x", `${x}px`);
              card.style.setProperty("--mouse-y", `${y}px`);
            }
          }}>
            <div className="row d-flex w-100 mx-auto">
              <div className="col-md-6 col-s-12">
                <Link to="/schedule/dog-walk" style={{ textDecoration: 'none' }}>
                  <div className="card">
                    <div className="card-border">
                      <div className="card-content">
                        <div className="card-image">
                          <img src={dogwalkingpic} alt="Dog Walking" />
                        </div>
                        <div className="card-info-wrapper">
                          <div className="card-info">
                            <div className="card-info-title text-center">
                              <h3>Schedule a Dog Walk</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-6 col-s-12">
                <Link to="/schedule/pet-check-in" style={{ textDecoration: 'none' }}>
                  <div className="card">
                    <div className="card-border">
                      <div className="card-content">
                        <div className="card-image">
                          <img src={petcheckinpic} alt="Pet Check-In" />
                        </div>
                        <div className="card-info-wrapper">
                          <div className="card-info">
                            <div className="card-info-title text-center">
                              <h3>Schedule a Pet Check In</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-6 col-s-12">
                <Link to="/schedule/meeting" style={{ textDecoration: 'none' }}>
                  <div className="card">
                    <div className="card-border">
                      <div className="card-content">
                        <div className="card-image">
                          <img src={meetandgreet} alt="Meeting" />
                        </div>
                        <div className="card-info-wrapper">
                          <div className="card-info">
                            <div className="card-info-title text-center">
                              <h3>Schedule a Meeting</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-6 col-s-12">
                <Link to="/schedule/pet-sitting" style={{ textDecoration: 'none' }}>
                  <div className="card">
                    <div className="card-border">
                      <div className="card-content">
                        <div className="card-image">
                          <img src={petsittingpic} alt="Pet Sitting" />
                        </div>
                        <div className="card-info-wrapper">
                          <div className="card-info">
                            <div className="card-info-title text-center">
                              <h3>Schedule a Pet Sitting</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>You are not authorized to view this page. Please log in.</p>
        </div>
      )}
    </div>
  );
};