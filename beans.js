//Assign Variables
var beanCount = 0; //Bean count in resources
var maxBeans = 100; //Max beans in resources
var harvestPlantsBeanCount = 5; //Number of beans harvested per plant harvested
var beanSearchTimer = 10; //Seconds after "search for beans" button
var sprouts = 0; //Sprouts count in resources
var maxSprouts = 15; //Max sprouts in resources
var sproutsTimer = 15; //Seconds after "plant beans" button
var water = 0; //Water count in resources
var maxWater = 4; //Max water in resources
var waterTimer = 10; //Seconds after "gather water" button
var plants = 0; //Plants count in resources
var maxPlants = maxSprouts; //Max plants in resources
var timeSproutsToPlants = 5; //Time for wateredSprout to grow into a plant (in seconds) after "water sprouts" button
var wateredSproutsTimers = []; //Array storing the wateredSprouts times until grown into plants
var tab; 
var tabContent;

//Tabs Code
window.onload=function() {
    tabContent=document.getElementsByClassName('tabContent');
    tab=document.getElementsByClassName('tab');
    hideTabsContent(1);
}

document.getElementById('tabs').onclick= function (event) {
    var target=event.target;
    if (target.className=='tab') {
       for (var i=0; i<tab.length; i++) {
           if (target == tab[i]) {
               showTabsContent(i);
               break;
           }
       }
    }
}

function hideTabsContent(a) {
    for (var i=a; i<tabContent.length; i++) {
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add("hide");
        tab[i].classList.remove('border');
    }
}

function showTabsContent(b){
    if (tabContent[b].classList.contains('hide')) {
        hideTabsContent(0);
        tab[b].classList.add('border');
        tabContent[b].classList.remove('hide');
        tabContent[b].classList.add('show');
    }
}

//Search for Beans Button
var searchForBeans = document.createElement('button');
searchForBeans.id = 'searchForBeans';
searchForBeans.innerHTML = 'Search for beans';
searchForBeans.visible = false;
var maintab = document.getElementsByClassName('maintab')[0];
maintab.appendChild(searchForBeans);

//Plant Beans Button
var plantBeans = document.createElement('button');
plantBeans.id = 'plantBeans';
plantBeans.innerHTML = 'Plant beans';
plantBeans.visible = false;

//Gather Water Button
var gatherWater = document.createElement('button');
gatherWater.id = 'gatherWater';
gatherWater.innerHTML = 'Gather water';
gatherWater.visible = false;

//Water Sprouts Button
var waterSprouts = document.createElement('button');
waterSprouts.id = 'waterSprouts';
waterSprouts.innerHTML = 'Water sprouts';
waterSprouts.visible = false;

//Harvest Plants Button
var harvestPlants = document.createElement('button');
harvestPlants.id = 'harvestPlants';
harvestPlants.innerHTML = 'Harvest plants';
harvestPlants.visible = false;

//What happens when buttons are clicked
searchForBeans.addEventListener('click', updateBeanCount);
plantBeans.addEventListener('click', updateSprouts);
gatherWater.addEventListener('click', updateWater);
waterSprouts.addEventListener('click', updatewaterSprouts);
harvestPlants.addEventListener('click', updateHarvestPlants);

//Display beanCount String from start
document.getElementById('beanCounter').innerHTML = "Beans: "+ beanCount + "/" + maxBeans;

//Narrative
document.getElementById('narrative001').innerHTML = "test";

//Master Clock
var x = 1;
var masterClock = setInterval(tick, 1000);

function tick() {
    document.getElementById("masterClock").innerHTML = "Seconds since starting: " + x;
    x++;

    growSproutsToPlants();
    updateGrowingSproutsCounter();
}

//Function to update growingSproutsCounter
function updateGrowingSproutsCounter() {
    if (waterSprouts.visible == true) {
    document.getElementById('growingSproutsCounter').innerHTML = "Current sprouts growing: " + wateredSproutsTimers.length;
    }
}

//Function to reduce timeSproutsToPlants in the wateredSproutsTimers array
function growSproutsToPlants() {
    for (var i = 0; i < wateredSproutsTimers.length; i++) {
        if( wateredSproutsTimers[i] > 0) {
            wateredSproutsTimers[i]--;
        } else {
            wateredSproutsTimers.splice(0,1);
            plants++;
        }
        document.getElementById('plantsCounter').innerHTML = "Plants: " + plants + "/" + maxPlants; 
    }
  }

//Function to add 1 bean per button click
function updateBeanCount(){
    if(beanCount < maxBeans) {
        beanCount++;
        document.getElementById('beanCounter').innerHTML = "Beans: "+ beanCount + "/" + maxBeans;
    
        if(beanCount > 4 & searchForBeans.visible == false) {
            maintab.appendChild(plantBeans);
            searchForBeans.visible = true;
        }
    }
    
};

//Function to add 1 sprout and remove 1 bean per button click
function updateSprouts(){
    if(beanCount > 0) {
        if (sprouts < maxSprouts) {
            sprouts++;
            beanCount--;
            document.getElementById('beanCounter').innerHTML = "Beans: "+ beanCount + "/" + maxBeans;
            document.getElementById('sproutsCounter').innerHTML = "Sprouts: " + sprouts + "/" + maxSprouts;
        }
    }
    if(sprouts > 0 && plantBeans.visible == false) {
        maintab.appendChild(gatherWater);
        plantBeans.visible = true;
    }
};

//Function to add 1 water per button click
function updateWater(){
    if (water < maxWater) {
        water++;
    }
    if(water >= 0) {
        document.getElementById('waterCounter').innerHTML = "Water: " + water + "/" + maxWater + " fl oz";
    }
    if(sprouts > 0 & water > 0 & waterSprouts.visible == false) {
        maintab.appendChild(waterSprouts);
        waterSprouts.visible = true;
    }
};

//Function to remove 1 water, remove one sprout, and add one wateredSprout to plant 
function updatewaterSprouts(){
    if(water > 0) {  
        water--;
        if(sprouts > 0 & (wateredSproutsTimers.length + plants) < maxPlants) {
            sprouts--;
            wateredSproutsTimers.push(timeSproutsToPlants);
            maintab.appendChild(harvestPlants);
            harvestPlants.visible = true;
        }
        document.getElementById('sproutsCounter').innerHTML = "Sprouts: " + sprouts + "/" + maxSprouts;   
        document.getElementById('waterCounter').innerHTML = "Water: " + water + "/" + maxWater + " fl oz";
    }
}

//Function to remove 1 plant and add 5 beans
function updateHarvestPlants(){
    if(plants > 0 & beanCount < (maxBeans + harvestPlantsBeanCount)) {
        plants--;
        beanCount += harvestPlantsBeanCount;
        document.getElementById('beanCounter').innerHTML = "Beans: "+ beanCount + "/" + maxBeans;
        document.getElementById('plantsCounter').innerHTML = "Plants: " + plants + "/" + maxPlants;
    }
}