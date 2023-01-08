import type { NextApiRequest, NextApiResponse } from "next";
import { users } from "../../app/initDB";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    switch (req.method) {
      case "GET":
        {
          if (req.query.user_email && req.query.date) {
            const userData = await (
              await users
                .child(`${req.body?.user_email}/${req.body?.date}`)
                .once("value")
            ).val();
            console.log(userData);
            return userData;
          } else
            return res.status(400).json({
              message:
                "You must include user e-mail and datestring in request parameters",
            });
        }
        break;
      case "POST": {
        if (req.body.user_email && req.body.date) {
          const dTS: any = {
            gluc: req.body.gluc,
            insul: req.body.insul,
            exercise: req.body.exercise,
            breakfast: req.body.breakfast,
            lunch: req.body.lunch,
            dinner: req.body.dinner,
          };
          Object.keys(dTS).forEach((k: any) => !dTS[k] && delete dTS[k]);
          return await users
            .child(`${req.body?.user_email}/${req.body?.date}`)
            .update(dTS);
        } else
          return res.status(400).json({
            message:
              "You must include user e-mail and datestring in request body",
          });
      }
    }
  } catch (e) {
    return res.status(500).json({ message: "Something went wrong." });
  }
}
