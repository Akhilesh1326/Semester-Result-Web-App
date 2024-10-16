import { useEffect, useState } from "react";
import axios from "axios"

const SideBar = () => {
    const [chooseButton, setChooseButton] = useState('');
    const [userName, setUserName] = useState("")
    const [PRN, setPRN] = useState("")
    const [rollNumber, setRollNumber] = useState("")
    const [division, setDivision] = useState("")
    const [marksOfDAA, setMarksOfDAA] = useState("")
    const [marksOfCNT, setMarksOfCNT] = useState("")
    const [marksOfANN, setMarksOfANN] = useState("")
    const [marksOfCC, setMarksOfCC] = useState("")
    const [load, setLoad] = useState(false);

    const [reqPRN, setReqPRN] = useState(0);

    const [allSemData, setAlltSemData] = useState([]);

    const [dragData, setDragData] = useState("");

    async function addSemResults() {
        setLoad(true);
        try {
            const resp = await axios.post("/api/user/AddNewResult", {
                userName,
                PRN,
                rollNumber,
                division,
                marksOfDAA,
                marksOfCNT,
                marksOfANN,
                marksOfCC,
            })
            setUserName("")
            setPRN("")
            setRollNumber("")
            setDivision("")
            setMarksOfANN("")
            setMarksOfCC("")
            setMarksOfCNT("")
            setMarksOfDAA("")
            console.log("Response after sending data to backend  - ", resp);
            if (resp.data.response == "All Good") {
                setLoad(false)
            }
        } catch (error) {
            console.log("Error = ", error);
        }
    }

    async function getSingleUserData() {
        console.log(reqPRN);
        try {
            const resp = await axios.post("/api/user/single-user-result", {
                reqPRN,
            })
            console.log("Resp for sem data update = ", resp)
            setUserName(resp.data.data[0].userName)
            setPRN(resp.data.data[0].PRN)
            setRollNumber(resp.data.data[0].rollNumber)
            setDivision(resp.data.data[0].division)
            setMarksOfDAA(resp.data.data[0].marksOfDAA)
            setMarksOfCNT(resp.data.data[0].marksOfCNT)
            setMarksOfANN(resp.data.data[0].marksOfANN)
            setMarksOfCC(resp.data.data[0].marksOfCC)
            // console.log(resp.data.data[0].userName)
        } catch (error) {
            console.log("Error while updating the info = ", error);
        }
    }

    async function updateResutl() {
        try {
            const resp = await axios.patch("/api/user/UpdateResultInfo");
            console.log("Update response = ",resp);
            if(resp.data.msg=="Good"){
                setLoad(false);
            }else{
                setLoad(true);
            }
        } catch (error) {
            console.log("ERror while updating info",error)
        }
    }

    useEffect(() => {
        console.log(load)
        async function getAllSemesterResultData() {
            const resp = await axios.get('/api/user/allSemData');
            console.log("Response for all sem data = ", resp);
            setAlltSemData(resp.data.result);
        }
        getAllSemesterResultData();
    }, [dragData])




    function displayChange() {
        console.log(chooseButton)
    }

    return (
        <div>
            <div>
                All Operations
            </div>
            <button onClick={() => { setChooseButton(1), displayChange() }}>Create New Result Holder</button>
            <button onClick={() => { setChooseButton(2), displayChange() }}>Update Existing Result Holder</button>
            <button onClick={() => { setChooseButton(3), displayChange(), setDragData(!dragData) }}>Delete Exiting Result Holder</button>
            {chooseButton == 1 ? (<>
                <div>Add new result</div>
                <div>Enter Name</div>
                <input type="text" name="" id="" placeholder="Name" value={userName} onChange={(e) => { setUserName(e.target.value) }} />
                <div>Enter PRN</div>
                <input type="text" name="" id="" placeholder="PRN" value={PRN} onChange={(e) => { setPRN(e.target.value) }} />
                <div>Enter ROLL</div>
                <input type="text" name="" id="" placeholder="Roll" value={rollNumber} onChange={(e) => { setRollNumber(e.target.value) }} />
                <div>Enter Division</div>
                <input type="text" name="" id="" placeholder="Div" value={division} onChange={(e) => { setDivision(e.target.value) }} />
                <div>Enter Marks Of DAA</div>
                <input type="text" name="" id="" placeholder="DAA Marks" value={marksOfDAA} onChange={(e) => { setMarksOfDAA(e.target.value) }} />
                <div>Enter Marks Of CNT</div>
                <input type="text" name="" id="" placeholder="CNT Marks" value={marksOfCNT} onChange={(e) => { setMarksOfCNT(e.target.value) }} />
                <div>Enter Marks Of ANN</div>
                <input type="text" name="" id="" placeholder="ANN Marks" value={marksOfANN} onChange={(e) => { setMarksOfANN(e.target.value) }} />
                <div>Enter Marks Of CC</div>
                <input type="text" name="" id="" placeholder="CC Marks" value={marksOfCC} onChange={(e) => { setMarksOfCC(e.target.value) }} />
                <button onClick={addSemResults}>{load ? "|" : "Submit"}</button>
            </>) :
                chooseButton == 2 ? (<>
                    <div>Update new result</div>
                    <input type="text" placeholder="Enter Student PRN to Modify Data" value={reqPRN} onChange={(e) => setReqPRN(e.target.value)} />
                    <button onClick={() => getSingleUserData()}>Submit PRN</button>
                    <div>
                        <div>Name: <strong>{userName}</strong></div>
                        <input type="text" name="" id="" placeholder="Name" value={userName} onChange={(e) => { setUserName(e.target.value) }} />

                    </div>
                    <div>
                        <div>PRN: <strong>{PRN}</strong></div>
                        <input type="text" name="" id="" placeholder="PRN" value={PRN} onChange={(e) => { setPRN(e.target.value) }} />

                    </div>
                    <div>
                        <div>Roll Number: <strong>{rollNumber}</strong></div>
                        <input type="text" name="" id="" placeholder="Roll" value={rollNumber} onChange={(e) => { setRollNumber(e.target.value) }} />

                    </div>
                    <div>
                        <div>Division: <strong>{division}</strong></div>
                        <input type="text" name="" id="" placeholder="Div" value={division} onChange={(e) => { setDivision(e.target.value) }} />

                    </div>
                    <div>
                        <div>Marks of DAA: <strong>{marksOfDAA}</strong></div>
                        <input type="text" name="" id="" placeholder="DAA Marks" value={marksOfDAA} onChange={(e) => { setMarksOfDAA(e.target.value) }} />

                    </div>
                    <div>
                        <div>Marks of CNT: <strong>{marksOfCNT}</strong></div>
                        <input type="text" name="" id="" placeholder="CNT Marks" value={marksOfCNT} onChange={(e) => { setMarksOfCNT(e.target.value) }} />

                    </div>
                    <div>
                        <div>Marks of ANN: <strong>{marksOfANN}</strong></div>
                        <input type="text" name="" id="" placeholder="ANN Marks" value={marksOfANN} onChange={(e) => { setMarksOfANN(e.target.value) }} />

                    </div>
                    <div>
                        <div>Marks of CC: <strong>{marksOfCC}</strong></div>
                        <input type="text" name="" id="" placeholder="CC Marks" value={marksOfCC} onChange={(e) => { setMarksOfCC(e.target.value) }} />

                    </div>
                    <button>{load ? "|" : "Update Data"}</button>

                </>) :
                    (<>
                        {allSemData == "No Data Found" ? (<>Data Not Found</>) : (<>
                            {allSemData.map((item) => (
                                <div key={item._id} className="p-4 border-b">
                                    <div>Name: <strong>{item.userName}</strong></div>
                                    <div>PRN: <strong>{item.PRN}</strong></div>
                                    <div>Roll Number: <strong>{item.rollNumber}</strong></div>
                                    <div>Division: <strong>{item.division}</strong></div>
                                    <div>Marks of DAA: <strong>{item.marksOfDAA}</strong></div>
                                    <div>Marks of CNT: <strong>{item.marksOfCNT}</strong></div>
                                    <div>Marks of ANN: <strong>{item.marksOfANN}</strong></div>
                                    <div>Marks of CC: <strong>{item.marksOfCC}</strong></div>
                                </div>
                            ))}

                        </>)}
                    </>)}
        </div>
    )
};

export default SideBar;