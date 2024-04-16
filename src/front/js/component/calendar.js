import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";

import { Context } from "../store/appContext";
import '../../styles/calendar.css'

export const Calendar = () => {
    const { store, actions } = useContext(Context);
    const [currentMonthName, setCurrentMonthName] = useState('')
    const [year, setYear] = useState(2023)
    const [calendarDays, setCalendarDays] = useState('')
    const [monthList, setMonthList] = useState('')
    const [showMonthList, setShowMonthList] = useState(false)
    const curr_Date = new Date()
    const [currMonth, setCurrMonth] = useState({ "value": curr_Date.getMonth() })
    const [currYear, setCurrYear] = useState({ "value": curr_Date.getFullYear() })

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const isLeapYear = (year) => {
        return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)
    }

    const getFebDays = (year) => {
        return isLeapYear(year) ? 29 : 28
    }
    const daysOfMonth = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    const generateCalendar = (month, year) => {

        const currentDate = new Date()
        setCurrentMonthName(monthNames[month])

        const firstDay = new Date(year, month, 1)

        const generateDays = () => {
            const daysArr = Array.from({ length: (daysOfMonth[month] + firstDay.getDay()) }, (x, i) => i)
            const newDaysArr = daysArr.map((i) => {
                if (i >= firstDay.getDay()) {
                    return (
                        `<div className='calendar-day-hover' data-day=${i - firstDay.getDay() + 1} data-month=${month} data-year=${year}>
                            ${i - firstDay.getDay() + 1}
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                        </div>`
                    )
                }
                else if (i - firstDay.getDay() + 1 === currentDate.getDate() && year === currentDate.getFullYear() && month === currentDate.getMonth()) {
                    return (
                        `<div className='calendar-day-hover curr-date' data-day=${i - firstDay.getDay() + 1} data-month=${month} data-year=${year}>
                            ${i - firstDay.getDay() + 1}
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                        </div>`
                    )
                }
                else {
                    return (
                        `<section>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </section>`
                    )
                }
            })
            const calendarDays = (
                <div className="calendar-days" dangerouslySetInnerHTML={{ __html: newDaysArr.join('') }} onClick={(e) => {
                    const el = e.target.closest("div");
                    if (el && e.currentTarget.contains(el)) {
                        actions.setTimeslotsStartingDay({
                            "date": el.getAttribute('data-day'),
                            "month": el.getAttribute('data-month'),
                            "year": el.getAttribute('data-year')
                        })
                        actions.changeActiveScheduleTab('nav-timeslots')
                    }
                }}
                >
                </div>
            )
            return calendarDays
        }

        setCalendarDays(generateDays())
    }

    const generateMonthList = () => {
        const monthListArr = monthNames.map((item, index) => {
            return (
                `<div data-month=${index}>
                        ${item}
                    </div>`
            )
        })
        return (
            <div className={`month-list ${showMonthList == true ? 'show' : ''}`} dangerouslySetInnerHTML={{ __html: monthListArr.join('') }} onClick={(e) => {
                const el = e.target.closest("div");
                if (el && e.currentTarget.contains(el)) {
                    setShowMonthList(false)
                    setCurrMonth({ "value": el.getAttribute('data-month') })
                    generateCalendar(el.getAttribute('data-month'), currYear.value)
                }
            }}>
            </div>
        )
    }

    useEffect(() => {
        const curr_Date = new Date
        setCurrMonth({ 'value': curr_Date.getMonth() })
        setCurrYear({ 'value': curr_Date.getFullYear() })
        generateCalendar(curr_Date.getMonth(), curr_Date.getFullYear())
        const monthlist = generateMonthList()
        setMonthList(monthlist)
    }, [])

    useEffect(() => {
        setMonthList(generateMonthList())
    }, [showMonthList])

    useEffect(() => {
        setCurrentMonthName(monthNames[currMonth.value])
    }, [currMonth.value])

    return (
        <div className="container-fluid">
            <div className="calendar">
                <div className="calendar-header">
                    <span className="month-picker" id="month-picker" onClick={() => {
                        setShowMonthList(true)
                    }}>
                        {currentMonthName}
                    </span>
                    <div className="year-picker">
                        <span className="year-change" id="prev-year" onClick={() => {
                            setCurrYear({ 'value': currYear.value - 1 })
                            generateCalendar(currMonth.value, currYear.value - 1)
                        }}>
                            {'<'}
                        </span>
                        <span id="year">{currYear.value}</span>
                        <span className="year-change" id="next-year" onClick={() => {
                            setCurrYear({ 'value': currYear.value + 1 })
                            generateCalendar(currMonth.value, currYear.value + 1)
                        }}>
                            {'>'}
                        </span>
                    </div>
                </div>
                <div className="calendar-body">
                    <div className="calendar-week-day">
                        <div>Sun</div>
                        <div>Mon</div>
                        <div>Tue</div>
                        <div>Wed</div>
                        <div>Thu</div>
                        <div>Fri</div>
                        <div>Sat</div>
                    </div>
                    {calendarDays}
                </div>
                {monthList}
            </div>
        </div>
    );
};
