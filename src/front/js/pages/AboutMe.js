import React from "react";



export const AboutMe = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 text-center aboutMeText">
                    <h1 className="aboutMeTitle">Meet Your Pet Care Specialist</h1>
                </div>
            </div>

            <div className="row">
                <div className=" col-md-6 aboutMeImage">
                    <img
                        src="https://cdn.pixabay.com/photo/2015/08/17/11/33/woman-892309_1280.jpg"
                        className="img-fluid rounded aboutMeImage"
                        alt="Kelly Johnson"
                    />
                </div>
                <div className="col-md-6">
                    <div className="aboutMeText">
                        <p>
                            Hey there! I'm Kelly Johnson, your friendly neighborhood dog walker and pet sitter. 
                            Growing up surrounded by pets, I've turned my love for animals into a full-time gig. 
                            With a degree in Animal Behavior Science, I've got a knack for understanding what our 
                            furry friends need.
                        </p>

                        <p>
                            I pride myself on personalized care, whether it's a morning stroll or a cozy night in. 
                            Beyond the leash, you'll find me organizing local dog playdates and volunteering at 
                            the animal shelter. I'm not just a pet sitter; I'm a genuine friend to every pet I meet.
                        </p>

                        <p>
                            Let's make some pawsitive memories together! 🐾
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
