import React, { Fragment, useEffect, useRef, useState } from "react";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { AppBar, Box, Dialog } from '@mui/material';
import ConnectionStatus from "../Toolbox/ConnectionStatus";
import { Stage } from 'react-konva';
import Map from "../Layers/Map";
import FogOfWar from "../Layers/FogOfWar";
import Effects from "../Layers/Effects";
import BattleTrackerViewer from "../Toolbox/BattleTrackerViewer";

const Player = () => {
    const [selectedMap, setSelectedMap] = useState(null);
    const [selectedMapDimensions, setSelectedMapDimensions] = useState({ width: 0, height: 0 });
    const [fogOfWarReveals, setFogOfWarReveals] = useState([]);
    const [effects, setEffects] = useState([]);
    const [viewScale, setViewScale] = useState(1);
    const [mapPosition, setMapPosition] = useState({x: 0, y:0});
    const [imageToShow, setImageToShow] = useState(null);
    const stageRef = useRef();
    const [showBattleTracker, setShowBattleTracker] = useState(false);
    const [encounter, setEncounter] = useState(null);



    const { sendMessage, lastMessage, readyState } = useWebSocket(global.config.websocketServer, {
        shouldReconnect: (closeEvent) => true
    });

    useEffect(() => {
        if (lastMessage) {
            const msg = JSON.parse(lastMessage.data);
            if (msg.type === 'mapChange') {
                const img = new window.Image();
                img.src = msg.msg;
                img.onload = () => {
                    setSelectedMap(img);
                    setSelectedMapDimensions({width: img.width, height: img.height});
                };
            } else if (msg.type === 'revealsChange') {
                setFogOfWarReveals(msg.msg);
            } else if (msg.type === 'scaleChange') {
                setViewScale(msg.msg);
            } else if (msg.type === 'effectsChange') {
                setEffects(msg.msg);
            } else if (msg.type === 'mapPositionChange') {
                setMapPosition({x: msg.msg.x, y: msg.msg.y});
            } else if (msg.type === 'showImage') {
                setImageToShow(msg.msg);
            } else if (msg.type === 'closeImage') {
                setImageToShow(null);
            } else if (msg.type === 'toggleBattleTracker') {
                setShowBattleTracker(msg.msg);
            } else if (msg.type === 'encounterUpdate') {
                setEncounter(msg.msg);
            }
        }
    }, [lastMessage]);

    useEffect(() => {
        sendPlayerViewChange();
    }, [viewScale]);

    useEffect(() => {
        window.addEventListener("resize", () => {
            sendPlayerViewChange();
        });
    }, []);

    useEffect(() => {
        if (readyState === ReadyState.OPEN) {
            sendPlayerConnected();
        }
    }, [readyState]);

    const sendPlayerConnected = () => {
        sendMessage(
            JSON.stringify({
                'type': 'playerConnected',
                'msg': ''
            })
        );
    };

    const sendPlayerViewChange = () => {
        sendMessage(
            JSON.stringify({
                'type': 'playerViewChange',
                msg: {
                    width: window.innerWidth,
                    height: window.innerHeight
                }
            })
        );
    }

    return (
        <Fragment>
            <AppBar position="static" color="primary" sx={{ display: 'flex', gap: 2 }} style={{backgroundColor: "black"}}>
                <Box position="static" sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <ConnectionStatus connectionStatus={readyState} />
                </Box>
            </AppBar> 
            <Dialog open={imageToShow !== null}>
                <Box
                    component="img"
                    src={imageToShow}
                    />
            </Dialog>
            <BattleTrackerViewer open={showBattleTracker} encounter={encounter} style={{backgroundColor: "black"}}/>
            <Stage
                style={{ backgroundColor: "black" }}
                draggable={false}
                width={window.innerWidth}
                height={window.innerHeight}
                tabIndex={0}
                scaleX={viewScale}
                scaleY={viewScale}
                offsetX={mapPosition.x}
                offsetY={mapPosition.y}
                ref={stageRef}
            >
                {selectedMap && (
                <Fragment>
                    <Map image={selectedMap} />
                    <FogOfWar 
                        revealEnabled={false}
                        opacity={1}
                        height={selectedMapDimensions.height}
                        width={selectedMapDimensions.width+1}
                        reveals={fogOfWarReveals} />
                    <Effects
                        enabled={false}
                        height={selectedMapDimensions.height}
                        width={selectedMapDimensions.width}
                        effects={effects} />
                </Fragment>
                )}
            </Stage>
        </Fragment>
    );
};

export default Player;