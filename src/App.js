import './App.css';
import { useState } from "react";
import { getDatabase, push, ref, set, onChildAdded } from 'firebase/database';
import { app } from "./index";
import { useEffect } from "react";
//firebase authenticator
import { GoogleAuthProvider,getAuth,signInWithPopup } from "firebase/auth";


function App() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const googleLogin = ()=>{
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    console.log(token,user);
    setName({name:result.user.displayName,email:result.user.email});
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  }
  const [name, setName] = useState({name:"",email:""});
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState('');

  const db = getDatabase(app);
  const chatListRef = ref(db, 'chats');

 const updateHeight=()=>{
  const el = document.getElementById("chat");
  if(el){
    el.scrollTop=el.scrollHeight;
  }
 }

  useEffect(() => {
    //below method is provided by Firebase
    onChildAdded(chatListRef, (data) => {
      setChats(chats=>[...chats,data.val()]);
     setTimeout(()=>{
      updateHeight();
     },100)
     
    });
  }, [])
  const sendChat = async () => {
    // const c = [...chats];
    // c.push({name,message:msg});
    // setChats(c);
    // Get a list of cities from your database
    const chatRef = push(chatListRef);
    set(chatRef, {
      name:{name:name.name,email:name.email}, message: msg
    })
    setMsg("");



  }

  return (
    <>
      <div>
        {/* {name?null:<div><input type="text" onBlur={(e)=>setName(e.target.value)} value={name}/></div>} */}
        {/* <div><input type="text" onChange={(e) => setName(e.target.value)} value={name} /></div> */}
       <button onClick={()=>{googleLogin()}}>Google Login</button>
        {name ? <div>
          <h1>User : {name.name}</h1>
          <div id="chat" className="chat-container">
            {chats.map((c,i) => (<div key={i} className={`container ${name.email === c.name.email ? "me" : ""}`}>
              <p className="chatbox">
                <strong>{c.name.name}</strong>
                <span>{c.message}</span>
              </p>
            </div>))}
          </div>
          <div className='btm'>
            <input type="text" onInput={e => setMsg(e.target.value)} value={msg} placeholder="enter your chat" />
            <button onClick={e => sendChat()}>send</button>
          </div>
        </div> : null}

      </div>
    </>

  );
}

export default App;
