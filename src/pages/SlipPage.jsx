import React from 'react';
import SlipDownload from '../components/SlipDownload';

const SlipPage = () => {
  const slipDetails = {
    token: '123456',
    date: '2025-01-01',
    location: 'Saylani Welfare Office',
  };

  return (
    <div>
      <SlipDownload slipDetails={slipDetails} />
    </div>
  );
};

export default SlipPage;
