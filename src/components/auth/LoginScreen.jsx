import React from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { startLogin } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";

export const LoginScreen = () => {
  const dispatch = useDispatch();

  const [formValues, handleInputChange] = useForm({
    email: "",
    password: "",
  });

  const { email, password } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    //VALIDACIONES
    const validation = /^(([^<>()[\].,;:\s@”]+(\.[^<>()[\].,;:\s@”]+)*)|(”.+”))@(([^<>()[\].,;:\s@”]+\.)+[^<>()[\].,;:\s@”]{2,})$/;
    if (validation.test(email) && password.length >= 8) {
      dispatch(startLogin(email, password));
    } else if (email === "" || password === "") {
      Swal.fire("Hay algo vacío :P");
    } else {
      Swal.fire("Ingresa un correo y contraseña válidos :P");
    }
  };


  return (
    <>
      <header className="header-login">
        <div className="form-box-login animate__animated animate__fadeIn">
          <form onSubmit={handleSubmit}>
            <h1>Iniciar Sesión</h1>
            <input
              className="input-login"
              type="email"
              name="email"
              placeholder="Correo Electrónico"
              autoComplete="off"
              value={email}
              onChange={handleInputChange}
            />

            <input
              className="input-login"
              type="password"
              name="password"
              placeholder="Contraseña"
              value={password}
              onChange={handleInputChange}
            />

            <motion.button
              className="input-submit"
              type="submit"
              whileTap={{ scale: 1.3 }}
            >
              Ingresar
            </motion.button>
          </form>
          <Link className="form-link" to="/auth/register">
            O crear una nueva cuenta
          </Link>
          <p className="love">Made with ❤️ by Daniel Díaz</p>
        </div>
      </header>
    </>
  );
};
