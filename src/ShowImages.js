import React from 'react'
import './ShowImages.css'

class ShowImages extends React.Component {
  constructor(props){
    super(props);
    let urls = [{url: this.props.imageUrls[0].url}];
    for(let i=1;i<this.props.pageSize;i++){
      urls.push({url: ''})
    }
    this.state={
      urls,
      index: 0
    }
    this.imageLoaded = this.imageLoaded.bind(this);
  }
  static getDerivedStateFromProps(props,state){
    let urls = [{url: props.imageUrls[0].url}];
    for(let i=1;i<props.pageSize;i++){
      urls.push({url: ''})
    }
    return{
      urls,
      index: 0
    }
  }
  imageLoaded(index){
    if((index+1) < this.props.pageSize){
      let url = this.props.imageUrls[index+1].url;
      let urls = [...this.state.urls]
      urls[index+1].url = url;
      this.setState({
        urls
      })
    }
  }
  render() {
    return (
        <div className="container">
          {this.state.urls.map((item,index) => {
            return (
              <div className="Image" key={index}>
                <img src={item.url} alt={index} onLoad={() => this.imageLoaded(index)}></img>
              </div>
            )
          })}
        </div>
        
         
      
    );
  }
}


export default ShowImages;