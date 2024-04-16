import React, { Component } from "react";
import { Link } from "react-router-dom";

export const Lost = () => (
    <div className="mt-5 pt-5 w-50 mx-auto">
        <h1>
            Looks like you might be lost. Return <Link to='/'>home</Link>?
        </h1>
    </div>
);
