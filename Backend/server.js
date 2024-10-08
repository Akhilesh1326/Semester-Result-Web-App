const express = require("express")
const connectDB = require("./ConnectDb");

const app = express();
app.use(express.json());

connectDB.connectToDB(process.env.MONGODB ?? "mongodb://127.0.0.1:27017/semesterResultWebAppDB")
.then(()=>{
    console.log("DB Connected");
})
.catch((err)=>{
    console.log("Error occured while connecting to database = ",err);
})

const {
    AddNewResult,
    ShowAllData,
} = require("./Controller/SemesterResult");

app.post("/api/user/AddNewResult", async(req,res)=>{
    const result = req.body;
    console.log("Result of all data  = ", req.body);
    const result1 = await AddNewResult(req.body);
    console.log("result of data submission - ",result1);

    if(!result){
        res.json({response:"Error Data Not Found"})
    }else{
        res.json({response:"All Good"})
    }
})

app.get("/api/user/allSemData", async(req,res)=>{
    try {
        const result = await ShowAllData();
        console.log("All Sem Data Retrived = ",result)
        if(!result){
            res.json({result:"No Data Found"})
        }else{
            res.json({result: result});
        }
    } catch (error) {
        
    }
})


const PORT = 8000;
app.listen(PORT, ()=>{console.log("Server Started at ",8000)})