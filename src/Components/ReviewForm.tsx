/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from '@emotion/react';
import styled from '@emotion/styled';
import React, {useState} from 'react';
import axios from 'axios';

import Input from './Input';
import StarRating from './StarRating';

export const StyledError = styled.div(() => ({
  color: 'red',
  fontSize: '14px',
  marginTop: '5px',
}));

interface ReviewFormProps {
  productId: number;
  onSubmit: () => void;
}

const ReviewForm: React.FunctionComponent<ReviewFormProps> = ({onSubmit, productId}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState<null | number>(null);
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string[]}>({});
  const [submitError, setSubmitError] = useState(false);

  const resetForm = () => {
    setName('');
    setEmail('');
    setRating(null);
    setComment('');
    setSubmitError(false);
    setErrors({});
  };

  const validateFields = () => {
    const errorMap: {[key: string]: string[]} = {
      name: [],
      email: [],
      rating: [],
      comment: [],
    };
    // name validation
    if (!name) {
      errorMap.name.push('Name is required');
    }
    // email validation
    if (!email) {
      errorMap.email.push('Email is required');
    }
    if (
      !email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
    ) {
      errorMap.email.push('Email address must be valid');
    }

    // rating
    if (!rating) {
      errorMap.rating.push('Rating is required');
    }
    if (isNaN(Number(rating))) {
      errorMap.rating.push('Rating must be a number');
    }

    if (!comment) {
      errorMap.comment.push('Comment is required');
    }

    let hasErrors = false;
    for (const key in errorMap) {
      if (!errorMap[key].length) {
        delete errorMap[key];
      } else {
        hasErrors = true;
      }
    }
    setErrors(errorMap);
    return hasErrors;
  };

  const handleSubmit = async (evt: any) => {
    evt.preventDefault();
    setSubmitError(false);
    const hasErrors = validateFields();
    if (hasErrors) {
      return;
    }

    const data = {
      name,
      email,
      rating,
      comment,
      // timestamps would usually be generated in the database, just faking out here
      createdAt: Date.now(),
      productId: productId,
    };
    try {
      await axios.post('/reviews', data);
      onSubmit();
      resetForm();
    } catch (err) {
      console.log('handleSubmit.Error', err);
      setSubmitError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} data-testid="review-form">
      <div>
        <Input
          label="Name"
          name="name"
          type="text"
          value={name}
          onChange={setName}
          placeholder="Name"
          error={errors['name']}
        />
      </div>
      <Input
        label="Email"
        name="email"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="Email"
        error={errors['email']}
      />

      <StarRating value={rating} onClick={(val) => setRating(val)} error={errors['rating']} />

      <div css={{marginBottom: '20px'}}>
        <label htmlFor="comment" css={{display: 'block', marginBottom: '5px'}}>
          Comment
        </label>
        <textarea
          rows={5}
          name="comment"
          aria-label="Comment"
          value={comment}
          spellCheck={false}
          onChange={(evt) => setComment(evt.target.value)}
          placeholder="Tell us what you thought..."
          css={{
            width: '100%',
            border: '1px solid',
            borderColor: errors['comment'] ? 'red' : '#cecfd9',
            borderRadius: '4px',
            padding: '8px 10px',
            fontFamily: 'Graphik, Helvetica, sans-serif',
            fontWeight: 300,
            fontSize: '1rem',
          }}
        />
        {errors['comment'] && <StyledError>{errors['comment'].join(', ')}</StyledError>}
      </div>

      <button
        type="submit"
        css={{
          padding: '12px 24px',
          backgroundColor: '#2bd4db',
          fontSize: '16px',
          borderRadius: '8px',
          border: 'none',
          fontFamily: 'Graphik, Helvetica, sans-serif',
          fontWeight: '500',
          cursor: 'pointer',
          '&:hover, &:focus, &:active': {
            backgroundColor: '#6be1e6',
          },
        }}
      >
        Submit
      </button>
      {submitError && <StyledError>Oops, something went wrong.</StyledError>}
    </form>
  );
};

export default ReviewForm;
