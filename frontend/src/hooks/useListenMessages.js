import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

import notificationSound from "../assets/sounds/frontend_src_assets_sounds_notification.mp3";

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages } = useConversation();

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {                               //socket.on is used to listen for events
			newMessage.shouldShake=true;
            const sound=new Audio(notificationSound);        //for sound
            sound.play();
			setMessages([...messages, newMessage]);
		});                                                      //in this use effect we are listening for messages in real time

		return () => socket?.off("newMessage");
	}, [socket, setMessages, messages]);
};
export default useListenMessages;