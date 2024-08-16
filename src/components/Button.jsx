//here we are creating a common button 
import React from "react";
//ab button ke anadar kya hota haii , button ke andar sabse jo interesting jo chiz hoti hai na , kyaa parameters app accept kr rhe hoo or unkoo usage ka trikaa 
function Button ({
    //ye parameters haii
    children , //paramters ko use kha krte haii 
    type = "button", //hmare jo type hai default button hai agr koi kuch or deta hai submit to uss hisab se krlenge
    bgColor = 'bg-blue-600', //ye ha default values , agr koi value dea hai to overwrite kr dengee vrnaa ese trahh se kr dengee 
    textColor = 'text-white',
    className = '',//classname hmm empty hi lete hai jadataar
    ...props //or bhi kuch props apne pass krre hoo to usko bhi spread kr lete hai
    //these are default values agr koi value deta hai to overwrite kr dengee , nhi deta hai to ese trah se kr denge 
}) {
    return (
       <button  className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
        {children}
        {/* //button ke andarhaa pe es trahh se children de diye jate haii , jo bhi text pass hogaa vo text yhaa pe haii  */}
       </button>
    )
    //dekhiye esmee ek property to haii class name , lekin or bhi to property ho sakti hai ,,haan bilkul, kyuki ye attrubutes hi toh haii button ke , agr or bhi user ne diye ho to vo hmne khaa liye haii , vo actually mai hmnee lioye hai props maii or yhaa pe spread kr diye hai , spread se kyaa huaa jitni bhi property de haii vo ssari hmne le li 
}
export default Button 