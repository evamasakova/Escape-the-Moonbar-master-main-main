

export default function endingScene(divElement, pElement, startTime) {
    const finalTime = 1000;
    const data = [
        "Wow! Such speed! Nyoom Nyoooom. You are faster than Sonic himself. Good job and good luck on your interview.",
        "You've done it! You have reached the exit of the Moonbar. Sadly you did not get to the interview in time. What a shame! There's always next time. :D",
        "Author: Eva Masáková",
        "Graphics: Eva Masáková",
        "Mental breakdowns: 74",
        "Script: Eva Masáková",
        "Experience++",
        "Best supervisor of all time: Profesor Jan Till"
    ]
    divElement.style.display = "block";
    pElement.style.opacity = 1;
    if (finalTime > 5 * 60) {
        pElement.innerHTML = data[0];
    } else {
        pElement.innerHTML = data[1];
    }
    setTimeout(() => {
        setTimeout(() => {
            pElement.style.opacity = 0;
        }, 10000);
    }, 0)
    setTimeout(() => {
        for (let i = 2; i <= data.length;) {
            pElement.innerHTML = data[i];
            pElement.style.opacity = 1;
            setTimeout(() => {
                pElement.style.opacity = 0;
            }, 5000);
            setTimeout(() => {
                i++;
            }, 6000);
        }
    }, 0);
    pElement.style.opacity = 1;
    pElement.style.innerHTML = `Time to finish: ${finalTime}s`;
    setTimeout(() => {
        setTimeout(() => {
            pElement.style.opacity = 0;
        }, 5000);
    }, 0)
    setTimeout(() => {
        divElement.style.opacity = 0;
    }, 2000);
    setTimeout(() => {
        divElement.style.display = "none";
    }, 3000);

}