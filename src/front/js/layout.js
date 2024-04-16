import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Services } from './pages/services'
import { Schedule } from './pages/schedule.js'
import { Insurance } from "./pages/insurance";
import injectContext from "./store/appContext";
import { MobileNav } from "./component/MobileNav.js";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { ForgottenPassword } from "./pages/forgottenPassword";
import { ResetPassword } from "./pages/resetPassword";

import { SignupUser } from "./pages/SignupUser";
import { AboutMe } from "./pages/AboutMe";
import { Account } from "./pages/Account";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    // if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <MobileNav />
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<AboutMe />} path="/aboutMe" />
                        <Route element={<ForgottenPassword />} path="/forgotten-password" />
                        <Route element={<Schedule />} path="/schedule/:typeOfSchedule" />
                        <Route element={<SignupUser />} path="/signupUser" />
                        <Route element={<Services />} path="/services" />
                        <Route element={<Insurance />} path="/insurance" />
                        <Route element={<Account />} path="/account" />
                        <Route element={<ResetPassword />} path="/reset-password" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
