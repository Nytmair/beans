//Assign Variables
var beanCount = 0;
var beansPlanted = 0;
var water = 0;
var beanPlants = 0;

//Search for Beans Button
var searchForBeans = document.createElement('button');
searchForBeans.id = 'searchForBeans';
searchForBeans.innerHTML = 'Search for beans';
var body = document.getElementsByTagName('body')[0];
body.appendChild(searchForBeans);

//Plant Beans Button
var plantBeans = document.createElement('button');
plantBeans.id = 'plantBeans';
plantBeans.innerHTML = 'Plant beans';

//Gather Water Button
var gatherWater = document.createElement('button');
gatherWater.id = 'gatherWater';
gatherWater.innerHTML = 'Gather water';

//Water Plants Button
var waterPlants = document.createElement('button');
waterPlants.id = 'waterPlants';
waterPlants.innerHTML = 'Water plants';

//What happens when button is clicked
searchForBeans.addEventListener('click', updateBeanCount);
plantBeans.addEventListener('click', updateBeansPlanted);
gatherWater.addEventListener('click', updateWater);
waterPlants.addEventListener('click', updateWaterPlants);

//Display beanCount String
document.getElementById('beanCounter').innerHTML = "You have "+ beanCount + " beans.";

//Function to add 1 bean per button click
function updateBeanCount(){
    beanCount++;
    document.getElementById('beanCounter').innerHTML = "You have "+ beanCount + " beans.";

    if(beanCount > 4) {
        body.appendChild(plantBeans);
    }
};

//Function to add 1 bean planted and remove 1 bean per button click
function updateBeansPlanted(){
    if(beanCount > 0) {
        beansPlanted++;
        beanCount--;
        document.getElementById('beanCounter').innerHTML = "You have "+ beanCount + " beans.";
        document.getElementById('beansPlantedCounter').innerHTML = "Beans planted: " + beansPlanted;
    }
    if(beansPlanted > 0) {
        body.appendChild(gatherWater);
    }
};

//Function to add 1 water per button click
function updateWater(){
    water++;
    if(water >= 0) {
        document.getElementById('waterCounter').innerHTML = "Water supply: " + water + " fl oz";
    }
    if(beansPlanted > 0 && water > 0) {
        body.appendChild(waterPlants);
    }
};

//Function to remove 1 water, remove one bean planted, and add one bean plant 
function updateWaterPlants(){
    if(water > 0) {
        beanPlants++;  
        beansPlanted--;
        water--;
        document.getElementById('beanPlantsCounter').innerHTML = "Bean plants grown: " + beanPlants; 
        document.getElementById('beansPlantedCounter').innerHTML = "Beans planted: " + beansPlanted;   
        document.getElementById('waterCounter').innerHTML = "Water supply: " + water + " fl oz";
    }
}