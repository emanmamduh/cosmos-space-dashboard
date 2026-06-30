"use strict";
////////////////// * data  */////////////////////////
const sideLinks = document.querySelector(".side-Links");
const navLinks = document.querySelectorAll(".side-Links .nav-link");
const sections = document.querySelectorAll("section");

// * today's Img sectiion
const loadBtn = document.getElementById("load-date-btn");
const todayBtn = document.getElementById("today-apod-btn");
const imgOfDayDate = document.getElementById("apod-date");
const todayDate = document.getElementById("selectedDate");
const todayImg = document.getElementById("apod-image");
const apodTitle = document.getElementById("apod-title");
const apodDateDetail = document.getElementById("apod-date-detail");
const apodExplanation = document.getElementById("apod-explanation");
const apodCopyright = document.getElementById("apod-copyright");
const apodDateInfo = document.getElementById("apod-date-info");
const apodMediaType = document.getElementById("apod-media-type");
const currentDateDisplay = document.getElementById("apod-date-input");
const selectedDate = document.getElementById("selectedDate");
const viewBtn = document.getElementById("viewBtn");
let imgHDurl = "";
let targetedDate;

// * Launches section data
const launchTitle = document.querySelector(".launch-header h3");
const launchServiceProvider = document.querySelector("#launchServicePro");
const launchRoketConfig = document.querySelector("#rockerConfig");
const launchDate = document.getElementById("launchDate");
const launchTime = document.getElementById("launchTime");
const launchLocation = document.getElementById("launchLocation");
const launchCountry = document.getElementById("launchDate");
const launchImg = document.querySelector(".launch-img");
const launchDesc = document.querySelector(".launch-desc");
const launchCards = document.querySelector("#launches-grid");

// * planets section data
const planetsList = document.querySelector("#planets-grid");
const planets = document.getElementById("planets");
const planetImg = document.getElementById("planet-detail-image");
const planetName = document.getElementById("planet-detail-name");
const planetDesc = document.getElementById("planet-detail-description");
const planetDistance = document.getElementById("planet-distance");
const planetRaduis = document.getElementById("planet-radius");
const planetMass = document.getElementById("planet-mass");
const planetDensity = document.getElementById("planet-density");
const planetOrbitalPeriod = document.getElementById("planet-orbital-period");
const planetRotaion = document.getElementById("planet-rotation");
const planetMoons = document.getElementById("planet-moons");
const planetDiscoverer = document.getElementById("planet-discoverer");
const planetDiscoveryDate = document.getElementById("planet-discovery-date");
const planetBodyType = document.getElementById("planet-body-type");
const planetVolum = document.getElementById("planet-volume");
const planetMassFacts = document.getElementById("mass");
const planetGravityFacts = document.getElementById("gravity");
const planetDensityFacts = document.getElementById("density");
const planetAxialTiltFacts = document.getElementById("axialTilt");
const planetPerihelion = document.getElementById("planet-perihelion");
const planetAphelion = document.getElementById("planet-aphelion");
const planetEccentricity = document.getElementById("planet-eccentricity");
const planetInclination = document.getElementById("planet-inclination");
const planetAxialTilt = document.getElementById("planet-axial-tilt");
const planetTemperature = document.getElementById("planet-temp");
const planetEscapeVelocity = document.getElementById("planet-escape");

let planetsBodies = [];
let launchesResults = [];

sideLinks.addEventListener("click", function (eventInfo) {
  const targetLinkkk = eventInfo.target;
  const targetLink = eventInfo.target.closest("a");
  if (targetLink === null) {
    return;
  }

  for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].classList.remove("bg-blue-500/10", "text-blue-400");
    navLinks[i].classList.add("text-slate-300", "hover:bg-slate-800");
  }
  targetLink.classList.remove("text-slate-300", "hover:bg-slate-800");
  targetLink.classList.add("bg-blue-500/10", "text-blue-400");

  for (let i = 0; i < sections.length; i++) {
    if (sections[i].id !== targetLink.getAttribute("data-section")) {
      if (!sections[i].classList.contains("hidden")) {
        sections[i].classList.add("hidden");
      }
    } else {
      if (sections[i].classList.contains("hidden")) {
        sections[i].classList.remove("hidden");
      }
    }
  }
});

