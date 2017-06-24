// References and useful pages
//https://stackoverflow.com/questions/41216948/this-setstate-is-not-a-function-when-trying-to-save-response-on-state

 
import React from 'react';
import {render} from 'react-dom';



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

    }




    render(){
        return(

            <div>
                My Pintrest Clone

            </div>
        )
    }

}


render(<ReactContainer />, document.getElementById('react-container'));