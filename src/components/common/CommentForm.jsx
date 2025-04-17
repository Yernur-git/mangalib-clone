import React, { useState } from 'react';
import '../../styles/Comments.css';

const CommentForm = ({ onCommentSubmit }) => {
    const [commentText, setCommentText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (commentText.trim()) {
            onCommentSubmit(commentText);
            setCommentText('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="comment-form">
      <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write your comment..."
          required
      />
            <button type="submit">Post Comment</button>
        </form>
    );
};

export default CommentForm;