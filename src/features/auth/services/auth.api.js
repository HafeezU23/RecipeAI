import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
})

export const register = async({fullname, username, email, password})=>{
             try {
                const response = await api.post('/api/auth/register', {fullname, username, email, password})
                return response.data
             } catch (error) {
                throw Error(error.response.data.message)
             }
}

export const signIn = async(firebaseToken)=>{
    try {
        const response = await api.get('/api/auth/login',{headers:{Authorization: `bearer ${firebaseToken}`}})
        return response.data;
    } catch (error) {
        throw Error(error.response.data.message)
    }

}

export const deleteAccount = async(firebaseToken)=>{

    try{
      const response = await api.delete('/api/auth/delete-account',{headers:{Authorization: `bearer ${firebaseToken}`}})
      return response.data
    }catch(error){
        throw Error(error.response.data.message)
    }
}

