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

- **stripe_id** (String) : id stripe pour le paiement
-   **email** (String, requis) : Adresse e-mail de l'utilisateur.
-   **password** (String, requis) : Mot de passe de l'utilisateur.
-   **name** (String, requis) : Nom de l'utilisateur.
-   **role** (String, `artisant` ou `client`) : Rôle de l'utilisateur.
- **company** (SchemaCompany) : uniquement pour les artisans.
    - **siren** (String)
    - **siret** (String)
    - **date_creation** (String)
    - **denomination** (String) : nom de l'entreprise
    - **categorie_entreprise** (String) : code categorie de l'entreprise
    - **activitite_principale_legale** (String) : code d'activité (NAF/APE)
    - **adresse_etablissement** (schema adresseCompany)
        - **typeVoieEtablissement** (String, requis)
        - **libelleVoieEtablissement** (String, requis)
        - **codePostalEtablissement** (String, requis)
        - **libelleCommuneEtablissement** (String, requis)
      - **profile_pic** (String default)
      - **banner_pic** (String default)
    - **etat** (String, `refusé`/`en attente`/`validé`, par defaut : `en attente`)
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
- **initial_stock** (Number, requis) : Stock initial du produit. min 1
- **stock** (Number, requis) : Stock disponible du produit. min 0
-   **artisan_id** (ObjectId, référence vers `User`, requis) : Artisan qui fabrique le produit.
-   **created_at** (Date, par défaut à la date actuelle).
-   **updated_at** (Date, par défaut à la date actuelle).
- **categories** (Array, référence vers `Category`) : Catégories associées au produit.
- **size** (Object, requis) : Taille du produit.
    - **sizeLabel** (String, requis) : Nom de la taille (ex: "M", "L").
    - **dimensions** (Object) : Dimensions du produit.
        - **height** (Number) : Hauteur du produit.
        - **width** (Number) : Largeur du produit.
        - **depth** (Number) : Profondeur du produit.
        - **unit** (String) : Unité de mesure (ex: "cm", "in").
    - **weight** (Object) : Poids du produit.
        - **value** (Number) : Valeur du poids.
        - **unit** (String) : Unité de mesure du poids.
- **pictures** (Array, max 10 éléments) : Liste des images du produit.
    - **url** (String, requis) : URL de l'image.
    - **_id** (String, requis) : Identifiant unique de l'image.

### 3\. Order

-   **user_id** (ObjectId, référence vers `User`, requis) : Utilisateur ayant passé la commande.
-   **total_in_cent** (Number, requis) : Montant total de la commande en centimes.
-   **status** (String, `pending`, `processing`, `shipped`, `delivered`, `cancelled`) : Statut de la commande.
-   **created_at** (Date, par défaut à la date actuelle).
-   **updated_at** (Date, par défaut à la date actuelle).
- **delivery_address** (addressSchema, requis) : adresse de livraison
    - **street** (String, requis) : rue
    - **postalCode** (String, requis) : code postale
    - **city** (String, requis) : ville
    - **country** (String, requis) : pays

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

### 1. User

-   **GET** `/user` : Récupérer tous les utilisateurs.
-   **GET** `/user/:id` : Récupérer un utilisateur par ID.
- **GET** `/artisanByRate` : Récupérer tous les artisans triés par rating.
- **GET** `/user/artisans` : Récupérer la liste de tous les artisans.
- **GET** `/user/clients` : Récupérer la liste de tous les clients.
- **GET** `/user/company` : Récupérer la liste unique des entreprises.
- **GET** `/user/newArtisans` : Récupérer tous les artisans créés au cours du dernier mois.
- **GET** `/user/:searchType/:value` : Récupérer un utilisateur par email ou nom.
    - Paramètres d'URL :
        - `searchType` : soit `email`, soit `name`.
        - `value` : La valeur correspondante (ex: `john.doe@example.com` ou `John Doe`).
- **POST** `/user` : Créer un nouvel utilisateur.
    - **Body** :
    ```json
    {
        "email": "user@example.com",
        "password": "secret",
        "name": "John Doe",
        "role": "client",
        "rating" : 3,
        "subscriber": true
    }
    ```
- **POST** `/user/:id/profile_pic` : Mettre à jour la photo de profil.
    ```form
    form upload key : profile_pic
    ```
- **POST** `/user/login` : Se connecter.
    - **Body** :
    ```json
    {
        "email": "user@example.com",
        "password": "secret"
    }
    ```
- **POST** `user/addCompany` : Ajouter une entreprise à un utilisateur.
    - **Body** :
  ```json
  {
      "siret": "53066741900051",
      "_id": "66ea9feb2a17a73474d7e0c7"
  }
  ```
