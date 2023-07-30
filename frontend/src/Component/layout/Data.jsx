import React from 'react';
import { Helmet } from 'react-helmet';

const Data = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
      {/* this will make title of each page same and one jo yaha pass hoga  */}
    </Helmet>
  );
};

export default Data;
