import express from "express";
import morgan from "morgan";
import createHttpError from "http-errors";
import categoryRouter from "./routes/category.routes";
import productRouter from "./routes/product.routes"
const app:express.Application = express();

app.use(express.json())

app.use(morgan("dev"))


app.use("/api/v1/category",categoryRouter)
app.use("/api/v1/product",productRouter)

app.all("*",async(req,res,next)=>{

    next(createHttpError.NotFound("Not Found"))
})

app.use((err,req,res,next)=>{
    res.status(err?.status ?? 500)
    .json({message:err?.message,stack: err?.stack})
})


export default app;
