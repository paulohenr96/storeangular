# DESCRIPTION
Front end web application that consumes an api to manage the inventory.
## CLASSES

 | Classes  | Description |
| ------------- |:-------------:|
| Login      |<div style="text-align: justify;"> Send the login to the api     |
| Metrics      |<div style="text-align: justify;"> The object that contains all the general metrics, like monthly sale goals     |
| PageProduct      |<div style="text-align: justify;"> Page object used show the list of products on inventory with pagination     |
| Product      |<div style="text-align: justify;"> Product in the inventory     |
| ProductSale      |<div style="text-align: justify;"> The object that is going to have all the information about the product that is going to be added into the sale (id and quantity)    |
| Sale      |<div style="text-align: justify;"> Receive or send sale data to the API     |
| SaleChart      |<div style="text-align: justify;"> Receive the data to create the bar chart     |
| User      |<div style="text-align: justify;"> The object that represent the accounts. The user can have the role of 'admin' or the role of 'user'     |

 
 
## PAGES

| Page  | Description |
| ------------- |:-------------:|
| Home      |<div style="text-align: justify;"> Home page. If the user logged in is an admin he will see the total monthly sales of every salesman and he will be able to see the the bar chart with the sales of every month    |
| Login      |<div style="text-align: justify;"> Page used to login. If the login is successful the user goes to the home page    |
| Metrics      |<div style="text-align: justify;"> This page is used to edit the metrics    |
| New Product     |<div style="text-align: justify;"> Page used to save new products, or to edit products that already exist.     |
| Products      |<div style="text-align: justify;"> Page used to see a table with all the products in the inventory    |
| Sales      |<div style="text-align: justify;"> Page with a table that shows all the sales     |
| Sales Form      |<div style="text-align: justify;">Page used to registry a new sale.    |
| Users      |<div style="text-align: justify;"> Page that shows all the users     |
| UserForm      |<div style="text-align: justify;"> Page used to save new users     |


## SERVICES
| SERVICE  | Description |
| ------------- |:-------------:|
| Login      |<div style="text-align: justify;">  Send the login request   |
| Product      |<div style="text-align: justify;"> Communicate with the endpoint **"/products"** to do CRUD operations   |
| Sale      |<div style="text-align: justify;"> Communicate with the endpoint **"/sales"** to do CRUD operations    |
| User    |<div style="text-align: justify;">Communicate with the endpoint **"/users"** to do CRUD operations     |

## GUARD
| Guard  | Description |
| ------------- |:-------------:|
| AuthGuard      |<div style="text-align: justify;">  check if the session has the 'token' item. Redirect the user to the login page if the token isnt in the sessionStorage. Every page except the **LOGIN** page is protected by this guard. |
| AdminGuard      |<div style="text-align: justify;">  Check if the logged user is **admin**. The pages **USERS**,**USER FORMS** and **METRICS** are protected by this guard   |


## INTERCEPTOR
| Interceptor  | Description |
| ------------- |:-------------:|
| HttpInterceptor     |<div style="text-align: justify;">  Get the token in the sessionStorage and put it in the header Authorization before sending every request to the api  |
