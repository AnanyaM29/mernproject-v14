import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const registerController=async(req,res)=>{
    try{
        const {name,email,password,phone,address,answer} = req.body;
        //validations
        if(!name)
        {
            return res.send({error:'Name is required!'});
        }

        if(!email)
        {
            return res.send({error:'Password is required!'});
        }

        if(!password)
        {
            return res.send({error:'Password is required!'});
        }

        if(!phone)
        {
            return res.send({error:'Phone no. is required!'});
        }

        if(!address)
        {
            return res.send({error:'Address is required!'});
        }

        if (!answer) {
            return res.send({ message: "Answer is Required" });
          }

        const existingUser = await userModel.findOne({email})//checking if user exists

        
        if(existingUser)
        {
            return res.status(200).send(
                {
                    success: true,
                message:'Already registered, please log in.'})
        }


        //Registeration of user
        const hashedPassword = await hashPassword(password);
        //calling the hashpassword function made in the helper function to encrypt the newly recieve 
        //password

        const user = await new userModel({name,email,password:hashedPassword,phone,address,answer}).save();

        res.status(201).send({
            success:true,
            message:'User Registered succesfully',
            user ,
        })




    }catch(error){
        console.log(error);
        //The res.status() function set the HTTP status for the response.
        // It is a chainable alias of Node’s response.statusCode. 
        res.status(500).send({
            success:false,
            Message:'Error in registeration',
            error
        });
    }
}

//POST LOGIN
export const loginController = async(req,res)=>{
    try{
        const {email,password} = req.body;
        //validation
        if(!email || !password){
            return res.status(404).send({
                success: false,
                message:'Invalid email or password'
            })
        }

        const user= await userModel.findOne({email})//obtaining the user from the login 
                                                    //credentials.

        if(!user){
            return res.status(404).send({
                success: false,
                message:"Email is not registered"
            })
        }
        const match = await comparePassword(password,user.password)

        if(!match){
            return res.status(200).send({
                success: false,
                message:"Invalid password"
            })
        }
        //token

        const token = JWT.sign({ _id: user._id }, 'gluyxxesrj', { expiresIn: '7d' });

        res.status(200).send({
            success:true,
            message:'Login successfully',
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role
            },
            token,
        });
    }catch(error){
        console.log(error);
        //The res.status() function set the HTTP status for the response.
        // It is a chainable alias of Node’s response.statusCode. 
        res.status(500).send({
            success:false,
            Message:'Error in login',
            error,
        });
    }
}


export const forgotPasswordController = async (req, res) => {
    try {
      const { email, answer, newPassword } = req.body;
      if (!email) {
        res.status(400).send({ message: "Emai is required" });
      }
      if (!answer) {
        res.status(400).send({ message: "answer is required" });
      }
      if (!newPassword) {
        res.status(400).send({ message: "New Password is required" });
      }
      //check
      const user = await userModel.findOne({ email, answer });
      //validation
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Wrong Email Or Answer",
        });
      }
      const hashed = await hashPassword(newPassword);
      await userModel.findByIdAndUpdate(user._id, { password: hashed });
      res.status(200).send({
        success: true,
        message: "Password Reset Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Something went wrong",
        error,
      });
    }
  };
//test controller
export const testController = (req,res)=>{
    console.log("protected route")
}

//update prfole
export const updateProfileController = async (req, res) => {
    try {
      const { name, email, password, address, phone } = req.body;
      const user = await userModel.findById(req.user._id);
      //password
      if (password && password.length < 6) {
        return res.json({ error: "Passsword is required and 6 character long" });
      }
      const hashedPassword = password ? await hashPassword(password) : undefined;
      const updatedUser = await userModel.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
          phone: phone || user.phone,
          address: address || user.address,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Profile Updated SUccessfully",
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error WHile Update profile",
        error,
      });
    }
  };

  
  