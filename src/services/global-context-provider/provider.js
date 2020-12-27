import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Context from "./context";

const Provider = ({children}) => {

    const [username, setUsername] = useState('');
    const [socket, setSocket] = useState('');

    return <Context.Provider value={{socket, setSocket, username, setUsername}}>{children}</Context.Provider>;
};
Provider.propTypes = {
    children: PropTypes.element,
};

Provider.defaultProps = {
    children: null,
};
export default Provider;