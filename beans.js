//Assign Variables

//Beans
var beanCount = 0; //Count in resources
var maxBeans = 1000; //Max in resources
var beanSearchTimer = 10; //Seconds after to finish after button press
var workersBeans = 0; //Number of workers
var beanMultiBase = 1; //To use for multiplying buffs
var beanClickBuff = 0; //Multiplier for click of the button
var beanAutoMulti = 1; //Multiplier for auto
var harvestPlantsBeanCount = 5; //Number of beans harvested per plant harvested

//Sprouts
var sprouts = 0; 
var maxSprouts = 15; 
var sproutsTimer = 15; 
var workersSprouts = 0;
var sproutsMulti = 1; 

//Water
var water = 0; 
var maxWater = 4; 
var waterTimer = 10; 
var workersWater = 0;
var waterMulti = 1;

//Plants
var plants = 0; 
var maxPlants = maxSprouts;
var timeSproutsToPlants = 50; //Time for wateredSprout to grow into a plant (in seconds) after "water sprouts" button 
var wateredSproutsTimers = []; //Array storing the wateredSprouts times until grown into plants
var workersPlants = 0;
var plantsMulti = 1;

//Harvest
var workersHarvest = 0;

//Tabs
var tab; 
var tabContent;

//Buffs and Upgrades
var buffVillagerSonLevel01 = 1.5;

//Things to start hidden
//Progress bars
var progressBarSprouts = document.getElementById('progressBarSprouts');
progressBarSprouts.style.display = 'none';

var progressBarWater = document.getElementById('progressBarWater');
progressBarWater.style.display = 'none';

var progressBarPlants = document.getElementById('progressBarPlants');
progressBarPlants.style.display = 'none';

//Tabs
document.getElementById('villageTab').style.visibility = 'hidden';
document.getElementById('upgradesTab').style.visibility = 'hidden';


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
        tabContent[i].classList.add('hide');
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
var mainTab = document.getElementsByClassName('mainTab')[0];
mainTab.appendChild(searchForBeans);

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

//Hire Villager's Son Button
var hireVillagerSon = document.createElement('button');
hireVillagerSon.id = 'hireVillagerSon';
hireVillagerSon.innerHTML = 'Hire Villager\'s Son';
hireVillagerSon.visible = false;
var villageTab = document.getElementsByClassName('villageTab')[0];
villageTab.appendChild(hireVillagerSon);

//Hire Villager's Brother Button
var hireVillagerBrother = document.createElement('button');
hireVillagerBrother.id = 'hireVillagerBrother';
hireVillagerBrother.innerHTML = 'Hire Villager\'s Brother';
hireVillagerBrother.visible = false;

//Give Villager's Son a Raise Upgrade Button
var buffVillagerSon = document.createElement('button');
buffVillagerSon.id = 'buffVillagerSon';
buffVillagerSon.innerHTML = 'Give Villager\'s Son a Raise';
buffVillagerSon.visible = false;
var upgradesTab = document.getElementsByClassName('upgradesTab')[0];
upgradesTab.appendChild(buffVillagerSon);

//What happens when buttons are clicked
searchForBeans.addEventListener('click', updateBeanCount);
plantBeans.addEventListener('click', updateSprouts);
gatherWater.addEventListener('click', updateWater);
waterSprouts.addEventListener('click', updatewaterSprouts);
harvestPlants.addEventListener('click', updateHarvestPlants);
hireVillagerSon.addEventListener('click', turnOnAutoBeans);
hireVillagerBrother.addEventListener('click', turnOnAutoSprouts);
buffVillagerSon.addEventListener('click', updateAutoMulti(beanAutoMulti, buffVillagerSonLevel01));

//Display beanCount String from start
document.getElementById('beanCounter').innerHTML = "Beans: "+ beanCount + "/" + maxBeans;

//Narrative
document.getElementById('eventCurrent').innerHTML = "words words words";

//Master Clock
var x = 1;
var masterClock = setInterval(tick, 100);

