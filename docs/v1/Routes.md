# 🛣️ **Routes de l'API**

Ci-dessous les différentes routes ATIS:

## Représentation des routes
```
/api
├── /auth
│   ├── /signup
│   ├── /login
│   ├── /users
│   │   ├── /setrights/:id
│   │   └── /:id
│   └── /:id
│
├── /ellisetting
│   ├── /machines
│   │   └── /:id
│   ├── /parts
│   │   └── /:id
│   ├── /measures
│   │   ├── /measuresByTimeAndPart?start=:start&end=:end&partId=:partId
│   │   └── /measuresByTimeAndMachine?start=:start&end=:end&machineId=:machineId
│   ├── /contexts
│   └── /dimensions?partId=:partId
│
├── /coscom
│   ├── /machines
│   │   └── /:id
│   └── /statuslist?start=:start&end=:end&machineId=:machineId
│
├── /machinePeering
│   ├── /
│   │   └── /:id
│   └── /:id
│
└── /contexts
    └── /adjustments
```

## [code]/api[/code] : Route de base de l'API


 * ### [code]/auth[/code] : Routes relatives à l'authentification des utilisateurs
     * #### [code]/signup[/code] : [color=#46CC90] [POST] [/color]
     Route pour l'inscription d'un utilisateur

       [swagger](v1/ATIS_post_api_auth_signup.json)

     * #### [code]/login[/code] : [color=#46CC90] [POST] [/color]
     Route pour la connexion d'un utilisateur

       [swagger](v1/ATIS_post_api_auth_login.json)

     * #### [code]/users[/code] : [color=#61AFFE] [GET] [/color]
     Route pour récupérer tous les utilisateurs

       [swagger](v1/ATIS_get_api_auth_users.json)

     * #### [code]/setrights/:id[/code] : [color=#FCA130] [PUT] [/color]
     Route pour modifier les droits d'un utilisateur avec son id

       [swagger](v1/ATIS_put_api_auth_users_setrights_id.json)

     * #### [code]/:id[/code] : [color=#F93E3E] [DELETE] [/color]
     Route pour supprimer un utilisateur avec son id

       [swagger](v1/ATIS_delete_api_auth_users_id.json)

     * #### [code]/:id[/code] : [color=#61AFFE] [GET] [/color]
     Route pour récupérer un utilisateur avec son id

       [swagger](v1/ATIS_get_api_auth_users_id.json)

  
 * ### [code]/ellisetting[/code] : Routes relatives à ElliSetting 
     * #### [code]/machines[/code] : [color=#61AFFE] [GET] [/color]
     Route pour récupérer les informations de toutes les machines

       [swagger](v1/ATIS_get_api_ellisetting_machines.json)

     * #### [code]/machines/:id[/code] : [color=#61AFFE] [GET] [/color]
     Route pour récupérer les informations d'une machine avec son id

       [swagger](v1/ATIS_get_api_ellisetting_machines_id.json)

     * #### [code]/parts[/code] : [color=#61AFFE] [GET] [/color]
     Route pour récupérer les informations de toutes les pièces

       [swagger](v1/ATIS_get_api_ellisetting_parts.json)

     * #### [code]/parts/:id[/code] : [color=#61AFFE] [GET] [/color]
     Route pour récupérer les informations d'une pièce avec son id

       [swagger](v1/ATIS_get_api_ellisetting_parts_id.json)

     * #### [code]/measures[/code] : [color=#61AFFE] [GET] [/color]
     Route pour récupérer les informations de toutes les mesures

       [swagger](v1/ATIS_get_api_ellisetting_measures.json)

     * #### [code]/measuresByTimeAndPart[/code] : [color=#61AFFE] [GET] [/color]
     Route pour récupérer les informations d'une mesure en fonction du temps et de la pièce

       [swagger](v1/ATIS_get_api_ellisetting_measuresByTimeAndPart.json)

     * #### [code]/measuresByTimeAndMachine[/code] : [color=#61AFFE] [GET] [/color]
     Route pour récupérer les informations d'une mesure en fonction du temps et de la machine

       [swagger](v1/ATIS_get_api_ellisetting_measuresByTimeAndMachine.json)

     * #### [code]/contexts[/code] : [color=#61AFFE] [GET] [/color]
     Route pour récupérer les contextes de mesures

       [swagger](v1/ATIS_get_api_ellisetting_contexts.json)

     * #### [code]/dimensions[/code] : [color=#61AFFE] [GET] [/color]
     Cette route est utilisée pour récupérer la liste des dimensions

       [swagger](v1/ATIS_get_api_ellisetting_dimensions.json)


 * ### [code]/coscom[/code]: Routes relatives à Coscom
     * #### [code]/machines[/code] : [color=#61AFFE] [GET] [/color]
     Route pour récupérer les informations de toutes les machines

       [swagger](v1/ATIS_get_api_coscom_machines.json)

     * #### [code]/machines/:id[/code] : [color=#61AFFE] [GET] [/color]
     Route pour récupérer les informations d'une machine avec son id

       [swagger](v1/ATIS_get_api_coscom_machines_id.json)

     * #### [code]/statuslist[/code] : [color=#61AFFE] [GET] [/color]
     Route pour récupérer la liste des status

       [swagger](v1/ATIS_get_api_coscom_statuslist.json)


 * ### [code]/machinePeering[/code] : Routes relatives à la gestion des paires de machines
     * #### [code]/[/code] : [color=#61AFFE] [GET] [/color]
     Route pour récupérer toutes les paires de machines

       [swagger](v1/ATIS_get_api_machinePeering.json)

     * #### [code]/[/code] : [color=#46CC90] [POST] [/color]
     Route pour ajouter une paire de machines

       [swagger](v1/ATIS_post_api_machinePeering.json)

     * #### [code]/:id[/code] : [color=#61AFFE] [GET] [/color]
     Route pour récupérer une paire de machines avec son id 

       [swagger](v1/ATIS_get_api_machinePeering_id.json)

     * #### [code]/:id[/code] : [color=#FCA130] [PUT] [/color]
     Route pour modifier une paire de machines avec son id

       [swagger](v1/ATIS_put_api_machinePeering_id.json)

     * #### [code]/:id[/code] : [color=#F93E3E] [DELETE] [/color]
     Route pour supprimer une paire de machines avec son id

       [swagger](v1/ATIS_delete_api_machinePeering_id.json)


 * ### [code]/contexts[/code] : Routes relatives à la gestion des contextes
     * #### [code]/adjustments[/code] : [color=#61AFFE] [GET] [/color]
     Route pour récupérer les ajustements

       [swagger](v1/ATIS_get_api_contexts_adjustments.json)
