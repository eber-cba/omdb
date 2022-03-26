import dbConnect from "../../../../utils/database";
import User from "../../../../Models/index";
 

export default async (req, res) => {
  await dbConnect()
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const users = await User.find({});
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const user = new User(req.body);
        user.creationDate = new Date();
        await user.save();
        res.status(201).json(user);
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
