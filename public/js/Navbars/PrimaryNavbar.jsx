// /login/twitter

import React from 'react';
import {render} from 'react-dom';

class PrimaryNavbar extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentWillMount(){
        jQuery( document ).ready(function(){
            jQuery(".button-collapse").sideNav();
        })
    }

    _hideAllContainers(){

    }

    _homeClicked(){
        console.log("signup Clicked");

    }


    _loginClicked(){
        console.log("login Clicked");
        this._hideAllContainers();
        

        
    }

    _profileClicked(){
        console.log("Profile Clicked");

    }


    render(){
        return(
            <div>
                <nav>
                    <div className="nav-wrapper" >
                        <a href="#" data-activates="mobile-menu" className="button-collapse"><i className="material-icons">menu</i></a>
                        <ul className="right hide-on-med-and-down">
                            <li  onClick={ this._homeClicked.bind(this)}><a >Home</a></li>
                            <li  onClick={ this._loginClicked.bind(this)}><a href="/login/twitter">Log In</a></li>
                        </ul>
                        <ul className="side-nav" id="mobile-menu">
                            <li  onClick={ this._homeClicked.bind(this)}><a >Home</a></li>
                            <li  onClick={ this._loginClicked.bind(this)}><a href="/login/twitter" >Log In</a></li>
                        </ul>                    
                        
                        
                    </div>
                </nav>

            </div>
        )
    }
}

export default PrimaryNavbar;

