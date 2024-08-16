import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  //ab thik hai jitne bhi leke aaye haii inse variables to bnana hi hai 
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();




  //ab yha pe method bnayengee or naam handle submit nhi rkhengee , yaa too app sign up rkhiyee ya to app create ya kuch or rkhiyee , or obvious se baat hai kaafi data hai async mai hi jayegaa , data hamaa pass aayegaa
  const create = async (data) => {
    setError(""); //ab hmee pta hai kyaa krna haii, sabse phle jo errors haii unko empty out krte haii then apna try catch use krte hai
    try {
      //ab kaam kya krna hai sabse phhle service use kroo , service ko bolo ki app ek sign up hai , sign up ke andar mai ek account create krunga
      const userData = await authService.createAccount(data); //agr data ayegaa yha  se to usko store kr lete hai yha EK variable mai

      //ab agr user data shi se bnn gyaa hai or user data apke pass aaya haii to kyaa kro, current user le lo
      if (userData) {
        const userData = await authService.getCurrentUser(); //AB AGR userData yha pe mila haii or current user app le paa rhe ho to hmme store updata krna padegaa
        //agr userData apke pass mila hai to app kya kro ki app dispatch kr doo , dispatch krna hai vhi login ko hi , kyuki ek hi login hai hmare pass store ke andar , or userData apne pass kr dia hai to navigate krwa doo  
        if (userData) dispatch(login(userData)); //ab agr userData apne pass kr diaa haii to forcefully navigate kraa do
        navigate("/"); //forcefully navigate kra dengee agr login ho gya hai to     
      }
    } catch (error) {
      setError(error.message);
    }
  };



  return (
    <div className="flex items-center justify-center">
        <div
            className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>

            <div className="mb-2 flex justify-center">
              <span className="inline-block w-full max-w-[100px]">
                  <Logo width="100%" />
              </span>
            </div>


            <h2 className="text-center text-2xl font-bold leading-tight">
            Sign up to create account
            </h2>


            <p className="mt-2 text-center text-base text-black/60">
            Already have an account?&nbsp;
            <Link
                to="/login"
                className="font-medium text-primary transition-all duration-200 hover:underline"
            >
                Sign In
            </Link>
            </p>

{/* //ab paragraph ke baad hmme errors display kranii hai, agr errors hai appke pass to displayy krao kuchh  */}
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

            <form onSubmit={handleSubmit(create)}>
                {/* //so handle submit apne app mai ek method haii, ye method kyaa krta haii , jhaa pe app usko lijana chaho vhaa lijate haii so create method ko call krenge uske andar see , uske anda se kyu call kengee kyuki data milegaa , data apne app nhi milegaa , esa koi magic nhi hogaa , vo register wala use krna paddega , register apne app mai keyword hai chahe login mai use kroo , chahe khi bhi use kroo vo apne app mai ek keyword haii    */}
                {/* or  */}

                {/* handle submit ek method haii jha pe app apna method dete ho  ki mai ess trahh se form ko handle krungaa  */}



                  <div className="space-y-5">


                      {/* //ab yha pe aata hai hmm Input pe  */}
                      <Input
                      //ab input ke andar hmme pta hai ki , yha pe values chiye apko name ,email , or password 
                      //to thik haii ab input ke andar kya chahiye , name chahiyee , so  sabse phle dedo label 
                      label="Full Name: "
                      placeholder="Enter your full name"
                      //ab kya chahiye javascript or vhii ...register 
                      {...register("name", {
                          //ab eske andar kya kyaa dekhna haii , ye apke upar hai kya kyaa dekhna chahte ho mai too ek hi likhungaa required true 
                          required: true,
                      })}
                      />



                      <Input
                      label="Email: "
                      placeholder="Enter your email"
                      type="email"
                      {...register("email", {
                          required: true,
                          validate: {
                          matchPatern: (value) =>
                              /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                              "Email address must be a valid address",
                          },
                      })}
                      />


                      <Input
                      label="Password: "
                      type="password"
                      placeholder="Enter your password"
                      {...register("password", {
                          required: true,
                      })}
                      />



                      {/* //so ab yha takk hogya hamra form input
                      so abb de dete hai button  */}
                      <Button 
                      type="submit" // button mai ek hi chiz important haii chiz haii i.e, type submit , vrna submit hogaa nhii 
                      className="w-full">
                      Create Account
                      </Button>
                  </div>
            </form>
        </div>
    </div>
  );
}
export default Signup;
