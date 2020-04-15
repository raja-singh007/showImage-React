import React from 'react'
import {Pagination} from'element-react' 
import './ShowImages.css'




class ShowImages extends React.Component {
  constructor(props){
    super(props);
    this.state={
      index:0,
      total: null,
      pageSize: 10,
      currentPage: 1
    }
   // this.updatePageConf = this.updatePageConf.bind(this);
    this.onCurrentChange = this.onCurrentChange.bind(this);
  }


  renderImage(imageUrl) {
    return (
      <div >
        <img className="Image" 
       // onLoad={this.handleImageLoaded.bind(this)}
        src={imageUrl.url} />
      </div>
    );
    
  }
  onCurrentChange(current_page){
    this.setState(state => ({
        index: (current_page - 1) * state.pageSize ,
        currentPage : current_page
    }))
  }
  // updatePageConf(key,value){
  //   let action;
  //   if(key === 'pageNo')
  //     action = this.props.updatePageNumber;
  //   else{
  //     if(value > this.props.page.pageSize && Math.ceil(this.props.total / value) < this.props.page.pageNo){
  //       this.props.updatePageNumber(Math.ceil(this.props.total / value))
  //     }
  //     action = this.props.updatePageSize;
  //   }
  //   action(value);
  // }
  

  render() {
    
   let index = this.state.index; 
   let urls = this.props.imageUrls;
   let pageSize = this.state.pageSize;
   let currentPage = this.state.currentPage;
   //page.pageNo-1)*page.pageSize, page.pageNo*page.pageSize
    return (
        <div className="container">
          {console.log('index' + index + 'pageSize'+pageSize)}
          {urls.slice(index,index+pageSize).map(imageUrl => this.renderImage(imageUrl))}
          <Pagination className="pagination" pageSize={pageSize} 
          currentPage={currentPage} 
          // onSizeChange={(size) => {this.props.updatePageConf('pageSize',size)}}
          onCurrentChange={(currentPage)=> this.onCurrentChange(currentPage)}
          //(pageNo) => {this.props.updatePageConf('pageNo',pageNo)}
          />
        </div>
        
         
      
    );
  }
}


export default ShowImages;