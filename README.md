# Nusatala Backend Projects
## Design Pattern that I use
In this project I use MVC as my project's design pattern  

In object-oriented programming development, model-view-controller (MVC) is the name of a methodology or design pattern for successfully and efficiently relating the user interface to underlying data models. (Cited from <https://www.techtarget.com/whatis/definition/model-view-controller-MVC>).

## Reason why I use MVC
I use MVC pattern because MVC(model, view, controller) is easy to use and follow pattern. This pattern can make my app development faster. When I use model to define my database schema it can be used as backup for my project database.  

Beside of that, the route, controller, middleware and model is divided into different folder. This can make my project neatier and easier to understand when there is new developer that want to contribute.

## To start a project
1. Copy .env.example file and rename it to .env  
2. Fill that env with it's value
3. Install all dependencies, type:
    ```
    npm install
    ```
4. Run a migration
    ```
    npx prisma migrate dev --name init
    ```
5. To run this project, type:
    ```
    npm start
    ```
    
## For testing API
If you want to test this project API, I have created e2e testing using postman
1. Open postman and create new workspace
2. Click the import button(in left of your workspace name)
3. Import two file from this project located in "postman testing" folder
