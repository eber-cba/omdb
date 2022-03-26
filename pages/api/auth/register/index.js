import dbConnect from "../../../../utils/database";
import User from "../../../../Models/User";
import generateJWT from "../../../../utils/generateJWT.Js"
export default async (req, res) => {
  await dbConnect();
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const newUser = new User(req.body);
        await newUser.save();
        const token = generateJWT({ id: newUser._id });

        return res.status(201).json({
          success: true,
          successMessage: "¡Registro existoso!",
          data: newUser,
          token: token,
        });
      } catch (error) {
        return res.status(400).json({
          success: false,
          successMessage: "Registro fallido",
          data: error,
  

        });
      }
   default:
     return res
     .status(500)
     .json({succes:true, error:"falla en el servidor",error})
  }
};
