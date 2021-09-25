//Assign Variables
var beanCount = 0;
var beanPlants = 0;

//Search for Beans Button
var searchForBeans = document.createElement('button');
searchForBeans.id = 'searchForBeans'
searchForBeans.innerHTML = 'Search for beans';
var body = document.getElementsByTagName('body')[0];
body.appendChild(searchForBeans);

//Plant Beans Button
var plantBeans = document.createElement('button');
plantBeans.id = 'plantBeans'
plantBeans.innerHTML = 'Plant beans';
body.appendChild(plantBeans);

//What happens when button is clicked
searchForBeans.addEventListener('click', updateBeanCount);
plantBeans.addEventListener('click', updateBeanPlants);

//Display beanCount String
document.getElementById('beanCounter').innerHTML = "You have "+ beanCount + " beans.";

//Function to add 1 bean per button click
function updateBeanCount(){
    beanCount++;
    document.getElementById("beanCounter").innerHTML = "You have "+ beanCount + " beans.";
};

//Function to add 1 plant per button click
function updateBeanPlants(){
    beanPlants++;
    document.getElementById("inventory").innerHTML = "Bean plants: " + beanPlants;
};

