import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkwebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        const evt = whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        });

        const { data, type } = req.body;
        console.log("Webhook Event Received:", type, data);  // Debugging

        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0]?.email_address, // Check if exists
                    name: `${data.first_name} ${data.last_name}`,
                    imageUrl: data.image_url
                };
                console.log("User Data to be Inserted:", userData); // Debugging
                await User.create(userData);
                break;
            }

            case 'user.updated': {
                const userData = {
                    email: data.email_addresses[0]?.email_address,
                    name: `${data.first_name} ${data.last_name}`,
                    imageUrl: data.image_url
                };
                await User.findByIdAndUpdate(data.id, userData);
                break;
            }

            case 'user.deleted': {
                await User.findByIdAndDelete(data.id);
                break;
            }

            default: {
                console.log(`Unhandled event type: ${type}`);
            }
        }

        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Webhook processing failed:", error);
        res.status(400).json({ success: false, message: error.message });
    }
};
