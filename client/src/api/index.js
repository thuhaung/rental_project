import axios from "axios";


const url = "http://localhost:3000/";

export const fetch = () => axios.get(url);