import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import "./Reviews.css"
import Box from '@mui/material/Box';
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {
    ScrollView,
  } from 'react-native';


export default function Reviews({reviewee, user}) {

    const [review, setReview] = useState("");
    const [score, setScore] = React.useState('');

    const handleChange = (event) => {
        setScore(event.target.value);
    };

    const updateReview = () => {
        const new_review = {
            "user_id": user,
            "review": review
        }
        // put review into database
        console.log(new_review)
    }

  return (
    <div>
        <Box className="set-font" p={2} sx={{ border: '2px solid grey' }}>
            <Accordion>
                <AccordionSummary>
                    <Box>
                        <div className='subheader'>
                            {reviewee}
                            <br></br>
                            4.6
                        </div>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="review-content"
                        id="review-header"
                        >
                        <div className='subheader'>
                        Reviews
                        </div>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box>
                                Score: 5
                                <br></br>
                                Was a great person to play Pokemon Go with. Caught a lot of good Pokemon during our walk and also stopped by Albertsons.
                            </Box>
                            <br></br>
                            <Box>
                                Score: 1
                                <br></br>
                                Didn't show up for a raid that they said they would be doing, so I ended up not being able to beat it.
                            </Box>
                            <br></br>
                            <Box>
                                Score: 4
                                <br></br>
                                Went well. Did a raid together.
                            </Box>
                        </AccordionDetails>
                </Accordion>
                <br></br>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <div className='subheader'>
                            Leave Review
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        Rating: &nbsp;
                        <Select
                        labelId="select-score"
                        id="select-score"
                        className='score'
                        value={score}
                        onChange={handleChange}>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                        </Select>
                        <br></br>
                        <br></br>
                        Comments: 
                        <TextField
                            id="review"
                            className="input-width"
                            onChange={(e) => {setReview(e.target.value)}}
                        />
                        <br></br>
                        <br></br>
                        <Button onClick={updateReview}>Post</Button>
                    </AccordionDetails>
                </Accordion>
                </AccordionDetails>
            </Accordion>
        </Box>
    </div>
  );
}