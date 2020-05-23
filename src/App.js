import React from 'react';
import "element-theme-default"
import './App.css';
import {Pagination, Loading, Select} from'element-react' 
import {connect} from 'react-redux'
import {getImages} from "./actions";
import LazyImage from "./LazyImage";
class App extends React.Component{
  constructor(props){
    super(props);
    let pageNo = 1;
    let pageSize = 20;
    this.state = {
      pageNo,
      pageSize,
      options: [
        {
          label: 'LTK_SAVED',
          value: 'ltk_saved'
        },
        {
          label: 'LTK_DELETED',
          value: 'ltk_deleted'
        },
        {
          label: 'BACKGROUND_CF',
          value: 'background_cf'
        }
      ],
      optionsValue: 'background_cf'
    }
    this.props.loadImages(pageNo,pageSize,this.state.optionsValue);    
  }

  updateQuery(key, value){
    this.setState(state => {
      let tempState = Object.assign({},state);
      tempState[key] = value;
      if(key === 'pageSize' && Math.ceil(this.props.total/value) < this.state.pageNo){
        tempState['pageNo'] = Math.ceil(this.props.total/value)
      }
      return tempState;
    },() => {
      window.stop();
      document.execCommand("Stop", false);
      this.props.loadImages(this.state.pageNo, this.state.pageSize, this.state.optionsValue)
    })
  }
  render(){
    
    return(
      <div>
        <div className="header">
          <Select value={this.state.optionsValue} onChange={this.updateQuery.bind(this,'optionsValue')}>
          {
            this.state.options.map(el => {
              return <Select.Option key={el.value} label={el.label} value={el.value} />
            })
          }
          </Select>
          <Pagination className="pagination" pageSize={this.state.pageSize} small={true}
            pageSizes={[20,50,100]} layout="total, sizes, prev, pager, next, jumper"
            currentPage={this.state.pageNo} total={this.props.total}
            onCurrentChange={this.updateQuery.bind(this,'pageNo')}
            onSizeChange={this.updateQuery.bind(this,'pageSize')}
          />
        </div>
        <div className="container">
          {this.props.load ? <Loading></Loading> : this.props.images.map((item,index) => {
            return (
              <div className="Image" key={this.state.pageNo*this.state.pageSize + index}>
                <LazyImage
                src={item.url} alt={index}
                height={455} width={350}/>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
const getImagesFromState = state => state.images;
const isLoading = state => state.loading;
const mapStateToProps = state => ({
  images: getImagesFromState(state),
  load: isLoading(state),
  total: state.total
})
const mapDispatchToProps = dispatch => ({
  loadImages: (pageNo,pageSize,optionsValue) => dispatch(getImages(pageNo,pageSize,optionsValue))
})
export default connect(mapStateToProps,mapDispatchToProps)(App);
