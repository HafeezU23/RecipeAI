import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000',
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

