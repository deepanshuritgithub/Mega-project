import {createSlice} from '@reduxjs/toolkit';

//ab isko sabse phle kyaa chiye hota hai , sabse phle esko initial state chiye hota hai  uske baad naam , initial state or reducer ka dena padta hai pura ka pura kaam 

const initialState = {
    status :false ,//abhi status ko krenge by default false ki abhi user authenticated nhi hai '
    //ek or mai dunga yha pe user data , ki user ka baare mai kuch info chiye hogi mai le lungaa , by default mai usko null de deta hu , ki abhi koi user data nhi hai mere pass 
    userData : null
}
//ab ye jo haamara kaam hai slice wala, ye hai authentication ko track krne ke liyee , ki user authenticated hai ya nhi hai ye mai store se har barr puchungaa 
const authSlice = createSlice({

    //ab jo slice bnaenge uske andar ptaa  hai ek to name dena padta hai uskoo 
    name : "auth",
    initialState,
    reducers: { // so 3rd chiz jo dende hoti hai vo hoti hai reducers , reducer kya hai object hai 
        
        
        //to thik hai phle jo method hai vo hai login hamare pass mai 
        login: (state, action) => { // so hame pata hai reducer ke pass jo bhi methods hote hai unke pass hota state ka access or ek action ka access , action se milta hai payload , or state mai jo bhi value update krni haii vo initial state ke baadd es trahh se trackk mai update ho jati haii 

            //so ab yha pe kya krna hai 
            //so agr kisi ne ye wala method use kra hai login waalaa , ya dispatch kraa too to sabse phle kyaa kroo ek state lo , state mnai se status nikalke hmm true kr dengee  
            state.status = true; //ab state ka andar status true krte hi  2sri chiz kya krni padegi user data bhi add krna padegaa  
            state.userData = action.payload.userData; // or user data kha se ayyega action.payload se , app agr chahe to esko action.paylaod.userData bhi esko bol sakte hai , vese dono ka naam same haii , as such koi jrurat hai nhi , to kaam ho jayegaa    , app ye bhi bol sakte thee action.payload kyuki key or value same hai  , to value likhne ki khaas jrurat nahi hai 
        },

        //ab sabse intersting baat pta hai kya haii , mujhe yha pe state ki existing values ko spread krna , vo sab koi jrurat nhi hai , kyuki redux toolkit ke andar vo sara ka sara automatically cover ho jata hai 

        
        //ek or method yha pe dispatch ho sakta hai jiska naam hai log out 
        logout: (state) => { // agr jab log out kr rhe hai , to mujhe payload ki as such koi jrurat nhi hai , vese meere  pass yha pe access hai , agr app chahe to yha pe action bhi likh sakte hai , but uski jrurat nhi hai  
            //ye bas jaise hi kisi nai call kra hai , to mujhe bs state ke andar value change krni haii 
            state.status = false; //usko bol dunga app false ho , ki app login nahi ho  
            state.userData = null;//or user data ko bhi null krna hai merko 
        }
    }

})//ab y jo kaam hai hamara slice wala suthentication ko track krne ke liyee , ki user authenticated hai ya nhi hai ye mai store se har baar phuchungaa 


//ab jo reducer ke jo individual functions vo bhi export krne padte hai kyuki alag alag components , un functions ko use krke state wagera jan leta hai ya fir dispatch kr deta hai unn methods se 
export const {login , logout} = authSlice.actions; //ye jo reducers hai na , uske andar ye actions hai ye , unko hmee export krna hai , to ye actions ko hmm export krte hai 



//ab hame pata hai es slice ke andar se hmme 2 chize export krni hai , 
//ek to auth slice mai se reducer export krna hai ye to default mai export krna hai hame 
export default authSlice.reducer;
 


