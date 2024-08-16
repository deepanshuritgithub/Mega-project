import React , {useId} from "react";

               //ye jo frowareref haii eske andar mai yhaa pe sab kuch wrap up kr dungaa ,or eske andar mai func define krungaa , kyuki actually mai jo kaam hai eske andar haii , app chahe to arrow func define kr sakte haii callback hai basically..., 
const Input = React.forwardRef(function Input({
    label , //sabse phle too hm lengee ek label , kyukki input kai jgaah use hone wala haii , kahi jgaah username hogaa , kahi jaga passsword hogaa 
    type = "Text",
    className = "", //so jab bhi hm class name ab bhi lete haii to most of the cases maii hmm eski default property empty lgaa dete haii as a string 
    ...props //agar kisi ne or bhi koi property bol de vo bhi hmm add kr dengee 
}, ref ){//eske alawa jo bhi esko usee kregaa voo eskoo reference bhi pass kregaa 
    //ye huaa eska deifinition , mab eske andar obvious se baat hai return krna haii  
    const id = useId()


    return (
        <div className="w-full">
            {label && <label 
            className='inline-block mb-1 pl-1'
            htmlFor={id}>
                {/* //html for kis liye kyuki ids hai yhaa pe ,ab kya krna hai , ab hmm sidha hi html for ke andar id likh lete haaii, Ab es se kyaa hogaa ki hrr baar ek new uniqueid generate hogii  */}
            {label}
            </label>
            }
            <input 
            //ab input ke andar kya kya lagegaa , 
            type={type} //type agr user nai diyaa hai to thik haii , vrnaa hamra pass default mai text type to hai hii 
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full  ${className}`}
            ref = {ref} //ref ko apne jo user se liaa hai as aa prop usko yyhaa pe pause kr doo , yhi vo chiz haii joo apko refernce degii apne parent component ke andar  , ese ke liyee hmnee apnaa forward reference use kraa haii 
            {...props}
            id={id}
            />
        </div>
    )
    
})
export default Input 


//to es input field ki state ka access to merko yha pe chahiyegaa naa login form mai , to es ka reference dena padeegaa na mujhee eske andar , to vha pe mere pass kaam mai aata hai ek hook jiska naam hai forward ref 