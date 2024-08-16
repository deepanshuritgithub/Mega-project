import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux"; //so ye to hmne padd hi liya thaa , dispatch jo hai combination hai jab appko redux ko react ke sath mai use krna haii
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  //ab mujhe console log tkrna hai takki jo env file hai usme jo variable hai mai uska access kese le sakta hu
  // console.log(import.meta.env.VITE_APPWRITE_URL)
  // // apne dekha ki agr ye jo enviroinment variales ka access chiye to app es trahh se le sakte hai import .eta.env koi issue nhi hai
  //lekin ek better way jo ki app production grade app mai dekhenge  configure method  src-> conf -> conf.js kabhi kabhi isko config bhi bolte hai isko , config variables bhi bolte hai , environment import bhi iska naam dete hai kai baar, mai abhi sirf conf naam de rha hu

  //eske badle kakaa, hmnee conf file mai kr liya hai environment variables wala




  //HAME ACTUALLY MAI YHA DEKHNA HOGAA , jaise hi app  load ho rha hai user logged in hai ya nhi hai , dekhenge kha se hmm state mai se dekh lenge directly, agr user logged in hai too hm usko dikhayengee kuch chizee or nhi hai to hmm vha pe usko de denge uss hisab se outlet ki hmm appko koi post nhi dikhane wala ,to mesaages wagera hmm de sakte hai

   
  //ab sabse phle kyaa krenge ek toh state bnayenge loading , kyuu ? , kyuki jab  app application se data fetch krengee ,toh appwrite local system mai to rkhha nhi hai , ki immediate sara kaam ho jayegaa , infact jab app production mai bhi jaoge to ho sakta hai network request mai thda sa time lag jayee , uske liye jab bhi aese chiz hoo database se kuch puchna ho ya network se kuch puchna ho , to loading state bnaa lena acha hota hai uske base pe app conditional rendering kr sakte hoo , if and else lgake , ki agr loading true hai , loading ka icon dikhayengee , agr true nhi hai to data dikhayengee

  const [loading, setLoading] = useState(true); // usually starting mai loading hmm uskoo true krengee,kyuki data , kyuki hmm use effect use krne wala haii , es liyee hmm directly hi usko true krengee , app chahe to false bhi kr sakte haii , pr mera jo flow haii , jaise hi mere application mount hui mere app , vha pe loading state true hai kyuki use effect kuch kaam kr rha hai , use effect ke andar mai data ko false kr dungaa hamra jo state haii , uske alwa merko dispatch bhi chiyegaa kyuki , dispatch bhi bhjna padega kyuki  current user leke aao , kuch na kuch karoo  , kyuki state change krungaa es liaa dispatch to lagegaa
  const dispatch = useDispatch();

  //ab auth sevice aa gya , ab kya krna hai , ab jaise hi application load ho , to ek useEffect lo , useEffect se pucho uss service se ki app logged in ho ya nhi hoo
  useEffect(() => {
    //ab sabse phle kyaa kaam krana haii
    //jaise hi app yha pe aooo or auth service se puchoo , ki apka current user kon haii
    authService
      .getCurrentUser() //agr ye mil gya hmme to hmm KYA krengee yha pe .then laga dete hai , agr successfully mil gya to thik hai 
      .then((userData) => {
        //ab es callback ke andar kya milta hai , data milta hai , app esko data  boliye , userdata boliye , ye ek vaiable hai

        //ab es data ko actually mai leke kha jana haii
        //ab es data ko dispatch krna padegaa
        //ab dispatch kisko krna padegaa ki login ho hi gya hai , userStatus apne app change ho hi jayegaa , but ye user data yha pe dispatch krna padegaa taaki ye jo action hai eske andar userData mil jayee
        if (userData) {
          //agr hamare pe user data hai , too to dispatch krenge hmm
          dispatch(login({ userData })); //ab login ke andar kya kya values pass krni hai , ek object hm pass krengee jiske andar hoga userData
        } else {
          dispatch(logout()); //mai logout kyu dispatch krungaa, maine user se data lene ki koishish kree na getCurrent user , agrr nhi milaa hai to ek activity h call kraa dete hai logout , taaki hmara state hi update ho jayega ki app login nhi hoo , to hmesha hmara state update hi rhegaa , jo bhi values hogi , jaise hi application call hogaa , to hamesha appke pass ya current user ka access hogaa , ya fir apki state mai likhaa hogaa ki app logout hi hoo
        }
        //so ye kaam to hogyaa , pr apne ek chiz pe to dhyan diyaa hi nhi ki ye jo loading tha abhi tak true haii , to esko off krna padegaa , to ye sara kaam hogya hai na , es lia hmnee finally ko bnaya hai ki app kya kroo ki yha pe hmne callback to mil hi rha hai , lekin hmm yha pe set loading ko false kr deta hai takki loadking ka kaam ho chuka hai yhaa pe
      }) //.then lgaa dete haii ki agr successfully mil gya to thik haii , ab .catch lgane ki jrurat nhi hai ,but app lgaa sakte hoo , hoo sakta hai koi error aa gya hoo , mai ek .finally lgaa deta hu
      .finally(() => setLoading(false)); //ab finally lagane se kyaa hogaa , finally .then ho ya .catch hoo ya kuch bhi run ho rha hoo , finally run hota hi hota haii , uska koi escape nhi hai , es lia finally ka syntax hai
  }, []);





  //classic return
  // return (
  //   <>
  //     <h1>A blog app with appwrite</h1>
  //   </>
  // )

  

  //ab ye jo return statement hai ye hmm yha pe apne hisabb se return krengee soo esko bolte hai conditional rendering, direct if else lgaa skate ho
  //  if(loading) {
  //   return
  //       <div>Loading...</div>
  //  } otherwise jo hm classic return kr rha the upar wala vo hi return kr dengee 

  //one more way
  return !loading ? (
    //agr mai yha pe chhota s adiv bhi likh do to error khtm ho jayegii
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">

              <div className="w-full block">
                <Header />
                
              
                {/* ab jo ctually mai sabse jo interesting chiz hai yha pe , ki es app ke andr apko jab bhi chize display krani hoo , to hmm yha pe kya krte hai or main le lete hai , main ke andar hmara outlet display kra dete hai  */}


                <main>
                    {/* <h1 className="text-center text-3xl hover:text-gray-500 ">Todo:</h1> */}
                    <Outlet />
                  {/* ab ye jo outlet hai na ye aayega apka react-router dom se  */}
                </main>


                <Footer />
              </div>


    </div>
  ) : null; //agr loading nhi hai to kuch kr dengee , vrna kuch krengee , mai yhaa reverse mai check kr rha hu , agr loading true hai to esko reverse lgake false kr dia , ki agr loading agr false haii to kuch krdenge , nhi to kuch or kr dengee , agr true -> null
}

