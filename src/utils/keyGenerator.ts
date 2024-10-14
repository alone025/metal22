
export const generateUniqueKey = (): string => {
   
    const array = new Uint32Array(4); 
    crypto.getRandomValues(array);
  
    return Array.from(array, num => num.toString(16)).join('-');
  };
  