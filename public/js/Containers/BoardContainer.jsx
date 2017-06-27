// References and useful pages
//https://stackoverflow.com/questions/41216948/this-setstate-is-not-a-function-when-trying-to-save-response-on-state

import React from 'react';
import {render} from 'react-dom';

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
            posts:      []
        }
    };

    componentWillMount(){
        socket.on('new state', function(newState) {
            console.log("new state found");
            //this.setState(newState);
        }.bind(this));
        this._getPosts(this.props.filterUser || this.props.user);
        jQuery('.grid').masonry({
            // options
            itemSelector: '.grid-item',
            columnWidth: 200
        });
    }

    componentWillReceiveProps(newProps){
        if (this.props.filterUser != newProps.filterUser){

            this.setState({filterUser: newProps.filterUser});
        }
        if (this.props.user != newProps.user){
            console.log(newProps.user);
            this.setState({user: newProps.user});
        }

    }

    _newPostClicked(){
        jQuery('#new-post-modal').modal('open');
    }

    _getPosts(user){
        var _this = this;
        if(!user){user = {}}
        var userObject = Object.assign(user);
        if(user.username){
            user.type = "user"
        }else{
            user.type="other"
        }
        console.log(user);

        jQuery.ajax({
            type: "GET",
            url: "api/post",
            success: function(rawPosts){
                var posts= JSON.parse(rawPosts);
                _this.setState({posts: posts})
                console.log("Success");
                //_this._getUser();
                console.log(_this.state.posts);
            },
            dataType: "text",
            contentType : "application/json"
        });        



    }

    render(){
        return(
            <div id="board-container">
                <b>Board</b>                
                {this.props.user && 
                <div>
                    <button className="btn button right" onClick={this._newPostClicked.bind(this) } >New Post</button>
                    <div>Logged in Username: {this.props.user.username}</div>
                </div>
                }
                
                {this.props.filterUser &&
                    <div>Board Owner: {this.props.filterUser.username}</div>
                }

                {(this.state.posts.length > 0) && 
                <div className="grid" data-masonry='{ "itemSelector": ".grid-item", "columnWidth": 200 }'>
                    {this.state.posts.map((post, i )=>{
                        return( 
                                
                                    <PostCard key={i} post={post} user={this.props.user} />
                                
                        )
                    })}
                </div>
                }


                <NewPostModal user={this.props.user} />
                <br />

            </div>

        )
    }
}


export default BoardContainer;