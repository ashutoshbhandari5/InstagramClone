import React from "react";
import ImageShowCase from "../../components/Layout/ImageShowCase/ImageShowCase";
import LoginCard from "../../components/Layout/LoginCard/loginCard";
import Tags from "../../components/Layout/Extras/Tags";
import Footer from "../../components/Common/Footer/Footer";

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
