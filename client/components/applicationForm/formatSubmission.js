function FormatSubmission(data) {
  let input = data;
  const formatted = {
    userId: null,
    applyDate: new Date().toISOString().substr(0, 10),
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
      formatted.expertise.push({name: item[1].split('-')[0], yearsExp: null});
    } else if (item[0].includes('years')) {
      formatted.expertise[expertiseCount]['yearsExp'] = parseFloat(item[1].split('-')[0]);
      expertiseCount++;
    } else if (item[0].includes('availableFrom')) {
      const formattedDate = item[1].split('-')[0].replace(/\//g, '-');
      formatted.available.push({from: formattedDate, to: null});
    } else if (item[0].includes('availableTo')) {
      const formattedDate = item[1].split('-')[0].replace(/\//g, '-');
      formatted.available[availableCount]['to'] = formattedDate;
      availableCount++;
    } else if (item[0].includes('letter')) {
      formatted.letter = item[1];
    }
  }
  return formatted;
}

export default FormatSubmission;
