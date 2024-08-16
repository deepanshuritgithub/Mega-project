import React from "react";
//so ab information bhi to chiyeegii hogi  , vo  information khaa se aayegi vo aayegii service se 
import appwriteService from "../appwrite/config" //ab dekhiyee hmee yhaa se es liaa leni padd rhi hai yee , kyki ye hamare pass se state ke andar nahi haii available ye ,  to ye hmmme yha pe es lia lena padegaa kyuki ek query lagani hi padegii , or service hamari query laga degii , to agrr ye state mai sari chiz available hoti  , to obvious se baat hai tb mai redux use krtaa or state se info leta  

import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {//yha pe apkoo ess post card ko display krane ke liye apko kuch props pass krne padengee ,  jo apko sidha ka sidha jab aaap query lagayaengee to sidhaa ka sidha appwrite se mil jayegaa yee , esme apko ek id chiyee hoga or esmee id $id krke likhaa jata haii , ye ek appwrite ka issue hai , issue to kya hai bss ek syntax hai 

    
  return (
    //sara ka sara card clickable hona chiyee , 
     //link ki khaas baat kya haaii apko pura url nhi dena padta haii , app jha pe hoo app vhaa se aage jaa sakte hoo 

    <Link to={`/post/${$id}`}>
    {/* //card jayega khaa pe , jane ke liye esko , jane ke liye esko href dena padegaa or yaaha pe href hota nhi haii yha pe to to hota haii  */}
        <div className='w-full bg-gray-100 rounded-xl p-4'>

                <div className='w-full justify-center mb-4'>
                    <img src={appwriteService.getFilePreview(featuredImage)} alt={title} //eske andar jo apne method bnaya thaa get file preview ka uske andar kya kroo sidha ka sidha jo id haii vo pass kr doo apni featured image ka ,ye featured image hi actually mai ,kyuki hm database ke andar id store kraa rhaa haii  , so post ki id to ye id hai featured image wali  , or image ki idd apki hr post ke sath rhegii voo apne app yhaa se chll jayegii 
                    className='rounded-xl' />
                </div>


                <h2 className='text-xl font-bold'>
                  {title}
                </h2>

        </div>
    </Link>
  )
}
export default PostCard