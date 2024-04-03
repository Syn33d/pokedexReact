import { useRef, useState } from 'react';
import './App.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import homePage from '.';
import display from './display';
import details from './details';
import team from './team';

export function TypeImage({ types }: { types: PokemonType[] }) {
  return types.map((type, index) => (
    <React.Fragment key={index}>
      {index !== 0 && <span style={{ marginLeft: '5px' }}></span>}
      <img
        src={type.image}  // Utilisez directement l'URL d'image du type
        alt={type.name}
        style={{ width: '20px', height: '20px', marginRight: '5px', verticalAlign: 'middle' }}
      />
      {type.name}
    </React.Fragment>
  ));
}

//     {/* {showScrollButton && (
//       <button className="scroll-button" onClick={scrollToTop}>
//         <FontAwesomeIcon icon={faArrowAltCircleUp} />
//       </button>
//     )} */}
//   </div>
// }


function App() {
  const totalGeneration = 8;
  const [showScrollButton, setShowScrollButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  window.addEventListener('scroll', handleScroll);

  return (
    
    //           {showScrollButton && (
    //             <button className="scroll-button" onClick={scrollToTop}>
    //               <FontAwesomeIcon icon={faArrowAltCircleUp} />
    //             </button>
    //           )}
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </div>

    <Router>
      <Routes>
        <Route path="/" Component={homePage} />
        <Route path="/display.tsx" Component={display} />
        <Route path="/details/:id" Component={details} />
        <Route path="/team.tsx" Component={team} />
      </Routes>
    </Router>
  );
}

export default App;