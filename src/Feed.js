import React, { useState, useEffect } from 'react';
import "./Feed.css";
import StoryReel from "./StoryReel";
import MessageSender from "./MessageSender";
import Post from "./Post";
import db from "./firebase";

function Feed() {
	const [posts, setPosts] = useState([]);
        //ToDo, 
        //shouldAddPost 초기값 false여야 하는지 확인!
        const [shouldAddPost, setShouldAddPost] = useState(true);
        const [target, setTarget] = useState(null);

        const observerCallback = () => {
            if (shouldAddPost === true){
                alert('error');
            }
            else {
                setShouldAddPost(true);
            }
        }

        const addPost = () => {
            //ToDo, 
            //아래 쿼리를 어떻게 바꿔야 할까?
	    db.collection('posts').orderBy('timestamp', 'desc')
	        .onSnapshot((snapshot) => (
	            setPosts(snapshot.docs.map(
                        doc => ({ id: doc.id, data: doc.data() })))
		));
        }

        useEffect(() => {
            //ToDo, 
            //add 된 포스트를 setTarget(post)
            //useRef를 써야될듯...?
        },[posts]);

        useEffect(() => {
            shouldAddPost && addPost();
        },[target]);

        /*
        let options = {
            root: ???,
            rootMargin: '0px',
            threshold: 1.0
        }
        */
        let observer = new IntersectionObserver(observerCallback);

	useEffect(() => {
		db.collection('posts').orderBy('timestamp', 'desc')
			.onSnapshot((snapshot) => (
				setPosts(snapshot.docs.map(
                                    doc => ({ id: doc.id, data: doc.data() })))
			));
	}, []);


return (
	<div className="feed">
		<StoryReel />
		<MessageSender />		
		
		{posts.map((post) => (
			<Post key={post.id} 
                            profilePic={post.data.profilePic} 
                            message={post.data.message} 
                            timestamp={post.data.timestamp} 
                            username={post.data.username} image={post.data.image} 
		        />
		))}
	</div>
)

}

export default Feed
