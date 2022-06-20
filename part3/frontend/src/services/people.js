import axios from "axios"
const url = "/api/persons"

const getAll = async () => (await axios.get(url)).data

const create = async (data) => (await axios.post(url, data)).data

const deleteNum = async (id) => (await axios.delete(`${url}/${id}`)).data

const update = async (id, data) => (await axios.put(`${url}/${id}`, data)).data

const api = { getAll, create, update, deleteNum }

export default api
