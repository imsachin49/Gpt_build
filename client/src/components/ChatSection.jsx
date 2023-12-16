import React, { useState, useEffect } from "react";
import axios from "axios";
import send from "../assets/send.svg";
import user from "../assets/user.png";
import loadingIcon from "../assets/loader.svg";
import bot from "../assets/bot.png";
import { autoTypingBotResponse } from "../utils/autoTyping";
import { useNavigate } from 'react-router-dom';
import { BsSend } from "react-icons/bs";

function ChatSection() {
    const [input, setInput] = useState("");
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        document.querySelector(".layout").scrollTop =
            document.querySelector(".layout").scrollHeight;
    }, [posts]);

    useEffect(() => {
        const storedPosts = JSON.parse(localStorage.getItem("chatPosts")) || [];
        setPosts(storedPosts);
    }, []);

    const savePostsToLocalStorage = (newPosts) => {
        localStorage.setItem("chatPosts", JSON.stringify(newPosts));
    };

    const onSubmit = async () => {
        if (input.trim() === "") return;
        const userPost = {
            id: Date.now(),
            question: input,
            type: "user",
            post: input,
        };
        updatePosts(userPost, true); // Pass true to indicate loading state
        setInput("");

        try {
            const { data } = await axios.post("http://localhost:8800", { input }, { headers: { "Content-Type": "application/json" } });
            const botPost = {
                id: Date.now(),
                type: "bot",
                question: input,
                post: data.bot.copies[0]?.content?.trim(),
            };
            updatePosts(botPost);
            navigate(`/c/${botPost?.id}`);
        } catch (error) {
            alert("Error fetching bot response");
            console.error("Error fetching bot response:", error);
            const errorPost = {
                id: Date.now(),
                question: input,
                type: "bot",
                post: "Error fetching bot response",
            };
            updatePosts(errorPost);
        }
    };

    const updatePosts = (post, isLoading) => {
        if (isLoading) {
            // Show loading state
            setPosts((prevState) => [
                ...prevState,
                {
                    type: "loading",
                    ...post, // Spread the properties of the post object
                },
            ]);
        } else {
            // Update posts without loading state
            setPosts((prevState) => [
                ...prevState,
                {
                    type: "user", // or "bot" based on the type of the post
                    ...post, // Spread the properties of the post object
                },
            ]);
        }
        savePostsToLocalStorage([...posts, post]); // Save the updated posts to localStorage
    };

    const onKeyUp = (e) => {
        if (e.key === "Enter" || e.which === 13) {
            onSubmit();
        }
    };

    return (
        <main className="chatGPT-app">
            <section className="chat-container">
                <div className="layout">
                    <p className="text-2xl font-nunito font-extrabold text-gray-400">LongShot AI</p>
                </div>
            </section>
            <footer>
                <input
                    className="composebar"
                    value={input}
                    autoFocus
                    type="text"
                    placeholder="Ask anything!"
                    onChange={(e) => setInput(e.target.value)}
                    onKeyUp={onKeyUp}
                />
                <div className="send-button" onClick={onSubmit}>
                    <BsSend size={22} />
                </div>
            </footer>
        </main>
    );
}

export default ChatSection;
