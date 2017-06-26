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


    render(){
        return(
            <div className="card ">
                <div className="card-stacked">
                    <div className="card-content">
                        <div><b>{this.props.post.postHeading}</b></div>
                        <a href={this.props.post.refUrl}>{this.props.post.refUrl}</a>
                    </div>
                </div>
                <div>
                    <div className="card-action">
                        <a href="#" onClick={()=>{ console.log("Liked!")}           } ><i className="fa fa-thumbs-o-up"></i></a>
                        {/*<a href="#" onClick={()=>{ console.log("Favorited!")}       } ><i className="fa fa-star-o"></i></a>*/}
                        <a href="#" onClick={()=>{ console.log("Comment!")}         } ><i className="fa fa-comment"></i></a>
                        {/*<a href="#" onClick={()=>{ console.log("Share!")}           } ><i className="fa fa-twitter"></i></a>*/}
                        <a href="#" onClick={()=>{ console.log("Add to my Wall!")}  } ><i className="fa fa-thumb-tack"></i></a>

                    </div>
                </div>
            </div>
        )
    }
}

export default PostCard;

