import React from "react";
import ImageShowCase from "../components/Layout/ImageShowCase";
import LoginCard from "../components/Layout/loginCard";
import Tags from "../components/Layout/Tags";
import Footer from "../components/Common/Footer";

const LoginPage = () => {
  return (
    <section className="login-page">
      <main className="flex-element main-section">
        <article className="article-section">
          <ImageShowCase />
          <LoginCard />
        </article>
        <Tags />
        <footer>
          <Footer />
        </footer>
      </main>
    </section>
  );
};

export default LoginPage;
