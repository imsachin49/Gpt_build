export const autoTypingBotResponse = (text) => {
    let index = 0;
    let interval = setInterval(() => {
        if (index < text.length) {
            setPosts((prevState) => {
                let lastItem = prevState.pop();
                if (lastItem.type !== "bot") {
                    prevState.push({
                        type: "bot",
                        post: text.charAt(index - 1),
                    });
                } else {
                    prevState.push({
                        type: "bot",
                        post: lastItem.post + text.charAt(index - 1),
                    });
                }
                return [...prevState];
            });
            index++;
        } else {
            clearInterval(interval);
        }
    }, 20);
};
