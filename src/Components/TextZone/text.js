export const PLOMBOSPEECH = {
  home: "Bonjour, je suis Plombo. Comment puis-je vous aider ?",
  lookingFor: "De quel genre d'information avez-vous besoin ?",
  lookingForSpareParts: "Pour les pièces détachées, veuillez vous rendre au comptoir en suivant le chemin indiqué ci-dessus.",  
  lookingForSanitary: "Le département sanitaire se trouve juste ici, comme indiqué ci-dessus.",
  lookingForKitchen: "Le département cuisine se trouve au deuxième étage, comme indiqué ci-dessus.",
  lookingForHeating: "Le département chauffage se situe à l'étage en dessous, comme indiqué sur cette carte.",
  whoAreYou: "Je suis Plombo. J'ai été dessiné par Mireille Vicat il y a bien longtemps.",
  bored: "Pour vous faire patienter, peut-être voulez-vous voir quelques catalogues ? Sinon, je peux vous distraire avec un petit jeu ..."
}

export const USERANSWERS = {
  home: [
    { id: 'home01', text: "Je cherche quelque chose ...", navTo: 'lookingFor' },
    { id: 'home02', text: "Qui es-tu ?", navTo: 'whoAreYou' },
    { id: 'home03', text: "Je m'ennuie ...", navTo: 'bored' }
  ],
  lookingFor: [
    { id: 'lookingFor01', text: "J'ai besoin d'une pièce détachée", navTo: 'lookingForSpareParts' },
    { id: 'lookingFor02', text: "Je voudrais une nouvelle salle de bain", navTo: 'lookingForSanitary' },
    { id: 'lookingFor03', text: "J'ai un projet pour une cuisine", navTo: 'lookingForKitchen' },
    { id: 'lookingFor04', text: "J'ai besoin d'un système de chauffage", navTo: 'lookingForHeating' },
    { id: 'lookingFor05', text: "Rien de tout ça ...", navTo: 'home' },
  ],
  lookingForSpareParts: [{ id: 'lookingForSpareParts01', text: "Merci", navTo: 'home' }],
  lookingForSanitary: [{ id: 'lookingForSanitary01', text: "Merci", navTo: 'home' }],
  lookingForKitchen: [{ id: 'lookingForKitchen01', text: "Merci", navTo: 'home' }],
  lookingForHeating: [{ id: 'lookingForHeating01', text: "Merci", navTo: 'home' }],
  whoAreYou: [{ id: 'whoAreYou01', text: "Merci pour l'info ...", navTo: 'home' }],
  bored: [
    { id: 'bored01', text: "Montre-moi les catalogues", navTo: 'bored' },
    { id: 'bored02', text: "Raconte-moi une blague", navTo: 'bored' },
    { id: 'bored03', text: "Démarre le jeu !", navTo: 'bored' },
    { id: 'bored04', text: "Non merci, ça ira ...", navTo: 'home' },
  ],

}
