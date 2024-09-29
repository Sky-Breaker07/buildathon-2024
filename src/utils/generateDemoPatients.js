import demoData from './demoData.json';

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export function generateDemoPatients(count) {
  const patients = [];
  const currentDate = new Date();
  const endDate = new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate());

  for (let i = 0; i < count; i++) {
    const patient = {
      name: `${getRandomElement(demoData.first_names)} ${getRandomElement(demoData.last_names)}`,
      age: getRandomElement(demoData.ages),
      sex: getRandomElement(demoData.sexes),
      tribe: getRandomElement(demoData.tribes),
      religion: getRandomElement(demoData.religions),
      occupation: getRandomElement(demoData.occupations),
      marital_status: getRandomElement(demoData.marital_statuses),
      address: getRandomElement(demoData.addresses),
      phone_number: getRandomElement(demoData.phone_numbers),
    };

    const appointmentDate = generateRandomDate(currentDate, endDate);
    const appointmentDateTime = appointmentDate.toISOString().slice(0, 16);
    const patientType = getRandomElement(demoData.patient_types);

    patients.push({ patient, appointmentDateTime, patientType });
  }

  return patients;
}
