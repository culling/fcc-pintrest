// References and useful pages
//https://stackoverflow.com/questions/41216948/this-setstate-is-not-a-function-when-trying-to-save-response-on-state

import React from 'react';
import {render} from 'react-dom';

//Navbars
import PrimaryNavbar    from './Navbars/PrimaryNavbar.jsx';

//Containers
import HomeContainer    from "./Containers/HomeContainer.jsx";
import ProfileContainer from "./Containers/ProfileContainer.jsx";
import BoardContainer   from "./Containers/BoardContainer.jsx";


class ReactContainer extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            activeContainer: "#home-panel"
        }
        //Binding to this for functions

    };

    componentWillMount(){
        socket.on('new state', function(newState) {
            console.log("new state found");
            //this.setState(newState);
        }.bind(this));
        this._getUser.bind(this);
        this._getUser();
        this._getTwitterUser.bind(this);
        this._getTwitterUser();
    }

    _getUser(){
        //User
        jQuery.ajax({
            method: 'GET',
            url:"/api/user",
            success: (user)=>{
                this.setState({ user: user });
            },
            contentType : "application/json",
            dataType: "JSON"
        });
    };
    _getTwitterUser(){
        //Twitter User
        jQuery.ajax({
            method: 'GET',
            url:"/api/twitter/user",
            success: (twitterUser)=>{
                this.setState({ twitterUser: twitterUser._json });
            },
            contentType : "application/json",
            dataType: "JSON"
        });
    };

    render(){
        return(

            <div>
                <header>
                <b>My Pintrest Clone</b>
                <PrimaryNavbar user={this.state.user} />
                    {this.state.user &&
                        <div>
                            <b>Current User {this.state.user.displayName}</b>
                        </div>
                    }
                </header>

                    <HomeContainer          user={this.state.user} twitterUser={this.state.twitterUser} />
                    <ProfileContainer       user={this.state.user} twitterUser={this.state.twitterUser} />
                    <div id="myBoard-container" className="div-hidden">
                        <BoardContainer     user={this.state.user} filterUser={this.state.user} />
                    </div>
                    <div id="allBoard-container" className="div-hidden">
                        <BoardContainer     user={this.state.user}  filterUser={{username:null, type:"all"}}/>
                    </div>


            </div>
        )
    }

}


render(<ReactContainer />, document.getElementById('react-container'));