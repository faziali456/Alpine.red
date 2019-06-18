import React from 'react';
let imgUrl = '/asset/images/BgImage.jpg'
let styles = {
        backgroundImage: `url(${ imgUrl })`,
        backgroundRepeat  : 'no-repeat',
        backgroundPosition: 'left no-repeat;',
        backgroundSize: 'cover',
        padding: '327px'
  }

const Landing = () => (
  <div style={styles}>
  </div>
);

export default Landing;
