 export async function  getCountries() { 
    const response = await fetch('http://localhost:7000/countries');
    const countries = await response.json();
    return countries;
} 