- **POST** `/user/:id/company_pic` : Mettre à jour les images de l'entreprise (photo de profil et bannière).
    - **Formulaire** : Clés pour le champ `profile_pic` et `banner_pic` (maximum 1 fichier pour chaque clé).
-   **PUT** `/user/:id` : Mettre à jour un utilisateur par ID.
-   **DELETE** `/user/:id` : Supprimer un utilisateur par ID.

### 2. Product

-   **GET** `/product` : Récupérer tous les produits.
- **GET** `/product/newProduct` : Récupérer les produits créés dans le dernier mois.
- **GET** `/product/userProduct/:userId` : Récupérer les produits d'un utilisateur.
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
- **POST** `/product/:id/addPictures` : Ajouter des images à un produit (max 10).
    - **Formulaire** :
  ```form
  field name: "pictures" (max 10 fichiers autorisés)
  ```
- **POST** `/product/:id/deletePicture` : Supprimer une image d'un produit par ID de l'image.
    - **Body** :
  ```json
  {
      "pictureId": "60a6a7cd8b5c5e0a8493bdc2"
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
        "user": "60d21b467fd7b00a6c339b8a",
        "delivery_address": {
            "street": "123 Rue de Paris",
            "postalCode": "75001",
            "city": "Paris",
            "country": "France"
        },
        "items": ["60d21b567fd7b00a6c339b8b"],
        "total_price": 10000
      }
    ```

-   **PUT** `/order/:id` : Mettre à jour une commande par ID.
-   **DELETE** `/order/:id` : Supprimer une commande par ID.
- **POST** `/order/addItem` : Ajoute un item à une commande (cree une commande si il n'y en à pas).
    - **Body** :

_**order_id facultatif**_

  ```json
    {
  "user_id": "66ea0d3b769ec39a00fed637",
  "product_id": "66eab13d6b3f0dc38beb68d6",
  "quantity": 5,
  "order_id": "66ea0d3db7d69edc39a00fed63f7"
}
  ```

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

- **GET** `/favoriteProduct` : Récupérer tous les favoris.
- **GET** `/favoriteProduct/:id` : Récupérer un favori par ID.
- **POST** `/favoriteProduct` : Créer un favori.
    -   **Body** :

```json
{
  "user_id": "60a6a7cd8b5c5e0a8493bdc1",
  "products": ["60a6a7cd8b5c5e0a8493bdc3", "60a6a7cd8b5c5e0a8493bdc4"]
}
```

- **PUT** `/favoriteProduct/:id` : Mettre à jour un favori par ID.
- **DELETE** `/favoriteProduct/:id` : Supprimer un favori par ID.

### 8\. Favorite_vendor

- **GET** `/favoriteVendor` : Récupérer tous les favoris.
- **GET** `/favoriteVendor/:id` : Récupérer un favori par ID.
- **POST** `/favoriteVendor` : Créer un favori.
    -   **Body** :

```json
{
  "user_id": "60a6a7cd8b5c5e0a8493bdc1",
  "vendor": ["60a6a7cd8b5c5e0a8493bdc3", "60a6a7cd8b5c5e0a8493bdc4"]
}
```

- **PUT** `/favoriteVendor/:id` : Mettre à jour un favori par ID.
- **DELETE** `/favoriteVendor/:id` : Supprimer un favori par ID.

### 9\. Category

-   **GET** `/category` : Récupérer toutes les catégories.
-   **GET** `/category/:id` : Récupérer une catégorie par ID.
-   **POST** `/category` : Créer une nouvelle catégorie. 
    - **Body** :

```json
{
  "name": "Catégorie 1",
  "description": "objet trop cool"
}
```

-   **PUT** `/category/:id` : Mettre à jour une catégorie par ID.
-   **DELETE** `/category/:id` : Supprimer une catégorie par ID.

### 10\. Comment

-   **GET** `/comment` : Récupérer tous les commentaires.
- **GET** `/comment/:userType/:userId` : Récupérer tous les commentaires d'un utilisateur selon son type
  (recipient ou sender).
-   **GET** `/comment/:id` : Récupérer un commentaire par ID.
-   **POST** `/comment` : Créer un nouveau commentaire et modifie la note moyenne de l'utilisateur.
    -   **Body** :
```json
  {
    "sender_id": "60a6a7cd8b5c5e0a8493bdc1",
    "recipient_id": "60a6a7cd8b5c5e0a8493bdc2",
    "content": "Super Taff",
    "rate": 4  
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
