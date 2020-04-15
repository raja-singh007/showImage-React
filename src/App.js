import React from 'react';
import './App.css';
import imagesJson from './x101.json';
import ShowImages from './ShowImages'

class App extends React.Component{
  constructor(props){
}

render(){
  return(
<ShowImages imageUrls={imagesJson} 
            page={this.props.page}
            updatePageConf={this.updatePageConf}/>
  )
}
}
export default App;
