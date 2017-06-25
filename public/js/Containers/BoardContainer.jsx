// References and useful pages
//https://stackoverflow.com/questions/41216948/this-setstate-is-not-a-function-when-trying-to-save-response-on-state

import React from 'react';
import {render} from 'react-dom';

class BoardContainer extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            user:       this.props.user,
            boardOwner: this.props.boardOwner
        }
    };

    componentWillMount(){
        socket.on('new state', function(newState) {
            console.log("new state found");
            //this.setState(newState);
        }.bind(this));
   }

    render(){
        return(
            <div id="board-container">
                <b>Board</b>
                {this.props.user && 
                    <div>Logged in Username: {this.props.user.username}</div>
                }
                
                {this.props.boardOwner &&
                    <div>Board Owner: {this.props.boardOwner.username}</div>
                }
                
            </div>
        )
    }
}


export default BoardContainer;