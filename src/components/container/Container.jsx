import React from "react";

function Container({children}){//dekhiye container kya krta haii , container kya krta hai apki  properties accept krta hai as a children , children to sirf ek naam hai app jo chahe vo rkh sakte haii , container kya hota hai sirf ek box hota hai , jiske andar upar niche kuch hai , jese hmara main app.jsx haii upar header hai niche footer haii , container ke andar kya hai ki hmm sirf height, width or styling property define krte haii, uske andar jo bhi values hoti hai as it is display kraa lete haii 

    return <div className="w-full max-w-7xl mx-auto px-4">{children}</div>;//DEKJHIYE JAB bhi apki es trah ki line reduce ho rhi hai, hmesha jruri nhi ki return ke andar parenthesis aaye , chae to app htaa sakta hai , jaise if else ke andar htaa te hai,yhaa pe ussii trahh se isko bhi htaa sakte hai yha pe koi error nhi aayegaa 
}
export default Container    