Documentation de l'API
======================

Description
-----------

Cette API permet de gérer les utilisateurs, produits, catégories de produits, commandes, paiements, items de commande, messages et favoris. Chaque modèle dispose d'opérations CRUD complètes (Create, Read, Update, Delete).

* * * * *

Installation
------------

1.  Clonez le dépôt.
2.  Installez les dépendances avec :


    npm install

3.  Configurez la connexion MongoDB dans votre fichier de configuration.
4.  Lancez le serveur :


    npm start

* * * * *

Modèles
-------

### 1\. User

-   **email** (String, requis) : Adresse e-mail de l'utilisateur.
-   **password** (String, requis) : Mot de passe de l'utilisateur.
-   **name** (String, requis) : Nom de l'utilisateur.
-   **role** (String, `artisant` ou `client`) : Rôle de l'utilisateur.
-   **company** (String, optionnel) : Nom de l'entreprise (pour les artisans).
-   **subscriber** (Boolean, requis) : Indique si l'utilisateur est abonné.
-   **rating** (Number, par defaut à -1) : -1 indique aucune note, note moyenne de l'utilisateur
-   **rate_amount** (Number, par defaut à 0) : nombre d'avis de l'utilisateurs
-   **profil_pic** (String, par defaut : "https://res.cloudinary.com/dt1ksv65x/image/upload/v1726566963/default_pic.png") : photo de profil
-   **created_at** (Date, par défaut à la date actuelle).
-   **updated_at** (Date, par défaut à la date actuelle).

### 2\. Product

-   **name** (String, requis) : Nom du produit.
-   **description** (String, requis) : Description du produit.
-   **price_in_cent** (Number, requis) : Prix du produit en centimes.
-   **stock** (Number, requis) : Stock disponible du produit.
-   **artisan_id** (ObjectId, référence vers `User`, requis) : Artisan qui fabrique le produit.
-   **created_at** (Date, par défaut à la date actuelle).
-   **updated_at** (Date, par défaut à la date actuelle).

### 3\. Order

-   **user_id** (ObjectId, référence vers `User`, requis) : Utilisateur ayant passé la commande.
-   **total_in_cent** (Number, requis) : Montant total de la commande en centimes.
-   **status** (String, `pending`, `processing`, `shipped`, `delivered`, `cancelled`) : Statut de la commande.
-   **created_at** (Date, par défaut à la date actuelle).
-   **updated_at** (Date, par défaut à la date actuelle).

### 4\. Payment

-   **order_id** (ObjectId, référence vers `Order`, requis) : Commande associée au paiement.
-   **amount_in_cent** (Number, requis) : Montant du paiement en centimes.
-   **status** (String, `pending`, `completed`, `failed`) : Statut du paiement.
-   **payment_method** (String, `credit card`, `paypal`, `bank transfer`, `cash`, requis) : Méthode de paiement.
-   **created_at** (Date, par défaut à la date actuelle).

### 5\. Order Item

-   **order_id** (ObjectId, référence vers `Order`, requis) : Commande à laquelle l'item appartient.
-   **product_id** (ObjectId, référence vers `Product`, requis) : Produit commandé.
-   **price_in_cent** (Number, requis) : Prix du produit au moment de la commande.
-   **quantity** (Number, requis) : Quantité commandée.

### 6\. Message

-   **sender_id** (ObjectId, référence vers `User`, requis) : Utilisateur ayant envoyé le message.
-   **recipient_id** (ObjectId, référence vers `User`, requis) : Utilisateur recevant le message.
-   **content** (Mixed, requis) : Contenu du message.
-   **created_at** (Date, par défaut à la date actuelle).

### 7\. Favorite_product

