

export default async function endingScene(divElement, pElement, startTime) {
    const finalTime = (performance.now() - startTime) / 1000;
    const data = [
        "Wow! Such speed! Nyoom Nyoooom. You are faster than Sonic himself. Good job and good luck on your interview.",
        "You've done it! You have reached the exit of the Moonbar. Sadly you did not get to the interview in time. What a shame! There's always next time. :D",
        "Author: Eva Masáková",
        "Graphics: Eva Masáková",
        "Mental breakdowns: 74",
        "Script: Eva Masáková",
        "Experience++",
        "Best supervisor of all time: Profesor Jan Till",
        `Your time: ${Math.floor(finalTime)}s`
    ]
    divElement.style.display = "flex";
    pElement.style.opacity = 0;
    if (finalTime > 5 * 60) {
        pElement.innerHTML = data[1];
    } else {
        pElement.innerHTML = data[0];
    }
    await new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
        pElement.style.opacity = 1;
    })
    await new Promise(resolve => setTimeout(resolve, 10000)).then(() => {
        pElement.style.opacity = 0;
    })
    await new Promise(resolve => setTimeout(resolve, 2000));
    for (let i = 2; i < data.length;) {
        pElement.innerHTML = data[i];
        pElement.style.opacity = 1;
        await new Promise(resolve => setTimeout(resolve, 5000)).then(() => {
            pElement.style.opacity = 0;
        })
        await new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
            i++;
        })
    }
    await new Promise(resolve => setTimeout(resolve, 2000)).then(() => {
        divElement.style.opacity = 0;
    })
    await new Promise(resolve => setTimeout(resolve, 3000)).then(() => {
        divElement.style.display = "none";
    })

}