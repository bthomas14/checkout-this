/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from '@emotion/react';
import axios from 'axios';
import React, {useEffect, useState} from 'react';

import Comment from './Components/Comment';
import ReviewChart from './Components/ReviewChart';
import ReviewForm from './Components/ReviewForm';
import {Review} from './types';

/*
  THEME
  primary:    #2bd4db
  border:     #cecfd9
  text:       #0c1142
*/

// In a real world app, we'd be getting this id from the url
const PRODUCT_ID = 1;

const App: React.FunctionComponent = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [serverError, setServerError] = useState(false);

  const fetchReviews = async () => {
    setServerError(false);
    try {
      const res = await axios.get(`/reviews?product_id=${PRODUCT_ID}&_sort=createdAt&_order=desc&_limit=20`);
      setReviews(res.data);
    } catch (err) {
      console.error('fetchReviews.Error', err);
      setServerError(true);
    }
  };

  useEffect(() => {
    void fetchReviews();
  }, []);

  return (
    <div css={{margin: '40px'}}>
      <h1 css={{fontWeight: '600'}}>Write a review</h1>
      <div 
        css={{
          display: 'flex', 
          justifyContent: 'space-between',
          '@media (max-width: 1024px)': {
            flexDirection: 'column',
          },
        }}
      >
        <div 
          css={{
            width: '40%',
            '@media (max-width: 1024px)': {
              width: '100%',
            },
          }}>
          <ReviewForm productId={PRODUCT_ID} onSubmit={fetchReviews} />
        </div>

        <div 
          css={{
            position: 'relative', 
            width: '600px', 
            height: '300px',
            '@media (max-width: 1024px)': {
              marginTop: '30px',
            },
          }}
        >
          <ReviewChart reviews={reviews} />
        </div>
      </div>

      <div css={{paddingTop: '40px'}}>
        <h2 css={{fontWeight: '600'}}>Latest Comments</h2>
        {serverError ? (
          <div>
            Oops, something went wrong. Try <button onClick={fetchReviews}>refreshing</button>.
          </div>
        ) : (
          <React.Fragment>
            {reviews.length > 0 && reviews.map((review) => <Comment key={review.id} review={review} />)}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default App;
