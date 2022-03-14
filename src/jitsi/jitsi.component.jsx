/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import Shivila from "../assets/images/Logo.svg";
import "../jitsi/jitsi.css";
export const random = Math.random().toString(36).substring(2);
// const navigate = useNavigate();

class JitsiComponent extends Component {
    domain = "gather.shivila.com";
    api = {};

    constructor(props) {
        super(props);
        this.state = {
            room: random,
            user: {
                name: "Moderator",
            },
            isAudioMuted: false,
            isVideoMuted: false,
        };
    }

    startMeet = () => {
        const options = {
            roomName: this.state.room,
            width: "100%",
            height: 668,
            configOverwrite: { prejoinPageEnabled: true },
            interfaceConfigOverwrite: {},

            parentNode: document.querySelector("#jitsi-iframe"),
            userInfo: {
                displayName: this.state.user.name,
            },
        };
        this.api = new window.JitsiMeetExternalAPI(this.domain, options);

        this.api.addEventListeners({
            videoConferenceJoined: this.handleVideoConferenceJoined,
            videoConferenceLeft: this.handleVideoConferenceLeft,
            audioMuteStatusChanged: this.handleMuteStatus,
            videoMuteStatusChanged: this.handleVideoStatus,
        });
    };

    handleVideoConferenceJoined = async (participant) => {
        console.log("handleVideoConferenceJoined", participant);
    };

    handleVideoConferenceLeft = () => {
        console.log("handleVideoConferenceLeft");
        this.props.history("/thank-you");
    };

    handleMuteStatus = (audio) => {
        console.log("handleMuteStatus", audio);
    };

    handleVideoStatus = (video) => {
        console.log("handleVideoStatus", video);
    };

    getParticipants() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.api.getParticipantsInfo());
            }, 500);
        });
    }
    executeCommand(command) {
        this.api.executeCommand(command);
        if (command === "hangup") {
            return this.props.history.State({}, undefined, "/thank-you");
        }

        if (command === "toggleAudio") {
            this.setState({ isAudioMuted: !this.state.isAudioMuted });
        }

        if (command === "toggleVideo") {
            this.setState({ isVideoMuted: !this.state.isVideoMuted });
        }
    }

    componentDidMount() {
        if (window.JitsiMeetExternalAPI) {
            this.startMeet();
        } else {
            alert("JitsiMeetExternalAPI not loaded");
        }
    }

    render() {
        return (
            <>
                <div id="jitsi-iframe">
                    <div className="navbar">
                        <a href="https://shivila.com/" target="blank">
                            <img
                                src={Shivila}
                                alt="shivila_logo"
                                className="navlogo"
                            />
                        </a>
                    </div>
                </div>
            </>
        );
    }
}

// export default JitsiComponent;
// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => <JitsiComponent history={useNavigate()} />;
