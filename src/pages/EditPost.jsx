// so edit post bhi same hi haii , bass apko uske andar data fetch krna haii pura ka puraa data dena padegaa 
import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../components'
import appwriteService from "../appwrite/config";
import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {
    //so sabse phlee to post chiyenngee 
    const [post, setPosts] = useState(null)
    //ek appko slug lagegaa, slug khaa se lenge , kyuki edit krna hii to user click kregaa  , fir usss page pe jaeegaa, to apke pass url mai available hogaa , to url se kaise value nikalengeee 

    //esko app jo bolna chahe bol sakta hai hmmne usko slug hi bol dete hai , kyuki slug hi lere haii 
    const {slug} = useParams() /// ye apko react router dom se hi miltaa hai 
    const navigate = useNavigate()
 
    //ab ye hogyaa kaam to obvious se baat haii use effect hook to lagegaa hi lagegaa , saari data values leke aani  hai , slug se hi value aayegii , slug mai kuch bhi change ho to data values leke aao 

    useEffect(() => {
        if (slug) {          //slug agr diya hai to apke pass post aa jayegaa , agr post aa gya hai apke pass to setpost kr dijiye 
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/') 
        }
    }, [slug, navigate])


    return post ? (  //ab return krna hai post hai ya nhi haii uske bases pe , so conditonally check krte hai    
            <div className='py-8'>
                <Container>
                    <PostForm post={post} />
                </Container>
            </div>
          ) : null
}
export default EditPost 