//Tick function 
function tick() {
    document.getElementById('masterClock').innerHTML = "Seconds since starting: " + x.toFixed(2);
    x += .1;

    growSproutsToPlants();
    updateGrowingSproutsCounter();
    updateProgressBarFill(beanCount, maxBeans, 'progressBarBeanCounterFill');
    updateProgressBarFill(sprouts, maxSprouts, 'progressBarSproutsFill');
    updateProgressBarFill(water, maxWater, 'progressBarWaterFill');
    updateProgressBarFill(plants, maxSprouts, 'progressBarPlantsFill');
}

//Function for progress bars
function updateProgressBarFill(qty,maxQty,progressBarId) {
    if (qty >= 0 && qty <= maxQty ) {
        document.getElementById(progressBarId).style.width = (qty/maxQty)*100 + "%"; 
    }
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
            document.getElementById('test2').innerHTML = wateredSproutsTimers;
        } else {
            wateredSproutsTimers.splice(0,1);
            plants++;
        }
        document.getElementById('plantsCounter').innerHTML = "Plants: " + plants + "/" + maxPlants;   
    }
    if(plants > 3 && hireVillagerSon.visible == false) {
        villageTab.appendChild(hireVillagerSon);
        hireVillagerSon.visible = true;
        document.getElementById('villageTab').style.visibility = 'visible';
    }
  }

//Function to add 1 bean per button click
function updateBeanCount(){
    if(beanCount < maxBeans) {
        beanCount = beanCount + beanMultiBase*beanAutoMulti + beanClickBuff;
        document.getElementById('beanCounter').innerHTML = "Beans: "+ beanCount + "/" + maxBeans;
    
        if(beanCount > 4 & searchForBeans.visible == false) {
            mainTab.appendChild(plantBeans);
            document.getElementById('growingSproutsCounter').visible = true;
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
        mainTab.appendChild(gatherWater);
        plantBeans.visible = true;
        progressBarSprouts.style.display = 'block';
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
        mainTab.appendChild(waterSprouts);
        waterSprouts.visible = true;
        progressBarWater.style.display = 'block';
    }
};

//Function to remove 1 water, remove one sprout, and add one wateredSprout to plant 
function updatewaterSprouts(){
    if(water > 0) {  
        water--;
        if(sprouts > 0 & (wateredSproutsTimers.length + plants) < maxPlants) {
            sprouts--;
            wateredSproutsTimers.push(timeSproutsToPlants);
            mainTab.appendChild(harvestPlants);
            harvestPlants.visible = true;
            progressBarPlants.style.display = 'block';
        }
        document.getElementById('sproutsCounter').innerHTML = "Sprouts: " + sprouts + "/" + maxSprouts;   
        document.getElementById('waterCounter').innerHTML = "Water: " + water + "/" + maxWater + " fl oz";
    }
}

//Function to remove 1 plant and add 5 beans
function updateHarvestPlants(){
    if(plants > 0 && beanCount <= (maxBeans - harvestPlantsBeanCount)) {
        plants--;
        beanCount += harvestPlantsBeanCount;
        document.getElementById('beanCounter').innerHTML = "Beans: "+ beanCount + "/" + maxBeans;
        document.getElementById('plantsCounter').innerHTML = "Plants: " + plants + "/" + maxPlants;
    }
}

//Function when hiring villager's son
function turnOnAutoBeans(){
    workersBeans++;
    document.getElementById('hireVillagerSon').disabled = true;
    if(workersBeans > 0 && hireVillagerBrother.visible == false) {
        villageTab.appendChild(hireVillagerBrother);
        hireVillagerBrother.visible = true;
        setInterval(updateBeanCount, 1000);
        }
    }

//Function when hiring villager's brother
function turnOnAutoSprouts(){
    workersSprouts++;
    document.getElementById('hireVillagerBrother').disabled = true;
    upgradesTab.appendChild(buffVillagerSon);
    buffVillagerSon.visible = true;
    document.getElementById('upgradesTab').style.visibility = 'visible';
    if(workersSprouts > 0) {
        setInterval(updateSprouts, 1000);
        }
    }

//Funtions for upgrades and buffs
function updateAutoMulti(multiUpgraded, upgradePurchased){
    multiUpgraded = multiUpgraded*upgradePurchased;
    return multiUpgraded;
}

function updateMaxQty(maxQty, upgradePurchased){
    maxQty = maxQty + upgradePurchased;
}