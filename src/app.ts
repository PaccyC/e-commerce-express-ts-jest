import express from "express";
import morgan from "morgan";
import createHttpError from "http-errors";

const app:express.Application = express();

app.use(express.json())
app.use(morgan("dev"))


app.all("*",async(req,res,next)=>{

    next(createHttpError.NotFound("Not Found"))
})

app.use((err,req,res,next)=>{
    res.status(err?.status ?? 500)
    .json({message:err?.message,stack: err?.stack})
})


export default app;
