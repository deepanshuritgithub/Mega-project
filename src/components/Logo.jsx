import React from "react";
       //yhe pe ek optional property hmm le rha hai , optional es liye kyuki jab hm yha pe width de rhe haii to ye property hogi compulsory   but agr mai yhi pe value de deta hu ki 100 px ka chiyee yaa mujhe 100% ka chiyee   to app uss trahh se de skte hai 
function Logo({width = '100px'}) {
    return (
        <div className="">
            <img src="https://imgs.search.brave.com/AvNFvZafVc3webZ0XLzc7FbWlLx0thRyTyDMZrZWi8s/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9keW5h/bWljLmJyYW5kY3Jv/d2QuY29tL2Fzc2V0/L2xvZ28vNTU4MTAx/ZDktMTkzZC00ODZk/LTk1M2MtYzU1NTU1/OWU4N2VkL2xvZ28t/c2VhcmNoLWdyaWQt/MXg_bG9nb1RlbXBs/YXRlVmVyc2lvbj0x/JnY9NjM4MjkwNDk4/MDcyODcwMDAw"  className='mr-3 h-14 w-22 rounded-3xl bg-transparent m bg-gray-500 ' />
        </div>

        //so agr apko width add krne hai to app style={{width}} ese add kr sakte hai 
    )
}
export default Logo