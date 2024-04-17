//import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
//import Symptoms from './components/Symptoms';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Upload from './components/Upload';
import Uploadbrain from './components/Uploadbrain';
// import Uploadheart from './components/Uploadheart';
import { Route,BrowserRouter,Routes,Switch ,withRouter } from 'react-router-dom';
import Logout from './components/Logout';
import Protectedroute from './ProtectedRoute';
import Uploadheart from './components/Uploadheart';


function App(){

  const [auth,setauth]=useState(false);
  const [auth1,setauth1]=useState(true);

  const isLoggedIn = async () => {
    try{
      const res=await fetch('/auth', {
        method:"GET",
        headers :{
          Accept : "application/json",
          "Content-Type": "application/json"
        },
        credentials : "include"
      });
      if(res.status===200){
        setauth(true);
        setauth1(false);
      }
      if(res.status===401){
        setauth(false);
        setauth1(true);
      }
    }catch(error){
      console.log(error);
    }
  }
  useEffect(()=>{
    isLoggedIn();
  },[]);
  return (
    <>
       
     <div>
     <Navbar auth={auth1}/>
       
      <Switch>
        <Route exact path="/" component={Home } />
        <Route exact path="/About" component={About} />
        <Route exact path="/Services" component={Services} />
        <Route exact path="/Contact" component={Contact} />
        {/* <Route exact path="/Upload" component={Upload} /> */}
        <Protectedroute exact path="/Login" component={Login} auth={auth1} />
        <Protectedroute exact path="/Register" component={ Register } auth={auth1}/>
        <Protectedroute exact path="/dashboard" component={ Dashboard } auth={auth}/>
        <Protectedroute exact path="/logout" component={ Logout } auth={auth}/>
        <Protectedroute exact path="/Upload" component={ Upload } auth={auth1}/>
       <Protectedroute exact path="/Uploadbrain" component={ Uploadbrain } auth={auth1}/>
       <Protectedroute exact path="/Uploadheart" component={ Uploadheart } auth={auth1}/>
       </Switch>

       <Footer/>
       
      
       </div>
    </>
  );
};

export default App;