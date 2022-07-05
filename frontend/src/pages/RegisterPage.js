import React from "react";
import Footer from "../components/Common/Footer";
import Store from "../components/Common/Store";
import RegisterCard from "../components/Layout/RegisterCard";
import Tags from "../components/Layout/Tags";

const RegisterPage = () => {
  return (
    <>
      <section className="register-page">
        <main className="register">
          <RegisterCard />
          <Store />
        </main>
      </section>
      <Tags />
      <Footer />
    </>
  );
};

export default RegisterPage;
