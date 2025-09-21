export const normalizeString = (query: string) => {
  return query
    .normalize('NFD') // Décompose les caractères accentués
    .replace(/[\u0300-\u036f]/g, '') // Retire les diacritiques
    .toLowerCase();
};
