import React from 'react';
import '../../styles/Comments.css';

const CommentList = ({ comments }) => {
    return (
        <div className="comment-list">
            {comments.length > 0 ? (
                comments.map(comment => (
                    <div key={comment.id} className="comment-item">
                        <div className="comment-header">
                            <span className="comment-author">{comment.username}</span>
                            <span className="comment-date">
                {new Date(comment.date).toLocaleString()}
              </span>
                        </div>
                        <p className="comment-text">{comment.text}</p>
                    </div>
                ))
            ) : (
                <p className="no-comments">No comments yet</p>
            )}
        </div>
    );
};

export default CommentList;