# messenger-rest-api
This full stack project uses Django as backend and React as frontend. It features login and registration functionality using JWT authentication. 
Registered users are capable of creating multiple chat rooms where they can chat with others in the same chat room. Other users can join a
chat room by request which can be accepted or rejected by the room creator. 

Backend code in collaboration with [@colbytanderson](https://github.com/colbytanderson)

## How to Use
1. Clone repo
2. Install python requirements
  1. In `./messenger-rest-api/`run `pip install -r requirements.pip`
2. Change directory to `./messenger-rest-api/backend/src/`
3. Start backend Django server by running the following commands 
  python manage.py makemigrations
  python manage.py migrate
  python manage.py startserver
4. Install Node modules 
  1. Change directory to `/messenger-rest-api/frontend/`
  2. run `npm i`
5. Start frontend React server by running `npm run start`

* Backend server hosted on localhost:8000
* Frontend server hosted on localhost:3000

## Dependencies
Based on backend code, the frontend requires there to be a lobby named "Lobby1" in the backend. 
1. Change directory to `./messenger-rest-api/backend/src/`
2. Stop the backend server and run `python manage.py createsuperuser`
3. Fill out username, email (optional, password fields as desired
4. run `python manage.py startserver`
5. Navigate to localhost:8000/admin/
6. Log in with created credentials
7. Navigate to Lobbys
8. Click Add Lobby in top right
9. Create a lobby with title "Lobby1". Description can be filled or not filled as desired
10. Click save

## Possible Improvements
- Landing Page
- Light/Dark mode
- Remove dependency on database having Lobby1
- Notifcation for user when a new request or chat message is sent
- Chat encryption
- User profile page
