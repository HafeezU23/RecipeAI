import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
})


export const generate = async({ingredients, firebaseToken})=>{
        try{
             const response = await api.post('/api/recipe/generate', {ingredients}, {headers: {Authorization: `bearer ${firebaseToken}`}})
             return response.data
        }catch(error){
             throw Error(error.response.data.message)
        }
}


export const history = async(firebaseToken)=>{
    try{
        const response = await api.get(`/api/recipe/history`, {headers: {Authorization: `bearer ${firebaseToken}`}})
        return response.data
    }catch(error){
        throw Error(error.response.data.message)
    }
}

export const flushAllHistory = async(firebaseToken)=>{
    try{
        const response = await api.delete(`/api/recipe/delete-all`, {headers: {Authorization: `bearer ${firebaseToken}`}})
        return response.data
    }catch(error){
        throw Error(error.response.data.message)
    }
}

export const viewRecipeById = async(id, firebaseToken)=>{
    try{
        const response = await api.get(`/api/recipe/${id}`, {headers: {Authorization: `bearer ${firebaseToken}`}})
        return response.data
    }catch(error){
        throw Error(error.response.data.message)
    }
}

export const deleteRecipeById = async(id, firebaseToken)=>{
    try {
        const response = await api.delete(`/api/recipe/${id}`,{headers: {Authorization: `bearer ${firebaseToken}`}})
        return response.data
    } catch (error) {
        throw Error(error.response.data.message)
    }
}

export const updateRecipeById = async(id, {title, imageUrl, ingredientsUsed, instructions, prepTime, difficulty}, firebaseToken)=>{
    try{
        const response = await api.put(`/api/recipe/edit/${id}`, {title, imageUrl, ingredientsUsed, instructions, prepTime, difficulty}, {headers: {Authorization: `bearer ${firebaseToken}`}})
        return response.data
    }catch(error){
        throw Error(error.response.data.message)
    }
}

