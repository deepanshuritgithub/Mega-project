import React from "react";
//AB YHE PE HMME 2 CHIZE CHIYEGEE ACTUALLY MAII phli jo chiz ghai vo hai editor
import { Editor } from "@tinymce/tinymce-react"; //dekhiye ye jo editor hai na bada hi basic hai , actuall mai apko sirf editor hi return krna hoo to bada hi aasan kaam hai
import { Controller } from "react-hook-form";

//phli baat to ye appp eske andar input kya kyaa logee , jab bhi esko koi call kregaa ek to mai lunga name ek or chiz kya lenge vo , lenge hmm control , ye react hook form se aata haii , or yhi control responsible haii eski saari states wagera ko uss form mai lijane ke liyee , ye to abhi compoent haii , component se form mai lijane ke lie , ye control khaa se pass krogee jabb ess RTE ko use krengee hmm vhaa pe
export default function RTE({ name, control, label, defaultValue = "" }) {

  const apikey = import.meta.env.VITE_TINYMCE_API_KEY;
  
  return (
    // important esme yahi haii jo hai apkkaa control , joo ki actually mai es component se control pass on kregaa jo bhi isko use kregaa uske andar

    <div className="w-full">
      {/* //ab iske andar sabse phli baat aati hai label ki  */}
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}
      {/* yha pe apni javascript inject kro or boloo ki label agr haii to label de dijiye  */}

      {/* //ab aati hai asli baat hamara controller ki , controller hm self closing le lete haii   */}
      <Controller
        //ab controller kyaa hai ki pura ka puraa control pass kregaa kahi or , to controller apko 3-4 chize deta haii agr app dekhnege document maii , controller mai app name bhi de sakte hai , control bhi de sakte hai jo ki parent component call kregaa  mtlb jhaa hmm esko use krengeee apn for maii es component ko , or rules bhi de sakte haii , or apka render element  bhi define kr sakte haii
        //   sabse phle to name value le lete hai . name ke andar kya hai ki jo name pass hua thaa vhi name le lenge, actually mai name k o curly braces mai likhna padegaa kyuki ye ek variable hai
        name={name || "content"} //agr name nhi haii to hmm uskoo content bol dete hai apka jo mann kre boliyee string hai bs or kuch nhi hai
        //ab ye jo chiz hai control ye dega parent element  jo bhi parent element esko upar wala ko call kregaa control ko  call kregaa hmm as it is yha pass kr dengee taki vo pura control le paye jitni bhi events hore haii , eske state hai,eski values kya haii , eska data kya hai vo  , saara ka saara le payee

        control={control}
        //ab seekhne wali jo chizz haii ki kese elements render krte hai '
        //sabse phle yha pe curly braces lete hai , ek hmare pass field hogaa , ab field ke upar tracking kese lagani hai vo es trahh se lagayi jati haii , jo bhi event ki tracking apko lagani haii onblur , onchange , mujhe jese abhi onchange ki lagani haii ,, ki es field ke andar agr kuch bhi change hota hai to mujhe inform kr denaa render ke sath , to hmm us field ka on rendering yha pe dekh rhe haii
        render={(
          { field: { onChange , value} } //yhe pe kriyee sabase phle to yhaa pe ek callback daal dijiye , ab es callback ke anadar values kese daalte hai vo mai apko  btata hu , ki apko track kya kya krna haii , or kitne-kitne field hai apke pass, bolte yha pe sabko fields hi haii, , lekin fields pe alag alag properties apko dete haii , to likhengee kese esee
        ) => (
          //
          //ab yha pe kyaa krna hai 
          //abb yha pe jo bhi element apko render krana haii , render se mera mtlb haii input field ho to input field lelo , editor ho to editor lelo

          <Editor
            //ab iske andar values hoti hai kuch
            //ab iske andar kon kon se valuee chiye

            apiKey={apikey} // Add your API key here
            //ab sabse phle to app pe initial value wala concept haii  by default iska andar kya haii , mai iske andar kuch msg bhi de saktaa hu , default value agr mere pass haii to maii vo bhi de saktaa huu
            initialValue={defaultValue}
            //or ek jo chiz haii apke pass vo haii init , app initialize hote hii kyaa kyaa vlaues eske andar chahte haii vo app eske andar btaa do
            init={{
              ///to hmm kya kr sakte haii yha pr branding de sakte haii
              //INITIALISE HOTE HI APP ESKE andar kyaa kya values chahte haii app eske andar btaa doo to hmm kyaa kr sakte haiu yhaa pe branding de sakte hai, ye saree apko dekhnee hi padengee eske upar or koi option nhi haii
              //jaise hmmne de diyaa ki branding kyaa kroo esko false kr doo yhaa pe
              // {branding : false, height:500, menubar: true } //yhaa pe ek or curly braces lagegaa kyuki ye jo first jo values haii properties hai, es branding ke andar app or bhi option de sakte hai , height : 500 pixels by default hota hai eske andar , or bhi values hai appko eske andar menu bar chahiye , nahi chhaiye/
              initialValue: defaultValue,
              height: 500,
              menubar: true,
              plugins: [
                //plugins mai apko kyaa kya value chiyee vo app esko  saari dedo
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              //itna hi nhi toolbar access bhi miltaa hai yha p[e ]
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help", 
                
                //ESKE ALAWA OR BHI OPtions hai , esaa  nhi ki etne hi haii , jaise content style bhi ek hai, kuch nhi bss uske andar bss body wagera changee kree hai or kuch bhi nhi kraa haii
              content_style:  
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            pass change event from react hook form 
            onEditorChange={onChange} // dekhiye ab kyaa hai , ki editor mai agr kuch bhi change hota haii too , yha pe hmnee ek value lggaa rkhi haii , vo hai hamari field , field pe on changee bs ese ko hm use krengee , so editor mai agr kuch bhi change ho to hmare field jo hai govern ho rhe haii onchange se
            value={value}
          />
        )}
      />
    </div>
  );
}

// lekin yha pe problem kya hai ki kyuki apka jo editor hai separate jaagah design ho rha haii as a separate component to esko khi na khi use bhi to krogeee koi form mai ,koi post form mai , to kahi na kahi to use krengee hi , vhaa se mainly ye mooddhaa ye hai ki eskaa reference kese milegaa to vo ye actuallly mai ek interesting chizzz haii uske liye kya hai ki kyukii  hmm react form use kr rha hai vese app chahe to hmmara jo same forward hook use krke kaam chlla loo ,but kyuki es traah ke kaam agr krogee to hmmee ek or chizz yhaa pe padni padegii voo hai controller ,ab ye controller kya hai react hook form se hmme miltaa haii




//YHA tAak to ho gyaa hamaraa first kaam , ab esko use kese krna hai , jab bhi appp editor wagera use krengee , krnaa kuch bhi nhi haii bs hmm rte ka label vhaa pe dengee or uska control hm le lengee , conrol wagera kese lete hai uska bhi dekhte haii
//sabse plee to esko save krte haii or ek new post form bnate hai , component ke andar hm kyaa krengee ek folder hi bnnaa lete haii ,kyuki ye kaafi jgaah hamra kaam aayegaa thdaa sa interesting concept haii
