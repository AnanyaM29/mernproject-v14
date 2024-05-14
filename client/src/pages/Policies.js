import React from "react";
import Layout from "../components/Layouts/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus ">
        {/* <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div> */}
        <div className="col-md-4">
        <h3>Privacy Policy</h3>
        <h3>Information We Collect</h3>
          <p>
            We collect various types of information from our users to provide
            and improve our services. This information may include personal
            details such as your name, email address, and more.
          </p>
          <h3>How We Use Your Information</h3>
          <p>
            We use the collected information to provide, maintain, and improve
            our services. This may include sending you important updates and
            notifications.
          </p>
          <h3>Sharing Your Information</h3>
          <p>
            We do not share your personal information with third parties unless
            required by law or to provide our services.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;