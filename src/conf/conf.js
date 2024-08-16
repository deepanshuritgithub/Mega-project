//esme kya krte hai constant bnate hai jiska naam rkhte hai conf or ye hai ek object or es object ko krna hai mujhe export  or ye hmm kr kyu rhe hai kyuki harr jagah jaake ye bolna meta.env.vite, ye ho sakta haii , ye environment variable kabhi load hi na ho , to actually mai puri ki puri application hi crash hoti hai to kai baar uska error dhundna bhut hi difficult ho jata hai , environment variables apka sara ka sara string mai hona chiye  
const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    //AB hmne kiya kusch bhi nhi hai , bss sare ke sare variables haii , hmne sabko export kr liyaa , or hmee ek grantee hogye ki sab chize string mai milegii 
}

export default conf
