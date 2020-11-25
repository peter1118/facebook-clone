import React, { createRef, useState, useEffect, useRef } from 'react';
import "./Feed.css";
import StoryReel from "./StoryReel";
import MessageSender from "./MessageSender";
import Post from "./Post";
import db from "./firebase";

function Feed() {
        const POST_AMOUNT = 2;
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
        let observer = new IntersectionObserver(observerCallback,{ threshold: 0.8 });
        const getPost = () => {
            var postsRef = db.collection('posts');
	    postsRef.where('timestamp', '<', timeBoundary).orderBy('timestamp', 'desc').limit(POST_AMOUNT) //값 비교 가능?
                .get().then(function(querySnapshot) {
                    /*
	            setPosts(docs.map(
                            (doc) => {
                                console.log("in set doc! time? : " + timeBoundary);
                                console.log(doc.data);
                                setTimeBoundary(doc.data.timestamp);
                                return { id: doc.id, data: doc.data() };
                            }
                        )
                        */
                    querySnapshot.forEach((doc)=>{
                        setTimeBoundary(doc.data.timestamp); //todo : 마지막 놈의 시간으로만 업데이트 해주기
                        console.log(doc.id);
                        var tmpArr = posts;
                        //setPosts(posts.push({id: doc.id, data: doc.data()})); //setPost 한번씩해도 append가 계속 안되면 이거 써
                        tmpArr.push({id: doc.id, data: doc.data()});
                        setPosts(tmpArr);
                        console.log("length : " + posts.length); //Todo, 201126, 2까지 잘 늘어나는데 첫번째 놈만 렌더 됨 why???
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
            //ToDo, 
            //observe 동작하게 만들어라!
            observer.observe(target.current);
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
	</div>
)

}

export default Feed
