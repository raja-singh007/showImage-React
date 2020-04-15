import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import imagesJson from './x101.json'
import ShowImages from './ShowImages'
import * as serviceWorker from './serviceWorker';
import locale from 'element-react/src/locale/lang/en';


import { i18n } from 'element-react'
i18n.use(locale);


ReactDOM.render(
  <React.StrictMode>
    {console.log(imagesJson.length)}
    <ShowImages imageUrls={imagesJson} total={imagesJson.length} />
    {/* <Image url={imagesJson[1].url}/> */}
    {/* <App/> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
