<!-- Projet realiser par RAHMOUNI Ahmed & EL ANDALOUSSI Ayoub -->

Instructions :

Pour preparer l'environment de ce projet , il faut installer tous les packages utilisés avec le gestionnaire de packages NPM :
1- Placez vous dedans le répertoire du projet 
2- Lancer la commande suivante :
    sudo npm install
3- Après l'installation , vous pouvez démarrer le serveur avec la commande :
  node server.js
4- La base de données est hebergée sur le service cloud de mongoDB (atlas),et est appellée dans le ficher db.js dans la répertoire controller.
*** Mon Setup for the data base : ***
Using WSL ubunto v 18.04 (Windows SubSystem For Linux v2)
Node Latest versin 14.15.3
NPM package manager Latest v 6.14.9
MangoDB latest version v4.4.2
ODM : Mongoose

REST & CRUD : 

*** CRUD for comments : ***

Index  :  GET    /comments          - Display all comments
Show   :  GET    /comments/:id      - get one comment (using its id)
Create :  POST   /comments          - Create a new comment 
Update :  PATCH  /comments/:id      - update a specific comment (using its id)
Edit   :  GET    /comments/:id/edit - form to edit specific comment
Destroy:  DELETE /comments/:id      - Delete one comment (using its id)

*** CRUD for articles : ***

Index  :  GET    /articles          - Display all comments
Show   :  GET    /articles/:id      - get one article (using its id)
Create :  POST   /articles          - Create a new article 
Update :  PATCH  /articles/:id      - update a specific article (using its id)
Edit   :  GET    /articles/:id/edit - form to edit specific article
Destroy:  DELETE /articles/:id      - Delete one article (using its id)


