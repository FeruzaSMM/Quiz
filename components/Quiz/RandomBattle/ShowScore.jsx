import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import "react-circular-progressbar/dist/styles.css";
import { useSelector } from "react-redux";
import { battleDataClear, groupbattledata } from "../../../store/reducers/groupbattleSlice";
import { imgError } from "../../../utils";
import { UserCoinScoreApi, getusercoinsApi, setBadgesApi } from "../../../store/actions/campaign";
import { badgesData, LoadNewBadgesData } from "../../../store/reducers/badgesSlice";
import { toast } from "react-toastify";
import { updateUserDataInfo } from "../../../store/reducers/userSlice";


const ShowScore = ({ t, onReviewAnswersClick, reviewAnswer }) => {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate("/");
    };

    const goBack = () => {
        navigate("/quiz-play");
    };

     // store data get
    const userData = useSelector((state) => state.User);

    const groupBattledata = useSelector(groupbattledata);

    const badgesdata = useSelector(badgesData);

    const quiz_warrior_status = badgesdata && badgesdata.data.quiz_warrior.status;

    const quiz_warrior_coin = badgesdata && badgesdata.data.quiz_warrior.badge_reward;

    let user1point = groupBattledata.user1point;
    let user2point = groupBattledata.user2point;
    let user1name = groupBattledata.user1name;
    let user2name = groupBattledata.user2name;
    let user1uid = groupBattledata.user1uid;
    let user2uid = groupBattledata.user2uid;
    let user1image = groupBattledata.user1image;
    let user2image = groupBattledata.user2image;

    useEffect(() => {
        return () => {
            // clear local storage poins
            battleDataClear()
        }
    }, []);

    let counter = 0;

    // quiz warrior badge
    const checkCondition = (userData, user1uid, user1point, user2point) => {
        if (userData.data.id === user1uid && user1point > user2point) {
            counter++;
            if (quiz_warrior_status === "0" && counter === 3) {
                setBadgesApi("quiz_warrior", () => {
                    LoadNewBadgesData("quiz_warrior", "1")
                    toast.success(t("You Won Quiz Warrior Badge"));
                    const status = 0;
                    UserCoinScoreApi(quiz_warrior_coin, null, null, (t("quiz warrior badge reward")), status, (response) => {
                        getusercoinsApi((responseData) => {
                            updateUserDataInfo(responseData.data)
                        }, (error) => {
                            console.log(error);
                        });
                        }, (error) => {
                        console.log(error);
                        }
                    )
                }, (error) => {
                    console.log(error);
                });
            }

        } else if (userData.data.id === user2uid && user2point > user1point) {
            counter++;
            if (quiz_warrior_status === "0" && counter === 3) {
                setBadgesApi("quiz_warrior", () => {
                    LoadNewBadgesData("quiz_warrior", "1")
                    toast.success(t("You Won Quiz Warrior Badge"));
                    const status = 0;
                    UserCoinScoreApi(quiz_warrior_coin, null, null, (t("quiz warrior badge reward")), status, (response) => {
                        getusercoinsApi((responseData) => {
                            updateUserDataInfo(responseData.data)
                        }, (error) => {
                            console.log(error);
                        });
                        }, (error) => {
                        console.log(error);
                        }
                    )
                }, (error) => {
                    console.log(error);
                });
            }
        } else {
            counter = 0;
        }
    };

    useEffect(() => {
        checkCondition(userData,user1uid,user1point,user2point);
    },[])

    return (
        <React.Fragment>
            <div className="my-4 row d-flex align-items-center">
                {(() => {
                    if (userData.data.id == user1uid && user1point > user2point) {
                        return (
                            <div className="result_data">
                                <p>{t("Congratulations")}</p>
                                <h3>{t("Winner")}</h3>
                            </div>
                        );
                    } else if (userData.data.id == user1uid && user1point < user2point) {
                        return (
                            <div className="result_data">
                                <p>{t("Good luck next time")}</p>
                                <h3>{t("You Lose")}</h3>
                                <p className="lost_coin">{t("Unfortunately lost 5 coins")}</p>
                            </div>
                        );
                    } else if (userData.data.id == user2uid && user1point > user2point) {
                        return (
                            <div className="result_data">
                                <p>{t("Good luck next time")}</p>
                                <h3>{t("You Lose")}</h3>
                                <p className="lost_coin">{t("Unfortunately lost 5 coins")}</p>
                            </div>
                        );
                    } else if (userData.data.id == user2uid && user1point < user2point) {
                        return (
                            <div className="result_data">
                                <p>{t("Congratulations")}</p>
                                <h3>{t("Winner")}</h3>
                            </div>
                        );
                    } else if (user1point == user2point) {
                        return (
                            <div className="result_data">
                                <h3>{t("Tie")}</h3>
                            </div>
                        );
                    }
                })()}

                {(() => {
                    if (user1point > user2point) {
                        return (
                            <div className="user_data onevsone">
                                <div className="login_winner">
                                    <img src={user1image ? user1image : process.env.PUBLIC_URL + "/images/user.svg"} alt="user" className="showscore-userprofile" onError={imgError}/>
                                    <p>{user1name}</p>
                                    <p>{t("Winner")}</p>
                                    <p className="point_screen">{user1point}</p>
                                </div>

                                {/* vs */}
                                <div className="versus_screen">
                                    <img src={process.env.PUBLIC_URL + "/images/battle/vs.svg"} alt="versus" />
                                </div>

                                <div className="opponet_loser">
                                    <img src={user2image ? user2image : process.env.PUBLIC_URL + "/images/user.svg"} alt="user" className="showscore-userprofile" onError={imgError}/>
                                    <p>{user2name}</p>
                                    <p>{t("Loser")}</p>
                                    <p className="point_screen">{user2point}</p>
                                </div>
                            </div>
                        );
                    } else if (user1point < user2point) {
                        return (
                            <div className="user_data">
                                <div className="login_winner">
                                    <img src={user2image ? user2image : process.env.PUBLIC_URL + "/images/user.svg"} alt="user" className="showscore-userprofile" onError={imgError}/>
                                    <p>{user2name}</p>
                                    <p>{t("Winner")}</p>
                                    <p className="point_screen">{user2point}</p>
                                </div>

                                {/* vs */}
                                <div className="versus_screen">
                                    <img src={process.env.PUBLIC_URL + "/images/battle/vs.svg"} alt="versus" />
                                </div>

                                <div className="opponet_loser">
                                    <img src={user1image ? user1image : process.env.PUBLIC_URL + "/images/user.svg"} alt="user" className="showscore-userprofile" onError={imgError}/>
                                    <p>{user1name}</p>
                                    <p>{t("Loser")}</p>
                                    <p className="point_screen">{user1point}</p>
                                </div>
                            </div>
                        );
                    } else if (user1point == user2point) {
                        return (
                            <div className="user_data">
                                <div className="login_winner">
                                    <img src={user1image ? user1image : process.env.PUBLIC_URL + "/images/user.svg"} alt="user" className="showscore-userprofile" onError={imgError}/>
                                    <p>{user1name}</p>
                                    <p>{t("Tie")}</p>
                                    <p className="point_screen">{user1point}</p>
                                </div>

                                {/* vs */}
                                <div className="versus_screen">
                                    <img src={process.env.PUBLIC_URL + "/images/battle/vs.svg"} alt="versus" />
                                </div>

                                <div className="opponet_loser">
                                    <img src={user2image ? user2image : process.env.PUBLIC_URL + "/images/user.svg"} alt="user" className="showscore-userprofile" onError={imgError}/>
                                    <p>{user2name}</p>
                                    <p>{t("Tie")}</p>
                                    <p className="point_screen">{user2point}</p>
                                </div>
                            </div>
                        );
                    }
                })()}
            </div>

            <div className="dashoptions row text-center">
                {reviewAnswer ? (
                    <div className="audience__poll col-12 col-sm-6 col-md-2 custom-dash">
                        <button className="btn btn-primary" onClick={onReviewAnswersClick}>
                            {t("Review Answers")}
                        </button>
                    </div>
                ) : (
                    ""
                )}
                <div className="resettimer col-12 col-sm-6 col-md-2 custom-dash">
                    <button className="btn btn-primary" onClick={goBack}>
                        {t("Back")}
                    </button>
                </div>
                <div className="skip__questions col-12 col-sm-6 col-md-2 custom-dash">
                    <button className="btn btn-primary" onClick={goToHome}>
                        {t("Home")}
                    </button>
                </div>
            </div>
        </React.Fragment>
    );
}

ShowScore.propTypes = {
    coins: PropTypes.number.isRequired,
};
export default withTranslation()(ShowScore);
