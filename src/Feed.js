import React, { createRef, useState, useEffect, useRef } from 'react';
import "./Feed.css";
import StoryReel from "./StoryReel";
import MessageSender from "./MessageSender";
import Post from "./Post";
import db from "./firebase";

function Feed() {
        const POST_AMOUNT = 5;
	const [posts, setPosts] = useState([]);
	const [isFirstLoad, setIsFirstLoad] = useState(true);
        //const [target, setTarget] = useState(() => createRef());
        const target = useRef();
        const [timeBoundary, setTimeBoundary] = useState(null); //이 기준 시간보다 오래된 n개의 게시물 가져올 예정

        const observerCallback = () => {
            console.log("observer callback!!");
            getPost();
        }
        /*
        let options = {
            root: ???,
            rootMargin: '0px',
            threshold: 1.0
        }
        */
        let observer = new IntersectionObserver(observerCallback);
        //ToDo, 
        //observe 동작하게 만들어라!
        //observer.observe(target.current);
        const setDocs = (doc) => {
            setTimeBoundary(doc.data.timestamp);
            return { id: doc.id, data: doc.data() };
        };
        const getPost = () => {
            var postsRef = db.collection('posts');
	    postsRef.where('timestamp', '<', timeBoundary).orderBy('timestamp', 'desc').limit(POST_AMOUNT)
                .get().then(function(snapshot) {
	            setPosts(snapshot.docs.map(
                            //doc => ({ id: doc.id, data: doc.data() })
                            setDocs
                        )
                    );
                });
        }
	useEffect(() => {
            if(!isFirstLoad) return;        
	    db.collection('posts').orderBy('timestamp', 'desc')
		.onSnapshot((snapshot) => (
			setPosts(snapshot.docs.map(
                               doc => ({ id: doc.id, data: doc.data() })))
		));
            setIsFirstLoad(false);
	}, []);

return (
	<div ref={target} className="feed">
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
