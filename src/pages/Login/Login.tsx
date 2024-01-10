import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../hooks/api";

interface InputProps {
  label: string;
  value: string | number;
  updateValue: (value: any) => void;
}

const Input = ({ label, value, updateValue }: InputProps) => {
  return (
    <>
      <label>{label}</label>
      <input value={value} onChange={(e) => updateValue(e)}></input>
    </>
  );
};

export default function Login() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    login: "",
    password: "",
  });
  const handleLogin = async () => {
    const expiresAt = 60 * 24;

    const response = await api.post(
      "http://localhost:8080/auth/login",
      formState
    );
    console.log(response);
    if (response) {
      const date = new Date();
      date.setTime(date.getTime() + expiresAt * 60 * 1000);

      localStorage.setItem("token", response.data.token);
      navigate("/");
    }
    return response.data;
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <Input
        label="login"
        value={formState.login}
        updateValue={(e) =>
          setFormState({ ...formState, login: e.target.value })
        }
      />
      <Input
        label="password"
        value={formState.password}
        updateValue={(e) =>
          setFormState({ ...formState, password: e.target.value })
        }
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
