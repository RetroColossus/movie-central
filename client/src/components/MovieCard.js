import React, { useContext, useState } from 'react';

// import bootstrap-react components
import { Accordion, AccordionContext, Button, Card, Modal, ResponsiveEmbed, Row, Col } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import {
    MdChevronRight,
    MdChevronLeft,
    MdFavoriteBorder,
    MdClose,
    MdKeyboardArrowDown,
    MdKeyboardArrowUp
} from "react-icons/md";