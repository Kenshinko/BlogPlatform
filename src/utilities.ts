export const capitalizeWords = (str: string): string => {
  const words = str.split(' ');

  const capitalizedWords = words.map((word) => {
    const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
    return capitalizedWord;
  });

  const capitalizedStr = capitalizedWords.join(' ');
  return capitalizedStr;
};
