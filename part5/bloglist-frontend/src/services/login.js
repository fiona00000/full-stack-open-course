import axios from "axios";
const baseUrl = 'http://localhost:3003/api/login'

const login = async credentitals => {
    const response = await axios.post(baseUrl, credentitals)
    return response.data
}

export default { login }