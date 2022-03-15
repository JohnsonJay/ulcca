const { addListener } = require("nodemon");

exports.checkCompatibility = (req, res, next) => {
  try {
    const { name1, name2 } = req.body;
    if (name1 && name2) {
      const finalValue = firstCalculation(name1, name2);

      res.status(200).json({ compatibility: finalValue });
    } else if (name1 || name2) {
      if (name1) {
        // assume only name 1 is provided
        const finalValue = firstCalculation(name1, name1);

        res.status(200).json({ compatibility: finalValue });
      } else {
        // assume that only name 2 is provided
        const finalValue = firstCalculation(name2, name2);

        res.status(200).json({ compatibility: finalValue });
      }
    } else {
      // error
      throw new Error('At least one name must be provided');
    }
  } catch (error) {
    console.error('There was an error with checkCompatibility: ', error);
    // send error to client
    res.status(400).send(error.message)
  }
}

/**
 *  Function that takes two names and adds up all the respective values in order to find the compatibility
 *
 * @param {string} name1 - the first name of the first person
 * @param {string} name2 - the first name of the second person
 *
 * @returns {number} -
 * */
function firstCalculation(name1, name2) {
  let occurrences = new Map();
  let tempVal1 = '';
  let tempVal2 = '';

  // just in case the user tries both the name and surname
  const filteredName1 = name1.split(' ')[0];
  const filteredName2 = name2.split(' ')[0];

  const combinedString = `${filteredName1}loves${filteredName2}`.toLowerCase();

  const splitArray = combinedString.split('');

  // only need to do one pass over this array (complexity should be O(n))
  splitArray.forEach(character => {
    // check if the character exists, and increment the character count, else add that character with a count of 1
    if ( occurrences.has(character) ) {
      const value = occurrences.get(character);
      occurrences.set(character, value + 1);
    } else {
      occurrences.set(character, 1);
    }
  });

  // push all values in to temp1
  occurrences.forEach(value => {
    tempVal1 += value;
  });

  while ( true ) {
    tempVal2 = tempVal1.split('');
    tempVal1 = '';

    while ( tempVal2.length > 0 ) {
      if ( tempVal2.length === 1 ) {
        tempVal1 += parseInt(tempVal2[0]);
        break;
      }

      let right = tempVal2[tempVal2.length - 1].split('');
      let left = tempVal2[0].split('');

      tempVal1 += parseInt(left) + parseInt(right);

      // remove first and last elements from array
      tempVal2.shift();
      tempVal2.pop();
    }

    if ( tempVal1.length < 3 ) {
      break;
    }
  }

  return (parseFloat(tempVal1) / 100);
}

