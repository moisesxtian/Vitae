import { useEffect, useState } from "react";
import useSmartBuild from "../hooks/useSmartBuild";
const SmartBuild = () => {
    const [firstMessageSent, setFirstMessageSent] = useState(false);
    const [input,setInput] = useState('');
    const [message, setMessage] = useState([]);
    const {getReply} = useSmartBuild();

    const sendMessage =async ()=> {
        setInput('');
        const userMessage = {
            role: "user",
            content: input
        }
        await setMessage(prev => [...prev, userMessage]);
        try{
          const updatedMessage=[...message,userMessage];
          const response=await getReply(JSON.stringify(updatedMessage));
          const aiMessage = {
            role: "ai",
            content: response.reply
          }
          setMessage(prev => [...prev, aiMessage]);
          
        }catch(err){
          console.log(err)
        }
    }
    // Set the First message
    useEffect(() => {
      
    },[message])
    useEffect(() => {
    if (!firstMessageSent){
        const aiMessage = {
          role: "ai",
          content: "Hi there! I’m Mr. Vitae, your personal resume assistant. 😊 To help craft the perfect resume for you, could you tell me a bit about yourself?"
        }
        setMessage(prev => [...prev, aiMessage]);
        setFirstMessageSent(true);
    }
    }, [firstMessageSent])
    return (
    <div className="h-[calc(100vh-64px)] w-full flex items-center justify-center bg-gray-100">
      <div className="flex flex-col w-[450px] h-[500px] bg-white border border-gray-300 rounded-xl shadow-2xl">
        {/* Chat Box Title Bar */}
        <div className="flex items-center justify-between p-4 text-white rounded-t-xl bg-accent2">
          <div className="text-xl font-bold">Chat with SmartBuild</div>
          <div>
            {/* Example: Close button */}
            <button className="text-white hover:text-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 p-4 overflow-y-auto">
            {
                message.map((m, i) => (
                    <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} mb-2`}>
                        <div className={`px-4 py-2 rounded-lg ${m.role === "user" ? "bg-accent2 text-white" : "bg-gray-200 text-gray-800"}`}>
                            {m.content}
                        </div>
                    </div>
                ))
            }
        </div>

        {/* Chat Input Area */}
        <div className="flex p-4 border-t border-gray-300">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent2"
          />
          <button 
          onClick={sendMessage}
          className="px-4 py-2 ml-2 text-white rounded-lg bg-accent2 hover:bg-accent2-dark">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmartBuild;