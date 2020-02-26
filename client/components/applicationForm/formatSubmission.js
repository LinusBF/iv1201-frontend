function FormatSubmission(data) {
  let input = data;
  const formatted = {
    userId: null,
    applyDate: new Date(),
    firstName: input.splice(0, 1)[0][1],
    lastName: input.splice(0, 1)[0][1],
    ssn: input.splice(0, 1)[0][1],
    email: input.splice(0, 1)[0][1],
    expertise: [],
    available: [],
    letter: '',
  };
  let item;
  let expertiseCount = 0;
  let availableCount = 0;
  while (input.length > 0) {
    item = input.splice(0, 1)[0];
    switch (item[0]) {
      case 'expertise':
        formatted.expertise.push({expertise: item[1], years: null});
        break;
      case 'years':
        formatted.expertise[expertiseCount]['years'] = item[1];
        expertiseCount++;
        break;
      case 'availableFrom':
        formatted.available.push({from: item[1], to: null});
        break;
      case 'availableTo':
        formatted.available[availableCount]['to'] = item[1];
        availableCount++;
        break;
      case 'letter':
        formatted.letter = item[1];
        break;
      default:
        break;
    }
  }
  return formatted;
}

export default FormatSubmission;
