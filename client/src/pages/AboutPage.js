import React from "react";
import Layout from "../components/Layouts/Layout";

const AboutPage = ()=>{
    return(
        <Layout title={"About us - projectlab"}>
        <div className="row contactus ">
          <div className="col-md-6 ">
            <img
              src="/images/aboutus.jpeg"
              alt="contactus"
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-md-4">
            <p className="text-justify mt-2">
            Welcome! This is the about page!
            </p>
          </div>
        </div>
      </Layout>
    );
}

export default AboutPage;