import _ from "lodash";

export default function solution(content) {
  // BEGIN
  const strings = content.split("\n");
  const normalizeStrings = strings.slice(1, strings.length - 1);
  // console.log(normalizeStrings)
  const counterStrings = normalizeStrings.length;
  console.log("Count:", counterStrings);

  const stringsInArray = normalizeStrings.map((string) => string.split(","));
  const citiesName = stringsInArray.reduce((acc, cityString) => {
    const cityName = cityString[7];
    // console.log(cityName)
    if (!acc.includes(cityName)) {
      acc.push(cityName);
    }
    return acc;
  }, []);
  const sortCityName = citiesName.sort().join(", ");
  console.log("Cities:", sortCityName);

  const minHumidityInArray = stringsInArray.map((city) => city[3]);
  const minHumidity = minHumidityInArray.reduce((acc, Humidity) => {
    if (acc > Humidity) {
      acc = Humidity;
    }
    return acc;
  });

  const maxHumidityInArray = stringsInArray.map((city) => city[3]);
  const maxHumidity = maxHumidityInArray.reduce((acc, Humidity) => {
    if (acc < Humidity) {
      acc = Humidity;
    }
    return acc;
  });

  console.log(`Humidity: Min: ${minHumidity}, Max: ${maxHumidity}`);

  const temperatureInArray = stringsInArray.map((city) => {
    const [date, maxTemp, , , , , , cityName] = city;
    return [date, maxTemp, cityName];
  });

  // console.log(temperatureInArray);
  const maxTemperature = temperatureInArray.reduce((acc, temperature) => {
    if (acc[1] < temperature[1]) {
      acc = temperature;
    }
    return acc;
  });
  console.log(`HottestDay: ${maxTemperature[0]} ${maxTemperature[2]}`);

  const counterTempForCities = temperatureInArray.reduce((acc, item) => {
    const [, maxTemp, cityName] = item;
    if (!Object.hasOwn(acc, cityName)) {
      acc[cityName] = [];
    }
    acc[cityName].push(maxTemp);
    return acc;
  }, {});
  // console.log(counterTempForCities);

  const averTempEntries = Object.entries(counterTempForCities);
  const averTemp = averTempEntries.map((city) => {
    const [ name, counterTemp ] = city;
    const length = counterTemp.length;
    const summTemp = counterTemp.reduce((acc, item) => (acc + Number(item)), 0);
    const average = summTemp / length;
    return [name, average];
  });

  const result5Test = averTemp.reduce((acc, city)=>{
    if (city[1] > acc[1]){
      acc = city
    }
    return acc
  });

  console.log('HottestCity:', result5Test[0])



  // END
}
