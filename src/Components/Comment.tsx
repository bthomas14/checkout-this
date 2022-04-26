/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from '@emotion/react';
import React from 'react';

import {Review} from '../types';

interface CommentProps {
  review: Review;
}

const Comment: React.FunctionComponent<CommentProps> = ({review}) => {
  return (
    <div
      className="CommentItem"
      css={{border: '1px solid #cecfd9', borderRadius: '4px', padding: '20px', marginBottom: '10px'}}
    >
      {review.comment}
      <div css={{fontStyle: 'italic', marginTop: '10px'}}>&mdash; {review.name}</div>
    </div>
  );
};

export default Comment;
