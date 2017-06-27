// /login/twitter

import React from 'react';
import {render} from 'react-dom';

class PostCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentWillMount(){
 
    }

    _imgError(event) {
        event.target.src = "/src/images/error-image.jpg";
        event.target.error = "";
    }

    _addToWallClicked(post){
        console.log("Add to wall Clicked");
        //console.log(post);
        var postObject = Object.assign( this.props.post );
        delete postObject._id
        postObject.owner = this.props.user;
        
        //console.log(postObject);
        jQuery.ajax({
            type: "POST",
            url: "api/post",
            data: JSON.stringify(postObject ),
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

                <article className="item">
                    <div className="card ">
                        <div className="card-image">
                            <img src={this.props.post.refUrl} onError={this._imgError } alt={this.props.post.postHeading}  />
                        </div>
                        <div className="card-stacked">
                            <div className="card-content">
                                <div><a href={this.props.post.refUrl}><b>{this.props.post.postHeading}</b></a></div>
                                {this.props.post.owner &&
                                <b> {this.props.post.owner.displayName || "Holy Ghost"}</b>
                                }
                            </div>
                        </div>

                            <div className="card-action">
                                {/*<a href="#" onClick={()=>{ console.log("Star")}           } ><i className="fa fa-star-o"></i></a>*/}
                                {/*<a href="#" onClick={()=>{ console.log("Favorited!")}       } ><i className="fa fa-star-o"></i></a>*/}
                                {/*<a href="#" onClick={()=>{ console.log("Comment!")}         } ><i className="fa fa-comment"></i></a>*/}
                                {/*<a href="#" onClick={()=>{ console.log("Share!")}           } ><i className="fa fa-twitter"></i></a>*/}
                                <a href="#" onClick={()=>{ this._addToWallClicked(this.props.post) }  } ><i className="fa fa-thumb-tack"></i></a>
                            </div>
                    </div>
                </article>
        )
    }
}

export default PostCard;

