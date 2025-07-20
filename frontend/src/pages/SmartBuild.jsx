import { useEffect, useState,useRef } from "react";
import { useFormContext } from "../context/FormContext";
import useSmartBuild from "../hooks/useSmartBuild";
import { FileText, Eye } from "lucide-react"; // Lucide icons

const SmartBuild = () => {
  const [firstMessageSent, setFirstMessageSent] = useState(false);
  const [responseLoading, setResponseLoading] = useState(false);
  const [input, setInput] = useState('');
  const [message, setMessage] = useState([]);
  const [resumeReady, setResumeReady] = useState(false); // new state
  const { getReply } = useSmartBuild();
  const { formData, setFormData } = useFormContext();
  const endRef = useRef(null);
  const sendMessage = async () => {
    if (!input.trim()) return;
    setInput('');
    const userMessage = {
      role: "user",
      content: input
    };
    setMessage(prev => [...prev, userMessage]);
    
    setResponseLoading(true);
    try {
      const updatedMessage = [...message, userMessage];
      const message_request = {
        message: JSON.stringify(updatedMessage.slice(-6)),
        formdata: JSON.stringify(formData)
      };
      const response = await getReply(message_request);

      const aiMessage = {
        role: "ai",
        content: response.reply
      };

      setMessage(prev => [...prev, aiMessage]);

      // ✅ Handle resume_ready flag
      if (response.resume_ready) {
        setResumeReady(true);
      }

      setResponseLoading(false);
    } catch (err) {
      console.error(err);
      setResponseLoading(false);
    }
  };

  useEffect(() => {
    if(endRef.current){
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  },[message])

  useEffect(() => {
    if (!firstMessageSent) {
      const aiMessage = {
        role: "ai",
        content:
          "Hi there! I’m Mr. Vitae, your personal resume assistant. 😊 To help craft the perfect resume for you, could you tell me a bit about yourself?"
      };
      setMessage(prev => [...prev, aiMessage]);
      setFirstMessageSent(true);
    }
  }, [firstMessageSent]);

  return (
    <div className="h-[calc(100vh-64px)] w-full flex items-center justify-center bg-gray-100">
      <div className="flex flex-col w-[450px] h-[600px] bg-white border border-gray-300 rounded-xl shadow-2xl">
        {/* Chat Box Title */}
        <div className="flex items-center justify-between p-4 text-white rounded-t-xl bg-accent2">
          <div className="text-xl font-bold">Chat with SmartBuild</div>
          <button className="text-white hover:text-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          {message.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} mb-2`}>
              <div className={`px-4 py-2 rounded-lg ${m.role === "user" ? "bg-accent2 text-white" : "bg-gray-200 text-gray-800"}`}>
                {m.content}
              </div>
            </div >
          ))}
          <div ref={endRef}></div>
        </div >

        {/* Resume Ready Button */}
        {resumeReady && (
          <div className="flex justify-around px-4 py-2 border-t border-gray-200 bg-gray-50">
            <button
              className="flex items-center gap-2 px-4 py-2 font-medium text-white bg-accent2 rounded-lg hover:bg-accent2-dark transition-all"
              onClick={() => alert('TODO: View Resume')}
            >
              <Eye size={18} /> View Resume
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-all"
              onClick={() => alert('TODO: Generate Resume')}
            >
              <FileText size={18} /> Generate
            </button>
          </div>
        )}

        {/* Input Area */}
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
            disabled={responseLoading}
            className={`px-4 py-2 ml-2 text-white rounded-lg ${
              responseLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-accent2 hover:bg-accent2-dark'
            }`}
            >
            Send
          </button> 
        </div>
      </div>
    </div>
  );
};

export default SmartBuild;
