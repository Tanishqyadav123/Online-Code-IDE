import { WebhookEvent } from "@clerk/backend";
import { Response, NextFunction, Request } from "express";
import { asyncHandler } from "../handler/asyncHandler.js";
import {
  createNewUserRepo,
  isUserExistWithEmail,
} from "../repository/user.repo.js";
import { responseHandler } from "../handler/responseHandler.js";
import { errorHandler } from "../handler/errorHandler.js";
import { Webhook, WebhookRequiredHeaders } from "svix";

export const clerkWebhook = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

    if (!webhookSecret) {
      return errorHandler(res, 400, "Webhook signing secret is missing");
    }

    let userId = null;

    const wh = new Webhook(webhookSecret);
    const payload = req.body;
    // const headers = req.headers[''];

    const svixHeaderDetails: WebhookRequiredHeaders = {
      "svix-id": req.headers["svix-id"]! as string,
      "svix-timestamp": req.headers["svix-timestamp"]! as string,
      "svix-signature": req.headers["svix-signature"]! as string,
    };

    let evt: WebhookEvent;

    // 4. Verify the payload
    const strPayload = JSON.stringify(payload);
    try {
      evt = wh.verify(strPayload, svixHeaderDetails) as WebhookEvent;
    } catch (err) {
      console.error("Error verifying webhook:", err);
      return res.status(400).json({ error: "Verification failed" });
    }

    switch (evt.type) {
      case "user.created":
        const clerkData = evt.data;

        // add the user in the database :-

        
        // Check if user Details or not :-
        const {
          id,
          email_addresses,
          first_name,
          last_name,
          primary_email_address_id,
        } = clerkData;

        const primaryEmailAddress = email_addresses.find(
          ({ id }) => id === primary_email_address_id,
        );

        if (!primaryEmailAddress) {
          return errorHandler(res, 400, "Primary email of user not found");
        }

        const isExist = await isUserExistWithEmail(
          primaryEmailAddress.email_address,
        );

        if (isExist) {
          return errorHandler(res, 409, "User already exist with email");
        }

        // Otherwise add user in the db :-
        const userBody = {
          clerkId: id,
          firstName: first_name,
          lastName: last_name,
          email: primaryEmailAddress.email_address,
        };
        userId = await createNewUserRepo(userBody);
        break;

      default:
        break;
    }

    return responseHandler(res, 201, "User Created Successfully", {
      id: userId,
    });
  },
);

// export const clerkWebhook = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

//     console.log({ WEBHOOK_SECRET });
//     if (!WEBHOOK_SECRET) {
//       throw new Error(
//         "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env",
//       );
//     }

//     // 1. Get the headers from Express request
//     const svix_id = req.headers["svix-id"] as string;
//     const svix_timestamp = req.headers["svix-timestamp"] as string;
//     const svix_signature = req.headers["svix-signature"] as string;

//     // 2. If there are no headers, error out
//     if (!svix_id || !svix_timestamp || !svix_signature) {
//       return res
//         .status(400)
//         .json({ error: "Error occurred -- no svix headers" });
//     }

//     // 3. Get the body. Note: This requires express.json() or express.raw() middleware
//     const payload = JSON.stringify(req.body);
//     const wh = new Webhook();

//     let evt: WebhookEvent;

//     // 4. Verify the payload
//     try {
//       evt = wh.verify(payload, {
//         "svix-id": svix_id,
//         "svix-timestamp": svix_timestamp,
//         "svix-signature": svix_signature,
//       }) as WebhookEvent;
//     } catch (err) {
//       console.error("Error verifying webhook:", err);
//       return res.status(400).json({ error: "Verification failed" });
//     }

//     // 5. Handle the event
//     const eventType = evt.type;

//     if (eventType === "user.created") {
//       const { id, email_addresses, first_name, last_name } = evt.data;
//       const email = email_addresses[0].email_address;

//       const isExist = await isUserExistWithEmail(email);

//       if (!isExist) {
//         await createNewUserRepo({
//           clerkId: id, // Good practice to store this!
//           firstName: first_name,
//           lastName: last_name,
//           email: email,
//         });
//       }
//     }

//     return responseHandler(res, 201, "Webhook processed successfully", {});
//   },
// );
