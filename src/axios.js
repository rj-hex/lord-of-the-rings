import axios from "axios";

const instance = axios.create({
    baseURL: 'https://the-one-api.dev/v2',
    headers: { 'Authorization': 'Bearer ' + process.env.REACT_APP_ACCESS_TOKEN }
});

export default instance;