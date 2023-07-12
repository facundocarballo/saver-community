const VIDEOS_AMOUNT = 3;

export const getVideoBasicInfo = async (addressAccount, Contract, cycle) => {
    const videosAmount = await Contract.methods.videoID().call();
    const lastAnswer = await Contract.methods.videoAnswerOf(addressAccount, cycle).call();
    const videoSort = await Contract.methods.sort().call();
    let videoURL = "";
    if (!videoSort) {
        const videoID = Math.trunc(Math.random() * videosAmount);
        videoURL = await Contract.methods.youtubeID(videoID).call();
    } else {
        videoURL = await Contract.methods.youtubeID(videosAmount - 1).call();
    }

    return {
        videoURL,
        lastAnswer
    }
};

export const getVideosData = async (addressAccount, timestampNow, Contract) => {
    
    const videosAmount = await Contract.methods.videoID().call();

    const lastVideo = videosAmount == 0 ? 0 : videosAmount - 1;

    const cycle = await Contract.methods.cycle().call();

    const lastAnswer = await Contract.methods.videoAnswerOf(addressAccount, cycle).call();

    const canClaimForVideo = await Contract.methods.qualifiedForVideo(addressAccount).call();

    const videoSort = await Contract.methods.sort().call();

    const randomID = Math.trunc(Math.random() * videosAmount);

    const videoID = videosAmount != 0
        ? !videoSort ?
            randomID
            : videosAmount - 1
        : 0;

    const videoURL = await Contract.methods.youtubeID(videoID).call();

    let firstPossibleAnswers = [];
    let secondPossibleAnswers = [];
    let thirdPossibleAnswers = [];

    const firstQuestion = await Contract.methods.firstQuestion(videoID).call();
    const secondQuestion = await Contract.methods.secondQuestion(videoID).call();
    const thirdQuestion = await Contract.methods.thirdQuestion(videoID).call();

    const firstRealAnswer = await Contract.methods.firstRealAnswer(videoID).call();
    const secondRealAnswer = await Contract.methods.secondRealAnswer(videoID).call();
    const thirdRealAnswer = await Contract.methods.thirdRealAnswer(videoID).call();

    const firstFakeAnswer1 = await Contract.methods.firstFakeAnswer1(videoID).call();
    const secondFakeAnswer1 = await Contract.methods.secondFakeAnswer1(videoID).call();
    const thirdFakeAnswer1 = await Contract.methods.thirdFakeAnswer1(videoID).call();

    const firstFakeAnswer2 = await Contract.methods.firstFakeAnswer2(videoID).call();
    const secondFakeAnswer2 = await Contract.methods.secondFakeAnswer2(videoID).call();
    const thirdFakeAnswer2 = await Contract.methods.thirdFakeAnswer2(videoID).call();

    const orderOfAnswers_question1 = Math.round(Math.random() * 3);
    const orderOfAnswers_question2 = Math.round(Math.random() * 3);
    const orderOfAnswers_question3 = Math.round(Math.random() * 3);

    // Ordenamiento de las respuestas de la primera pregunta
    if (orderOfAnswers_question1 == 0) {
        firstPossibleAnswers.push(firstRealAnswer);
        firstPossibleAnswers.push(firstFakeAnswer1);
        firstPossibleAnswers.push(firstFakeAnswer2);
    } else if (orderOfAnswers_question1 == 1) {
        firstPossibleAnswers.push(firstFakeAnswer1);
        firstPossibleAnswers.push(firstRealAnswer);
        firstPossibleAnswers.push(firstFakeAnswer2);
    } else {
        firstPossibleAnswers.push(firstFakeAnswer1);
        firstPossibleAnswers.push(firstFakeAnswer2);
        firstPossibleAnswers.push(firstRealAnswer);
    }

    // Ordenamiento de las respuestas de la segunda pregunta
    if (orderOfAnswers_question2 == 0) {
        secondPossibleAnswers.push(secondRealAnswer);
        secondPossibleAnswers.push(secondFakeAnswer1);
        secondPossibleAnswers.push(secondFakeAnswer2);
    } else if (orderOfAnswers_question2 == 1) {
        secondPossibleAnswers.push(secondFakeAnswer1);
        secondPossibleAnswers.push(secondRealAnswer);
        secondPossibleAnswers.push(secondFakeAnswer2);
    } else {
        secondPossibleAnswers.push(secondFakeAnswer1);
        secondPossibleAnswers.push(secondFakeAnswer2);
        secondPossibleAnswers.push(secondRealAnswer);
    }

    // Ordenamiento de las respuestas de la tercera pregunta
    if (orderOfAnswers_question3 == 0) {
        thirdPossibleAnswers.push(thirdRealAnswer);
        thirdPossibleAnswers.push(thirdFakeAnswer1);
        thirdPossibleAnswers.push(thirdFakeAnswer2);
    } else if (orderOfAnswers_question3 == 1) {
        thirdPossibleAnswers.push(thirdFakeAnswer1);
        thirdPossibleAnswers.push(thirdRealAnswer);
        thirdPossibleAnswers.push(thirdFakeAnswer2);
    } else {
        thirdPossibleAnswers.push(thirdFakeAnswer1);
        thirdPossibleAnswers.push(thirdFakeAnswer2);
        thirdPossibleAnswers.push(thirdRealAnswer);
    }

    return {
        videoID, videoURL, firstQuestion, secondQuestion, thirdQuestion,
        firstPossibleAnswers, secondPossibleAnswers, thirdPossibleAnswers,
        lastAnswer, firstRealAnswer, secondRealAnswer, thirdRealAnswer,
        videoSort, lastVideo, canClaimForVideo
    };
}