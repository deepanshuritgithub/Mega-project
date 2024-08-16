import React, { useCallback , useEffect } from "react";
import { set, useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import appwriteService from "../../appwrite/config"; //appwrite ki services bhi lagagegi kyuki data collect krke send appwrite ko hi krna haii , to uski services to lagegi hi lagegi
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {



  //ab aata haii ek ek krke functionality pe baat , phle jo basic kaam hai vo to kr hi lete haii
  //ab sabse phlee jo important kaam hai vo to kr hi lete haii jo seekhnee layak haii usko sabse phle handle krte hhaii , so hame kuch information chiyege khaa se chiyegii jo hamra useform hai yhaa se

  //so ap  jab bhii APP FORM USE KRENGEE  esee trahh se apko information chiyegii
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({ 
      //use form ke andar app ek object bhi pass kr sakte haii , or uske andar jo bhi values dena chahe app de sakte hai
      // mai eske andar dungaa default values , yee values vo haii jo hm iske andar use krengee

      defaultValues: {
        title: post?.title || "", 
        //default values ke liyee phlee to hmme kuch information chiyegii hmme , or vo information aayegi khaa se
        //information khaa ssa aayegi actually maii hame ek post chiyegaa       uus se phlee hm query krke dekhengee , kyuki hoo saktaa haii  user es form pe aaaya hu edit krne ke liyee , yaa new value  ko dene ke liye , new value ko lena aaye haii to empty de skte hai , lekin ho saka hai vo edit krna aaya hoo , incase agr vo edit krne aaya ho to hmme yha pe kuch default values dene padengii usko , or defalut values kyaa jo bhi hamra passs data base se aayegii yaa appwrite se aayegii
        //ab ek nyaa sawal aata hai ki hmm ese form ko reuse krne wala hai , to ye btaiyee ki ye values aayegii khaa se , jo  bhi es form ko use krega vo pass krega mere pass

        slug: post?.slug || "", //post ke andar agr slug hai to use krlo vrnaa empty dedoo
        content: post?.content || "",
        status: post?.status || "active", //post ke andar agr status hai to usse leloo , vrnaa by default hm uskoo  active show kr doo
        //dekhiyee sabse phli baat to ye agr yaahaa pe haii to user data bhi chiyegaa thdaa sa navigation wageraa ka bhi kaam aayegea
      },
    }); //USSE FORM kya kyaa deta hai apkoo , dekhiyee use form apko kaafi information de sakta haii , depends apko kyaa kyaa use krna haii , so abhi tak hamnee register dekha thaa , ek apko yee watching capabiities bhi deta hai, agr appko kisi field ko continiously monitor krna haii to apko ye watch capailities bhi deta haii , kisi bhi form ke saath waatch lga sakte haii

  //uske badd apki set value bhi le sakta hai , kisi bhi form ke andar koi value set krni haii to directly value likh ke nhi krte haii , kyuki hmm react ke form use kr rha hai , so ese TRAHH SE VALUE  KO set kiyaa jaata hai

  //agr apko kisi form ka control chiyee to apko yhaa pe  kisi bhi form ka directly control milta haii , yhhi control hmm pass krengee as it is RTE maii , vhaa se jo bhi syntax hai , jo sab haii , vo sab mujhee control mil jayegaa
  //agr apko kisi bhi form ki value grab krnii hai sarre form ki ya jis ki bhi, vo app yha se le sakte haii with the help of getValue
 


  //agrr navigate use kiyaa hai to esko bnaa hi lete hai
  const navigate = useNavigate();
  //ab hmme chiyee user data
  const userData = useSelector((state) => state.auth.userData);
    
  //ab dekhiyee ab baat kyaa hai sabse phli chiiz to agr userr ne form submit kr dia hai to kyaa kroo , agr user ne agr form submit kr diaa hai to usne kuch data pass kraa hogaa , ye to hmmne dekh liyaa haii , ki jo reacthook form hai vha pe hmme data mil jaata hai ek object jo register krke le rhaa thee vo to hmm le hi lengee

  //phle kyaa krte haii ek submit naam ka form bnate hai or dekte haii chizee kiss trahh se kaam kregi , ab 2 cases haii , yaa to post ki value haii already , or hai to update kro , agrr value nhi haii to ek new entry create kroo
  const submit = async (data) => {
    //ab aapke pass 2 cases yha pe bnte haii , ki ek app pe post haii , or ek nhi haii

    //agr post aapke pass hai to updata hi to krne jaa rha hoo , update mai sabse phlaa kaam kyaa krta haii file ko handle krte hai , file ho handle krne ke liyee hmne already uplaod file hmne bnaa rkhaa hai , sabse phle kya kroo loo or file ko upload kr doo ,
    //file ko upload kese krengee jo data haii , react hook form ka yhi sabse bdaa fydaa haii ki hmm es type ke form bnaa sakta haiii joo data accept kre , agrr by default ese hi bnate to bhut sara mehnat lagtaa , usme bhut effort jata haii

    if (post) {
      //so data apko directly access deta hai images ka , so jitni bhi images hai apko es trahh se images mil jatii haii , hmmme first imagee chiyee vese to ye array hota hai , multiple images bhi support hoti haii but hmm es trahh se lengee
      //so agr image hai to kuch kroo , agr nhi hai to kuch or kroo to kyaa krna hai kuch nhi kna hai null krna hai , agr image haii to appwrite ki service use kroo or usko bolo ki hmm use krengee upload file apki service , or upload filee ko kyaa kya chiyee data chiyee ,so dedo usko data  , data.image or uski first image hi hame deni hai
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])  //drag and drop wala hai ye 
        : null;
      //ab agr apke pass file aa chuki haii ,
      //apke pass post  already tha phle se to ek image delete bhi to krni padegii
      //agr jab ab hamara pass file upload hoo gyee hai to mai ek data ka deletion ka operation yhaa pe chlaata hu
      if (file) {
        await appwriteService.deleteFile(post.featuredImage); //ab kuki post ka acces mere pass haii , to post.image , post.image ke andar kyaa store kr rhaa haii , sari ki sari jo files hai uska id hi to store kr rhaa haii , or delete krne ke liye yhi to chiyee thaa to appki  file delete ho gyee
      }

      //SO AB AGR POst haii to filee upload bhi ho gye hai or delete bhi ho ggyee haii
      //SO AB POst ko update bhi to krna padegaa , luckily hmne uske liyee service bnaa rkhi haii , lekin usko sara data to dena hi padega
      const dbPost = await appwriteService.updatePost(post.$id, {
        //ab eske andar or values kyaa dogee , kuch nhi krna hai , sidha spread kr do data ko , kyuki field hi es trahh se bnayengee ki sara kaam ho jayegaa , bs ek field overwrite krna padegaa apkoo , konsa field ye featured image wala , kyuki baaki sab to mil jayegaa apkoo , lekin image upload krke data aa chukaa hai apka pass , to es field ko to overwrite krna hi padegaa
        ...data, //image upload krke to data aa chukaa hai apke pass `
        featuredImage: file ? file.$id : post.featuredImage,
      });
      // ..ab agr db post bhi aa gya haii , apke pass maii or successfully sab kaam ho gyaa hai , to user ko navigate bhi kraa doo
      if (dbPost && dbPost.$id) {
        navigate(`/post/${dbPost.$id}`); //navigate khaa krana haii , navigate krana hai apko backtick , jha pe bhi vo edit kr rha thaa , vha se /post/ , dbpost se apko id mil jayegaa to vhaa pe hmm redirect kraa dengee
      }
      //ab update post mai sabse phle slug chiyee
    } else {
      //else case mai kyaa hai ke apke pass update krne ke liyee kuch bhi nhi haii, mtlb ek user new form create krna chahta haii
      //so phlee usne file de di hogi to file upload kroo

      // const file = await appwriteService.uploadFile(data.image[0]);
      const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
      if (file) {
        //sabse phle kya krte hai file ki id le lete hai  
        const fileId = file.$id; //so file id ab mil gya haii so ab es file id ke andar kyaa kroo jo apke data haii uske andar hamara pass ye featured image , uske andar file id ko update kr dijiyee
        data.featuredImage = fileId;
        //ab ek update kr dii , ab ek to udate kr di to bachi hi saari properties ko sidhaa send kr doo

        const dbPost = await appwriteService.createPost({
          //create post ke andar sara ka sara data dena padegaa , agr hmm es trahh se data dengee (data ) to shyad problem ho jayeee , to hmm kyaa krtee hai sabse phlee iska ekk object bnate haii usko spread out krte haii 

          ...data, //ab ye sreadout es lia kiya hai , kyuki ab appke pass jo forms bnengee vhaa , vhaa pe kabhi bhi apke pass user data nhi hogaa
          userId: userData.$id, // to user id bhi to vhaa pe field bnaa rkhaa haii
        });
        //ab agr sarraa kaam ho gyaa haii , or apke paass db post aa gya haii to user ko re-direct bhi kraa doo
        if (dbPost && dbPost.$id) {
          navigate(`/post/${dbPost.$id}`); //ye post krana ke liye kiyaa hai
        }   
      }
    }
  };




  //ab jo hmm new method bnaa rha hai vo hai hamra slug transform - //this is for iterview purpose
  //ab ye slug transform kyaa krta haii, ab hai hamra passs 2  input field hai , ek haii title or ek hai slug , title ke andar watch krna haii or slug ke andar values generate krni haii , agr kahi pe bhi user space deta haii , to space ko convert krna hai dash mai - vo to replace se ho jayuega , regexp se dekh lengee hmm ki user ne number diyaa hai , digit diya hai ya space diya hai kuxh is trahh se krke hmm kaam kr dengee   //but ye actually mai apko help  kregaa  yee sab  chize sikhne ke liye ki kis trahh se slug transform kiyaa ja sakta hai abhi to hmnm sirff basic functionality likhengee , kis trahh se watch hota hai kya hota hai vo use effect mai jayegaa kyuki dependencies hai na vhaa pe change ho rha hai
  const slugTransform = useCallback((value) => {
    //sabse phle to use callback le lete hai value apko mil jayegi yhaa pe
    //so jab bhi app slug transform ko use krogee to value pass on krogee
      // const slug = value.toLowerCase().replace(/ /g, '-')
      // setValue('slug',slug)
      // return slug
    
    if (value && typeof value === "string")
      return value //sabse phlee to return kr do value lo , or uss values ko kese kese modify krna haii , phle to usko trim kr doo
        .trim()
        .toLowerCase()              //ye bascaly hm gloabal match kr rha hai 
        .replace(/[^a-zA-Z\d\s]+/g, "-") //yha pe hmm square bracket lete haii taki jo puraa pattern hai uska puraa ek combination match kr rha hai or usko hm ek negate de deta hai ^ mtlb ki esko mt match krna , jesa exclamatory hota hai vese hi regexp mai negate sign hota hai , dashes mtlb range hota hai yha pe or \d - digits or \s -spaces  ,
        
        // to in mai se koi bhi values agr ati haii to in sabko ko chdd ke hmm sabko dash kr dengee ,
        //  esme kyaa kroo ek plus bhi yhaa pe lgaa do , ess se kyaa hai or jitna bhi haii jo sub characters wagera haii negate wala to rhe jayengee baaki sab ko ye convert kr degaa

        .replace(/\s/g, "-"); //globally app sarre spaces ko dekhoo or uskii jgahh dash lgaa doo

    // ..agrr ye sab nhi haii apke pass to bhi ek chiz ko return krna hai   ,vrna problem aayegi apke pass , to return kr do empty string ko
    return "";

  }, []); //ab use callback ke pass bhi actually mai dependency aray hote hai ki espe agr kuch bhi dependency ho to kr lijiye abhi hmnme uski jrurat nhi haiii but just for syntax sake btaa rha hu ki hoti hai ese values
  //ab es intersting method ko use kese krna hai , vo haii interview question



  useEffect(() => {
    //react mai se hm use effect use kr lete haii
    //ab bna  te hai yha pe ek chiz interesting , ab kyaa hai ki kesee value dekhi jaati hai or kese likhi jati hai  ye bdaa hi intersting syntax haii , to hm bnayengee ek subscription , vo bnnta haii apke watch method se, vese to or bhi trike hai subscription bnane ke liye unko baad mai unsubscribe wagera krne ke liyee 

    //ab ye watch kyuki hame react hook form se mila hua haii  to eske andar bhi callback apko milta hai , abb yha pe kya akrte hai yhaa pe ek to hmme eske andar ek value milegei hmme  or ek name bhi mil jayega , kis trahh se milegaa vo jab hmm form bayengee tab dekhnege hmm uskoo
    const subscription = watch((value, { name }) => {
      //vese or bhi trike haii hai subscription nana ke liyee or     baad mia unko unsubscribe krne ke liyee , actually mia p yh a p[e jo bi method run krte hai usk subscription naam ke variable  mai hold kr sakte hai , agar appne or bhi koi method bnaya hai ya call kiya hai yha pe , usko kisi variable mai store kr loo
      if (name === "title") {
        //if jo hamra pass name hai vo pura ka pura title haii  kyuki pura ka puraa form hi chiyee hmee
        //so jhaa pe title hai vha pe hmm kyaa krengee ek set value use krengee ,or set valuee khaa pe set krni hai slug ke andar , input field dengee uska naam slug rkhengee  or value kya krni haii es wala field ke andar apko value slug transform wali fill krni  haii  , kyuki jo slug transform jo  hmne method bnayaa us se value milegii
        //yha pe abhi sari values appko mili hui haii , leekin ye value mai se nikalna bhi to padegaa title waala  konsi value hai kyaa krna hai  , kyuki ye jo value hai vo ek object hai yha pe
        setValue("slug", slugTransform(value.title), { shouldValidate: true }); //eska alawa yha pe ek or option hota hai ki isko validate krna ya nhi krna to yha pe bhi ap validation lgaa sakte ho to yha pe ,ek or object pass ho sakta hai
      }
    });

    return () => subscription.unsubscribe(); //return ke andar apko ek callback yhha pe miltaa hai react use effect ke andar , or k l;ast mai hmmlikhte hai subscritption.unsubscribe , ye kyaa hota hai thda sa memory management hota haii , thdda sa optiomisation yhaa ho jjata hai

    // ye aksar interview mai puchaa jaata haii ki apne  ek use effect liya , vhaa pe ek method call kraa , to app usko optimise kese kr sakta ho , vhaa pe kyaa kroo usko sirf ek variable mai store kr loo  naam ap kuch bhi de sakte ho but subscription hi dena jada shi lgta hai  , or yhaa pe app return ke andar ek callback ke andar app usko unsubscribe bhi kr sakte ho  , taaki vo khud mai apne app mai ghumtee na rhee jaye baar baar call hone ke liyee

  }, [watch, slugTransform, setValue]); //dependency array mai  ek to hai apka watch , watch jiske sath hi lgaa hai uske sath  , agr usme usme kuch bhi  change aaye too usko ...   , to watch khaa lagega  , so obvious se baat hai jo register wagera jo sab lagayngee abhi input form  usme jo hmmara title value hai usme hmm watch lgaa denge
  //uske alwa slug transform bhi yha pe likh dete hai, ki ye jo method hai es pe bhi nzarr rkhoo, esko optimize bhi krengee hmm
  //or ek setvalue eske andar bhi koi changes aate hai to ess hisaab se hmm kaam krengee

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
            <Input
              label="Title :"
              placeholder="Title"
              className="mb-4"
              {...register("title", { required: true })}
            />
            <Input
              label="Slug :"
              placeholder="Slug"
              className="mb-4"
              {...register("slug", { required: true })}
              onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), {
                  shouldValidate: true,
                });   
              }}
            />

            {/* //uske baadd hmne RTE liyaa , RTE hmne bnaya thaa  or control hmnee as it is pass kr diya to values hmmee mil jayengee  */}
            <RTE
              label="Content :"
              name="content"
              control={control}
              defaultValue={getValues("content")}
            />

      </div>

      <div className="w-1/3 px-2">
            <Input
              label="Featured Image :"
              type="file" //type hmne yha pe file diyaa  hai auomatically ye form apkaa handle kr legaa
              className="mb-4"
              accept="image/png, image/jpg, image/jpeg, image/gif" //or hmnnee acceptance bhi de di ki hmme ye sarri images chahiye
              {...register("image", { required: !post })} // or required bol diyaa ki post nhi honaa chiyee ,post required haii  to post nhi hogaa binaa image ke
            />
            {post && ( //or hmne yha pe post pe depend krte huee kuch options yha pe select kr liye
              <div className="w-full mb-4">
                <img
                  src={appwriteService.getFilePreview(post.featuredImage)}
                  alt={post.title}
                  className="rounded-lg"
                />
              </div>
            )}
            <Select
              options={["active", "inactive"]}
              label="Status"
              className="mb-4"
              {...register("status", { required: true })}
            />

            <Button
              type="submit"
              bgColor={post ? "bg-green-500" : undefined}
              className="w-full"
            >
              {post ? "Update" : "Submit"}
              {/* or finally update button dena hai ya submit button dena hai ye  */}
            </Button>
      </div>
    </form>
  );
}