export default App;

//AB EK imp chiz environment variable file na ek hi baar load hoti hai , ususally , kai baar automatially load ho jati hai , but jab bhi app environment variable mai app change krte hai apne new values add kre hai , new value update kre hai , to hmesha dhyan rkhiye project ko close krna padta hai or dobara sa chala padta hai maximum cases mai

//ES LIY kuch variables ese hote hai jo sysem variables bnaye jate hai or unko rkhne ka trika bi alga hota hai or jab app un application ko production mai deploy krte hai vha pe jis bhi system mai app depky kr rha ho versal pe , netlify pe , aws pe vha pe jhaa pe bhi kr rha ho, vha pe unka ek scret manager hota hai , vha pe as it is variable ka naam uski value hame vha copy paste krni hoti hai , abb appplications es traahh se design hoti hai ki app yha pe bhi environment variables ko alag rkhte ho or vha pe to alag hote hi hai , so jis trahh se yhaa access krogee , vha bi usii trahh se access hogaa , ye accessibility depend krti hai thda sa framework pe ya libary pe , app create react app use kr rhe hoo , ya vite use kr rhe ho next js ker rhe ho sabke alag alag trike hai
//ek chizz jo kaafi log galti krt hai jab bhi es trhh e environment variables app bnaye    vo project ke route mai honi chiyee so dhyan rkhiye jha pe apko package .json hai  , ya reademe hai vha , vo apke project ke route mai haii , or ye jo app.css hai na voo project ke route mai nhi hai ,yani ki project ka home directory haii routee wala scene hai
