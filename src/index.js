module.exports = function check(str, bracketsConfig) {
  console.log(str, bracketsConfig);
  const OPEN_BRACKETS = [];
  const BRACKETS_PAIR = {};
  const ONE_BRACKETS = [];
  for (let i = 0; i < bracketsConfig.length; i++) {
    let bracketLeft = bracketsConfig[i][0];
    let bracketRight = bracketsConfig[i][1];
    if (bracketLeft === bracketRight) {
      ONE_BRACKETS.push({bracketType: bracketLeft, bracketCount: 0})
    } else {
      OPEN_BRACKETS.push(bracketLeft);
      BRACKETS_PAIR[bracketRight] = bracketLeft;
    }
  }
  let stack = [];
  for (let i = 0; i < str.length; i++) {
    let currentSymbol = str[i];
      if (OPEN_BRACKETS.includes(currentSymbol)
       || ONE_BRACKETS.some(elem => (elem.bracketType === currentSymbol
                                      && elem.bracketCount === 0))
    ) {
      stack.push(currentSymbol);
      if (ONE_BRACKETS.find(elem => elem.bracketType === currentSymbol)) {
        ONE_BRACKETS.find(elem => elem.bracketType === currentSymbol).bracketCount = 1;
      }
    } else {
      if (stack.length === 0) {
        return false
      }

      let topElement = stack[stack.length - 1];

      if (BRACKETS_PAIR[currentSymbol] === topElement
        || ONE_BRACKETS.some(elem => (elem.bracketType === topElement
                                      && elem.bracketCount === 1))) {
        stack.pop()
        if (ONE_BRACKETS.find(elem => elem.bracketType === currentSymbol)) {
          ONE_BRACKETS.find(elem => elem.bracketType === currentSymbol).bracketCount = 0;
        }
      } else {
        return false
      }
    }
  }
  return stack.length === 0
};
