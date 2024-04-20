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
import {
    ScrollView,
  } from 'react-native';


export default function Reviews({reviewee}) {

    const [review, setReview] = useState("");

  return (
    <div>
        <Box className="set-font" p={2} sx={{ border: '2px solid grey' }}>
            <Box>
                <div className='reviewee-id'>
                    {reviewee}
                </div>
                    5.0
                    <br></br>
                    <br></br>
            </Box>
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
                    <TextField
                        id="review"
                        className="input-width"
                        onChange={(e) => {setReview(e.target.value)}}
                    />
                    <br></br>
                    <br></br>
                    <Button>Post</Button>
                </div>
            </Box>
        </Box>
    </div>
  );
}