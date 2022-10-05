// see SignupForm.js for comments
import React, { useState } from 'react';
import Auth from '../utils/auth';
import { Form, Button, Alert } from 'react-bootstrap';
import { LOGIN_USER } from '../utils/mutations';
import { useMutation } from '@apollo/react-hooks';