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
                        <div className='reviewee-id'>
                            {reviewee}
                        </div>
                            5.0
                            <br></br>
                            <br></br>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                <Accordion>
                    <ScrollView>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="review-content"
                        id="review-header"
                        >
                        Reviews
                        </AccordionSummary>
                        <AccordionDetails>
                            Placeholder content. Replace with actual reviews using map function
                        </AccordionDetails>
                    </ScrollView>
                </Accordion>
                <Box>
                    <div>
                        <br></br>
                        Leave Review
                        <br></br>
                        <Select
                        labelId="select-score"
                        id="select-score"
                        className='score'
                        value={score}
                        onChange={handleChange}
                        label="Score">
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                        </Select>
                        <br></br>
                        <br></br>
                        <TextField
                            id="review"
                            className="input-width"
                            onChange={(e) => {setReview(e.target.value)}}
                        />
                        <br></br>
                        <br></br>
                        <Button onClick={updateReview}>Post</Button>
                    </div>
                </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    </div>
  );
}