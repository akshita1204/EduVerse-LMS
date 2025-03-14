import { Webhook } from "svix";
import User from "../models/User.js";
//API controller function to manage the clerk with the database
export const clerkwebhooks=async(req,res)=>
{
    try{
       const whook=new Webhook(process.env.CLERK_WEBHOOK_SECRET)  //Webhooks ek tarika hai real-time updates receive karne ka.
       await whook.verify(JSON.stringify(req.body),
    {
        "svix-id":req.headers["svix-id"],
        "svix-timestamp":req.headers["svix-timestamp"],
        "svix-timestamp":req.headers["svix-signature"]
    })
    const {data,type}=req.body
    switch(type)
    {
        case 'user.created':
            {
                const userData={
                    _id:data.id,
                    email:data.email_address[0].email_address,
                    name:data.first_name + " " + data.last_name,
                    imageUrl:data.image_url 
                }
                await User.create(userData)
                res.json({})
                break;
            }
            case 'user.updated':
            {
                const userData={
                    email:data.email_addresses[0].email_address,
                    name:data.first_name + " " + data.last_name,
                    imageUrl:data.image_url 
                }
                await User.findByIdAndUpdate(data.id,userData)
                res.json({})
                break;
            }
            case 'user.deleted':
                {
                    await User.findIdAndDelete(data.id)
                    res.json({})
                    break;
                }
    }
    }
    catch(error)
    {
      res.json({success:false,message:error.message})
    }
}