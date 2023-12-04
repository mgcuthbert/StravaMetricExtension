const KM_TO_MILE_CONSTANT = 1.60934;
const MILE_TO_KM_CONSTANT = 0.6214;
const FT_TO_METERS = 0.3048;
const METERS_TO_FT = 3.28084;

const convertMilesKm = (value:number, type:string): string => {
    if (type === "km") {
        return (value * 0.6214).toFixed(2) + " mi";
    } else {
        return (value * KM_TO_MILE_CONSTANT).toFixed(2) + " km";
    }
}

const convertFeetMeters = (value:number, type:string): string => {
    if (type === "ft") {
        return (value * FT_TO_METERS).toFixed(0) + " m";
    } else {
        return (value * METERS_TO_FT).toFixed(0) + "ft";
    }
}

const timeToSeconds = (value:string): number => {
    const time = value.split(":");
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    if (time.length === 3) {
        hours = parseInt(time[0]);
        minutes = parseInt(time[1]);
        seconds = parseInt(time[2]);
    } else {
        minutes = parseInt(time[0]);
        seconds = parseInt(time[1]);
    }
    return (hours * 60 * 60) + (minutes * 60) + seconds;
}

const correctSeconds = (seconds:number): string => {
    if (seconds < 10) {
        return "0" + seconds;
    } else {
        return "" + seconds;
    }
}

const pace = (time:string, dist:number, distType:string): string => {
    const totalSeconds = timeToSeconds(time);
    let altDistType = "km";
    if (distType === "km") {
        altDistType = "mi";
    }
    const altDist = parseFloat(convertMilesKm(dist, distType).split(" ")[0]);
    const secondsPerDist = totalSeconds / dist;
    const secondsPerAltDist = totalSeconds / altDist;
    const minutesPerDist = Math.trunc(secondsPerDist / 60);
    const minutesPerAltDist = Math.trunc(secondsPerAltDist / 60);
    const remainSecondsPerDist = Math.trunc(secondsPerDist % 60);
    const remainSecondsPerAltDist = Math.trunc(secondsPerAltDist % 60);
    return minutesPerDist + ":" + correctSeconds(remainSecondsPerDist) + "/" + distType + " | " + 
            minutesPerAltDist + ":" + correctSeconds(remainSecondsPerAltDist) + "/" + altDistType;
}

const convertPace = (value:string, type:string): string => {
    const totalSeconds = timeToSeconds(value);
    let convertedSeconds = totalSeconds * MILE_TO_KM_CONSTANT;
    let end = " /km";
    if (type == "km") {
        convertedSeconds = totalSeconds * KM_TO_MILE_CONSTANT;
        end = " /mi";
    }
    
    const resultMinutes = Math.trunc(convertedSeconds / 60);
    const resultSeconds = Math.trunc(convertedSeconds % 60);
    return resultMinutes + ":" + correctSeconds(resultSeconds) + end; 
}

const buildLabelDiv = (innerText:string): HTMLDivElement => {
    const newDiv:HTMLDivElement = document.createElement('div');
        newDiv.innerHTML = `<div class="label">
            ` + innerText + `
        <div/>
        `;
    return newDiv;
}

const updateActivityPage = () => {
    const headingDiv = document.getElementById('heading');
    if (headingDiv != null) {
        const statsSection = headingDiv.querySelector("div div.row div.spans8.activity-stats ul.inline-stats.section") as HTMLElement;

        // Update distance
        const distanceLI = statsSection.querySelector("li") as HTMLElement;
        const pageDistance = parseFloat((distanceLI.querySelector("strong") as HTMLElement).innerText.trim().replace("\"", ""));
        const type = (distanceLI.querySelector("strong abbr") as HTMLElement).innerText.trim();
        distanceLI.appendChild(buildLabelDiv(convertMilesKm(pageDistance, type)));

        // Update pace
        const statsLI = statsSection.querySelector("li:nth-child(3)");
        const pace = (statsLI?.querySelector("strong") as HTMLElement).innerText.trim();
        const typePace = (distanceLI.querySelector("strong abbr") as HTMLElement).innerText.trim().replace("/", "");
        statsLI?.appendChild(buildLabelDiv(convertPace(pace, typePace)));

        // Update elevation
        const ftLI = headingDiv.querySelector("div div.row div.spans8.activity-stats div.section.more-stats div.row div.spans3") as HTMLElement;
        const elevation = parseInt((ftLI.querySelector("strong") as HTMLElement).innerText.trim().replace("\"", ""));
        const typeEl = (ftLI.querySelector("strong abbr") as HTMLElement).innerText.trim();
        const newStrong:HTMLElement = document.createElement('strong');
        newStrong.innerHTML = "</br>(" + convertFeetMeters(elevation, typeEl) + ")";
        ftLI.appendChild(newStrong);
    } else {
        console.error("Heading Div not found, extension may require an update.");
    }
}

const updateDashboardPage = () => {
    console.log("Not implemented!");
}

const updateTrainingPage = () => {
    const searchResults = document.getElementById("search-results");
    if (searchResults != null) {
        setTimeout(() => {
            console.log("Attempting to update after sleep.");
            const tableRows = searchResults.querySelectorAll("tbody tr") as NodeListOf<HTMLTableRowElement>;
            tableRows.forEach(row => {
                const timeTD = row.querySelector("td.col-time") as HTMLTableCellElement;
                if (timeTD != null) {
                    const sportType = (row.querySelector("td.col-type") as HTMLTableCellElement).innerText.trim();
                    if (sportType === "Swim") {
                        console.log("Ignoring swim rows...");
                    } else {
                        // add converted distance
                        const distanceTD = row.querySelector("td.col-dist") as HTMLTableCellElement;
                        const distance = parseFloat(distanceTD.innerText.trim().replace("\"", ""));
                        const distanceType = distanceTD.querySelector("abbr")?.innerText.trim();
                        distanceTD.appendChild(buildLabelDiv(convertMilesKm(distance, distanceType!)));

                        // add pace for miles + kms here
                        const time = timeTD.innerText;
                        timeTD.appendChild(buildLabelDiv(pace(time, distance, distanceType!)));

                        // add converted elevation
                        const elevationTD = row.querySelector("td.col-elev") as HTMLTableCellElement;
                        const elevation = parseInt(elevationTD.innerText.trim().replace("\"", ""));
                        const elevationType = elevationTD.querySelector("abbr")?.innerText.trim();
                        elevationTD.appendChild(buildLabelDiv(convertFeetMeters(elevation, elevationType!)));
                    }
                }
            });
        }, 1000);
    } else {
        console.error("Search Results Div not found, extension may require an update.");    
    }
}

const updateDom = async (): Promise<void> => {
    // check which page we are on and work based on that
    if (location.href.match("activities")) {
        console.log("Updating activities page...");
        updateActivityPage();
    } else if (location.href.match("dashboard")) {
        console.log("Updating dashboard page...");
        updateDashboardPage();
    } else if (location.href.match("training")) {
        console.log("Updating Training page...");
        updateTrainingPage();
    }
};

updateDom();