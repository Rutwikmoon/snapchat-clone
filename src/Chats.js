/* eslint-disable no-unused-vars */
import { Avatar } from "@material-ui/core";
import { useState } from "react";
import { useEffect } from "react";
import ChatBubbleIcon  from "@material-ui/icons/ChatBubble";
import SearchIcon from "@material-ui/icons/Search";
import React from 'react';
import "./Chats.css";
import { db, auth } from "./firebase";
import Chat from "./Chat";
import { useSelector, useDispatch } from "react-redux";
import { selectuser } from "./features/appSlice";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { useHistory } from "react-router-dom";
import { resetCameraImage } from "./features/cameraSlice";


function Chats() {
    const [posts, setPosts] = useState([]);
    const user = useSelector(selectuser);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        db.collection("posts").orderBy("timestamp", "desc").onSnapshot((snapshot) => 
        setPosts(snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
        }))))
    }, []);

    const takeSnap = () => {
        dispatch(resetCameraImage());
        history.push("/");
    }


    return (
        <div className = "chats">
            <div className = "chats_header">
                <Avatar src = {user.profilePic}
                onClick = {() =>auth.signOut() }
                className = "chats_avatar"/>
                <div className = "chats_search">
                    <SearchIcon className = "chats_searchIcon" />
                    <input placeholder="Friends" type="text" />
                </div>
                <ChatBubbleIcon className="chats_chatIcon"/>
            </div>
            <div className = "chats_posts">
                {posts.map(
                    ({
                        id,
                        data: {profilePic, username, timestamp, imageUrl, read}
                    }) => (
                        <Chat 
                        key = {id}
                        id = {id}
                        username = {username}
                        timestamp = {timestamp}
                        imageUrl = {imageUrl}
                        read = {read}
                        profilePic = {profilePic}
                        />
                    ))}
            </div>
            <RadioButtonUncheckedIcon
            className = "chats_takePicIcon"
            onClick = {takeSnap}
            font-size = "large"
            />
        </div>
    )

}

export default Chats;
