// let CitiesRussia = [{ name: 'Москва' }, { name: 'Санкт-Петербург' }, { name: 'Нижний Новгород' }, { name: 'Вогоград' }]
// let CitiesUSA  = [
//   { name: "New-York" },
//   { name: "San Francisco" },
//   { name: "Roseville" },
//   { name: "Pasadena" },
// ];
const CitiesUSA: Array<string> = ['New-York', 'San Francisco', 'Roseville', 'Pasadena']
const CitiesRussia: Array<string> = ['Москва', 'Санкт-Петербург', 'Нижний Новгород', 'Вогоград']
const CitiesFrance: Array<string> = ['Paris', 'Versailles', 'Dijon', 'Lille']
const CitiesGermany: Array<string> = ['Berlin', 'Bayern', 'Hamburg', 'Hesse']
// let CitiesFrance = [{ name: 'Paris' }, { name: 'Versailles' }, { name: 'Dijon' }, { name: 'Lille' }]
// let CitiesGermany = [{ name: 'Berlin' }, { name: 'Bavaria' }, { name: 'Hamburg' }, { name: 'Hesse' }]
let Arr = {
    Russia: {
        cities: CitiesRussia,
        phoneCode: '+7 (###) ### ## ##'
    },
    USA: {
        cities: CitiesUSA,
        phoneCode: '+1 (###) ### ####'
    },
    France: {
        cities: CitiesFrance,
        phoneCode: '+33 # ## ## ## ##'
    },
    Germany: {
        cities: CitiesGermany,
        phoneCode: '+49 ### ### ####'
    },
}

export default Arr
