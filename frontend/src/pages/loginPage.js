import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ImageShowCase from "../components/Layout/ImageShowCase";
import LoginCard from "../components/Layout/loginCard";
import Tags from "../components/Layout/Tags";
import Footer from "../components/Common/Footer";
import { useNavigate, useLocation, Navigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  console.log(user);

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
