import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    // Get promise into request variable
    const request = axios.get(baseUrl)

    // Return response.data
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

export default { getAll, create }