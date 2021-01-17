This is a simple to-do application in React JS and Redux.
Deployed at :https://to-do-app-b3c50.web.app/

TECH USED:

-->Since this is a relatively small project that uses Firebase calls, it does not require Redux, because the usage of a middleware is not required. It could be accomplished by the Context API, which comes with the react library itself. However, this project contains Redux just to illustrate its usage in a simple way.For bigger projects, Redux can be coupled along with Redux Thunk to handle async calls.

-->The data is stored in  Firebase Cloud Firestore DB and the app is deployed through Firebase deployment in test mode. 

PROJECT IMPLEMENTATION:

-->This project contains both Class Components and Functional components. The state management in functional components is achieved through React Hooks.

-->For styling, semantic-ui is used for components like cards and styled input fields.

FEATURES:

-->The main features of this app are, adding a to-do, creating categories and adding to-dos to the categories. These lists are user specific and the app requires the user to create an account to use the app. This username is unique and the user cannot create the username already taken.

-->The user can add a to-do by either one of the two ways- either by selecting the particular category and adding the to-do, or adding a to-do in the sidebar by selecting the category from the dropdown.

-->The user can also create buckets and add optional details field through the sidebar component.

-->All the categories are listed on the right side of the page and on selecting any category, its contents are displayed in the to-do bar in the middle of the page. The user can also delete a particular category or edit its name in this area.

-->Every time a user creates an account, a category called "Unlisted" is automatically created to add miscellaneous to-dos.



 


