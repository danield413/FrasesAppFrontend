import React from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { startRegister } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";

export const RegisterScreen = () => {
  const dispatch = useDispatch();

  const [formValues, handleInputChange] = useForm({
    name: "",
    email: "",
    password1: "",
    password2: "",
  });

  const { name, email, password1, password2 } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    //VALIDACIONES
    const validation = /^(([^<>()[\].,;:\s@”]+(\.[^<>()[\].,;:\s@”]+)*)|(”.+”))@(([^<>()[\].,;:\s@”]+\.)+[^<>()[\].,;:\s@”]{2,})$/;
    if (email === "" || password1 === "" || password2 === "" || name === "") {
      Swal.fire("Hay algo vacío :P");
    } else if (name.indexOf(" ") !== -1) {
      Swal.fire("No se permiten espacios en el nombre de usuario");
    } else if (
      validation.test(email) &&
      password1.length >= 8 &&
      password2.length >= 8 &&
      password1 === password2
    ) {
      dispatch(startRegister(name, email, password1));
    }
  };

  return (
    <>
      <header className="header-login">
        <div className="form-box-login register animate__animated animate__fadeIn">
          <form onSubmit={handleSubmit}>
            <h1>Registrarse</h1>

            <input
              className="input-login"
              type="text"
              name="name"
              placeholder="Nombre"
              autoComplete="off"
              value={name}
              onChange={handleInputChange}
            />

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
              name="password1"
              placeholder="Contraseña"
              value={password1}
              onChange={handleInputChange}
            />

            <input
              className="input-login"
              type="password"
              name="password2"
              placeholder="Repetir contraseña"
              value={password2}
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
          <Link className="form-link" to="/auth/login">
            O crear una nueva cuenta
          </Link>
          <p className="love">Made with ❤️ by Daniel</p>
        </div>
      </header>
    </>
  );
};
