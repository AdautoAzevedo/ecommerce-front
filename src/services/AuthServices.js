export const userLogin = async (user) => {
    const authURL = "http://localhost:3500/login";
      try {
          console.log(user);
          const response = await fetch(authURL,{
              method: "POST",
              headers: {"Content-type":"application/json"},
              body: JSON.stringify(user)
          });

          if (!response.ok){
            const message = response.status;
            throw new Error(message);
          }

          const data = await response.json();
          const token = data.accessToken;
          console.log(token);
          console.log("Logado");
          return token
        } catch (error) {
          console.log(error);
          throw error;
      }
}