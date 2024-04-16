const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            token: null,
            timeSlotsStartingDay: {
                "date": new Date().getDate(),
                "month": new Date().getMonth(),
                "year": new Date().getFullYear()
            },
            activeScheduleTab: "nav-timeslots",
            payPalToken: null,
            paymentSuccessful: false,
        },
        actions: {
            changeActiveScheduleTab: (payload) => {
                setStore({ activeScheduleTab: payload });
            },
            login: async (email, password) => {
                try {
                    let options = {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email, password }),
                    };
                    const response = await fetch(process.env.BACKEND_URL + "/api/login", options);
                    console.log('Login response:', response);
                    if (response.status === 200) {
                        const data = await response.json();
                        console.log("access token", data.access_token);
                        sessionStorage.setItem("token", data.access_token);
                        sessionStorage.setItem("email", email);
                        setStore({
                            token: data.access_token,
                            email: email,
                        });
                        return true;
                    } else {
                        console.error("Login failed. Please check your credentials.");
                        return false;
                    }
                } catch (error) {
                    console.error("Login error:", error);
                    alert("An error occurred during login.");
                    return false;
                }
            },
            signup: async (formData) => {
                try {
                    const response = await fetch("/api/signup", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "email": formData.email,
                            "password": formData.password,
                            "first_name": formData.first_name,
                            "last_name": formData.last_name
                        })
                    });
                    let data = await response.json();
                    if (data) {
                        console.log(data.message);
                        return true;
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            getUser: async () => {
                try {
                    const token = sessionStorage.getItem("token");
                    const response = await fetch('/api/user',
                        {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`,
                            }

                        }

                    )
                    let data = await response.json();
                    return await data
                }
                catch (error) {
                    throw new Error(`Error: ${error.message}`);
                }


            },
            getPets: async () => {
                try {
                    const token = sessionStorage.getItem("token");
                    const response = await fetch(`${process.env.BACKEND_URL}/api/pets`,
                        {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`,
                            }

                        }

                    )
                    let data = await response.json();
                    return await data
                }
                catch (error) {
                    throw new Error(`Error: ${error.message}`);
                }
            },
            updateAccount: async (userData) => {
                try {
                    const token = sessionStorage.getItem("token");

                    const response = await fetch(`${process.env.BACKEND_URL}/api/account`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                        body: JSON.stringify(

                            userData

                        ),
                    });
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return await response.json();
                } catch (error) {
                    throw new Error(`Error: ${error.message}`);
                }
            },
            updatePet: async (petData) => {
                console.log(petData)
                try {
                    const token = sessionStorage.getItem("token");
                    console.log(JSON.stringify(petData))

                    const response = await fetch(`${process.env.BACKEND_URL}/api/pets`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                        body: JSON.stringify(petData),
                    });
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.message}`);
                    }
                    return await response.json();
                } catch (error) {
                    throw new Error(`Error: ${error.message}`);
                }
            },
            resetPassword: (token, newPassword) => {
                const store = getStore();
                console.log("Reset Password Request:", process.env.BACKEND_URL + "/api/reset-password");
                console.log("Token:", token);
                console.log("New Password:", newPassword);

                return fetch(process.env.BACKEND_URL + "/api/reset-password", {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token: token, new_password: newPassword }),
                })
                    .then(response => {
                        console.log("Reset Password Response:", response);

                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error('Error resetting password.');
                        }
                    })
                    .catch(error => {
                        console.error("Reset Password Error:", error);
                        throw error;
                    });
            },
            setAccessToken: (savedToken) => {
                setStore({ token: savedToken });
            },
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },
            setTimeslotsStartingDay: (obj) => {
                setStore({ timeSlotsStartingDay: obj });
            },
            setPaymentSuccessful: (payload) => {
                setStore({ paymentSuccessful: payload });
            },
            logout: async () => {
                sessionStorage.removeItem("token");
                setStore({ token: null });
            }
        }
    };
};

export default getState;
