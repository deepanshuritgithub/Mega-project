//actuaaly mai post bhi chiyegaa  kyui hmmne edit kr diaa hai addpost lekin postt individually kesaa dikhegaa kyuki hmnne vhaa pe edit button , delete button vo bhi dena padegaa , so phlee easy wala kaam kr lete haii kyuki home page pe itna kuchh haii nhii 

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";//eska kaam itna sa haii jo bhi  html aayi hai usko parse krke likh do , parse se mera ,tlb hai bold haii to bold ko format krke likh do es trah se     
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
                    //useSelector ke pass state ka access hota hai  es liya state ke thri=ough userData nikala ja sakta hai s
    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;
                                        //post ki id vo jo user ne post krte hue daali hogi  , apni userId ,jisne bnaya hogaa , or jo userData hai uski id jo ki $id hai , uske through hm data nikal sakte hai or authenticity check kr sakte hai , uske through hmme pta chal  jayegaa ki vo author hai agr vo barabar hai dono mai jo id hai , jo post mai id hai or jo userData ki jo id hai , tab to vo authenticated hai bndaa , tab to hm khe denge vo author hai , agr author hai tb to hm dengee edit or delete button dikhana hai

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);



    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);  //ye jo featuredImage ye id hi store kr rha hai 
                navigate("/");
            }
        });
    };



    return post ? (
        <div className="py-8">
            <Container>


                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">

                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />
                    
              {/* // so jab auhor hai to hmm esko edit or delete wala button dengee  */}
                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>

                                <Button bgColor="bg-red-500" onClick={deletePost}>
                                    Delete
                                </Button>
                        </div>
                    )}


                </div>


                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>


                <div className="browser-css">
                    {parse(post.content)} 
                    {/* krna kuch bhi nhi thaa bs mujhee es parse mai wrapp krna tha  parso ke andar wrapp kr diaa or post .content mujhee bs content dera thaa  */}
                </div>


            </Container>
        </div>
    ) : null;
}