/*import 'aframe';*/
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';
/*import './vendor/superhands-es5.js';*/


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pausePlay: "pause",
            playIcon: "src:#play_icon; transparent:true; shader: flat;",
            lastIcon: "src:#last_icon; transparent:true; shader: flat;",
            nextIcon: "src:#next_icon; transparent:true; shader: flat;",
            videoNumber: 1,
            maxVideos: 4,
            autoPlay: false,
            clickCount: 0,
            firstClick: true,
            lastReadyClick: false
        };
    }


    // Document ready
    componentDidMount() {
        /*document.querySelector('a-scene').addEventListener('touchstart', function (e) { e.preventDefault(); });*/
    }

    buttonFocus = (button) => {
        const buttonLabel = (button === "pause") ? "play" : button;
        if (button === "pause") {
            button = "play";
        } else if (button === "play") {
            button = "pause";
        }


        this.setState({
            [buttonLabel + "Icon"]: "src:#" + button + "_icon_negative; transparent:true; shader: flat;",
        });
    };

    buttonBlur = (button) => {
        const buttonLabel = (button === "pause") ? "play" : button;
        if (button === "pause") {
            button = "play";
        } else if (button === "play") {
            button = "pause";
        }

        this.setState({
            [buttonLabel + "Icon"]: "src:#" + button + "_icon; transparent:true; shader: flat;",
        });
    };

    playAction = () => {
        let video = document.getElementById("video-source");

        if (this.state.pausePlay === "play") {
            video.pause();
        }
        else {
            video.play();
        }

        const button = this.state.pausePlay === "play" ? "play" : "pause";
        const stateChange = this.state.pausePlay === "play" ? "pause" : "play";
        this.setState({pausePlay: stateChange});
        this.setState({
            playIcon: "src:#" + button + "_icon_negative; transparent:true; shader: flat;",
        });
    };

    lastReadyClick = () => {
        this.setState({lastReadyClick: true});
    };

    lastCancelClick = () => {
        console.log("cancel");
        this.setState({lastReadyClick: false});
    };

    lastAction = () => {
        if (this.state.lastReadyClick === true) {
            if (this.state.videoNumber > 1) {
                this.setState({videoNumber: this.state.videoNumber - 1});
            } else {
                this.setState({videoNumber: this.state.maxVideos});
            }

            if (this.state.pausePlay === "play") {
                this.setState({autoPlay: true});
            } else {
                this.setState({autoPlay: false});
            }

            let video = document.getElementById("video-source");

            if (this.state.pausePlay === "play") {
                video.play();
            }
            else {
                video.pause();
            }
        }


    };

    nextAction = () => {
        this.setState({clickCount: this.state.clickCount + 1});
        if (this.state.videoNumber < this.state.maxVideos) {
            this.setState({videoNumber: this.state.videoNumber + 1});
        } else {
            this.setState({videoNumber: 1});
        }

        if (this.state.pausePlay === "play") {
            this.setState({autoPlay: true});
        } else {
            this.setState({autoPlay: false});
        }

        let video = document.getElementById("video-source");

        if (this.state.pausePlay === "play") {
            video.play();
        }
        else {
            video.pause();
        }

    };



    render() {
        return (
            <Scene>
                <a-assets>
                    <img id="groundTexture" src="img/wood_planks.jpg" alt=""/>
                    <img id="play_icon" src="img/play_icon.png" alt=""/>
                    <img id="play_icon_negative" src="img/play_icon_negative.png" alt=""/>
                    <img id="last_icon" src="img/skip_last_icon.png" alt=""/>
                    <img id="last_icon_negative" src="img/skip_last_icon_negative.png" alt=""/>
                    <img id="next_icon" src="img/skip_next_icon.png" alt=""/>
                    <img id="next_icon_negative" src="img/skip_next_icon_negative.png" alt=""/>
                    <img id="pause_icon" src="img/pause_icon.png" alt=""/>
                    <img id="pause_icon_negative" src="img/pause_icon_negative.png" alt=""/>
                    <a-asset-item id="light-obj" src="models/twin_wall_lamp.obj"></a-asset-item>
                    <a-asset-item id="light-mtl" src="models/twin_wall_lamp.mtl"></a-asset-item>
                </a-assets>

                {/**
                 Video source
                 (outside assets because this.state is undefined on asset load)
                 **/}
                <video id="video-source" muted autoPlay={this.state.autoPlay} loop="true"
                       src={"video/" + this.state.videoNumber + ".mp4"}></video>


                {/** Player **/}
                <Entity primitive="a-camera"></Entity>
                <a-entity progressive-controls=" maxLevel: point">
                    <a-entity id="rhand" class="right-controller"></a-entity>
                    <a-entity id="lhand" class="left-controller"></a-entity>
                </a-entity>


                {/** Scene **/}
                <Entity primitive="a-light" type="ambient" color="#445451" intensity="0.8"/>
                <Entity primitive="a-sky" height="2048" radius="30" theta-length="90" width="2048" color="#019DE5"/>
                <Entity id="floor" primitive="a-plane" material="src:#groundTexture; repeat: 25 25" rotation="-90 0 0"
                        height="100" width="100"
                />


                {/** Walls **/}
                <Entity primitive="a-box" width="20" height="20" depth="0.5" color="#424242" position="0 0 -10"/>
                <Entity primitive="a-box" width="20" height="20" depth="0.5" color="#424242" position="0 0 10"/>
                <Entity primitive="a-box" width="0.5" height="20" depth="20" color="#424242" position="-10 0 0"/>
                <Entity primitive="a-box" width="0.5" height="20" depth="20" color="#424242" position="10 0 0"/>
                <Entity primitive="a-box" width="21" height="0.5" depth="21" color="#424242" position="0 10 0"/>


                {/** Video **/}
                <a-video src="#video-source" width="16" height="9" position="0 5 -9.5"></a-video>


                {/** Lights **/}
                <a-entity obj-model="obj: #light-obj; mtl: #light-mtl" position="9.2 4 -4" scale="0.05 0.05 0.05">
                </a-entity>
                <a-entity obj-model="obj: #light-obj; mtl: #light-mtl" position="-9.25 4 -4" scale="0.05 0.05 0.05">
                </a-entity>


                {/** Video Controls **/}
                <Entity id="video-controls-container" primitive="a-plane" scale="4 1 0.1" position="0 2 -9">
                    <Entity
                        id="video-controls-background"
                        primitive="a-plane"
                        material="side: double; color: #424242; transparent: true; opacity: 0.5">
                    </Entity>
                    <Entity id="video-controls" primitive="a-plane">
                        <Entity className="links" id="video-last" primitive="a-plane" scale="0.333 1 1"
                                position="-0.333 0 0.1"
                                material={this.state.lastIcon}
                                events={{
                                    "hover-start": () => this.buttonFocus("last"),
                                    "hover-end": () => this.buttonBlur("last"),
                                    "grab-start": () => this.lastAction("last")
                                }}
                                hoverable clickable
                        >
                        </Entity>
                        <Entity className="links" id={"video-" + this.state.pausePlay} class="video-button"
                                primitive="a-plane"
                                scale="0.333 1 1"
                                position="0 0 0.1" material={this.state.playIcon}
                                events={{
                                    "hover-start": () => this.buttonFocus(this.state.pausePlay),
                                    "hover-end": () => this.buttonBlur(this.state.pausePlay),
                                    "grab-end": () => this.playAction(this.state.pausePlay),
                                }}
                                hoverable clickable
                        >
                        </Entity>
                        <Entity className="links" id="video-next" primitive="a-plane" scale="0.333 1 1"
                                position="0.333 0 0.1"
                                material={this.state.nextIcon}
                                events={{
                                    "hover-start": () => this.buttonFocus("next"),
                                    "hover-end": () => this.buttonBlur("next"),
                                    "grab-end": () => this.nextAction("next"),
                                }}
                                hoverable clickable
                        >
                        </Entity>
                    </Entity>
                </Entity>
            </Scene>
        );
    }
}

ReactDOM.render(<App/>, document.querySelector('#sceneContainer'));
