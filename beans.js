//Assign Variables
var beanCount = 0;
var maxBeans = 50;
var sprouts = 0;
var maxSprouts = 5;
var water = 0;
var maxWater = 4;
var plants = 0;
var maxPlants = maxSprouts;
var timeSproutsToPlants = 5; //Time for wateredSprout to grow into a plant (in seconds)
var wateredSproutsTimers = []; //Array storing the wateredSprouts times until grown into plants

//Search for Beans Button
var searchForBeans = document.createElement('button');
searchForBeans.id = 'searchForBeans';
searchForBeans.innerHTML = 'Search for beans';
searchForBeans.visible = false;
var main = document.getElementsByClassName('main')[0];
main.appendChild(searchForBeans);

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

//Display beanCount String from start
document.getElementById('beanCounter').innerHTML = "Beans: "+ beanCount + "/" + maxBeans;

//Master Clock
var x = 0;
var masterClock = setInterval(tick, 1000);

function tick() {
    document.getElementById('masterClock').innerHTML = "Seconds since starting: " + x;
    x++;

    growSproutsToPlants();
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
        document.getElementById('test').innerHTML = wateredSproutsTimers;
        document.getElementById('test2').innerHTML = "Watered Sprouts: " + wateredSproutsTimers.length;
    }
  }

//Function to add 1 bean per button click
function updateBeanCount(){
    if(beanCount < maxBeans) {
        beanCount++;
        document.getElementById('beanCounter').innerHTML = "Beans: "+ beanCount + "/" + maxBeans;
    
        if(beanCount > 4 & searchForBeans.visible == false) {
            main.appendChild(plantBeans);
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
    if(sprouts > 0 & plantBeans.visible == false) {
        main.appendChild(gatherWater);
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
        main.appendChild(waterSprouts);
        sproutGrowProgressBarFill.visible = true;
        waterSprouts.visible = true;
    }
};

//Function to remove 1 water, remove one sprout, and add one wateredSprout > plant 
function updatewaterSprouts(){
    if(water > 0) {  
        water--;
        if(sprouts > 0 & (wateredSproutsTimers.length - plants) < maxPlants) {
            sprouts--;
            wateredSproutsTimers.push(timeSproutsToPlants); 
        }
        document.getElementById('sproutsCounter').innerHTML = "Sprouts: " + sprouts + "/" + maxSprouts;   
        document.getElementById('waterCounter').innerHTML = "Water: " + water + "/" + maxWater + " fl oz";
        document.getElementById('test3').innerHTML = wateredSproutsTimers.length - plants
    }
}