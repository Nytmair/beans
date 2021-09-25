//Assign Variables
var beanCount = 0;
var sprouts = 0;
var water = 0;
var plants = 0;
var timeSproutsToPlants = 5; //Time for wateredSprout to grow into a plant (in seconds)
var wateredSproutsTimers = []; //Array storing the wateredSprouts times until grown into plants

//Search for Beans Button
var searchForBeans = document.createElement('button');
searchForBeans.id = 'searchForBeans';
searchForBeans.innerHTML = 'Search for beans';
searchForBeans.visible = false;
var body = document.getElementsByTagName('body')[0];
body.appendChild(searchForBeans);

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

//Display beanCount String
document.getElementById('beanCounter').innerHTML = "You have "+ beanCount + " beans.";

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
        document.getElementById('plantsCounter').innerHTML = "Plants: " + plants; 
        document.getElementById('test').innerHTML = wateredSproutsTimers;
        document.getElementById('test2').innerHTML = "Watered Sprouts: " + wateredSproutsTimers.length;
    }
  }

//Function to add 1 bean per button click
function updateBeanCount(){
    beanCount++;
    document.getElementById('beanCounter').innerHTML = "You have "+ beanCount + " beans.";

    if(beanCount > 4 & searchForBeans.visible == false) {
        body.appendChild(plantBeans);
        searchForBeans.visible = true;
    }
};

//Function to add 1 sprout and remove 1 bean per button click
function updateSprouts(){
    if(beanCount > 0) {
        sprouts++;
        beanCount--;
        document.getElementById('beanCounter').innerHTML = "You have "+ beanCount + " beans.";
        document.getElementById('sproutsCounter').innerHTML = "Sprouts: " + sprouts;
    }
    if(sprouts > 0 & plantBeans.visible == false) {
        body.appendChild(gatherWater);
        plantBeans.visible = true;
    }
};

//Function to add 1 water per button click
function updateWater(){
    water++;
    if(water >= 0) {
        document.getElementById('waterCounter').innerHTML = "Water: " + water + " fl oz";
    }
    if(sprouts > 0 & water > 0 & waterSprouts.visible == false) {
        body.appendChild(waterSprouts);
        waterSprouts.visible = true;
    }
};

//Function to remove 1 water, remove one sprout, and add one wateredSprout > plant 
function updatewaterSprouts(){
    if(water > 0) {  
        water--;
        if(sprouts > 0) {
            sprouts--;
            wateredSproutsTimers.push(timeSproutsToPlants); 
        }
        document.getElementById('sproutsCounter').innerHTML = "Sprouts: " + sprouts;   
        document.getElementById('waterCounter').innerHTML = "Water: " + water + " fl oz";
    }
}
