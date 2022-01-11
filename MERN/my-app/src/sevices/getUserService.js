import Axios from "axios";

const getUserService = function (userID){
    Axios({
        method: "POST",
        data: {
          userID: userID,
        },
        withCredentials: true,
        url: "http://localhost:3000/getPublicUser",
      }).then(function (response) {return response.data.username})
}

export default getUserService;