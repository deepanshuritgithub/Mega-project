//ab sabse phli bat aati hai ki store bnega kese, agr appko yaad ho to configure store hota hai jo store bnata hai , or store ko chiye ki mujhe sare reducers ke baare mai btaaoo  


import {configureStore} from '@reduxjs/toolkit'; // ye aagya hmara store or store hamra redux se hi aata hai , react redux se nhi ata hai , reduxjs se hi ata hai    
import authslice from './authSlice.js';

//so ab kya krte hai store bnaa dete hai 
//store bnega configure store se ,jiske andar ek object hai  
const store = configureStore({
        //ab store ke andar ek hi parameter aata hai jo hai reducer
    reducer: {
        auth: authslice,

    },
    devTools: window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // Added devTools option
})  

export default store;   


//ab ek or store bnayene jo track krega hamare authentications ko , so ese trha se hm post ke liye bhi bnaa sakte hai, jiska naam hm rkh dete hai authslice.js
 