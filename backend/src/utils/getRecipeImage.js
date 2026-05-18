const { createClient } = require('pexels');


const client = createClient(process.env.PEXELS_API_KEY)

const getRecipeImage = async(recipeTitle)=>{
    try{
       const response = await client.photos.search({
        query:`${recipeTitle} food`,
        per_page:1
       })
       
       if(!response.photos || response.photos.length === 0){
         throw new Error("error fetching images")
       }

        return response.photos[0].src.large

    }catch(error){
         throw new Error(`error to get images ${error}`)
    }
}



module.exports = getRecipeImage