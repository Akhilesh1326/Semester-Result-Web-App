const { get } = require("mongoose");
const {semResult} = require("../Model/SemesterData");

async function AddNewResult(data) {
    const result =  await semResult.create(data);
    return result;
}

async function ShowAllData(){
    const result = await semResult.find({});
    return result;
}

async function getSingleUserResult(PRN) {
    const result = await semResult.find({PRN:PRN})
    return result;
}

module.exports = {
    AddNewResult,
    ShowAllData,
    getSingleUserResult
}