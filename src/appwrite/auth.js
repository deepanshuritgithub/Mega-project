//ab mujhe ptra hai mujhe yha pe project id , database id kaafi chize lagangi   , to muhe pta hai vo sari chize maine conf mai de rakhi hai
import conf from "../conf/conf.js";

// import { v4 as uuidv4 } from 'uuid';
// Importing uuid module to generate random passwords

import { Client, Account, ID } from "appwrite";

export class AuthService {


  //ab hm kya krte hai sabse phle yha pe 2 properties bnaa lete hai
  client = new Client(); // ag app document mai dekhoe to esko client ko new krke bnana padta hai fir uske andpoint or set project ye sab lagane padte hai
  account; //ab account khene ko to mai new account krke to bnaa hi  letaa  ye account ka variable hai , kyuki ccount jo bnn rha hai na vo new account se to bnn rha hai , uss se phle apko client ke pass setend pont or et project ye bnana padengee ,
  //acha mai set end pont upar hi kyu nhi bnaa deta , kyuki vha bnake koi sense nhi hai, kyuki ye app bana  to loge , lekin vo class ke andar by default hi bnn gaya  hai , mai chahta hu  veseye waste of resuurces hai upar pe bnake , mai chata hu jab ye object koi bnaye , tab yha pe client nn na chiyee , tab yha pe properly account ka access hona chiye ,

  //to object jab banega to esa konsa method hai jo apne app call hota hai jiske andar mai ye functionality rakh saku  , to vha pe mai ek constructor bnaa deta hu

  constructor() {
    //ab eske andar , sabse phle to mai client ka refernce dungaa obvious se baat hai this use krna padegaa
    this.client //abb eske andar kya kr sakte hai , vo sare methods use kr sakte hai .setend point or set project
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    // ab hmare pass y value to set ho gye hai ., this.client e andar to ye value aa gya hei
    this.account = new Account(this.client);
  }
  // abb hmme kya krna hai ke account bnana hai , ek account bnane ka jo process hai na bada hi easy hai , simply app eska naam ye rkh doo , account.create ke andar value pass pass kr do user id de do, email dedo , or koi or field ya password dena hai vo dedo , too mai set kr dungaa


  //lekin hmm kya chahte hai hmm dependencies nhi chahte
  //kabhi ho sakta hai apko appwrite ko chahnge krna pade , to kyaa hrr jagah application mai jaake change kroogee kyaa , to uske liyee mai kyaa karta hu , mai yhi pe ek 2sra method bnaa deta hu

  // us method ke anda mai kyaa krungaa jitni bhi appwrite ke services hai mai unko call krungaa  , takki ek wrapper bnaa diya hai maine , mai andar kuch bhi use kr sakta hu , mai appwrite use kr sakta hu , firebase use kr sakta hu , mera database kuch bhi use kr sakta hu maii

  // ye obvious se baat hai async bnegaa , kyu async kyu bnega , kyuki documentation mai de rakha tha ye promise hai , yaa app promises use kr lijiye yaa async await use kr lijiye , kyuki async await bhi acually mai proises kht hoga tabhi , mai acync aawait es lia use kr rha hu , kyuki ye jab tak account creation complete nhi hogaa  tab tak mai aage nahi jaana chahta , to mai async await use kr leta hu




  //AB JO BHI services ko use kregaa usko nhi ptaa , ki iske under the hood kya hai , usko to pta hai ki ye ek service hai , auth service , iske andar ek method hai m, or uske andare value pass kr do to account bnn jata hai , hmee appwritee ka bhi to nhi pta vo kesedatabse mai entry kr rha hai , ese trahse hmm kaam krenge yha pe

