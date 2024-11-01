import React, { useState } from 'react';
import { AdamantiumLegion } from './data/clans/AdamantiumLegion';
import { Deepwalkers } from './data/clans/Deepwalkers';
import { Thunderkin } from './data/clans/Thunderkin';
import { Frostborn } from './data/clans/Frostborn'; // Import the Frostborn
import './data/clans/AdamantiumLegion.css';
import './data/clans/Deepwalkers.css';
import './data/clans/Thunderkin.css';
import './data/clans/Frostborn.css'; // Import the Frostborn CSS
// Import other clans and their CSS as needed

const LoreCompendium = () => {
  const [openClan, setOpenClan] = useState(null);

  const clans = [
    AdamantiumLegion,
    Deepwalkers,
    Thunderkin,
    Frostborn, // Add Frostborn to the clans array
    // Add other clans here
  ];

  const toggleClan = (index) => {
    if (openClan === index) {
      setOpenClan(null);
    } else {
      setOpenClan(index);
    }
  };

  return (
    <div className="lore-container">
      <h1 className="lore-header">Lore Compendium</h1>
      <div className="clan-tabs">
        {clans.map((clan, index) => (
          <button
            key={index}
            className={`clan-tab ${openClan === index ? 'active' : ''}`}
            onClick={() => toggleClan(index)}
          >
            {clan.name}
          </button>
        ))}
      </div>
      <div className="clan-content-wrapper">
        {clans.map((clan, index) => (
          <section
            key={index}
            className={`clan-content ${openClan === index ? 'open' : ''}`}
          >
            {openClan === index && (
              <div className={`dossier ${clan.name.replace(/\s/g, '-').toLowerCase()}`}>
                <div dangerouslySetInnerHTML={{ __html: clan.overview }} />
                <div dangerouslySetInnerHTML={{ __html: clan.history }} />
                <div dangerouslySetInnerHTML={{ __html: clan.cultureAndSociety }} />
                <div dangerouslySetInnerHTML={{ __html: clan.kougariLegacy }} />
                <div dangerouslySetInnerHTML={{ __html: clan.trade }} />
                <div dangerouslySetInnerHTML={{ __html: clan.relationsWithOtherClans }} />
                <div dangerouslySetInnerHTML={{ __html: clan.unifiedAttackAndAftermath }} />
                <div dangerouslySetInnerHTML={{ __html: clan.modernEraAndContributions }} />
                <div className="notable-figures">
                  <h3>Notable Figures</h3>
                  {Object.values(clan.notableFigures).map((figure, figIndex) => (
                    <div key={figIndex}>
                      <h4>{figure.name}</h4>
                      <p><strong>Titles:</strong> {figure.titles.join(', ')}</p>
                      <p>{figure.descriptions.join(' ')}</p>
                    </div>
                  ))}
                </div>
                <div dangerouslySetInnerHTML={{ __html: clan.philosophyAndBeliefs }} />
                <div dangerouslySetInnerHTML={{ __html: clan.technologyAndInnovation }} />
                <div dangerouslySetInnerHTML={{ __html: clan.interactionsWithSkyforgers }} />
                <div dangerouslySetInnerHTML={{ __html: clan.currentStatusAndOutlook }} />
                <div className="dossier-media">
                  <img src={clan.image} alt={`${clan.name}`} />
                  <video controls>
                    <source src={clan.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
};

export default LoreCompendium;