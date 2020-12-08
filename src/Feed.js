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
        const [timeBoundary, setTimeBoundary] = useState(new Date()); //이 기준 시간보다 오래된 n개의 게시물 가져올 예정

        const observerCallback = () => {
            console.log("observer callback!!");
            setPosts([]);
            getPost();
        }
        /*
        let options = {
            root: ???,
            rootMargin: '0px',
            threshold: 1.0
        }
        */
        const getPost = () => {
            var postsRef = db.collection('posts');
	    postsRef.where('timestamp', '<', timeBoundary).orderBy('timestamp', 'desc').limit(POST_AMOUNT) //값 비교 가능?
                .get().then(function(querySnapshot) {
                    /*
                    var arr = [];
                    querySnapshot.forEach((doc)=>{
                        setTimeBoundary(doc.data.timestamp); //todo : 마지막 놈의 시간으로만 업데이트 해주기
                        arr.push({id: doc.id, data: doc.data()})
                    });
                    */ //이부분은 원래 되던 부분이고, 이제 한개마다 setPosts해보자

                    querySnapshot.forEach((doc)=>{
                        setTimeBoundary(doc.data.timestamp); //todo : 마지막 놈의 시간으로만 업데이트 해주기
                        console.log("??" + timeBoundary) ;   
                        setPosts(prevArr => [...prevArr,{id: doc.id, data: doc.data()}]);
                    });
                });
        }
	useEffect(() => {
            if(!isFirstLoad) return;        
            /* original!
	    db.collection('posts').orderBy('timestamp', 'desc')
		.onSnapshot((snapshot) => (
			setPosts(snapshot.docs.map(
                               doc => ({ id: doc.id, data: doc.data() })))
		));
            */
            setIsFirstLoad(false);
	}, []);
        useEffect(()=>{
            let observer;
            if (target.current) {
                observer = new IntersectionObserver(observerCallback,{ threshold: 1 });
                observer.observe(target.current);
            }
        }, []);

return (
	<div className="feed" ref={target}>
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
            <div className="feed_loading" ref={target}></div>
	</div>
)

}

export default Feed
