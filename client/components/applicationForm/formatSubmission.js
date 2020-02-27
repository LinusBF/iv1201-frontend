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
    if (item[0].includes('expertise')) {
      formatted.expertise.push({expertise: item[1].split('-')[0], years: null});
    } else if (item[0].includes('years')) {
      formatted.expertise[expertiseCount]['years'] = item[1].split('-')[0];
      expertiseCount++;
    } else if (item[0].includes('availableFrom')) {
      formatted.available.push({from: item[1].split('-')[0], to: null});
    } else if (item[0].includes('availableTo')) {
      formatted.available[availableCount]['to'] = item[1].split('-')[0];
      availableCount++;
    } else if (item[0].includes('letter')) {
      formatted.letter = item[1];
    }
  }
  return formatted;
}

export default FormatSubmission;
