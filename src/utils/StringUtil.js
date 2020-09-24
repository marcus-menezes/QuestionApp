/**
 * @param {string} string String a ser utilizada 
 */

export function SplitInTwo(string) {
  let ConteudoDoSplit = string.split(' ')

  let FirstName = ConteudoDoSplit[0]

  let MiddleName = ConteudoDoSplit[1]

  let LastName = ConteudoDoSplit[2]

  let response = FirstName + ' ' + MiddleName + ' ' + LastName

  return response
}

/**
 * @param {string} string String a ser utilizada 
 * @param {number} maxLength Valor máximo a mostrar da string 
 */
export function ReturnStringEllipsis(string, maxLength) {
  if (string.length > maxLength) {
    return string.substring(0, maxLength) + '...'
  }
  return string
}

export function BreakLine(string) {
  let result = ''
  let lineListString = string.split(' ')
  lineListString.forEach(element => {
    result += '\n' + element
  });

  return result
}

export function splice(string) {

  let result = ''
  let arr = string.split(' ')
  for (let index = 0; index < arr.length; index++) 
  {
    const element = arr[index];

    if (arr.length > 1) 
    {
      if (index == arr.length - 1) 
      {
        result += '\n' + element
      }
      else 
      {
        result += element + ' '
      }
    }
    else
    {
      result = string
    }


  }
  return result
}


export function PasswordStrength(password)
{
  if (!password) {
    throw new Error("Password is empty.");
  }

  const lowerCaseRegex = "(?=.*[a-z])";
  const upperCaseRegex = "(?=.*[A-Z])";
  const symbolsRegex = "(?=.*[!@#$%^&*])";
  const numericRegex = "(?=.*[0-9])";

  let strength = {
    id: null,
    value: null,
    length: null,
    contains: [],
  }; 
  
  // Default
  let passwordContains = [];

  if (new RegExp(`^${lowerCaseRegex}`).test(password)) {
    passwordContains = [
      ...passwordContains,
      {
        message: "lowercase",
      },
    ];
  }

  if (new RegExp(`^${upperCaseRegex}`).test(password)) {
    passwordContains = [
      ...passwordContains,
      {
        message: "uppercase",
      },
    ];
  }

  if (new RegExp(`^${symbolsRegex}`).test(password)) {
    passwordContains = [
      ...passwordContains,
      {
        message: "symbol",
      },
    ];
  }

  if (new RegExp(`^${numericRegex}`).test(password)) {
    passwordContains = [
      ...passwordContains,
      {
        message: "number",
      },
    ];
  }

  const strongRegex = new RegExp(
    `^${lowerCaseRegex}${upperCaseRegex}${numericRegex}${symbolsRegex}(?=.{8,})`
  );
  const mediumRegex = new RegExp(
    `^${lowerCaseRegex}${upperCaseRegex}${numericRegex}(?=.{6,})`
  );

  if (strongRegex.test(password)) {
    strength = {
      id: 2,
      value: "Strong",
    };
  } else if (mediumRegex.test(password)) {
    strength = {
      id: 1,
      value: "Medium",
    };
  } else {
    strength = {
      id: 0,
      value: "Weak",
    };
  }
  strength.length = password.length;
  strength.contains = passwordContains;
  return strength;
}


export function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}
