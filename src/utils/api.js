import { API_ROUTES } from "./constant";
import axios from "axios";


export async function loginUser(payload){
    try{
        console.log("pay;load is her e::",payload);

        const URL = API_ROUTES.LOGIN;
        const response = await axios.post(URL,payload);
        localStorage.setItem("token", response.data.token);
        return response

    }catch(error){
        console.log("error are here!!",error);
    }
}



export const allUserData = async (page = 1, perPage = 4) => {
    try {
      const response = await axios.get(`https://reqres.in/api/users`, {
        params: { page, per_page: perPage },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return { data: [], error: error.message };
    }
  };


export async function getSingleUserData(id){
    try{
        const URL = API_ROUTES.SINGLE_USER_INFO + id;
        const response = await axios.get(`${URL}`);
        return response.data;

    }catch(error){
        throw error.message;
    }

}