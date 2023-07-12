export const TestGetData = async (Test, wallet, cycle) => {
    let start_time = Date.now();
    window.document.getElementById('loading').innerHTML = "Cargando Test...";
    const play_list = await Test.contract.methods.play_list().call();
    const cycle_start_play_list = await Test.contract.methods.cycle_start_play_list().call();
    const cycle_close_play_list = await Test.contract.methods.cycle_close_play_list().call();
    console.log("play_list: ", play_list);
    console.log("Cycle: ", cycle);
    console.log("Cycle to end play list: ", cycle_close_play_list);
    if (play_list && Number(cycle) < Number(cycle_close_play_list)) {
        const play_list_first_video_id = await Test.contract.methods.play_list_first_video_id().call();
        const play_list_last_video_id = await Test.contract.methods.play_list_last_video_id().call();
        const play_list_length = ( Number(play_list_last_video_id) - Number(play_list_first_video_id) ) + 1;
        console.log("play_list_length: ", play_list_length);
        const video_id = Number(play_list_first_video_id) + ( Number(cycle) - Number(cycle_start_play_list) );
        const youtube_id = await Test.contract.methods.youtube_id(video_id).call();

        const last_answer = await Test.contract.methods.answer_of(wallet, (Number(cycle)).toString()).call();
    
        let end_time = Date.now();
        console.log("Tiempo de carga (Test): ", ((end_time - start_time) / 1000).toString())
    
        Test.play_list = play_list;
        Test.id = video_id;
        Test.youtube_id = youtube_id;
        Test.video = null;
        Test.last_answer = last_answer;

    } else {
        const id_actual = await Test.contract.methods.id().call();
        let id = String(Number(id_actual) - 1);
        if (id < 0) {
            id = 0;
        }
        const youtube_id = await Test.contract.methods.youtube_id(id).call();
        const last_answer = await Test.contract.methods.answer_of(wallet, (Number(cycle)).toString()).call();
    
        let end_time = Date.now();
        console.log("Tiempo de carga (Test): ", ((end_time - start_time) / 1000).toString())
    
        Test.play_list = play_list;
        Test.id = id;
        Test.youtube_id = youtube_id;
        Test.video = null;
        Test.last_answer = last_answer;
        Test.id_actual = id_actual;
    }


    return Test;
};

export const TestGetVideo = async (Contract, id) => {
    const first_question = await TestGetFirstQuestion(Contract, id);
    const second_question = await TestGetSecondQuestion(Contract, id);
    const third_question = await TestGetThirdQuestion(Contract, id);

    return {
        first_question,
        second_question,
        third_question
    }
};

export const TestGetFirstQuestion = async (Contract, id) => {
    const question = await Contract.methods.first_question(id).call();
    const answer = await Contract.methods.first_real_answer(id).call();
    const fake_answer_1 = await Contract.methods.first_fake_answer_1(id).call();
    const fake_answer_2 = await Contract.methods.first_fake_answer_2(id).call();

    return {
        question,
        answer,
        fake_answer_1,
        fake_answer_2
    }
}

export const TestGetSecondQuestion = async (Contract, id) => {
    const question = await Contract.methods.second_question(id).call();
    const answer = await Contract.methods.second_real_answer(id).call();
    const fake_answer_1 = await Contract.methods.second_fake_answer_1(id).call();
    const fake_answer_2 = await Contract.methods.second_fake_answer_2(id).call();

    return {
        question,
        answer,
        fake_answer_1,
        fake_answer_2
    }
};

export const TestGetThirdQuestion = async (Contract, id) => {
    const question = await Contract.methods.third_question(id).call();
    const answer = await Contract.methods.third_real_answer(id).call();
    const fake_answer_1 = await Contract.methods.third_fake_answer_1(id).call();
    const fake_answer_2 = await Contract.methods.third_fake_answer_2(id).call();

    return {
        question,
        answer,
        fake_answer_1,
        fake_answer_2
    }
};