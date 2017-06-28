// /login/twitter

import React from 'react';
import {render} from 'react-dom';

class NewPostModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentWillMount(){
        jQuery( document ).ready(function(){
            jQuery('.modal').modal();
        });
    }

    _objectifyForm(formArray) {//serialize data function
        var returnArray = {};
        for (var i = 0; i < formArray.length; i++){
            returnArray[formArray[i]['name']] = formArray[i]['value'];
        }
        return returnArray;
    };



    _sendUserMessage(newStateDiff) {
        //this.sendUserMessageToDB(newStateDiff);
        // 2. put diffs onto the websocket
        this.postToSocket(newStateDiff);
    }

    postToSocket(newStateDiff) {
        console.log("Post to Socket");
        socket.emit('new state', newStateDiff);
    }

    sendUserMessageToDB(newStateDiff) {
        jQuery.ajax({
            type: "POST",
            url: "/api/users/messages",
            data: JSON.stringify( newStateDiff ),
            success: function(){
                console.log("message sent to db");
            },
            dataType: "text",
            contentType : "application/json"
        });        

        console.log(newStateDiff);
        console.log("Save to DB called");
    }
    //End _sendUserMessage


    _submitClicked(){
        console.log("Submit Clicked");

        let _this = this;
        var userMessage = {user:  this.props.user,
            message: "New post added "
        };
        
        var formDataSerializedArray = jQuery("#newPostForm").serializeArray();
        var formDataObject = this._objectifyForm(formDataSerializedArray);
        formDataObject.owner = this.props.user._id;
        jQuery("#postHeading")
                .add("#refUrl")
                .val("");

        console.log(JSON.stringify( formDataObject ));
        jQuery.ajax({
            type: "POST",
            url: "api/post",
            data: JSON.stringify(formDataObject ),
            success: function(){
                console.log("Success");
                //_this._getUser();
                _this._sendUserMessage(userMessage);
            },
            dataType: "text",
            contentType : "application/json"
        });


    }

    render(){
        return(
            <div id="new-post-modal" className="modal">
                <form id="newPostForm">
                <div className="modal-content">
                    <h4>New Post</h4>

                        <div className="input-field">
                            <i className="material-icons prefix">mode_edit</i>
                            <input type="text" name="postHeading" id="postHeading" required />
                            <label htmlFor="postHeading" >Title </label>
                        </div>
                        <div className="input-field">
                            <i className="material-icons prefix">web</i>
                            <input type="url" name="refUrl" id="refUrl" required className="validate" pattern="https?://.+(\.jpg|\.png|.\SVG|.\gif)"  />
                            <label htmlFor="refUrl" >Image URL: </label>
                        </div>

                </div>
                <div className="modal-footer">
                <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat" onClick={this._submitClicked.bind(this)}>Submit</a>
                <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a>
                </div>
                </form>
            </div>
        )
    }
}

export default NewPostModal;

