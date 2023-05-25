import axios from "axios";
import { IUniversity } from "../../app/models/interfaces";
import { API_URL } from "../../constants/constants";

export function fetchUniversitiesAPI(country: string) {
  return axios.get<IUniversity[]>(`${API_URL}/search?country=${country}`);
}
