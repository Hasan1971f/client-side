import React from 'react';
import Banner from './Banner';
import LatestVisa from './LatestVisa';
import ExtraSection1 from './ExtraSection1';
import ExtraSection2 from './ExtraSection2';
import AboutUs from './AboutUs';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestVisa></LatestVisa>
            <AboutUs></AboutUs>
            <ExtraSection1></ExtraSection1>
            <ExtraSection2></ExtraSection2>
        </div>
    );
};

export default Home;