import React ,{useState , useEffect} from "react";
import appwriteService from "../appwrite/config"
import { Container, PostCard } from "../components";

function AllPosts() {   
    //ab ye ssaare ke saare post hmme directly nhi milengee to hmmme ek usestate bhi chiyegaa kyuki sare post ko ek query krni padegi 
    const [posts, setPosts] =useState([])//sabse phle to ek variable bnaa lete hai post , eske anndar hmm saaar ke saare post lenge, empty array le lete haii 
    //or jaise hi component load hogaa use effect ka use kr lengee or saara kaam ho jayegaa 
    useEffect(()=>{} , [])
    //so koi dependency array hai nhi to sidha appwite service ko us krte haii saare posts lane ke liye 
    appwriteService.getPosts([]).then((posts)=>{
        if (posts) {
            setPosts(posts.documents) //agr apppke pass set posts aaye hai tb aap set posts ko use kr sakte hai , posts ke aandar apko documents mil jaeengee saare ke saare , so ab aapke pass post ke andar saari values haii hii 

        }
    }) //so get posts jaise hi use krtengee , get post ke andar value pass kr denge uske andar hmm empty arrray ass kr dete haii or uskee andar sarii values aa jayegii , agr successful hua haii to .then  agrr nhi hua hai too .catch , or .then ka andar apko callback mil jayegaa or callback ke andar apkoo sare posts mil jayengee   or yha pe hmm saare ke saare set posts le lengee 

    //app yha p dekh sakte ho hmnn egte posts mai kuch bhi pass nhi kraa haii or agr pass krna hootaa too hm queries pass kr dete yyhaa pe , abbhi mere pass skoi query nhi es liaa empty array pass kiya ahaii or jo resuklt aayga hmnee usko post bol dia hai 



    return (
        <div className='w-full py-8'>
        <Container>  
            {/* //posts jab bhi aaeyenge vo ek container ke anadar hi aayengee */}

            <div className='flex flex-wrap'>

                {posts.map((post) => (

                    <div key={post.$id} className='p-2 w-1/4'> 
                    {/* so key kii jo value haii har post ke pass ek id hai , appwrite hai to $id hoga , mongo db hota to _id krte     */}
                    
                        <PostCard {...post} /> 
                        {/* //s div ke andar kyaa kroo app apnee post card ko call kr loo or data usko send kr doo  */}
                    </div>


                ))}

            </div>

        </Container>
    </div>  
    )
}

export default AllPosts 

//yha pe kuch nhi bs value call krni padegi apko services chiyegi yhaa pe appwrite ki 

