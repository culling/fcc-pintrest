// References and useful pages
//https://stackoverflow.com/questions/41216948/this-setstate-is-not-a-function-when-trying-to-save-response-on-state

import React from 'react';
import {render} from 'react-dom';

//Navbars
import PrimaryNavbar    from './Navbars/PrimaryNavbar.jsx';

//Containers
import HomeContainer    from "./Containers/HomeContainer.jsx";

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


    render(){
        return(

            <div>
                <b>My Pintrest Clone</b>
                <PrimaryNavbar />
                {this.state.user &&
                    <div>
                        <b>Current User {this.state.user.displayName}</b>
                    </div>
                }
                <HomeContainer user={this.state.user} />
            </div>
        )
    }

}


render(<ReactContainer />, document.getElementById('react-container'));