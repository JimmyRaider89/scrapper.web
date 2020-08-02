export const mapEngine = (searchEngine: number): string => {
  switch(searchEngine){
    case 1:
      return 'GOOGLE';
    case 2:
      return 'BING';
    default:
      return 'UNKNOWN';
  }
}
