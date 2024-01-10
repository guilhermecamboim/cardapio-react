import { useMutation } from "@tanstack/react-query";
import api from "./api";

interface loginProps {
  login: string;
  password: string;
}

const fecthData = async (payload: loginProps) => {
  const expiresAt = 60 * 24;
  const response = api.post("http://localhost:8080/auth/login", payload);
  if (response.data.token) {
    const date = new Date();
    date.setTime(date.getTime() + expiresAt * 60 * 1000);

    localStorage.setItem("token", response.data.token);
  }
  return response;
};

export function useAuth() {
  const mutate = useMutation({
    mutationFn: fecthData,
    retry: 3,
  });

  return mutate;
}
