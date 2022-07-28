import axios from 'axios';
import env from "./environment.json"


export const API = axios.create({
    baseURL: env.BASE_URL
})

export const HOSTED_URL = env.HOSTED_URL