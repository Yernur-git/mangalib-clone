import React from 'react';

const CommentList = ({ comments }) => {
    return (
        <div className="comment-list">
            {comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                    <div className="comment-header">
                        <span className="comment-author">{comment.username}</span>
                        <span className="comment-date">
              {new Date(comment.date).toLocaleString()}
            </span>
                    </div>
                    <p className="comment-text">{comment.text}</p>
                </div>
            ))}
        </div>
    );
};

export default CommentList;