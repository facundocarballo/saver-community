contract Test is Router {
    // Attributes
    bool public play_list;
    uint256 public play_list_first_video_id;
    uint256 public play_list_last_video_id;
    uint256 public cycle_start_play_list;
    uint256 public cycle_close_play_list;

    uint256 public id;

    mapping(uint256 => string) public youtube_id;
    mapping(uint256 => string) public first_question;
    mapping(uint256 => string) public second_question;
    mapping(uint256 => string) public third_question;
    mapping(uint256 => string) public first_real_answer;
    mapping(uint256 => string) public second_real_answer;
    mapping(uint256 => string) public third_real_answer;
    mapping(uint256 => string) public first_fake_answer_1;
    mapping(uint256 => string) public second_fake_answer_1;
    mapping(uint256 => string) public third_fake_answer_1;
    mapping(uint256 => string) public first_fake_answer_2;
    mapping(uint256 => string) public second_fake_answer_2;
    mapping(uint256 => string) public third_fake_answer_2;
    mapping(address => mapping(uint256 => bool)) public answer_of;

    // Events
    event Answer(uint256 indexed date, bool res, address indexed wallet);

    // Public Functions
    function UploadVideoAndFirstQuestion(
        string memory _youtube_id,
        string memory _first_question,
        string memory _first_real_answer,
        string memory _first_fake_answer_1,
        string memory _first_fake_answer_2
    ) public {
        require(
            IsOwner(msg.sender),
            "You are not qualified to upload a video."
        );

        youtube_id[id] = _youtube_id;

        first_question[id] = _first_question;

        first_real_answer[id] = _first_real_answer;

        first_fake_answer_1[id] = _first_fake_answer_1;

        first_fake_answer_2[id] = _first_fake_answer_2;

        id++;
    }

    function UploadSecondQuestion(
        string memory _second_question,
        string memory _second_real_answer,
        string memory _second_fake_answer_1,
        string memory _second_fake_answer_2
    ) public {
        require(
            IsOwner(msg.sender),
            "You are not qualified to upload a video."
        );

        second_question[id - 1] = _second_question;

        second_real_answer[id - 1] = _second_real_answer;

        second_fake_answer_1[id - 1] = _second_fake_answer_1;

        second_fake_answer_2[id - 1] = _second_fake_answer_2;
    }

    function UploadThirdQuestion(
        string memory _third_question,
        string memory _third_real_answer,
        string memory _third_fake_answer_1,
        string memory _third_fake_answer_2
    ) public {
        require(
            IsOwner(msg.sender),
            "You are not qualified to upload a video."
        );

        third_question[id - 1] = _third_question;

        third_real_answer[id - 1] = _third_real_answer;

        third_fake_answer_1[id - 1] = _third_fake_answer_1;

        third_fake_answer_2[id - 1] = _third_fake_answer_2;
    }

    function AnswerVideo(
        string memory answer_1,
        string memory answer_2,
        string memory answer_3,
        uint256 _id
    ) public {
        uint256 cycle = Cycle.cycle();
        require(
            Qualification.is_updated(msg.sender, cycle),
            "You have to update first."
        );

        bool first = (keccak256(abi.encodePacked((answer_1))) ==
            keccak256(abi.encodePacked((first_real_answer[_id]))));
        bool second = (keccak256(abi.encodePacked((answer_2))) ==
            keccak256(abi.encodePacked((second_real_answer[_id]))));
        bool third = (keccak256(abi.encodePacked((answer_3))) ==
            keccak256(abi.encodePacked((third_real_answer[_id]))));

        answer_of[msg.sender][cycle] = first && second && third;

        Qualification.Update(msg.sender);

        emit Answer(block.timestamp, first && second && third, msg.sender);
    }

    // Helpers
    function IsOwner(address wallet) public view returns (bool) {
        return Wallets.IsOwner(wallet);
    }

    // Set functions
    function UsePlayList() public {
        require(
            IsOwner(msg.sender),
            "You are not qualified to change the sort of the videos."
        );
        play_list = !play_list;
        cycle_start_play_list = Cycle.cycle();
        cycle_close_play_list =
            cycle_start_play_list +
            (play_list_last_video_id - play_list_first_video_id);
    }

    function SetFirstVideoOfPlayList(uint256 _id) public {
        require(
            IsOwner(msg.sender),
            "Only owner can set the first video of the play list"
        );
        play_list_first_video_id = _id;
    }

    function SetLastVideoOfPlayList(uint256 _id) public {
        require(
            IsOwner(msg.sender),
            "Only owner can set the last video of the play list"
        );
        play_list_last_video_id = _id;
    }
}