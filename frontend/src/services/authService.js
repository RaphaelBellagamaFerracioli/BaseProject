import {api, requestConfig} from "../utils/config"

//registra um usuario
const register = async(data)=>{

    const config  = requestConfig("POST", data)
    try {

            const res = await fetch(api + "/users/register",
             config).then((res) => res.json()).catch((err) => err)
            
            if (res) {
                localStorage.setItem("user", JSON.stringify(res));
              }
         
              return res;
    }catch(error){

        console.log(error)
    }
};
// faz o logout do usuario
const logout = () => {
    localStorage.removeItem("user");
  };

// Responsavel pelo login do usuario

const login = async (data) => {
  
    const config = requestConfig("POST", data);
    try {
     
      const res = await fetch(api + "/users/login", config)
        .then((res) => res.json())
        .catch((err) => err);
  
      if (res) {
        localStorage.setItem("user", JSON.stringify(res));
      }
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  

const authService = {

    register,logout,login

}
//service aqui vai basicamente fazer os acessos dos endpoints das apis
export default authService;