# LookHearRefactor
Refactor LookHearProject

This repository is a refactored version of the LookHear project. https://github.com/tjhickey724/LookHear

# Tool for musicians

LookHear is a JavaScript application that helps the musicians to track the notes on the sheet music while the video that correspond to the music sheet plays. It provides a synced experience so that musicians can practice the specific part of the music once they found imperfections in their video recordings. 

We aim to provide a unified experience to the user; they can register accounts, upload their sheet music and their own practice videos. Each user's data are stored in the Firebase backend. 

## Front Page 
The in the front page of the app, the user can choose the instrument.

![frontpage_ipad](https://user-images.githubusercontent.com/44303703/140256652-e62109ff-59de-40ed-ab51-910d00b5e221.png)

## Main Page
After they choose the instrument, they are directed to the main page of the app, in this page, the users are shown with one video and one sheet music.
The purple bar on the music sheets represent the part that the note the musician is current playing in the video.

![sheetpage](https://user-images.githubusercontent.com/44303703/140256513-1f87c473-c537-4fc2-bbc1-24cc1f9b36b8.png)

Since our app is mainly designed for musicians with large-screen devices, the sample screenshots are captured from tablet view. 

## Firebase Integration

![微信图片_20211208154217](https://user-images.githubusercontent.com/44303703/145281397-447ddc54-9947-4fab-8773-3c320a5af5d3.png)


We recently added the integration for LookHear project with Firebase so that user data can be saved on server.
This enables users to upload their own video along with the sheet music and thumbnail to the database so they can access on any platform.

