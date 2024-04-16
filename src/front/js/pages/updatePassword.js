import React from "react";

export const UpdatePassword = () => {

    return (
        <div className="container pt-3"  >
            <div className="Card mx-auto" style={{width:"25rem"}}>
                <h3 class="text-center">Reset your password</h3>
                <p class="text-center">Enter your old password and enter the new one below, which you received by email</p>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="Old password" placeholder="Old Password"/>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="New password" placeholder="New Password"/>
                <button className="btn btn-outline-primary mt-3 w-100">Continue</button>
            </div>

        </div>
    )

}