 const URL = 'http://localhost:7000'
 export async function  getCountries() { 
    const response = await fetch(`${URL}/countries`);
    const countries = await response.json();
    return countries;
} 
export async function getQuizById(id) { 
    if(!id) return false;
    const response = await fetch(`${URL}/quizzes/${id}`);
    const quiz = await response.json();
    return quiz.id != "" ?true: false;
}