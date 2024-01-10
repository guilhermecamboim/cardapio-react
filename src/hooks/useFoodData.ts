import { AxiosPromise } from "axios";
import { FoodData } from "../interface/FoodData";
import { useQuery } from "@tanstack/react-query";
import api from "./api";

const fecthData = async (): AxiosPromise<FoodData[]> => {
  const response = api.get("http://localhost:8080/food");
  return response;
};

export function useFoodData() {
  const query = useQuery({
    queryFn: fecthData,
    queryKey: ["food-data"],
    retry: 2,
  });

  return { ...query, data: query.data?.data };
}
