import React, { createRef, useState, useEffect, useRef } from 'react';
import "./Feed.css";
import StoryReel from "./StoryReel";
import MessageSender from "./MessageSender";
import Post from "./Post";
import db from "./firebase";
import useIntersect from "./UseIntersect.js";

function Feed() {
	const FETCH_COUNT = 10;
	var isFirstLoad = true;

	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [target, setTarget] = useState();
	const [_, setRef] = useIntersect(async (entry, observer) => {
		observer.unobserve(entry.target);
		await fetchPost();
		observer.observe(entry.target);
	}, {});
	const postRef = db.collection('posts');
	const firstDocs = postRef.orderBy('timestamp', 'desc').limit(FETCH_COUNT); //값 비교 가능?
	/*
	var lastDoc = null;
	const nextFetch = myQuery.startAfter(lastDoc);
	*/
	var querySnapshot;
	var lastVisible;
	
	const fetchPost = async () => {
		if (isLoading) return;
		setIsLoading(true);
		if(isFirstLoad) {
			querySnapshot = await firstDocs.get();
			isFirstLoad = false;
		}
		else {
			querySnapshot = await postRef.orderBy('timestamp', 'desc').startAfter(lastVisible).limit(FETCH_COUNT).get();
		}
		if (querySnapshot.docs.length == 0) return;
		lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
		querySnapshot.forEach(doc => {
			setPosts(prevArr => [...prevArr, {id:doc.id, data: doc.data()}]);
			console.log(doc.data().profilePic);
		});
		setIsLoading(false);
	}

	useEffect(()=>{
		//fetchPost();
		//isFirstLoad = false;
	},[]);

return (
	<div className="feed" >
		<StoryReel />
		<MessageSender />		
		
		{posts.map((post) => (
			<Post key={post.id} 
                profilePic={post.data.profilePic} 
                message={post.data.message} 
                timestamp={post.data.timestamp} 
				username={post.data.username} 
				image={post.data.image} 
		    />
		))}
		<div ref={setRef} className="feed_loading">
        	{isLoading && "Loading..."}
		</div>
	</div>
)

}

export default Feed
