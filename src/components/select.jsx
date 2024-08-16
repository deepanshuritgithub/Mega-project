import React, {useId} from 'react'

function Select({
    options, //select ke liye sabse phle options dena jruri hai , agr options nhi honge to mai kis pe select krwaungaa , kyuki vhi to option hota hai dropdown ke andar
    label, //label bhi dena padegaa kyuki input field type hai , label to bnta hai thdi se accessibility ka dhyan rkh le 
    className="",  //agr class Name empty nahi hai to es trah se bhi rkh sakte hai koi dikkat nahi aati hai className,, pr mujhe better syntax yahi lagta hai ki classname ke andar empty strings ho
    ...props
}, ref) {
    const id = useId()
return (
    // <div>Select</div>
    //ab chalte hai yha pe apnaa form bnaana ki koshish krte haii 
    <div className='w-full'> 

            
            {label && <label htmlFor={id} className=''></label>}        

        <select
        //phle select ke andar kuch properties add krni haii , haa krni haii , so user nee jitne  bhi props diyee haii sare ke saree  pass kr doo yhaa pe 
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        >

                {/* //ab yhe pe simple sa problem kya haii , abb yhaa pe null bhi hoga to bhi kuch hogaa nhii  to mujhe better syntax lgta haii ki , upar classname ke andar empty strings hoo  */}

            {/* //ab select ke andar hamme otions bhi dene padengee   */}
            {/* //to options to loop krne padengee kyuki options se array hi miltaa hai actually , to by default array le lijiyee incase koi problem ho sakti haii to uss problem ko avoid krne ke liye kuch to likhna padegaa na  */}
            {/* //ab options ke andar hmm directly .map nhi likhengee , likh sakte hoo koi dikkaat nhi haii , prr ho saktaa hai options mai koi value hi na hoo , agr options mai value hi nhi haii orr  loop krogee to pkaa crash kregaa , uske ek chhota sa solution ye haii ki app optionally loop krr lo ki agrr value haii uske andar loop krne layak to hmm loop kr lengee   */}


                {options?.map((option)=>(
                    //ab eske andar hmme kyaa krna haii , ab eske andar hmme options lene haii 
                    <option key={option} value={option} >  
                        {/* //ab eske andar key bhi to lgaani padegii , dekhiyee key ek best trika haii ese app index bhi laaga sakte thee but option bhi to unique hai apne app maii , to kon mnna kr rha haii esko keys se use krne ke liyee , or beeter option bhi ho sakte thee pr thik haii  oor  imp ye mt bhuliyegaa ki option maii value bhi dene padti haii  */}
                        {/* //ab option ke andar value kya haii vhi option  */}
                        {option}
                    </option>

                )) }



            </select>
     {/* //ab select ke andar aate hai options , phlee select ke andar kuch properties add krni haii  */}

    </div>
)
}
export default React.forwardRef(Select) 
