// /login/twitter

import React from 'react';
import {render} from 'react-dom';

class PrimaryNavbar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            containerIds:[
                "#home-container",
                "#profile-container"
            ]
        }
    }

    componentWillMount(){
        jQuery( document ).ready(function(){
            jQuery(".button-collapse").sideNav();
        })
    }

    _showContainer(newActiveContainerId){
        if(this.state.activeContainerId != newActiveContainerId){
        this.setState({activeContainerId: newActiveContainerId});
        this.state.containerIds.filter(containerId =>{
            return containerId !== newActiveContainerId
        }).map(containerId =>{
            jQuery(containerId)
                .attr("class", "div-hidden");
        });
        //Show active container
        jQuery(newActiveContainerId)
            .attr("class", "div-visible");
        }
    }

    _homeClicked(){
        console.log("Home Clicked");
        this._showContainer("#home-container");        
    }


    _profileClicked(){
        console.log("profile Clicked");
        this._showContainer("#profile-container");

    }

    _loginClicked(){
        console.log("login Clicked");
        //this._hideAllContainers();
    }


    render(){
        return(
            <div>
                <nav>
                    <div className="nav-wrapper" >
                        <a href="#" data-activates="mobile-menu" className="button-collapse"><i className="material-icons">menu</i></a>
                        <ul className="right hide-on-med-and-down">
                            <li  onClick={ this._homeClicked.bind(this)}><a >Home</a></li>
                            <li  onClick={ this._profileClicked.bind(this)}><a >Profile</a></li>                            
                            <li  onClick={ this._loginClicked.bind(this)}><a href="/login/twitter">Log In</a></li>
                        </ul>
                        <ul className="side-nav" id="mobile-menu">
                            <li  onClick={ this._homeClicked.bind(this)}><a >Home</a></li>
                            <li  onClick={ this._profileClicked.bind(this)}><a >Profile</a></li>
                            <li  onClick={ this._loginClicked.bind(this)}><a href="/login/twitter" >Log In</a></li>
                        </ul>
                    </div>
                </nav>

            </div>
        )
    }
}

export default PrimaryNavbar;

