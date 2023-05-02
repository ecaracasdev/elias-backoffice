import axios from 'axios'

const BASE_URL = "http://13.59.179.196:1337/api/"

export const instance = axios.create({
    baseURL: BASE_URL
})