// 1- today's picture section
function displayAstronomyImg(imgObject) {
  imgOfDayDate.innerText = ` Astronomy Picture of the Day -  ${new Date(
    imgObject.date,
  ).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })}`;

  todayDate.innerText = new Date(imgObject.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  todayImg.src = imgObject.url;
  apodTitle.innerText = imgObject.title;
  apodDateDetail.innerText = new Date(imgObject.date).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    },
  );
  apodExplanation.innerText = imgObject.explanation;
  apodCopyright.innerText = imgObject.copyright;
  apodDateInfo.innerText = imgObject.date;
  apodMediaType.innerText = imgObject.media_type;
}
async function getAstronomyImg() {
  try {
    // response
    const response = await fetch(
      "https://api.nasa.gov/planetary/apod?api_key=qrwCGW1qbkRfkiBp3ireIDeR8bVmqbkR93t9diWl",
    );
    // response in json
    const imgResponse = await response.json();
    imgHDurl = imgResponse.hdurl;
    displayAstronomyImg(imgResponse);
  } catch (error) {
    console.log(error);
  }
}
async function getAstronomyImgByDate(date) {
  try {
    // response
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=qrwCGW1qbkRfkiBp3ireIDeR8bVmqbkR93t9diWl&date=${date}`,
    );
    // response in json
    const datedImgResponse = await response.json();
    imgHDurl = datedImgResponse.hdurl;
    displayAstronomyImg(datedImgResponse);
  } catch (error) {
    console.log(error);
  }
}
currentDateDisplay.addEventListener("change", function (eventInfo) {
  targetedDate = eventInfo.target.value;
  // getAstronomyImgByDate(targetedDate);
  if (targetedDate) {
    const formatted = new Date(targetedDate).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    selectedDate.innerText = formatted;
  }
});
loadBtn.addEventListener("click", function () {
  getAstronomyImgByDate(targetedDate);
});
todayBtn.addEventListener("click", function () {
  getAstronomyImg();
});
viewBtn.addEventListener("click", function () {
  if (imgHDurl) {
    // opens img in  new tab
    window.open(imgHDurl, "_blank");
  }
});

// 2- launches section
function DateFormat(list) {
  let netString = list.net.split("T");
  let formattedDate = new Date(netString[0]).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return formattedDate;
}
function TimeFormat(list) {
  let netString = list.net.split("T");
  let formattedTime =
    new Date(`2000-01-01T${netString[1]}`).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    }) + " UTC";
  return formattedTime;
}
function displayFeaturedLaunch() {
  launchTitle.innerText = launchesResults[0].name;
  launchServiceProvider.innerText =
    launchesResults[0].launch_service_provider.name;

  launchRoketConfig.innerText = launchesResults[0].rocket.configuration.name;

  launchDate.innerText = DateFormat(launchesResults[0]);
  launchTime.innerText = TimeFormat(launchesResults[0]);
  launchLocation.innerText = launchesResults[0].pad.location.name;
  launchCountry.innerText = launchesResults[0].pad.location.country.name;

  launchDesc.innerText = launchesResults[0].mission.description;
  // launchImg.innerHTML = `<img src="${launchesResults[0].image.image_url}" alt="${launchesResults[0].name}" class = "h-full object-center object-cover">`;

  launchImg.innerHTML = `                 ${
    launchesResults[0].image && launchesResults[0].image.image_url
      ? ` 
                      <img 
                       src="${launchesResults[0].image.image_url}" 
                       alt="${launchesResults[0].name}" 
                       class="w-full h-full object-center object-cover"
                       id="img-${0}"
                       onerror="this.onerror=null; this.src='assets/images/launch-placeholder.png';"
                      >
                       `
      : `<img src="assets/images/launch-placeholder.png" 
                             alt="Default Launch" 
                             class="w-full h-full object-center object-cover">`
  }`;
}
function displayAllLaunches() {
  let launchCardContainer = "";
  for (let i = 1; i < launchesResults.length; i++) {
    launchCardContainer += `<div
              class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer"
            >
              <div
                class="relative h-48 bg-slate-900/50 flex items-center justify-center">
                   
                 ${
                   launchesResults[i].image &&
                   launchesResults[i].image.image_url
                     ? ` 
                      <img 
                       src="${launchesResults[i].image.image_url}" 
                       alt="${launchesResults[i].name}" 
                       class="w-full h-full object-center object-cover"
                       id="img-${i}"
                       onerror="this.onerror=null; this.src='assets/images/launch-placeholder.png';"
                      >
                       `
                     : `<img src="assets/images/launch-placeholder.png" 
                             alt="Default Launch" 
                             class="w-full h-full object-center object-cover">`
                 }

                <div class="absolute top-3 right-3 hidden">
                  <span
                    class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold"
                  >
                    Go
                  </span>
                </div>
              </div>
              <div class="p-5">
                <div class="mb-3">
                  <h4
                    class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors"
                  >
                    ${launchesResults[i].name}
                  </h4>
                  <p class="text-sm text-slate-400 flex items-center gap-2">
                    <i class="fas fa-building text-xs"></i>
                    ${launchesResults[i].launch_service_provider.name}
                  </p>
                </div>
                <div class="space-y-2 mb-4">
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-calendar text-slate-500 w-4"></i>
                    <span class="text-slate-300">${DateFormat(launchesResults[i])}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-clock text-slate-500 w-4"></i>
                    <span class="text-slate-300">${TimeFormat(launchesResults[i])}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-rocket text-slate-500 w-4"></i>
                    <span class="text-slate-300">${launchesResults[i].rocket.configuration.name}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                    <span class="text-slate-300 line-clamp-1">${launchesResults[i].pad.location.name}</span>
                  </div>
                </div>


                <div
                  class="flex items-center gap-2 pt-4 border-t border-slate-700"
                >
                  <button
                    class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold"
                  >
                    Details
                  </button>
                  <button
                    class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    <i class="far fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>`;
  }

  launchCards.innerHTML = launchCardContainer;
}
async function getLaunches() {
  try {
    const response = await fetch(
      "https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10",
    );
    const launchesResponse = await response.json();
    launchesResults = launchesResponse.results;
    displayFeaturedLaunch();
    displayAllLaunches();
  } catch (error) {
    console.log(error);
  }
}

