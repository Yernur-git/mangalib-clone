import React, { useState } from 'react';

const CommentForm = ({ onSubmit }) => {
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (comment.trim()) {
            onSubmit(comment);
            setComment('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="comment-form">
      <textarea
          className="comment-textarea"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment..."
          required
      />
            <button type="submit" className="comment-submit-btn">
                Post Comment
            </button>
        </form>
    );
};

export default CommentForm;