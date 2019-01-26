# AppAPI

This is Node.js+express+mongodb **back-end** service

## Installation

1. Clone this *git*
2. Run 'npm install'
3. Config 'db.js' to connect your mongo database
4. And start your web-application with 'node server.js'

## Functions

1. Add new *user*  
  To add new user use **POST** to \<your-server-url>:8000/add_user with fields 'user', 'password', 'name'

2. Get token  
  To get token use **GET** to \<your-server-url>:8000/token/?user=<USER_NAME>&password=<USER_PASSWORD>
  and request will be contain 'token' and 'name' fields
  
3. Add avatar picture  
  To add avatar for user use **POST** (multipart/form-data) to \<your-server-url>:8000/upload_avatar with fields 'user'(text) and 'avatar' (file) fields


***
You can see more in [Wiki](https://github.com/rofl3228/AppAPI/wiki)