//  3 - planets section
function displayPlanet(list, targetPlanet) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === targetPlanet.getAttribute("data-planet-id")) {
      planetImg.src = list[i].image;
      planetName.innerText = list[i].englishName;
      planetDesc.innerText = list[i].description;
      planetDistance.innerText = `${(list[i].semimajorAxis / 1000000).toFixed(1)}M km`;
      planetRaduis.innerText = `${list[i].meanRadius} km`;
      planetMass.innerText = `${list[i].mass.massValue} × 10^${list[i].mass.massExponent} kg`;
      planetDensity.innerText = ` ${list[i].density}g/cm³`;
      planetOrbitalPeriod.innerText = `${list[i].sideralOrbit} days`;
      planetRotaion.innerText = ` ${list[i].sideralRotation} hours`;
      planetMoons.innerText = `${list[i].moons ? list[i].moons.length : 0}`;
      planetDiscoverer.innerText = `${list[i].discoveredBy ? list[i].discoveredBy : "Known since antiquity"}`;
      planetDiscoveryDate.innerText = `${list[i].discoveryDate ? list[i].discoveryDate : "Ancient"}`;
      planetBodyType.innerText = `${list[i].bodyType ? list[i].bodyType : "Planet"}`;
      planetVolum.innerText = `${list[i].vol.volValue}x10^${list[i].vol.volExponent} km³`;

      planetMassFacts.innerText = `Mass: ${list[i].mass.massValue}x10^${list[i].mass.massExponent} Kg`;
      planetGravityFacts.innerText = `Surface gravity: ${list[i].gravity} m/s²`;
      planetDensityFacts.innerText = `Density: ${list[i].density} g/cm³`;
      planetAxialTiltFacts.innerText = `Axial tilt: ${list[i].axialTilt}°`;

      planetPerihelion.innerText = `${(list[i].perihelion / 1000000).toFixed(1)}M km`;
      planetAphelion.innerText = `${(list[i].aphelion / 1000000).toFixed(1)}M km`;
      planetEccentricity.innerText = list[i].eccentricity;
      planetInclination.innerText = `${list[i].inclination}°`;
      planetAxialTilt.innerText = `${list[i].axialTilt}°`;
      planetTemperature.innerText = `${list[i].avgTemp ? list[i].avgTemp + "°C" : " N/A"} `;
      planetEscapeVelocity.innerText = `${list[i].escape / 1000} km/s`;
    }
  }
}
planetsList.addEventListener("click", function (eventInfo) {
  // search for the div that have this class
  const targetPlanet = eventInfo.target.closest(".planet-card");
  if (!targetPlanet) {
    return;
  }

  displayPlanet(planetsBodies, targetPlanet);
});
// fetch API data
async function getPlanets() {
  try {
    const responseRep = await fetch(
      "https://solar-system-opendata-proxy.vercel.app/api/planets",
    );
    const planetsResponse = await responseRep.json();
    planetsBodies = planetsResponse.bodies;
  } catch (error) {
    console.log(error);
  }
}

// functions calls
getAstronomyImg();
getLaunches();
getPlanets();
