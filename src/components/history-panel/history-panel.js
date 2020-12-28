import React, {useContext, useEffect, useState} from 'react';
import Bubble from "../bubble/bubble";
import {LABELS} from "../../constants/constants";
import {H2, HistoryPanelWrapper} from "./history-panel.style";
import Context from "../../services/global-context-provider/context";

const HistoryPanel = () => {
    const {socket} = useContext(Context);
    const [aNewResultArray, setNewResultArray] = useState([]);

    useEffect(() => {
        socket.addEventListener('message', function (event) {
            const {event: eventName, data} = JSON.parse(event.data);
            if (eventName === "history") {
                setNewResultArray(aNewResultArray => [data, ...aNewResultArray]);
            }
        });
    }, [socket]);

    return (
        <HistoryPanelWrapper>
            <H2>{LABELS.HISTORY}</H2>
            <div>{aNewResultArray.length > 0 && aNewResultArray.slice(0, 10).map((e, i) => {
                const key = `${e}#${i}`;
                return (
                        <Bubble data={e} key={key} testId={key}/>
                    );
                }
            )}
            </div>
        </HistoryPanelWrapper>
    );
};

export default HistoryPanel;