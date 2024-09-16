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

### 7\. Favorite

-   **user_id** (ObjectId, référence vers `User`, requis) : Utilisateur ayant ajouté des produits en favoris.
-   **products** (Array d'ObjectId, références vers `Product`) : Produits favoris.

### 8\. Category

-   **name** (String, requis) : Nom de la catégorie de produits.

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
            "subscriber": true
        }
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

### 7\. Favorite

-   **GET** `/favorite` : Récupérer tous les favoris.
-   **GET** `/favorite/:id` : Récupérer un favori par ID.
-   **POST** `/favorite` : Créer un favori.
    -   **Body** :

```json
{
  "user_id": "60a6a7cd8b5c5e0a8493bdc1",
  "products": ["60a6a7cd8b5c5e0a8493bdc3", "60a6a7cd8b5c5e0a8493bdc4"]
}
```

-   **PUT** `/favorite/:id` : Mettre à jour un favori par ID.
-   **DELETE** `/favorite/:id` : Supprimer un favori par ID.

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