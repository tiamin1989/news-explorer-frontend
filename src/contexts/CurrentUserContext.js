import React from 'react';

const userContext = { name: 'Загрузка' };

const CurrentUserContext = React.createContext(userContext);

export default CurrentUserContext;
