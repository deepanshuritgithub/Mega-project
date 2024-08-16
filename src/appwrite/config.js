//config.js , kyuki yahi major configuration hai mere appwrite ki 
import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    //so0 jaise hmne vaiables pichee declare kree the , vo sab ke sab hmm yhaa pe bhi krengee 
    //to sabse phle ek client bnaa lete haii 
    client = new Client(); // or client bnega hamra new client se   
    //ab or kya kya properties rkhi thi hmnee es class ke andar , phle to hmnee rkhi thii ovious se baat hai authentication , to auth chaahaiye the hamee   , basically account wala part  
    databases; // ab hme echiuye ek databases
    bucket; // or ek or kya chiee storage bol dijiye , bucket bol dijiye 

    //ab ovious se baat hai variables to aa gya hai , lekin in variabloes ke andar actually mai account kab bnn na chahiye 
    //so hmne phle bhi dekha thaa ki account kab bnn naa chahiye jab constructor call ho 
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

        // so ab dhyan rkhiyee jis trahh se hmnnee this .client ka use krke new account se account bnaya thaa , excatly same trikkee se hmm ye satabses or bucket wala nayenge , ye same hi bntaa hai 
        // so ab kya chiyee ye jo uparr variables bnaye hai , storage or bucket bnaa hai inko fill krna padegaa 
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    //so ab phlii joo chizz aati haii , agrr mujhee post bnnana hai to kis trahh se post bnaungaa 
    
    //create post 
    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                //daabase id aayegi kha se , vhi apkaa environmental variables jab bnaaye the vhaa pe alag se save kre thi conf mai vha se 
                conf.appwriteDatabaseId,//eske andar phle chiye database id 
                conf.appwriteCollectionId,//2nd hiye collection idd 
                slug,   //3sra chiyee apkko document id , ab documnet id mai kya kr rha hu yhaa ppe , jo bhi appp mujhe slug valuee pass krogee , mai usko document ka id maan rha hu , app chaahe to id.unique bhi le skte hai,  koi dikkat wali baat nhi hai

                {//or last chiye object , ab es object ke andar jo bhi apke pass or further info hai wo as it is app pass kr do yhaa pe 
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                    //or bhi agr information hai to app attributes mai add kr dijiye or yhaa pe save kr dijiyee 
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }
     
    // update post 
    
    // documnent id , abmujhe pta hai slug mujhe pass hogaa
    //agr app thda sa notice krengee document mai , database ka jo update document hai ,
    // konsa wala apko update krna hai ,, vo document ka id yhaa pe lagegaa , vo agr app separately le lenge to jadaa thik rhegeaa , agr app yhaa pe valuee sari objects mai lenge to problem ho jayegii , apko ek ek krke nikalna padegaa , vseto apke upar hai jaisa structure app dene chahe , msi kys krta hu lg ko htaa leta hu  kyuiki mai phlee parameter jo chahta hu app slug de , taaki mai document id le lo , or 2nd mai app object sara pass kree , , ki slug sa hi to uniquely identify hogaa , agrr id.unique hotaa to id.unique mangtaa mai  yhaa pe 
    // or user id bhi mt do , user id ki jrurat nhi haii , kyuki jisne ye kraa haii usii ko edit wala option dengee baaki ko denge nhi , app chaho to le sakte hoo , pr ye hmm update nhi krengee , vo app ke upar haii app kesa function bnana chahte hoo , kesa feature banana chahte hoo , to ye hamara update post ka syntax hai   
    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(//ye ek method hai , ab iss method ko kaafi chize lagti hai , sabse hle hmme chiyee database id ,collection id , then chahiye apkaa document id 
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, // ab 3rd value kyaa chiye isko document id , so ab hame pta hai hmm slugg ko hi update krne wala hai ,so hm directly slug ko le lete ha yhaa pe 

                //ab kyaa kyaa update krna hai , ab vo ka vo object hm pass kr dete hai 
                {
                    title, //new wala jo title diya hai vo title , or agr nhi diya to purana wala to dengee hi app , vo value to pass krni hi padegii apko 
                    content,//new wala jo content hai vo content 
                    featuredImage,
                    status,

                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error); //vhi same suggestion appwite servide , agr update post mai koi issue ya error aati hai   to  error return kr do 
        }
    }
    

    // ek or new method bnate hai 
    //delete post 
    // so ab delete post mai apko kyaa kyaa chiyee , delete  post mai esa kuch khaas chiye nhi , bs app slug values dedo bs uss se hamra post delete ho jayegaa , yhaa pe usko kya chiyee vo document id hi to chiyee , bs vo slug pass kr doo , or mai usko delete kr dungaa 
    async deletePost(slug){
        try {
                // or yha pe hmm kyaa krengee , yhaa pe actually mai return krne ki koi jrurat nhi hai , bs usko delete kr do  succesfully delete hogyaa 
            await this.databases.deleteDocument(//ye bhi ek method hai ,  es method ko kya kya chiyee   
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId,
                slug
            //ye hmara method yhaa bnn gyaa , acha , agr ye ek baar hogya hai , ye kyuki await tha , await to hogyaa hai , chahe to app eskoo bhi return kr sakte thee, but actually mai vo ka vo document bhi return hotaa hai  , mai yhaa pe sirf jo value return krungaa vo true return krunga , ki ha bhai delete hogya hai 
            )
            return true  
            // ab ye front end ke upar hai, jhaa pe bhi app component likhengee  ki ess true ko app kese handle kr rhe hai , agr true nhi aaya to kese handle kr rha hai , ye apke upar hai 
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false// hmm kya kr sakte haii yhaa pe in case koi error aa gyaa  or kuch bhi hogyaa to ,return kr sakte hai yha pe , return false 
        }
    }
   //so ye method to hamra bnn gyee  create , update , delete 


    //get post 
    // ab ho sakta hai apko ek paricular post chiyee ho wapis , to obvious se baat hai kuch id pass krogee , id hmm slug rkh rhe hai , to mai slug ko pass krte huee ek post kese le sakta hu 
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug           
            )//ye agr mil gya hai to obvious se baat hai ye value return ho gyi hai 
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false // agr koi post nhi milaa to return ek false kr dete hai , kuch msg to mil hi jaye hmmee   
        }
    }




    //get posts // ye ho sakta hai apko sarepostt chahiyee ho wapis  , so vo kese milenge sare post vhi list documents , so es se appko jitne collection id ke documents hai vo sare ke sare documents mil jayengee , lekin mai esa nhi chahtaa , kyuki mujhee sare document nhi chahiyee , kyuki agr sare documents mai lungaa na to actually mai vo document bhi aa jaynegee jinkkaa status active nhi hai , to actuallly mujhee sikhnaa padegaa ki queries kese krte hai 

             //yha pe apko koi bhi parameter dene ki jrurat hai nhi kyuki app sare hi posts lene wala hoo buut actually mai kyaa hai jab app get posts krt rhe hoo to actually mai hmm jo pare=ameter lenge na kis trahh se lenge vo bh dekhiyee ,
             //sare posts mujhe do , dekhiye jab koi method call kregaa uss time pe esko kuchh dene ki jrurat nhi haii , mai apnee hisabb se default value likhungaa , kyuu ? , kyukii mujhee vo sare poists chahiyee jiske andaer query haii , ki apka jo status type hai kya hona chiyee active hona chiyee    to thik hai kese likhenghee 
             //queries sirf variable hai yhaa pe    , or bhi kuch dena tha variable ka naam app de sakte thee , asili jo kaamm hoga vo es square brackets ke andar hoga    , ese trah se syntax diya jaata hai , queries kya hai multiple de jaa sakti hai , ek array pass kiya jaa skata hai puraa , apko jo bhi value dene hai     , vo saari ki saari jab match kregi kisi se to value de jayegi apkoo 
    async getPosts(queries = [Query.equal("status", "active")]){//indexes agr bnayi hai tbhi app query lgaa skate ho  otherwise app query nhi lagaa saktee atleast yha pe 
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
                // [
                //     Query.equal("status", "active")   //app chahtye to esaa bbhi likh sakte thee 
                // ]   
                //or bhi values haii , app chahe to 
                //100 //kitna pagination apko chahiye 
                //0 , // kitna result appko chahiyee 


            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false; //end mai retun false bhi kr dengee, ho sakta hai end mai koi bhi value nhi mili hoo 
        }
    }

    //so yhaa takk hogyii hmarii servicess 
    //ab yha pee atta hai hmm yha likh lete haii 




    //file upload services   
    //ab apko kya krna hai aage jaake ye jo file upload wali service apko ek separate file mai lgaani hai , abhi hmare pass 2 haii  , ek hai upload ki file , ek hai delete file 



    //upload file 
    ///  upload file krte time kya chiyegii , paramete mai , file dene padegiii  , yhaa pe file ka blob dena haii , naa ki file ka naam dena haii , jo actual file haii vo dene padegii 
    async uploadFile(file){ 
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file // ab jo 3rd parameter apko milta haii vo file miltaa hai yha pee , ki file upload ho gyee haii , ye jo uparr apne file liyaa thaa , voo ye ka ye parameter haii         
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }


    //delete file
    //ab file delete krte time apko file ki id dene padegii , file ki id kha pe hai , ha vha parameter mai hmmne file ki id store kraa rakhi hai 
    async deleteFile(fileId){ 
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true // ab agrr file delete ho gye haii too return true kr dete haii 
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }


    //get file preview 
    //to ek or service hmm yhaa pe bnaa lete hai , jiske andaar file preview le lengee , taaki kuch preview wagera krna hai to as it is le lete hai , esko bhi app chahe to async mai dall sakte haii ,,aagar app direct bhi dalenge too , kyuki eska response na kaafi fast hai kyuki ye promise wagera kuch return nahi krta hai , to bhi kaam krengee , kyuki eska jo response hai bada hi fast hai kyuki y promise nhi return krtaa hai  
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

}
 
const service = new Service() //object bnn gya , or ab ese object ko niche export kr dijiye
// export default Service 
export default service//ab kya krna padega es smaller serice ko hi export kr dijie tkki bnna bnaya hi objct hmm sidhaa dede 

//ab obvious se baat hai new variable ka use krke service bnayi hai to obvious se baat hai constructor wagera to bnegaa hi bnagaa 