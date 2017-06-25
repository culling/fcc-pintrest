// References and useful pages
//https://stackoverflow.com/questions/41216948/this-setstate-is-not-a-function-when-trying-to-save-response-on-state

import React from 'react';
import {render} from 'react-dom';



class HomeContainer extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            activeContainer: "#home-container"
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
            <div id="home-container" className="home-container">
                Home Container
                {this.props.user &&
                <div id="welcome-message">
                    Welcome {this.props.user.displayName}
                </div>
                }
            </div>
        )
    }
}


export default HomeContainer;