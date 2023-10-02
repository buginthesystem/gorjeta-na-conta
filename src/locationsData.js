const districts = [
  { id: 1, name: "Lisboa" },
  { id: 2, name: "Porto" },
  { id: 3, name: "Braga" },
  { id: 4, name: "Aveiro" },
];

const cities = [
  { id: 1, districtId: 1, name: "Lisboa" },
  { id: 2, districtId: 1, name: "Sintra" },
  { id: 3, districtId: 2, name: "Porto" },
  { id: 4, districtId: 2, name: "Vila Nova de Gaia" },
  { id: 5, districtId: 3, name: "Braga" },
  { id: 6, districtId: 3, name: "Guimarães" },
  { id: 7, districtId: 4, name: "Aveiro" },
  { id: 8, districtId: 4, name: "Ílhavo" },
];

const parishes = [
  { id: 1, cityId: 1, name: "Belém" },
  { id: 2, cityId: 1, name: "Alcântara" },
  { id: 3, cityId: 2, name: "Rio de Mouro" },
  { id: 4, cityId: 2, name: "Algueirão–Mem Martins" },
  { id: 5, cityId: 3, name: "Cedofeita" },
  { id: 6, cityId: 3, name: "Santo Ildefonso" },
  { id: 7, cityId: 4, name: "Santa Marinha" },
  { id: 8, cityId: 4, name: "Mafamude" },
  { id: 9, cityId: 5, name: "São Víctor" },
  { id: 10, cityId: 5, name: "Sé" },
  { id: 11, cityId: 6, name: "Oliveira do Castelo" },
  { id: 12, cityId: 6, name: "São Paio" },
  { id: 13, cityId: 7, name: "Glória" },
  { id: 14, cityId: 7, name: "Vera Cruz" },
  { id: 15, cityId: 8, name: "Gafanha da Nazaré" },
  { id: 16, cityId: 8, name: "Gafanha da Encarnação" },
];

function getDistrictNameById(id) {
  const district = districts.find(d => d.id === id);
  return district ? district.name : 'Unknown';
}

function getCityNameById(id) {
  const city = cities.find(c => c.id === id);
  return city ? city.name : 'Unknown';
}

function getParishNameById(id) {
  const parish = parishes.find(p => p.id === id);
  return parish ? parish.name : 'Unknown';
}

export default {
  districts,
  cities,
  parishes,
  getDistrictNameById,
  getCityNameById,
  getParishNameById
};