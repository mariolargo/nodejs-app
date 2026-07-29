import express from "express";
import morgan from "morgan";

// Initializations
const app = express>();

// Settings
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(morgan('dev'));
