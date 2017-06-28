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
        this._getPosts(this.props.user, this.props.filterUser);
        this._ownerClicked = this._ownerClicked.bind(this);
    }

    componentDidMount(){
        socket.on('new state', function(newState) {
            console.log("new state found");
            //this.setState(newState);
            this._getPosts(this.state.user, this.state.filterUser);
        }.bind(this));
    }

    componentWillUnmount(){
        socket.removeListener('new state');
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



        jQuery.urlParam = function(name){
            var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
            if (results==null){
            return null;
            }
            else{
            return decodeURI(results[1]) || 0;
            }
        }

        var username = jQuery.urlParam('username') || "";
        
        jQuery.ajax({
            type: "GET",
            url: "api/post/" + username ,
            success: function(rawPosts){
                var postsUnfiltered = JSON.parse(rawPosts);
                var posts = postsUnfiltered.filter(post => {
                    //console.log(post.owner);
                    //console.log(filterUser)
                    var owner = post.owner;
                    
                    if(owner && owner.username &&
                        filterUser &&
                        filterUser.username && (post.owner.username === filterUser.username) ){
                        return true;
                    }
                    return (filterUser && filterUser.type && (filterUser.type == "all"));
                    
                
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


    _ownerClicked(filterUser){
        console.log("User Clicked!");
        console.log("User");
        console.log(filterUser);

        this.setState({filterUser: filterUser});
        this._getPosts(this.state.user, filterUser);

    }



    render(){
        
        return(
            <div id="board-container">
                {/*<b>Board</b>*/}
                {(this.props.user && (this.props.user.username != null)) && 
                <div>
                    {(this.props.filterUser && (this.props.filterUser.username != null)) &&

                    <div>
                        <button className="btn button right" onClick={this._newPostClicked.bind(this) } >New Post</button>
                        <NewPostModal user={this.props.user} />
                    </div>
                    }
                    {/*<div>Logged in Username: {this.props.user.username}</div>*/}
                </div>
                }
                
                {(this.state.filterUser && (this.state.filterUser.username != null)) &&
                    <div>Board Owner: {this.state.filterUser.username}</div>
                }




                {(this.state.posts.length > 0) && 
                <div className="masonry" >
                    {this.state.posts.map( (post, i) => {
                        return(
                            <PostCard key={i} post={post} user={this.props.user} ownerClicked={  this._ownerClicked } />
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