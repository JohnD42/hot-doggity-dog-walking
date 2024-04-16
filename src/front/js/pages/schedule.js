import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { Context } from "../store/appContext";
import { Calendar } from '../component/calendar.js'
import { Timeslots } from '../component/timeslots.js'
import { Lost } from '../component/lost.js'

import '../../styles/schedule.css'

export const Schedule = () => {
    const { store, actions } = useContext(Context);
    let { typeOfSchedule } = useParams()

    let typeOfScheduleStr = ''
    if (typeOfSchedule === 'dog-walk' || typeOfSchedule === 'meeting' || typeOfSchedule === 'pet-check-in' || typeOfSchedule === 'pet-sitting') {
        let nextUpper = false
        for (let i in typeOfSchedule) {
            if (i == 0) {
                typeOfScheduleStr = typeOfScheduleStr + typeOfSchedule[i].toUpperCase()
            }
            else if (typeOfSchedule[i] === '-') {
                typeOfScheduleStr = typeOfScheduleStr + ' '
                nextUpper = true
            }
            else if (nextUpper === true) {
                typeOfScheduleStr = typeOfScheduleStr + typeOfSchedule[i].toUpperCase()
                nextUpper = false
            } else {
                typeOfScheduleStr = typeOfScheduleStr + typeOfSchedule[i]
            }
        }
    } else {
        return (
            <Lost />
        )
    }
    if (store.token !== null) {
        return (
            <div className="container-fluid gx-0">
                <div className="row gx-0 mx-auto d-md-none">
                    <nav className="navbar bg-light-2 d-md-none py-0">
                        <div className="container-fluid">
                            <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleContent" aria-controls="navbarToggleContent" aria-expanded="false" aria-label="Toggle navigation">
                                <i className="fa-solid fa-bars"></i>
                            </button>
                        </div>
                        <div className="collapse" id="navbarToggleContent">
                            <div className="bg-light">
                                <ul className="navbar-nav horiz">
                                    <li className="horiz-li">
                                        <button className={`nav-link bg-light-2 ${store.activeScheduleTab === 'nav-timeslots' ? 'active' : ''}`} id="nav-timeslots-tab" type="button" role="tab" aria-controls="nav-timeslots" aria-selected="true" onClick={() => actions.changeActiveScheduleTab('nav-timeslots')}>
                                            <i className="fa-solid fa-table-cells"></i>
                                        </button>
                                    </li>
                                    <li className="horiz-li">
                                        <button className={`nav-link bg-light-2 ${store.activeScheduleTab === 'nav-calendar' ? 'active' : ''}`} id="nav-calendar-tab" type="button" role="tab" aria-controls="nav-monthly-calendar" aria-selected="false" onClick={() => actions.changeActiveScheduleTab('nav-calendar')}>
                                            <i className="fa-regular fa-calendar-days"></i>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="row d-flex gx-0 mx-auto">
                    <div className="col-6 mx-auto text-center">
                        <h1>{`Schedule a ${typeOfScheduleStr}`}</h1>
                    </div>
                </div>
                <div className="row flex-nowrap schedule-row gx-0">
                    <div className="col-1 px-0 bg-light-2 d-none d-md-flex sidebar">
                        <div className="d-flex flex-column align-items-sm-center pt-2 text-light h-100">
                            <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none px-3">
                                <span className="fs-5 d-none d-sm-inline sidebar-home">Home</span>
                            </a>
                            <div className="nav nav-tabs flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="nav-tab" role="tablist">
                                <button className={`nav-link ${store.activeScheduleTab === 'nav-timeslots' ? 'active' : ''}`} id="nav-timeslots-tab" type="button" role="tab" aria-controls="nav-timeslots" aria-selected="true" onClick={() => actions.changeActiveScheduleTab('nav-timeslots')}>
                                    <i className="fa-solid fa-table-cells"></i> <span className="ms-1 d-none d-sm-inline">Weekly Timeslots</span>
                                </button>
                                <button className={`nav-link ${store.activeScheduleTab === 'nav-calendar' ? 'active' : ''}`} id="nav-calendar-tab" type="button" role="tab" aria-controls="nav-monthly-calendar" aria-selected="false" onClick={() => actions.changeActiveScheduleTab('nav-calendar')}>
                                    <i className="fa-regular fa-calendar-days"></i> <span className="ms-1 d-none d-sm-inline">Monthly Calendar</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col px-0">
                        <div className="tab-content" id="nav-tabContent">
                            <div className={`tab-pane fade ${store.activeScheduleTab === 'nav-timeslots' ? 'show active' : ''}`} id="nav-timeslots" role="tabpanel" aria-labelledby="nav-timeslots-tab"><Timeslots typeOfScheduleStr={typeOfScheduleStr} typeOfSchedule={typeOfSchedule} /></div>
                            <div className={`tab-pane fade ${store.activeScheduleTab === 'nav-calendar' ? 'show active' : ''}`} id="nav-calendar" role="tabpanel" aria-labelledby="nav-calendar-tab"><Calendar /></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-s-6 mx-auto text-center">
                        <p>You must be logged in to see this page.</p>
                        <Link to="/">Log in?</Link>
                    </div>
                </div>
            </div>
        )
    }
};
