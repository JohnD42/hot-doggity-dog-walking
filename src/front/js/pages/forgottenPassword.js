import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
export const ForgottenPassword = () => {

    const [email, setEmail] = useState("");
    const [messageStatus, setMessageStatus] = useState("pending")
    

    const handleResetPassword = async () => {
        
        console.log(email)
        let options = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ email: email })
        }
        try {
            let response = await fetch(process.env.BACKEND_URL + "/api/forgotten-password", options)
            if (response.status == 200) {
                setMessageStatus("sent")
            }
            else {
                alert("email doesn't exist")
            }
        }
        catch (error) {
            console.log(error)
            alert(error)
        }
    }
    switch (messageStatus) {
        case "pending":
            return (
                <div className="container pt-3"  >
                    <div className="Card mx-auto" style={{ width: "25rem" }}>
                        <h3 className="text-center">Reset your password</h3>
                        <p className="text-center">Enter the email address registered with your account. We'll email you a temporary password, so that you may access your account and change your password.</p>
                        <p className="text-center fst-italic fw-normal fs-6 text-decoration-underline">Please, enter your email address in lower case</p>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" />
                        <button className="btn btn-outline-primary mt-3 w-100" onClick={handleResetPassword } type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">Continue</button>
                    </div>
                </div>
            )
            break;
        case "sent":
            return (
                <div className="container pt-3">
                    <div className="Card mx-auto text-center " style={{ width: "18rem" }}>
                        <div className="card-body">
                            <h5 className="card-title">Success!</h5>
                            <p className="card-text">Check your email!</p>
                            <p className="card-text"> You'll receive an email shortly with a reset password link</p>
                            <Link to="/"><a href="#" className="btn btn-primary">Go to the home page</a></Link>
                        </div>
                    </div>
                </div>
            )
            break;
        default:
        // code block
    }

    return (
        <div className="container pt-3"  >
            <div className="Card mx-auto" style={{ width: "25rem" }}>
                <h3 class="text-center">Reset your password</h3>
                <p class="text-center">Enter the email address registered with your account. We'll email you a temporary password, so that you may access your account and change your password.</p>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" />
                <button className="btn btn-outline-primary mt-3 w-100">Continue</button>
            </div>

         </div>
 )

}