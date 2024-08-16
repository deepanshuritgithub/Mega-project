import React from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux' //selecttor bhi lagega, selector hogaa tabhi too store mai jaake dekh paungaa ki user logged in hai ya nhi hai 
import { useNavigate } from 'react-router-dom'//kabhi bhi kisi ko kisi navigation mai forcefully krna haii to use navigate kuch is trahh se use aata hai 
function Header() {
    //ab sabse phle kyaa chiyee , hmme state mai se nikalna padegaa ki , authenticated hai ya nhi hai kese nikalengee , eskobol dete hai auth status 
  const authStatus = useSelector((state) => state.auth.status); //esliye yha pe bola haii state .status , yha pe jo app dekh rhe hai state.auth kyuki ye ssaraa auth ke andar haii status 
  const navigate = useNavigate();//acha navigate liya hai to use navigate se bnaa lete hai ,jesa dispatch se bnate hai usi trahh se use navigate 

  //acha ab ek interesting chiz haii jab bhi es trah ki navigation bar bnti hai na , to actually mai ek array bnaya jata haii uska upar loop kiyaa jata hai 

//so esko bol dete hai nav items , ye hamra arrya rheta hai usually , or es array ke andar na objects hote hai apkee 
  const navItems = [
    {
        //lekin production grade apps mai kyaa hota hai hmm sidhaa es trah se object bnate hai , or uss object mai ek or value add kr do , navigation bar mai add ho jati hai 
      name: "Home",
      slug: "/", //slug kyaa haii kii hmara jo url hai khaa pe jaa ra haii 
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus, //ye activa rhega ya nhi rhega , ye sab hmm puchengee auth status se , auth status mai already hmnee use selector ko use krke , state se puch liyaa hai ki app active ho ya nhi hoo , ab jin jin mai active true hogaa um um ko hmm yha pe display krengee . vhi hmm apna basic conditional rendering kreengee or check krenge ki kon kon se item active hai , active hai to display kr doo , agr active nhi hai too vo ku showw krne haii   , acha agr user login haii to uskoo login or sign up wala button dikhana hi kyu haii 
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,//active depend krega auth status pe  , 
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];


   
  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        {/* ab jo apka navigation baar bhi hai container ke andar hi haii , ab iske andar hm kyaa krengee ek nav component lengee  or sabse phle hmm logo lgaa dengee , flex hi lenge eske andar or unorderd list ke andar sidha loop lgaa dengee */}
        <nav className="flex">

                {/* logo  */}
                <div className="mr-4">
                  <Link to="/" className='flex items-center'>
                    <Logo width="70px" />
                    {/* bs widthko accept kr rhe haii kuch use to hmm kuch kr nhi rhe haii uskaa ,  */}
                  </Link>
                </div>


                  <ul className="flex ml-auto">
                    
                        
                        {navItems.map((item) =>
                        //nav item ke andar hmme item milegaa 
                        //yha pe aata hai or check krna chahte haii ki item active hai ya nhi hai , uss bases pe hmm kaam krengee pura ka puraa 
                        //item.active ? ():() itemm active hai to kuch krenge vrna kuch or krengee , dekhiye hmme kuch or nhi krna hai hmee vha pe null hi krna hai, mai vhaa pe kuch display krna hi nhi chahta hu  
                        item.active ? (
                            //ab kyuki ye chiz ko repeat ho rhi hai , kai log kya krte haii es ul pe key lga dete hai , blki jo html element repeat hoti hai vha pe mujhe keys lgani hoti hai   


                                <li key={item.name}>
                                            {/* //es button ke andar hi navigation wala kaam hoga or kuch nhi hai itnaa  */}
                                <button
                                  //ab es button ke andar kuch properties likhni padegi vrna  ye kisi url pe jayega hi nhii 
                                    onClick={() => navigate(item.slug)}

                                    className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                                >
                                    {item.name} 
                                    {/* //text name  */}
                                </button>

                                </li>

                                
                        ) : null
                        //yha tak to thik hai lekin ek logout buton ka mamla bbhi toh hai , dekhiye jab information hi apke pass yha pe to usko kese bhul gyee  , auth status ke pass hai hi , to auth status se puch lete hai 
                            //agr auth status triue hogaa to authenticated haii bnddaa to usko log out dikhaa dee  nhi haii to usko lgout nhi dikheyenge 
                        )}


                        {authStatus && (//agr ye yhaa pe ye auth status true hogaa tbhii yha pe ye chiz display hogi vrna nhi hogii , 
                        <li>
                            <LogoutBtn />
                            
                        </li>
                                       //agrr authenticated hoo to hi logout button loo vrna kyu hi chahiyee logout button 
                        )}

                  </ul>
        </nav>
      </Container>
    </header>
  );
}
export default Header;
// /esko hm yha pe pura ka pura bnayenge kyuki ye bda hi intresting hai , headern na thda sa optional hai , kyuki sari values hmm ek baar mai nhi dikhana chahte or , or logout kisko dikhana hai or kisko nhi dikhana hai , obvious se baat hai vo to hhmee judge hi krna padegaa, judge kese krengee ki koi login hai ya nhi hai usske bases pe

//ab header ke andar hmm kya krenge hmm sare ke sare links rkhengee , lekin logout dikhana ya nhi dikhana ye hmm conditional rendering krengee , eska mtlb conditional rendering kaa , ki mtlb hmm check krengee ki user logged in hai ya nhi haii , agr logged in hai to hi to logout button dikhana ka sense hai vrna kyu hi dikhanaa uskoo




// common syntax hai 
// {authStatus && ()} parenthesis aata hai esmee , ki agr ye true hogaa , to ye chizz display hogii vrna na hogii 
