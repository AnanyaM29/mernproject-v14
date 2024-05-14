// import React from "react";
// import Layout from "../components/Layouts/Layout";
// import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
// const Contact = () => {
//   return (
//     <Layout title={"Contact us"}>
//       <div className="row contactus ">
//         <div className="col-md-6 ">
//           <img
//             src="/images/contactus.jpeg"
//             alt="contactus"
//             style={{ width: "100%" }}
//           />
//         </div>
//         <div className="col-md-4">
//           <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
//           <p className="text-justify mt-2">
//             any query and info about prodduct feel free to call anytime we 24X7
//             vaialible
//           </p>
//           <p className="mt-3">
//             <BiMailSend /> : ananyamathuremail@gmail.com
//           </p>
//           <p className="mt-3">
//             <BiPhoneCall /> : 012-3456789
//           </p>
//           <p className="mt-3">
//             <BiSupport /> : 1800-0000-0000 (toll free)
//           </p>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Contact;
import React from "react";
import Layout from "../components/Layouts/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={"Contact Us"}>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="/images/contacts.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-6">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            Need some help? Contact us @.
          </p>
          <p className="mt-3">
            <BiMailSend /> Email: <a href="mailto:ananyamathuremail@gmail.com">ananyamathuremail@gmail.com</a>
          </p>
          <p className="mt-3">
            <BiPhoneCall /> Phone: <a href="tel:0123456789">012-345-6789</a>
          </p>
          <p className="mt-3">
            <BiSupport /> Toll-Free: <a href="tel:18000000000">1-800-0000-0000 (toll-free)</a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
