import express from "express"
import dotenv from "dotenv"
import connectDB from "./database/db.js"
import userRoute from "./routes/user.route.js"
import blogRoute from "./routes/blog.route.js"
import commentRoute from "./routes/comment.route.js"
import cookieParser from 'cookie-parser';
import cors from 'cors'
import path from "path"
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import xss from 'xss-clean';
dotenv.config()
const app = express()

const PORT = process.env.PORT || 8000
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  message: 'Too many requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// default middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}))
app.use(helmet());
app.use(limiter);
app.use(mongoSanitize());
app.use(xss());
const _dirname = path.resolve()

// apis
 app.use("/api/v1/user", userRoute)
 app.use("/api/v1/blog", blogRoute)
 app.use("/api/v1/comment", commentRoute)

 app.use(express.static(path.join(_dirname,"/frontend/dist")));
 app.get("*", (_, res)=>{
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
 });
app.disable('x-powered-by');
app.listen(PORT, ()=>{
    console.log(`Server listen at port ${PORT}`);
    connectDB()
})