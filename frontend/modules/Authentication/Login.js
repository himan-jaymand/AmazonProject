// async function login(email, password) {
//     try {

//     //call api to login
//     //call to correct endpoint and method
//         const response = await ApiService.post('auth/login', { email, password });
        
//         //save token inlocalStorage
//         localStorage.setItem(AUTH_TOKEN_KEY, response.token);
        
//         //update ui (state + header)
//         updateHeaderGreeting(response.user.name);
        
//         //change route to home page
//         Router.navigate('/'); 
//         return true;
//     } catch (error) {
//         console.error(' login failed:', error);
//         // show error to user
//         throw new Error('username or password is incorrect'); 
//     }
// }




