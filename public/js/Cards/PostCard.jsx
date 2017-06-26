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

    render(){
        return(
            <div className="grid-item ">
                <article className="card ">
                    <div className="card-image">
                        <img src={this.props.post.refUrl} onError={this._imgError } className="img-responsive" alt={this.props.post.postHeading} />
                    </div>
                    <div className="card-stacked">
                        <div className="card-content">
                            <div><a href={this.props.post.refUrl}><b>{this.props.post.postHeading}</b></a></div>
                            
                        </div>
                    </div>
                    <div>
                        <div className="card-action">
                            <a href="#" onClick={()=>{ console.log("Star")}           } ><i className="fa fa-star-o"></i></a>
                            {/*<a href="#" onClick={()=>{ console.log("Favorited!")}       } ><i className="fa fa-star-o"></i></a>*/}
                            <a href="#" onClick={()=>{ console.log("Comment!")}         } ><i className="fa fa-comment"></i></a>
                            {/*<a href="#" onClick={()=>{ console.log("Share!")}           } ><i className="fa fa-twitter"></i></a>*/}
                            <a href="#" onClick={()=>{ console.log("Add to my Wall!")}  } ><i className="fa fa-thumb-tack"></i></a>

                        </div>
                    </div>
                </article>
            </div>
        )
    }
}

export default PostCard;

