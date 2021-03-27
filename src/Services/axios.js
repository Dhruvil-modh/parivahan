import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://parivahan-server.herokuapp.com',
    withCredentials: true,
})

export default instance