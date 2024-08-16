//yha pe homee haii kyuki too yhaa pe bhi post wagera dekhne padengee hai ya nhi haii , user logged in  hai ya nhi haii to kaafi chize dekhni padegi home pai bhi 
//ab yha pe home hai to kyuki to yha pe post wagera dekhne padengee , hai nhai hai , user logged in HAI YA Nhi hai kaffi chize dekhni padegi home pai bhi

import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'
//ye bhi lagengee kyuki home page hai na 
function Home() {
    //ab sabse phle home page haii , to home page pe post hai ya nhi get post se puch lengee home page pe hai ya nhi hai
    const [posts, setPosts] = useState([]);
 
    useEffect(() => {
                     //actually mai yha pe koi query wagera acceopt nhi kr rhee hai get post ma to koi bhi square  brqacket bhi dene kka koi sense nhi haii , JAIS HMMNE APKAA ALLPOST MAI DIYA THA SQUARE BRACKETS YANI K ARRAY KYUKI VHAA PE HM  SERvice mai ek query accespt kr rhe thee status ative honaa chiyee vhi post show hoyee   
        appwriteService.getPosts().then((posts) =>   {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])


    //ab hmmme check krna padeggaa ki apke pass post ha ya nhi haii, post ki length kyaa hai, uske bases pe hmm check krengee 
  
    if (posts.length === 0) {
        return ( //mai actually mai yhaa pe null to nhi return krna chahungaa maii , actually mai ek container return krna chahungaa jiske andar likhaa hoo ki koi post find nhi hua hai  
            
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-400">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }//kyuki post ki koi length hii nhi hai , to login krna padegaa , agrr nhi hai to bhi login to krwaa hi lete hai , vese message app pe depend krta hai app kyaa message dere haii  
    //agr post hai , agr length 0 nahi hai , negative to hogi nahi 
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>

                            {posts.map((post) => (
                                <div key={post.$id} className='p-2 w-1/4'>
                                    <PostCard {...post} />
                                    {/* //post = {post}  //ab actually mai na post app ko es traahh se nhi dene hai kyuki problemm kya hogii , ki agr app post es trahh se de denge too 1 hi post jayega  orr 1 hi post mai nhi chahtaa jayee vhaa pe to app esko spread krke bhi de sakte haii,  ki saare hi post ek ek krke de dijiyee vaha pe  vese to es trahh se bhi de sakte hai , apne apne method hai kis trahh se dete hai zgr apko es trah se nhi dena hai to app es trah se hi de sakta hai ki mai spread krke dena chahungaa {...post}   */}
                                </div>
                            ))}
 
                </div>
            </Container>    
        </div>
    )   
}

export default Home

//ab kyaa krte hai ab ek post ka bhi page bnaa dete haii 