  async createAccount({ email, password, name }) {
    // unko kuch parameters chiye honge hmm destructure kr lete hai , jo bhi method pass krega vo ek object degaa hmee uske andar ye sari values hongii

    // ab ye jo method hai  jo account creation wala method hai fail bhi ho sakta hai   , to ye docs mai mention nhi hai, ye appke fail se kyuki app padd ke aaye hai js, to hmm kya krte hai esko simply try catch mai lete hai
    try {

        //   // Generate a random password
        // const password = uuidv4(); // Generating a random UUID as the password

      // ab kya chiz try krni hai  , mujhe sabse phle kya krna hai mujhe krna hai await , fo account create
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,   
        name
      ); // or cretae method ke andar mere paass jo bhi values hai vo mai pass kr dunaa , ordocs mai likha hai first field mai user id dena compulsory hai
      //ab user acount apko mil gy  a hai , to ye method jisne bhi app se kaam mai liya hai , uske andar bts internally hmne ye method kaam mai le liyaa , lekin usko app kuch wapis bhi to kroge  , phle ye cheque krna padegaa userAccount actually mai create hua ya nhi huaa
      if (userAccount) {
        //call another method
        //actually mai jo hmm flow bnana chahte hai vo kesa flow hai , ki agr userAccount exist krta hai , to usko login bhi krwaa hi do na , ye appkle upar depend krta hai , ab ho sakta hai app vha uccess message retun krna chahte hai ki account created successfully now go to login , to front end mai jo bhi user  jo bhi component vha bnayenge agr esa response milta hai to hm redirect kraa denge forcefully  , but esa nhi , mai chahta hu agr uska sccssfully account bnta hai to login hi kra de=nge sidhe to uske baare mai baat krenge

        // to yha pe agar user ka account bnn gya hai to sidha hi yha pe login call kr lo or yha pe bhi return kr sakte ho values ko
        return this.login({ email, password }); // to hm kya khenge this.login or ye joo email or password apke pass acesss tha vo hmne de diyaa hai
        // ye totally app pe depend krta hai kis trah se app functionality design kr rha hai , mai es trrahh se design kr rha hu , agr user ka account bnn jaata hai to login kr lo
      } else {
        //agr ye sab nhi ho rha hai ,to jo bhi userAccount ke andar value aaye hai uske hisab se hmm dekh lengee abhi hm userAccount ko return kr dete  hai
        return userAccount; //. ab ho sakta hai user account ke andar null value aaye ho   , ki account create hi nhi hua , o uss hisab se hmm handle kr lenge jo bhi ess method ko call krega usko docmentation  provide kraa dengee
      }
    } catch (error) {
        throw error;
    }
  }

  // hmne kyaa kraa yha pe hmne bss async create account method bnaya , ese tra se alag alag method bhi bnaa sakte hai

  // yaha pe hm ek or method bnaa dete hai eska naam rkh dete  hai login
  async login({ email, password }) {


    try {
        // Create an instance of the Account class
        const account = new Account(this.client);
    
        // Call createEmailSession on the account instance
        const session = await account.createEmailPasswordSession(email, password);
    
        // Return the session
        return session;
      }
    catch (error) {
        console.log("error", error);
      throw error;
    }
  }

  // so ab yha pe ek aur method bnana padega , sign up to hogya yani create account or sign in bhi ho gya , login bhi ho gyA , LEKIN 2 functionaliy or rheti hai ek log out , or but ek or hai mujhe ye bhi jaanna chahiye kai baar , agr jaise mera home page hai, mai directly home page pe land hua hu to mujhe ye ptaa kra padegaa mai login hu ya nhi hu to ye sab dekhna padga  , lekin dekhna padega login ho ya nhi ho ?

  // to sabse phle uska ek metod bnate hai actually mai
  async getCurrentUser() {
    // es se hme mil jayega current user
    //ab current user ke liye apko kuch bhi dene ke jrurat nhi hai  , koi method mai , koi argument wagera pass krne ki jruyrat nhi hai , hmm sidha ka sidha ye jo account hmne bnaya hai ess se puch sakte hai
    
    try {
      return await this.account.get(); //agr yhaape if else lagat to easily handle kr detaa , agr accoint mila hai to isko handle kr doo , agr account nhi mila hai to ya fir app kuch or return kr doo . but ye usee krte huee easy trika kya hai , es try catch se aaiye bhar
    } catch (error) {
      // throw error;;
      //in customize way
      console.log("Appwrite service :: getCurrentUser :: error ", error);
      // ye uss case mai  jab app reach out hi nhi kr paye service ko
      // ye uss case mai  jab app reach out hi nhi kr paye service ko
    }
    // abhi hmne vo case handle hi nhi kraa,  agr account mila hi nahi too , kyuki hmne to direct hi return kr diaa
    // agr upar try mai kuch return hogaa hi nhii to hi return null hi hogaa
    return null; // agr suppose try match mai koi problem aa jati hai tab bhi null hi return hogaa
  }

  // log out
  // delete session hi actually mai log out hai
  async logout() {
    try {
      await this.account.deleteSessions(); // agr app delete session kroge to apkaa current session delete kr deta hai , app esme value string mai current bhi pass kr sakte hoo ya fir app list of sessions bhi de sakte ho
    } catch (error) {
      console.log("Appwrite service :: logout :: error", error);
    }
  }
} //class name
// ye hamra lower case kyuki mai isko bnaoenga new use krke
const authService = new AuthService(); //Object bnaa leta hu kyuki sare methods esepe lge lgayee hai
// ab kya hai ki, ye jo lower case wala hai ye ek object hai , es object ko sida hi mai yha pe export kr lungaa ,

export default authService; // to jo bhi usko import krega usko kya krna hai , vo sidha authService ko legaa , or .krke jo bhi method mai uske andar bnaongaa un sabka access le payegaa

// ab bada hi interesting case ho gya hai yha pe ,
// ab aapne new keyword use kr lia haii to obvious se baat hai app consructor wagera sab call krr rhe ho sara hi use krogee

// export default AuthService; //class export, so abhi kyaa kraa simplly class bnayi export kr diyaa , acha appne class bhi bnali or sidhe ke sidhe export kr li to es class ko jo bhi usee krega , usko ek objecct banana padega es class se , tabhi vo sare method use kr payega vha pe   , to kyu na mai esa kruu , mai ek object bnake export kr do , vo better approach rhega usko kuch krna hi nhi haii , directly object ko hi import kr lo or object pe hi sare methods lgee lagayae hai , to vo kis trahh se hogaa

//  ab jo next problem hai vo ye hai ki ek to chiyega client , ek bnana padegaa account, kyuki sare methods na actually mai account pe hi lagte hai jaise .create hai , .logout hai , so ako jo hi kaam krna padega vo lagega ese pe hi
//so ab hm,kya krte hai upar class sction mai chlte hai vha  pe 2 properties bna lete hai

// ab ek interesting baat
// jab bhi future mai apko kabhi es trah ka auth=ntication appwrite se krna padegaa app as it is copy paste kr sakte hai es file ko , kyuki ye sab to chiy hoga hi
// agr kabhi or method likhne pade to ese file mai likhiye or uss file ko save rkhiye
