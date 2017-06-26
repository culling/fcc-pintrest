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


    _submitClicked(){
        console.log("Submit Clicked");

        let _this = this;
        var formDataSerializedArray = jQuery("#newPostForm").serializeArray();
        var formDataObject = this._objectifyForm(formDataSerializedArray);
        formDataObject.owner = this.props.user._id;
        console.log(JSON.stringify( formDataObject ));
        jQuery.ajax({
            type: "POST",
            url: "api/post",
            data: JSON.stringify(formDataObject ),
            success: function(){
                console.log("Success");
                //_this._getUser();
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
                            <input type="text" name="postHeading" id="postHeading" />
                            <label htmlFor="postHeading" >Title </label>
                        </div>
                        <div className="input-field">
                            <i className="material-icons prefix">web</i>
                            <input type="text" name="refUrl" id="refUrl" />
                            <label htmlFor="refUrl" >URL: </label>
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

