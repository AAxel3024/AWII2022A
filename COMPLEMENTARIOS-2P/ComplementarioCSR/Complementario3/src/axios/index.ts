import axios from 'axios';
const httpAxios = axios.create({
    baseURL: `http://localhost:2500/v1/sextoa/api/`
})
export{httpAxios}