import React from "react";
import Layout from "../components/Layout";
import useInput from "../Hooks/useInput";
import { useState } from "react";

export default function Register() {
  const formData = {
    name: "",
    password: "",
    email: "",
  };
  const [form, setForm] = useState({
    name: formData.name,
    password: formData.password,
    email: formData.email,
  });
  const [message, setMenssage] = useState([]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    postData(form);
  };
  const postData = async (form) => {
    try {
      console.log(form);
      const res = await fetch("/api/auth/register", {
        method: "POST",
      
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      console.log("res=>",res)
      const data = await res.json();
      console.log(data);

      
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div>
        <h1>registrate</h1>
        <div className="contenedorRegistro">
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                nombre
                <input
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  name="name"
                />
              </label>
            </div>
            <div>
              <label>
                Email
                <input
                  type="text"
                  value={form.email}
                  onChange={handleChange}
                  name="email"
                />
              </label>
            </div>
            <div>
              <label>
                Contraseña
                <input
                  type="text"
                  value={form.password}
                  onChange={handleChange}
                  name="password"
                />
              </label>
            </div>
            <div>
              <button type="submit">
                enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
