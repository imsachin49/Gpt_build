import { useState, useEffect } from "react";
import axios from "axios";
import send from "../assets/send.svg";
import user from "../assets/user.png";
import loadingIcon from "../assets/loader.svg";
import bot from "../assets/bot.png";
import { autoTypingBotResponse } from "../utils/autoTyping";
import { useLocation } from "react-router-dom";

function OldChat() {
  const location = useLocation();
  const instanceId = location?.pathname?.split("/")[2];
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("chatPosts"));
    setPosts(storedPosts || []);
  }, []);

  useEffect(() => {
    const filteredPosts = posts.filter((p) => p.id == instanceId);
    const filteredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
    setPost(filteredPost);
  }, [instanceId, posts]);

  return (
    <main className="chatGPT-app">
      <section className="chat-container">
        <div className="layout">
          {post && (
            <div
              key={post.id}
              className={`chat-bubble ${post.type === "bot" || post.type === "loading" ? "bot" : ""
                }`}
            >
              <div className="avatar">
                <img
                  src={post.type === "bot" || post.type === "loading" ? bot : user}
                  alt={`${post.type} avatar`}
                />
              </div>
              {post.type === "loading" ? (
                <div className="loader">
                  <img src={loadingIcon} alt="Loading icon" />
                </div>
              ) : (
                <div className="post">{post.post}</div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default OldChat;
