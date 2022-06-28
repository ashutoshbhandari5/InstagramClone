import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ImageShowCase from "../components/Layout/ImageShowCase";
import LoginCard from "../components/Layout/loginCard";
import Tags from "../components/Layout/Tags";
import Footer from "../components/Common/Footer";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const { user, loading } = auth;
  console.log(user, loading);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  return (
    <section className="login-page">
      <main className="flex-element main-section">
        <article className="article-section">
          <ImageShowCase />
          <LoginCard loading={loading} />
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
