import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth"; //or hmee yha pe auth service bhi lagegi kyuki logout actually mai auth service ke pass hi haii
//or logout ke hame individual service bhi lani padegii tabhi to logout hogaa
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();


  //ab obvious se baat hai ye ek button bnegaa , to ek logout handler banana hi bnana padegaa
  const logoutHandler = () => {
    //ab logout handler ke andar hoga kya kaam , sabse phle to auth service use kroo , ab auth service use kre ,, ab auh service ke andares kyaa chhaiyee, ab uske andar hmne ek method bnaya hua haii   jo ki hai logout
    authService
      .logout() //logout kraa , ab es se hogaa kyaa ,ab appne yha pe log out cal kr diaa , most of the chizee appwrite ke andar promise hoti haii , ab sabse achi bat ye ki jaise hi apne logout call kr diaa ab apko milegaa promise, or promise ko handle krne ke liyee app .then lgaa dijiye  ,  logout apne app mai na ek promise hai yha pe , promise ko handle krna  ke liye ab milega .then
      .then(() => {
        dispatch(logout());//ab agr logout successfully ho gya hai to ek dispatch bhi kra dete hai logout ka , taki store ke andar jo important information hai vo updated rhaee 
      }); //dispatch kro ek method , vo method konsa hai vo hai logout, dispatch bhi kraa dete haii takki store ke andar jo information hai vo updated rhee ,
    //ab agr logout successfully ho gya hai , to ek dispatch bhi kraa dete hai logout ka
    // store ke andar taaki store ke andar jo information haii vo updated rhee
    }
    return (
      <button
        className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
        onClick={logoutHandler}
      >
        Logout
      </button>
    );
  };

export default LogoutBtn;

//itna to thik hai lekin logout krne ke baad apko kuch na kuch action lena padegaa , kuxxh dispatch krna padegaa , to logout ke liye store se apko slice bhi lana padegaa, slice mtlb ,mtlb ek trahh se reducer lana padegaa action , or dispatch bhi lana padegaa
