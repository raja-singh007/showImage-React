import React from 'react'
//import {}
import './ShowImages.css'




class ShowImages extends React.Component {
  constructor(props){
    super(props);
    this.state={}

  }


  renderImage(imageUrl) {
    return (
      <div >
        <img className="Image" src={imageUrl.url} />
      </div>
    );
    
  }

  render() {
    
   let urls = this.props.imageUrls;
    return (
        <div className="container">
          {urls.slice(0,120).map(imageUrl => this.renderImage(imageUrl))}
        </div>
      
    );
  }
}


export default ShowImages;