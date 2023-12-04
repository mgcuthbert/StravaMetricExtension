const convertMilesKm = (value:number, type:string): string => {
    if (type === "km") {
        return (value * 0.6214).toFixed(2) + " mi";
    } else {
        return (value * 1.60934).toFixed(2) + " km";
    }
}

const convertFeetMeters = (value:number, type:string): string => {
    if (type === "feet") {
        return (value * 0.3048).toFixed(2) + " m";
    } else {
        return (value * 3.28084).toFixed(2) + "ft";
    }
}

const convertPace = (value:string, type:string): string => {
    const time = value.split(":");
    const minutes = time[0];
    const seconds = time[1];
    const totalSeconds = (parseInt(minutes) * 60) + parseInt(seconds);
    let multiplyConstant = 0.6214;
    let end = " /km";
    if (type == "km") {
        multiplyConstant = 1.60934;
        end = " /mi";
    }
    const convertedSeconds = (totalSeconds * multiplyConstant) / 100;
    const resultMinutes = convertedSeconds / 60;
    const resultSeconds = convertedSeconds % 60;
    return resultMinutes + ":" + resultSeconds + end; 
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

        const distanceLI = statsSection.querySelector("li") as HTMLElement;
        const pageDistance = parseFloat((distanceLI.querySelector("strong") as HTMLElement).innerText.trim().replace("\"", ""));
        const type = (distanceLI.querySelector("strong abbr") as HTMLElement).innerText.trim();
        distanceLI.appendChild(buildLabelDiv(convertMilesKm(pageDistance, type)));

        const statsLI = statsSection.querySelector("li:nth-child(3)");
        const pace = (statsLI?.querySelector("strong") as HTMLElement).innerText.trim();
        const typePace = (distanceLI.querySelector("strong abbr") as HTMLElement).innerText.trim().replace("/", "");
        statsLI?.appendChild(buildLabelDiv(convertPace(pace, typePace)))
    } else {
        console.error("Heading Div not found, extension may require an update.");
    }
}

const updateDashboardPage = () => {

}

const updateDom = async (): Promise<void> => {
    // check which page we are on and work based on that
    if (location.href.match("activities")) {
        console.log("Updating activities page...");
        updateActivityPage();
    } else if (location.href.match("dashboard")) {
        console.log("Updating dashboard page...");
        updateDashboardPage();
    }
};

updateDom();