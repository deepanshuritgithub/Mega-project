import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  //ab kyaa  krte hai yha pe jo bhi upar services li haii unko use kr lete haii
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();//yha pe ek jo chiz hai logo ko aksar condfuse kr dete hai, vo hai ye register , ye register koi signup register wala nhi hai , ye register kya hai actually mai form handling ka ek trika hai 
  const [error, setError] = useState(""); //ek hmm state es liye kr rhe haii, errors display krane ke liyee , abhi ke liye hmm eske andar null ya empty string de dete haii




  //ab kya hai ki sabse phle to ek method bnayengee jo ki hogaa login , hara pass to handle submit haii or app mehod ka naam login de rhe ho
  const login = async (data) => { 

    //yee jo method hai async methodd hoga kyukii information submit hogi , wapis aayegii , kaafi kuch ho sakta hai , or yha pe denge apna data ,

    setError(""); //sabse phlee kya kroo jab bhi login ko set kroo sabse phlee errors ko empty out kr doo , ye ek basic functionality haii jitne bhi login form bnaoge , register form bnaoge ese trahh se hi bnaana, kyuki errors haii lekin jaise hi apne submission start kraa ab too error clean ho hi jani chiyee thii to vha pe errors ko clean kr doo

    //actually mai ab hmm dekhte haii hamara jo data hai actually mai jata bhi hai ya nhi jata to hmm try catch use krte hai basic sa

    console.log(data);

    try {
      const session = await authService.login(data); //authservice ke pass ek method hai login , or loin ke pass bhj do data  ab kyaa kroo , ab yhaa se apke pass jo bhi response aata haii vo aata haii session apne ek variable mai store krke rkhh liyaa
      //ab agrr session haii to mtlb usser logged in haii , ab agr session nhi mila haii to mtlb user logged in nhi haaii
      if (session) {
        //ab kya krte hai sabse phle to userData  nikalte haii or userData kese niklega aawait se hi niklegeaa , dhyan rkhana padegegaa ki usser data app session se nhi nikal rhe hai, get current user method ko call krke nikal rhe hai  , to hmm kyaa kr rha hai ye apni jo auth sservice hai esko bol rhee ki app kya kro  ki get current user ko call kr do , agr hamare pass userData aaya haii to dispatch krna padegaa
        const userData = await authService.getCurrentUser(); //yha pe hmm apni auth service ko bol rhe hai  , ki app kya kro get current user ko call kr do and then agr hamare pass userData aaya hai to hme kya krna padegaa dispatch krna padegaa
        if (userData) dispatch(authLogin(userData)); //or jo userData hai vo hmne authLogin mai pass kr dia
        //ab agr user yha pe aa chuka hai pura kaam ho chukaa haii , to usko yhaa rkhna hi kyu haii , login kr gyaa , login kr gya to usko kaii or bhjoo , bhjte time kyaa krengee , bhjte time navigate kr doo uskoo route pe
        navigate("/"); //yha pe navigate hmne kr diya hai , link pr agr krte to vo khud se kabhi navigate nhi hotaa , link pe hmeeshaa click krna padtaa , navigate se app programmitically kahi or bhjj sakte hoo
      }
    } catch (error) {

      setError(error.message); //ab yaha pe sabse achi baat ye haii ki mai yhaa pe setError dobara se use kr sakta hu , or uss error ke andar jo bhi error message haii vo maine state ma save kr liya haii , ab uske according conitional rendering kr lunga error dikhana nhi dikhanaa , top pe dikhana hai , jaise bhi kr sake vo hmm kr lengee baad mai
    }
  };
 




  return (
    <div className="flex items-center justify-center w-full ">
      
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >


            <div className="mb-2 flex justify-center">
              <span className="inline-block w-full max-w-[100px]">
                <Logo width="100%" />
              </span>
            </div>


            <h2 className="text-center text-2xl font-bold leading-tight">
              Sign in to your account
            </h2>

            
            <p className="mt-2 text-center text-base text-black/60">
              Don&apos;t have any account?&nbsp;
              <Link
                to="/signup"
                className="font-medium text-primary transition-all duration-200 hover:underline"
              >
                Sign Up
              </Link> 
            </p>



        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}



        <form onSubmit={handleSubmit(login)}  
        className='mt-8'
        > 
        {/* //so form jab bhi submit hogaa , vhaa pe handle submit hi use hogaa  */}
            {/* handle submit ek method haii jha pe app apna method dete ho  ki mai ess trahh se form ko handle krungaa  */}

            {/* //kyuki form jab pura submit hogaa to handle submit actually mai ek event  hai to vo call hota hai , ye event es lia bhi jruri hai kyuki jitne bhi input fields wagera app vhaa pe dogee , to vaha pe hmm uss register ko vhaa pe use krte hai to automatically jo apne values vhaa pe likhi haii to unkaa state apko manage nhi krna hai vha  se apne app vo values pick kregaa or handle submit hote time  values vha se le legaa */}
         
         
            <div className='space-y-5'>

                <Input  //ye liya input ye konsa wala input haii , haa ye vhi wala input haii jo mera component wala input hai

                label="Email: "
                placeholder="Enter your email"
                type="email" //type to text hi haii , agr email de doge to vo @ wagera ye sab apna kaam kr degaa  

                //ab 2sri chiz kya hai ,ab yhaa pe aati haii javascript , ye javvascript kya hai jitne bhi input fields es trah se bnaogee chahe select ho ya koi bhi ho , yhaa pe apko ek syntax likhna hotaa hai kyuki hmm use form use kr rha haii vo haii ...register, ye ... likhna bhut jruri hai , agr ye nhi likhoge to pta hai kya hogaa , ki kisi orr input mai bhi agr app register use krte hoo to uski value overwrite ho jayegii to hrr baar spread krna padegaa iskoo , ye compulsory haii , ye 100 percent haii 
                {...register("email", {//ye phli jo hai key values hai actually maii , to register ke andar to hmne ek value to lelii , to 2sri jo chizz hai vo hai ek object 


                    //ab es object mai app options pass krte hoo , bt sare options haii itnaa documentation padogee utne options mil jaengee tumko 
                    required: true,
                    //2sra ek or option aata haii vo hai pattern, pattern ese nhi likhte hai yha pe , apko validate likhna padta hai , validate ke andar app ek object pass kr sakte ho , or further uske andar app de sakte ho konsa pattern match krna hai 
                    validate: {              //esko bolte hai regExp i.e, regular expression 
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                        //so joo bhi value mili haii es expression se test ho rha hai to thik hai , agr nhi hori to yhaa pe ek (or -> || ) lgtaa haii 
                    }
                })} 


                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"


                {...register("password", {
                  //es object ke andar kya hota hai hmm options pass krte haii 
                    required: true,
                })}


                />
                <Button
                type="submit"
                className="w-full"
                >Sign in</Button>

            </div>
            </form> 
      </div>
    </div>
  );
}
export default Login;