-   **user_id** (ObjectId, référence vers `User`, requis) : Utilisateur ayant ajouté des produits en favoris.
-   **products** (Array d'ObjectId, références vers `Product`) : Produits favoris.

### 8\. Favorite_vendor

-   **user_id** (ObjectId, référence vers `User`, requis) : Utilisateur ayant ajouté des produits en favoris.
-   **vendor** (Array d'ObjectId, références vers `User`) : Produits favoris.

### 9\. Category

-   **name** (String, requis) : Nom de la catégorie de produits.

### 10\. Comment

-   **sender_id** (ObjectId, référence vers `User`, requis) : Utilisateur ayant envoyé le message.
-   **recipient_id** (ObjectId, référence vers `User`, requis) : Utilisateur recevant le message.
-   **content** (Mixed, requis) : Contenu du message.
-   **content** (Number, requis) : Note.
-   **created_at** (Date, par défaut à la date actuelle).

* * * * *

Routes et Opérations CRUD
-------------------------

### 1\. User

-   **GET** `/user` : Récupérer tous les utilisateurs.
-   **GET** `/user/:id` : Récupérer un utilisateur par ID.
  -   **POST** `/user` : Créer un nouvel utilisateur.
      -   **Body** :
        ```json
        {
            "email": "user@example.com",
            "password": "secret",
            "name": "John Doe",
            "role": "client",
            "company": "Exemple Corp",
            "rating" : 3,
            "subscriber": true
        }
        ```
-   **POST** `/:id/profile_pic` : mettre à jour la photo de profil
    ```form
        form upload key : profile_pic
    ```
-   **PUT** `/user/:id` : Mettre à jour un utilisateur par ID.
-   **DELETE** `/user/:id` : Supprimer un utilisateur par ID.

### 2\. Product

-   **GET** `/product` : Récupérer tous les produits.
-   **GET** `/product/:id` : Récupérer un produit par ID.
-   **POST** `/product` : Créer un nouveau produit.
    -   **Body** :
    
    ```json
        {
          "name": "Produit 1",
          "description": "Description du produit",
          "price_in_cent": 10000,
          "stock": 50,
          "artisan_id": "60a6a7cd8b5c5e0a8493bdc1"
        }
    ```

-   **PUT** `/product/:id` : Mettre à jour un produit par ID.
-   **DELETE** `/product/:id` : Supprimer un produit par ID.

### 3\. Order

-   **GET** `/order` : Récupérer toutes les commandes.
-   **GET** `/order/:id` : Récupérer une commande par ID.
  -   **POST** `/order` : Créer une nouvelle commande.
      -   **Body** :

      ```json
          {
            "user_id": "60a6a7cd8b5c5e0a8493bdc1",
            "total_in_cent": 5000,
            "status": "pending"
          }
        
      ```

-   **PUT** `/order/:id` : Mettre à jour une commande par ID.
-   **DELETE** `/order/:id` : Supprimer une commande par ID.

### 4\. Payment

-   **GET** `/payment` : Récupérer tous les paiements.
-   **GET** `/payment/:id` : Récupérer un paiement par ID.
  -   **POST** `/payment` : Créer un nouveau paiement.
      - **Body** :

          ```json
            {
              "order_id": "60a6a7cd8b5c5e0a8493bdc2",
              "amount_in_cent": 5000,
              "payment_method": "paypal",
              "status": "pending"
            }
          ```
-   **PUT** `/payment/:id` : Mettre à jour un paiement par ID.
-   **DELETE** `/payment/:id` : Supprimer un paiement par ID.

### 5\. Order Item

-   **GET** `/order_item` : Récupérer tous les items de commande.
-   **GET** `/order_item/:id` : Récupérer un item de commande par ID.
-   **POST** `/order_item` : Créer un nouvel item de commande.

    -   **Body** :

    ```json
      {
        "order_id": "60a6a7cd8b5c5e0a8493bdc2",
        "product_id": "60a6a7cd8b5c5e0a8493bdc3",
        "price_in_cent": 10000,
        "quantity": 2
      }
    ```

-   **PUT** `/order_item/:id` : Mettre à jour un item de commande par ID.
-   **DELETE** `/order_item/:id` : Supprimer un item de commande par ID.

### 6\. Message

-   **GET** `/message` : Récupérer tous les messages.
-   **GET** `/message/:id` : Récupérer un message par ID.
-   **POST** `/message` : Créer un nouveau message.
    -   **Body** :
```json
  {
    "sender_id": "60a6a7cd8b5c5e0a8493bdc1",
    "recipient_id": "60a6a7cd8b5c5e0a8493bdc2",
    "content": "Bonjour, comment allez-vous ?"
  }
```

-   **PUT** `/message/:id` : Mettre à jour un message par ID.
-   **DELETE** `/message/:id` : Supprimer un message par ID.

### 7\. Favorite_product

-   **GET** `/favorite_product` : Récupérer tous les favoris.
-   **GET** `/favorite_product/:id` : Récupérer un favori par ID.
-   **POST** `/favorite_product` : Créer un favori.
    -   **Body** :

```json
{
  "user_id": "60a6a7cd8b5c5e0a8493bdc1",
  "products": ["60a6a7cd8b5c5e0a8493bdc3", "60a6a7cd8b5c5e0a8493bdc4"]
}
```

-   **PUT** `/favorite_product/:id` : Mettre à jour un favori par ID.
-   **DELETE** `/favorite_product/:id` : Supprimer un favori par ID.

### 7\. Favorite_vendor

-   **GET** `/favorite_vendor` : Récupérer tous les favoris.
-   **GET** `/favorite_vendor/:id` : Récupérer un favori par ID.
-   **POST** `/favorite_vendor` : Créer un favori.
    -   **Body** :

```json
{
  "user_id": "60a6a7cd8b5c5e0a8493bdc1",
  "vendor": ["60a6a7cd8b5c5e0a8493bdc3", "60a6a7cd8b5c5e0a8493bdc4"]
}
```

-   **PUT** `/favorite_vendor/:id` : Mettre à jour un favori par ID.
-   **DELETE** `/favorite_vendor/:id` : Supprimer un favori par ID.

### 8\. Category

-   **GET** `/category` : Récupérer toutes les catégories.
-   **GET** `/category/:id` : Récupérer une catégorie par ID.
-   **POST** `/category` : Créer une nouvelle catégorie. 
    - **Body** :

```json
{
  "name": "Catégorie 1"
}
```

-   **PUT** `/category/:id` : Mettre à jour une catégorie par ID.
-   **DELETE** `/category/:id` : Supprimer une catégorie par ID.

### 6\. Comment

-   **GET** `/comment` : Récupérer tous les commentaires.
-   **GET** `/comment/:id` : Récupérer un commentaire par ID.
-   **POST** `/comment` : Créer un nouveau commentaire et modifie la note moyenne de l'utilisateur.
    -   **Body** :
```json
  {
    "sender_id": "60a6a7cd8b5c5e0a8493bdc1",
    "recipient_id": "60a6a7cd8b5c5e0a8493bdc2",
    "content": "Bonjour, comment allez-vous ?",
    "rating": 4  
  }
```

-   **PUT** `/comment/:id` : Mettre à jour un message par ID.
-   **DELETE** `/comment/:id` : Supprimer un message par ID.

* * * * *

Erreurs possibles
-----------------

-   **404 Not Found** : L'élément demandé n'a pas été trouvé.
-   **500 Internal Server Error** : Erreur du serveur lors de l'exécution de la requête.

* * * * *

License
-------

Ce projet est sous licence MIT.

* * * * *

Ce fichier README documente chaque modèle, ses opérations CRUD, et les routes associées. Il pourra te servir à expliquer clairement le fonctionnement de ton API à d'autres développeurs ou utilisateurs.