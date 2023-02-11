### This repository contains all codes about backend of the test
### The project consists of two main folders:

+ Controllers (contains files handle logic of each route)
+ Routes (contains files create routes for each controller's method)

### Based on the requirements of the test, there are all 6 APIs including:

(POST) CreateNewAccessCode

![image](https://user-images.githubusercontent.com/61352012/218249155-92e2685e-eb63-4c7c-9376-3d97fa4dcc2b.png)

(POST) ValidateAccessCode

![image](https://user-images.githubusercontent.com/61352012/218249195-9c8c3981-f25d-4362-83c7-8658e505a495.png)

(GET) searchGithubUsers

![image](https://user-images.githubusercontent.com/61352012/218249283-26c58e3f-5885-4ce0-ae75-fc9a29478729.png)

(GET) findGithubUserProfile

![image](https://user-images.githubusercontent.com/61352012/218250320-75477df1-8e20-402f-be70-e1ff2bb09eb0.png)

(POST) likeGithubUser

![image](https://user-images.githubusercontent.com/61352012/218250348-3569608a-a156-41fd-9d76-16d1417adcf3.png)

(GET) getUserProfile

![image](https://user-images.githubusercontent.com/61352012/218250450-77c724cb-bc09-474b-8439-a66a4c616746.png)

#### These routes will be called based on the request from users when they interact to the frontend and the data such as favorite Github users will be saved at Firebase.

#### To run the project, after cloning the repository, you need to enter the command "npm i" in the terminal to download the libraries used in the project. Once downloaded, enter the command "npm run dev" to launch the server on localhost.

* Because of the network block, Twilio can't send messages to the phone, so I display OTP right in the "Access Form" page
