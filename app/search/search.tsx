function levenshteinDistance(a:string, b:string) {
    const matrix = [];
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 1; j <= a.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        const indicator = a[j - 1] === b[i - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1, // deletion
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j - 1] + indicator // substitution
        );
      }
    }
    return matrix[b.length][a.length];
}

interface Place {
    id: string;
    name: string;
    location: string;
    image: string; // Optional if image might not exist
}


export const searchPlace = (heritage: Array<Place>, name: string):Array<Place> => {
    let similarities:{ [key: string]: number } = {};

    const text2 = name;
    
    for (let i = 0; i<heritage.length;i++) {
        let item = heritage[i];
        let text = item.name;
        const similarity = 1 - (levenshteinDistance(text.toLowerCase(), text2.toLowerCase()) / Math.max(text.length, text2.length));
        similarities[item.id] = similarity; // 0.8 (80% similarity)
    }
      
      // Type for sortedArray: Array<[string, number]>
      const sortedArray: Array<[string, number]> = Object.entries(similarities)
        .sort(([, value1], [, value2]) => value1 - value2)
        .reverse();
      
  
    // Convert sorted array back into an object
    const sortedObj = Object.fromEntries(sortedArray);

    let finalObj:Array<Place> = [];

    Object.keys(sortedObj).forEach((key, index) => {
        let item = Object.values(heritage).find(i => i.id === key);
        if(item) {
            finalObj[index] = item;
        }
    });

    return finalObj;
}