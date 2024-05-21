import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3"; 
// const TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;
const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NTgyYzUzZDc2M2FiNWY5MzJiOGRjN2U2Y2UwYTU2MCIsInN1YiI6IjY1MzgzOTg5ZjQ5NWVlMDBjNTE2N2NkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._6sEPcE-bueQSXu4hQfeK2lq3vqEIXCjPl5S1E20q2w";

//for sending into the api's headers 
const headers = {
    Authorization: "bearer " + TOKEN
}

export const fetchDataFromApi = async (url, params) => {
    try{
        const {data} = await axios?.get(BASE_URL + url, {
            headers,
            params
        });
        return data;
    }catch(err){
        console.log("error: ", err);
        return err;
    }
}