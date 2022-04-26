/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from '@emotion/react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-solid-svg-icons'
import React, {useState} from 'react';

interface StarRatingProps {
  error?: string[];
  onClick: (_val: number) => void;
  value: null | number;
}

const StarRating: React.FunctionComponent<StarRatingProps> = ({error, onClick, value}) => {
  const ratings = [1, 2, 3, 4, 5];
  const [hoveredRating, setHoveredRating] = useState<null | number>();

  return (
    <div css={{marginBottom: '20px'}}>
      <label htmlFor="rating" css={{display: 'block', marginBottom: '5px'}}>Rating</label>
      <ul css={{listStyle: 'none', paddingLeft: '0px'}}>
        {ratings.map(rating => {
          const hovered = hoveredRating && hoveredRating >= rating;
          const selected = value && value >= rating; 
          return (
            <li
              key={rating} 
              onClick={() => onClick(rating)} 
              onMouseEnter={() => setHoveredRating(rating)}
              onMouseLeave={() => setHoveredRating(null)}
              data-testid={`rating-${rating}`}
              css={{
                display: 'inline-block', 
                paddingLeft: '5px',
                '&:first-of-type': {
                  paddingLeft: '0px',
                }
              }}
            >
              <div 
                className={hovered || selected ? 'selected' : 'unselected'}
                css={{
                  display: 'inline-block', 
                  border: '1px solid', 
                  borderColor: hovered ? '#ff9d3b' : (hoveredRating || !selected ? '#cecfd9' : '#ff8000'),
                  borderRadius: '4px', 
                  padding: '4px',
                  backgroundColor: hovered ? '#ff9d3b' : (hoveredRating || !selected ? '#cecfd9' : '#ff8000'),
                  cursor: 'pointer',
                }}
              >
                <FontAwesomeIcon 
                  icon={faStar} 
                  color="#fff" 
                />
              </div>
            </li>
          );      
        })}
      </ul>
      {error && <div css={{color: 'red', marginTop: '5px'}}>{error.join(", ")}</div>}
    </div>
  );
}

export default StarRating;