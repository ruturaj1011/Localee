import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCommentDots, FaPaperPlane, FaTimes } from "react-icons/fa";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const ChatBot = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const hasWelcomed = useRef(false); // for one-time welcome message

  const toggleChat = () => {
    setOpen((prev) => {
      const newOpen = !prev;

      if (newOpen && !hasWelcomed.current) {

        if(user?.name){
          const welcomeMsg = {
            sender: "bot",
            text: `Hi ${user.name}, how can I help you today? 😊`,
          };
          setChat((prevChat) => [...prevChat, welcomeMsg]);
          hasWelcomed.current = true;
        }
        else{
          const welcomeMsg = {
            sender: "bot",
            text: `Hi, how can I help you today? 😊`,
          };
          setChat((prevChat) => [...prevChat, welcomeMsg]);
          hasWelcomed.current = true;
        }
        
      }

      return newOpen;
    });
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const newChat = [...chat, { sender: "user", text: input }];
    setChat(newChat);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/chat`, {
        prompt: input,
        user,
      });
      const botReply = res.data.reply;
      setChat([...newChat, { sender: "bot", text: botReply }]);
    } catch (err) {
      setChat([...newChat, { sender: "bot", text: "Something went wrong." }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, loading]);

  return (
    <>
      {!open && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-xl z-50"
        >
          <FaCommentDots size={24} />
        </button>
      )}

      {open && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 w-[350px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-300"
        >
          <div className="bg-blue-600 text-white p-3 rounded-t-2xl flex justify-between items-center">
            <h3 className="font-semibold">AI Assistant</h3>
            <FaTimes className="cursor-pointer" onClick={toggleChat} />
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2">
            {chat.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
              >
                <div
                  className={`rounded-xl px-4 py-2 text-sm max-w-[70%] ${msg.sender === "user"
                      ? "bg-blue-100 text-black"
                      : "bg-gray-200 text-black"
                    }`}
                >
                  <ReactMarkdown
                    components={{
                      h1: ({ node, ...props }) => <h1 className="text-xl font-bold mb-2" {...props} />,
                      h2: ({ node, ...props }) => <h2 className="text-lg font-semibold mb-2" {...props} />,
                      p: ({ node, ...props }) => <p className="mb-1 whitespace-pre-wrap" {...props} />,
                      ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-2" {...props} />,
                      ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-2" {...props} />,
                      li: ({ node, ...props }) => <li className="ml-4" {...props} />,
                      strong: ({ node, ...props }) => <strong className="font-semibold text-black" {...props} />,
                      em: ({ node, ...props }) => <em className="italic text-gray-700" {...props} />,
                      blockquote: ({ node, ...props }) => (
                        <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700 mb-2" {...props} />
                      ),
                      br: () => <br />,
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>

                </div>
              </div>
            ))}

            {loading && <div className="text-gray-500 text-sm">Typing...</div>}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask something..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm outline-none"
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
            >
              <FaPaperPlane />
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default ChatBot;
