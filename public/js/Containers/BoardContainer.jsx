// References and useful pages
//https://stackoverflow.com/questions/41216948/this-setstate-is-not-a-function-when-trying-to-save-response-on-state


//https://www.npmjs.com/package/react-masonry-component

import React from 'react';
import {render} from 'react-dom';
import Masonry from 'react-masonry-component';

//Modals
import NewPostModal     from "./../Modals/NewPostModal.jsx";

//Cards
import PostCard         from "./../Cards/PostCard.jsx";


class BoardContainer extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            user:       this.props.user,
            filterUser: this.props.filterUser,
            posts:      [],
            postCardArray: [],
            masonryOptions: {
                transitionDuration: 0
            }
        }
    };

    componentWillMount(){
        socket.on('new state', function(newState) {
            console.log("new state found");
            //this.setState(newState);
            this._getPosts(this.state.user, this.state.filterUser);
        }.bind(this));
        this._getPosts(this.props.filterUser || this.props.user);
    }

    componentWillReceiveProps(newProps){
        if (this.props.filterUser != newProps.filterUser){

            this.setState({filterUser: newProps.filterUser});
            this._getPosts(newProps.user, newProps.filterUser);
        }
        if (this.props.user != newProps.user){
            console.log(newProps.user);
            this.setState({user: newProps.user});
            this._getPosts(newProps.user, newProps.filterUser);
        }
        
    }




    _newPostClicked(){
        jQuery('#new-post-modal').modal('open');
    }

    _getPosts(user, filterUser){
        var _this = this;
        if(!user){user = {}}
        var userObject = Object.assign(user);
        if(user.username){
            user.type = "user"
        }else{
            user.type="other"
        }
        //console.log(user);

        jQuery.ajax({
            type: "GET",
            url: "api/post",
            success: function(rawPosts){
                var postsUnfiltered = JSON.parse(rawPosts);
                var posts = postsUnfiltered.filter(post => {
                    //console.log(post.owner);
                    console.log(filterUser)
                    var owner = post.owner;
                    
                    if(owner && owner.username && (post.owner.username === filterUser.username) ){
                        return true;
                    }
                    return (filterUser.type == "all");
                    
                
                })

                _this.setState({posts: posts})
                //console.log("Success");
                //_this._getUser();
                //console.log(_this.state.posts);

            },
            dataType: "text",
            contentType : "application/json"
        });        



    }

    render(){
        
        return(
            <div id="board-container">
                <b>Board</b>                
                {(this.props.user && (this.props.user.username != null)) && 
                <div>
                    {(this.props.filterUser && (this.props.filterUser.username != null)) &&
                    <div>
                        <button className="btn button right" onClick={this._newPostClicked.bind(this) } >New Post</button>
                        <NewPostModal user={this.props.user} />
                    </div>
                    }
                    <div>Logged in Username: {this.props.user.username}</div>
                </div>
                }
                
                {(this.props.filterUser && (this.props.filterUser.username != null)) &&
                    <div>Board Owner: {this.props.filterUser.username}</div>
                }




                {(this.state.posts.length > 0) && 
                <div className="masonry" >
                    {this.state.posts.map( (post, i) => {
                        return(
                            <PostCard key={i} post={post} user={this.props.user} />
                        )
                    })}
                </div>
                }

                <br />

            </div>

        )
    }
}


export default BoardContainer;