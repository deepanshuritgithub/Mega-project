//ye kaafii jada hii intreresting layout haii , kaafi jgaah use krogege , aagge jaake next js mai bhi use krogee

//ye actually mai ek mechanismm hai , ki kis trahh  pages ko ya ,  routes ko  protect kiya jaata haii 

//dekhiyee kyuki abhi takk hmnee koi protection mechanism nhi likhaa hai 

//auth ke andar hamara ko ptaa hai kii state hai hamra pass , login haii ya nhi hai, prr usska use nhi kr rha hai hmm kuch bhii kese protect krengee to hmm kya haii, container bnate haii , container maii kya hotaa haii , khali hootaa haii, or uske andar valuee show krni ya nhi krnii vo decide krta haii , to ye actually mai ek protected container haii  ussi ke through hmm baat krengee uskka 


import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux' //eske alawa hmme selector bhi chiyeegaa kyuki kuch chize puchni padegii store se ki ye to information do hi do 
import {useNavigate} from 'react-router-dom'//or navigation bhi chiyegaa takki hmm user ko khi redirect wageraa kr payee

                                            //hmne authentication ki value maani hai true lekin hoo sakta hai jo iss component ko use kr rhaa haii vo false dede , to hmm kyaa krengee uss bases pe yhha pe value bs check krengee , ki hmara auth status kyaa haii , nhii haii authentication wageraa too uss base pe hamare pass value aa jayegi or esko update hmm kr dengee 
export default function Protected ({children , authentication= true }) {    
                                //FILE KA NAME or function ka naam alag ho saktaa haii , koi problem nhi haii , protected hmmm is liye de rha hai , kyuki hmm conditional render krengee kya uske children koo conditIonally render krna hai ya nhi krna haii 

    //ab sabse phlee navigate leeke aaye haii to kaam mai le hi lete hai isko 
    const navigate = useNavigate()
    // USKE alawa hamra pass yha pe ek state lagti haii loading mann lijiye ya loader mann lkijyee 
    const [loader, setLoader] = useState(true) //or eske alwa ek state lgti haii hamare pass yha pe loader ya loading jo mannna haiimnn lijiye , bydefault stae eski true haii  

    //ab kya haii ki sabse phlee apko puchna padegaa auth status se ki app loggedIn ho ya nhi hoo , app directly depend nhi krengee , jo user pass kr rhaa hai , component mai , hmm phle store se puchengee 
    const authStatus = useSelector(state => state.auth.status )// eske bases pe mai saare kaam krungaa 
    //so hmm kya krte haii usko naam de dete haii auth status ,, or ye auth status khaa se aayegaa use selector se , selelector mai hi apne state haii jo mujhee btaaa degaa state.auth.status , esee ke bases pe hii mai sarre kaam krungaa 
    //  directly kaam nhi krungaa phlee mujhe use effect chiyega , useeffect hi mujhee btaegaa ki appko mujhe login pe bhjnaa hai ya homepage pe bhjna haai yaa kya kaam krna hai or kis kis field mai kuch changee hotaa haii too mai  doabra check in kru ya nhi kruu TO YE HOGYA HAMARA Use effect 
    useEffect(()=>{ 
              
         //TODO: make it more easy to understand

        // if (authStatus ===true){
        //     navigate("/") //agar auth stataus agr true haii too navigate kr dijiyee agr authenticated haii 
        // } else if (authStatus === false) {
        //     navigate("/login") //agr auth status agr false haii to apko navigate kr dena chahiyee login pe , mtln abhi user authenticated nhi hai
        // }
        
        //let authValue = authStatus === true ? true : false
        //dekhiye sabse phle hai apke pass authentication  user ne athenitication bhja true , uske baad mai check hi krbungaa , kyuki user bhjna chahegaa ye es trahh se hi design hote ha ye , agr apko ye hda sa confusion lg rha haii to app ese user se lo hi matt ye joa uthentication = true haii lo hi matt , app sidha decide kroo auth status ke base pe , app es trahh se or improve kr sakte ho application ko 
                    //  .supose apko suth status ne diyaa false ki app authenticated nhi hoo 
            //true && false !== true , so false !== true so the final result is true 
            //so true && true = true , so jab donon true haii to mai navigate kr du login pe 
        if(authentication && authStatus !== authentication){ 
            navigate("/login") //tb apko login pe jana chiyee , kyuki appp authenicated ho hi nhi to mai yhi pe check kr lungaa , jab user naii abhi tak login hi nhi kraa haii to firr ky ussko baaki chizzree dikhana jase homepage wageraa  sab se phle user properly authenticated hona chiyee 
        } else if(!authentication && authStatus !== authentication){
            //false && false !== true , is true !== true soactually this condition is false 
            //so false && false ka jo and percent aata haii, vo ata hai false so hmne usko navigate kr diyaa homepage prr   
            navigate("/")
        }
        setLoader(false)//dekhiye condition kuch bhi run ho rha ya nhi hoo rhaa , set loader apkaa false ho hi jara haii har haal maii , set loader ke bases pe hm kya krengee hmm loader ke base pe show krenge user ko to yhi pe check ho jayegaa , re-direction ka kaam ho jayegaa 

    }, [authStatus , navigate , authentication])// ab dependeciy array ki baat kr lete hai ki kis kis chiz pe dependent ho app maii ek depenedent hu auth status, agr auth status mai kuch bhi change hota hai kyuki mai store se puch ke aaya hu to ye use selector apne app monitoring krta haii usme kuch bhi changee hoo to es use effect ko dobara run kr denaa 
    
    //acha agrr user kbhi bhi navigate hoke ayaa hai kahi se , to agr navigate mai kuch bhi change haii , navigate bhi apne app mai dhyan rkhta haii , ki user khi se khi or to nhi gyaa agr usme kuch bhi change ho rha haii tb bhi mai isko run krna chahta hu 

    //or ek hamra pass mai authentication , agr userr nai kuch authenticaion wagera bhjaa hai to uske bases pe bhi  changes ho to kr lenaa   

    // hm yha pe sidha loader ke bases pe hi check kr sakte hai , ki agr loader true hai , to loading bol doo , agr loader true nhi hai to children display kr doo jo bhi apke children hai 
    return loader ? <h1>Loading...</h1> : <>{children}</>
}
 

// ab esko use kesse krna hai, usage to hm nhi dekh sakte , usage to es protected route ka hm tabhi dekhengee jab hmm router set krengee , abhi tak hmmne router set nhi kra hai , 


 