# FocusGate Kids

Extension Chrome (Manifest V3) de contrôle parental des sites Web : horaires, quotas et page de pause adaptée aux enfants.

## Versions

- **Dernière version locale validée : v2.4.5.**
- **Attention :** le code complet de la v2.4.5 n'a pas encore été synchronisé avec la branche `main`. Vérifier `manifest.json` avant d'installer depuis GitHub.
- La livraison finale v2.4.5 retire le bouton temporaire **« 🔒 Reverrouiller maintenant »** et son texte d'aide.

## Fonctionnalités

- Blocage de domaines et de sous-chemins (ex. `youtube.com/shorts`), y compris les sous-domaines.
- Horaires récurrents, exceptions par date et quotas quotidiens par catégorie.
- Avertissements de fin de période et contrôle des onglets ouverts.
- Interface bilingue français/anglais et thèmes de blocage **Calme** et **Ludique**.
- Autorisation parentale temporaire de 15 minutes.
- NIP dérivé avec PBKDF2, authentification dans le service worker, limitation des tentatives et session du tableau de bord.
- Boîte **Notifications** informant le parent des écarts d'horloge possibles.

## Détection de changements d'heure — v2.4.5

La boîte **Notifications** affiche des événements indicatifs :

1. **Détection locale (v2.4.4)** : comparaison entre l'heure système et une horloge monotone pendant l'exécution du service worker ; seuil de 2 minutes.
2. **Vérification Internet (v2.4.5)** : récupération d'une référence UTC depuis `https://worldtimeapi.org/api/timezone/Etc/UTC` au démarrage et environ toutes les 15 minutes ; notification au-delà de 5 minutes d'écart.

Les 20 dernières notifications sont conservées localement. Les vérifications ne bloquent pas automatiquement les sites, et un changement d'heure détecté n'est pas une preuve d'intention. Sans connexion Internet, la vérification externe n'est pas disponible. La mise en veille et la suspension du service worker peuvent limiter la détection locale.

La requête vers WorldTimeAPI peut exposer l'adresse IP au fournisseur ; elle ne transmet volontairement ni NIP ni historique de navigation.

## Installer l'archive locale v2.4.5

1. Décompresser `FocusGate-Kids-v2.4.5-final-README.zip` dans un dossier permanent.
2. Ouvrir `chrome://extensions` et activer **Mode développeur**.
3. Cliquer **Charger l'extension non empaquetée** et sélectionner le dossier où se trouve `manifest.json`.
4. Confirmer que la version affichée est **2.4.5**.
5. Ouvrir le tableau de bord et vérifier les réglages et la boîte Notifications.

Pour mettre à jour une installation existante, sauvegarder le dossier, remplacer ses fichiers et actualiser l'extension existante dans Chrome **sans la supprimer**. Une nouvelle installation avec un identifiant différent ne reprend pas automatiquement le stockage local et le NIP.

## Sécurité et limites

- Le NIP ne peut pas empêcher l'utilisateur de désactiver ou supprimer l'extension via Chrome.
- Un utilisateur ayant le contrôle du profil ou du stockage local peut contourner certaines restrictions.
- **Écart à corriger :** dans l'archive v2.4.5 fournie, la constante `FG_PIN_LOCK_MS` vaut encore **15 minutes** alors que la configuration souhaitée était **5 minutes**. Cette anomalie reste à corriger et tester dans le code ; une modification du README ne change pas le comportement.
- La vérification d'horloge est informative, et non une source de temps imposée à tous les horaires.

## Historique

| Version | Changements |
| --- | --- |
| 2.4.1 | Thèmes Calme et Ludique |
| 2.4.2 | Renforcement et limitation des tentatives du NIP |
| 2.4.3 | Contrôles des autorisations et sessions parentales |
| 2.4.4 | Notifications locales d'écarts d'horloge |
| **2.4.5** | Vérification de l'heure Internet et retrait du bouton de test |

FocusGate Kids vise une protection parentale simple et proportionnée à un usage familial.
