const jwt = require("jsonwebtoken");
const User = require("../Models/User");

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader) {
        return res.status(401).json({
            message : "No Token"
        });
    }

    const token = authHeader.split("")[1];
    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
        if(err) {
            return res.status(403).json({message:"Invalid token"});
        }
        req.user=decoded;
        next();
    })
}

// For registering the API
// exports.register = async(req, res) => {
//     try{
//         const {name, email, password} = req.body;
//         const userExists = await User.findOne({email});
//         if(userExists){
//             return res.status(400).json({message: "User Already Exists"});
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = await User.create({name, email, password : hashedPassword});
//         res.status(201).json({message: "User Registered Successfully"});
//     }catch(error){
//         res.status(500).json({error: error.message});
//     }
// };

// // Login APor User
// exports.login = async (req, res) => {
//     try{
//         const {email, password} = req.body;
//         const user = await User.findOne({email});
//         if(!user){
//             return res.status(404).json({message: "User Not Found"});
//         }
//         const isMatch = await bcrypt.compare(password, user.password);
//         if(!isMatch) {
//             return res.status(400).json({message:"Invalid Credentials"});
//         }
//         const accessToken = generateAccessToken(user._id);
//         const refreshToken= generateRefreshToken(user.id);
//         user.refreshToken=refreshToken;
//         await user.save();
//         res.jsson({accessToken,refreshToken});
//     }catch(error) {
//         res.status(500).json({error: error.message});
//     }
// };

// // Refresh Token Api
// exports.refreshToken = async (req,res) => {
//     try{
//         const {refreshToken} = req.body;
//         if(!refreshToken){
//             return res.status(401).json({message:"Refresh token required"});
//         }
//         const user = await User.findOne({refreshToken});
//         if(!user){
//             return res.status(403).json({message: "Invalid Refresh token"});
//         }
//         jwy.verify(refreshToken,process.env.JWT_ACCESS_SECRET, (err, decoded) => {
//             if(err){
//                 return res.status(403).json({message: "Token Expired"});
//             }
//             const newAccessToken = generateAccessToken(user.id);
//             res.json({accessToken : newAccessToken});
//         })
//     }catch(error){
//         res.status(500).json({error : error.message});
//     }
// };