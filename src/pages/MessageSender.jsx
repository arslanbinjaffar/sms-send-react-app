import axios from "axios";
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { uploadImage } from "../firebase";
import Loader from './../components/Loader/index';
import { ref } from 'firebase/storage';
import CountDown from "../components/countDown";
const MessageSender = () => {
  const navigate = useNavigate();
  // const [fileUpload, setFileUpload] = useState([]);
  const [error,setError]=useState("")
  const [groups, setGroups] = useState([]);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1)
  const [processing, setProcessing] = useState(false);
  // const handleFileChange = (event) => {
  //   const selectedFile = event.target.files[0];
  //   setFileUpload(selectedFile);
  // };
  // // const handleUploadFile = async () => {
  //   try {
  //     if (fileUpload.type !== "text/csv") {
  //       console.error("Invalid file type. Please select a CSV file.");
  //       return;
  //     }
  //     // setIsSubmitted(true);
  //     const url = await uploadImage(fileUpload)
  //     toast.success("url successfully")      
  //     const res = await axios.post('file/upload', { url })
  //     toast.success("data successfully")
  //       // setIsSubmitted(false);
  //     setGroups(res.data?.results);
  //   } catch (error) {
  //       toast.error("file failed to upload" + error.message);
  //       setIsSubmitted(false);      

  //   }
  // };
 

  const handlelogOut = async () => {
    const token = localStorage.removeItem("token")
    if (!token) {
    navigate("/admin");
    }
  };
  const FetchGroupsData = async(page,limit)  => {
      try {
        setProcessing(true)
        const res = await axios.get(`file/getallgroups?page=${page}&limit=${limit}`);
        setPage(page)
        setProcessing(false)
        setGroups(res.data?.results);
      } catch (error) {
        setProcessing(false)
        console.log(error)
      }
  }
  useLayoutEffect(() => {
    FetchGroupsData(1,20);
  }, []);
  const role=localStorage.getItem("role")
  const memoizedComponent = useMemo(() => {
    return (
      <section className="bg-white-300">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0 ">
          <div className="w-full bg-[pink] text-white rounded-lg shadow border md:my-8 sm:max-w-lg xl:p-0">
            <div className="p-3 pt-2 space-y-4 md:space-y-6 sm:p-8 sm:pt-3 w-full mt-5">
              <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold leading-tight text-gray-800  tracking-tight md:text-2xl">
                  Send Messages
                </h1>
                <button
                  onClick={handlelogOut}
                  className=" text-white bg-[#B83FCB] hover:bg-[#69364a] font-semibold text-lg rounded-lg px-5 py-2.5 text-center"
                >
                  Logout
                </button> 
              </div>
              {role=="admin" && <button
                  onClick={()=>navigate("/signup")}
                  className="flex justify-center items-center w-full text-white bg-[#3fcb6b] hover:bg-[#69364a] font-semibold text-lg rounded-lg px-5 py-2.5 text-center"
                >
                  Add Client
                </button> }
                {/* <div className="flex items-center justify-center w-full flex-col gap-4">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">CSV File</p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                  {fileUpload.length !== 0 && <h1>File::{fileUpload?.name}</h1>}
                <button
                    disabled={isSubmitted}
                    onClick={handleUploadFile}
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Submit 
                  </button>
                </div> */}
              {/* <div>
                <label
                  htmlFor="number-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                Add new number to list:
                </label>
                <input
                  type="text"
                  id="number-input"
                  aria-describedby="helper-text-explanation"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="13458222"
                  required
                />
              </div> */}
              {/* {isSubmitted && <div className="flex justify-center items-center"> <Loader /></div>} */}
              {processing && <div className="flex justify-center items-center"> <Loader /></div>}
              {groups.length !== 0 && (
                <>
                  <div>
                    <label
                      htmlFor="first_name"
                      className="block   text-sm font-semibold text-[#69364a] dark:text-white"
                    >
                      Message
                    </label>
                    <textarea
                      onChange={(e) => setMessage(e.target.value)}
                      value={message}
                      type="text"
                      id="first_name"
                      className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter your message"
                      rows="5"
                      required
                    />
                  </div>
                  {error && <p className="text-red-700 !my-1">{error}</p>}
                  <Groups setError={setError} groups={groups} message={message} setGroups={setGroups} FetchGroupsData={FetchGroupsData} page={page} setPage={setPage} setProcessing={ setProcessing} processing={ processing} />
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }, [ message, processing,page,setError,error]);
  return memoizedComponent;
};

export default MessageSender;

function LoadingBar() {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

function Groups({ groups, setGroups, message, page, setPage, processing, setProcessing, setError }) {
  const [isDisabled,setIsDisabled]=useState(false)
  const loadMoreData =async() => {
    if (!processing) {
      try {
        setProcessing(true);
        setPage((prev)=>prev+1);
        const res = await axios.get(`file/getallgroups?page=${page + 1}&limit=20`);
        setProcessing(false);
        setGroups((prevGroups) => [...prevGroups, ...res.data?.results]);
      } catch (error) {
        setProcessing(false);
        toast.error("error"+error.message)
      }
    }
}
 

  return (
    <div>
         {isDisabled && 
      <div className="fixed bg-gray-700 top-[30%] left-[45%]  w-44 h-20 flex justify-center items-center  rounded-2xl z-50">
  <CountDown setIsDisabled={setIsDisabled}/>
      </div>
   } 
      <div className="grid grid-cols-2 gap-7">
        {groups?.map((elem, index) => (
          <SingleGroup key={index} elem={elem} index={index} message={message} setError={setError} setIsDisabled={setIsDisabled}  isDisabled={isDisabled}/>
        ))}
      </div>

      {groups.length > 0 && (
        <div className="flex justify-center items-center mt-5">
          <button
            onClick={loadMoreData}
            disabled={processing}
            className={`
              text-white bg-primary-600 hover:bg-primary-700
              focus:ring-4
              focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5
              py-2.5 text-center`}
          >
            {processing ? <span><LoadingBar/></span> : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}

function SingleGroup({ elem, index,message,setError,isDisabled,setIsDisabled }) {
  const [isSelected, SetIsSelected] =useState("")
  const [isSended,setIsSended]=useState(false)
  const handleSendMessage = useCallback(async (data, message)  => {
      try {
        if (message.trim() == "" && message == "") {
          setError("please enter some message!")
          toast.error("please enter some message!")
          setTimeout(() => {
            setError("")
          },2000)
          setIsSended(false)
          return;
        }
        if (data == [] && data.length !== 0) {
          setIsSended(false)
          return;
        }
        setIsSended(true)
        const res = await axios.post("file/sendbulkmessages", { data, message });
        setIsDisabled(true)
        toast.success("Bulk message request accepted");
        setIsSended(false)
      } catch (error) {
        toast.error("Rate limit exceeds " + error.message)
        setIsSended(false)
        setIsDisabled(true)
      }
  },[])
  return (
    <div
          className="flex justify-between items-center bg-[#3339b1] text-[#fff] p-2 rounded-lg flex-col">
      
            <div className="flex justify-between items-center w-full">
              <h3 className="font-semibold">Group {index + 1}</h3>
        <button
          onClick={() => {
            SetIsSelected(elem._id)
             handleSendMessage(elem, message)
          }}
                disabled={isDisabled}
                className={`         
                  focus:ring-4
                  focus:outline-none focus:ring-primary-300 font-semibold rounded-lg text-sm px-5
                  py-2.5 text-center hover:text-white cursor-pointer
                  ${isSelected == elem._id ? "bg-[skyblue] text-white font-bold hover:bg-[#5aafd1]":"bg-[#EF8FCA] text-white hover:bg-[##e51896"}
                  ${isDisabled ? "bg-[grey] text-black":""}
                  `}
              >
                {isSended?<><LoadingBar/></>:"send"}
              </button>
            </div>
            {/* {elem.map((item, itemIndex) => (
              <div key={itemIndex} className=" bg-gray-200 p-2 rounded-lg flex justify-between items-center w-full">
                <h3 className="font-semibold">{item.Name} </h3>
              </div>
            ))} */}
          </div>
  )
}