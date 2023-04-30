# cs425-team05: OuterWhorld

University of Nevada, Reno: College of Computer Science and Engineering - Senior Projects - Spring 2023

Project Website with Video: https://outerwhorld.wixsite.com/outerwhorld

OuterWhorld is a web-based application that allows users to create reading goals for themselves. Users can search and save books in reading lists called clusters. OuterWhorld gives users motivation to complete their reading goals by letting each user adopt their own virtual pet snail whose well being depends on their goals' completion.

## Meet the Brainyators

Andrei N Iorgulescu, Erin E Marden, and Jodi A Hieronymus

Node version: `v18.12.1`

## To Run Client:
1 - open terminal, run `cd client`

2 - Run `npm i`

3 - Run `npm start`

4 - Go to `http://localhost:3000/`

5 - Explore OuterWhorld!

## To Run Server:
1 - open terminal , run `cd server`

2 - Run `npm i`

3 - Run `npm run dev`

4 - Terminal should say `Server running on port <Number>`

NOTE: Server requires private access keys to run.

## It's recommended you have both UI and Server up and Running at the same time!  

## TESTING

### Client

The client uses Cypress for e2e testing. First run the client and server. Then run:

`npx cypress open`
