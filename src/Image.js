import React from "react";
import Img from 'react-image';

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imageStatus: "loading" };
  }


  render() {
    const imageUrl = this.props.imageUrl; 
    return (
      <div>
        <Img className="Image" 
          src={imageUrl.url}
          loader={<img src="images/loading-gif"/>}
          unloader={<img src="images/sad-face.png"/>}
        />
        {console.log(imageUrl.url)}
      </div>
    );
  }
}

export default Image ;