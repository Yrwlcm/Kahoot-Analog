const getRandomNumber = (min, max) => {
    const leftBorder = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
    const rightBorder = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
    const randomNumber = Math.random() * (rightBorder-leftBorder+1) + leftBorder;
    return Math.floor(randomNumber);
  };

const getRandomElement = (array) => array[getRandomNumber(0, array.length-1)];

const getRandomGenerator = (min, max) => {
    const previousValues = [];
  
    return function() {
      let currentValue = getRandomNumber(min, max);
      while(previousValues.includes(currentValue)){
        currentValue = getRandomNumber(min, max);
      }
      previousValues.push(currentValue);
      return currentValue;
    };
  };

// export {getRandomElement, getRandomGenerator}