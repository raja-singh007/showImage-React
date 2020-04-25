import React from 'react'
import { useInView } from 'react-intersection-observer'
import './LazyImage.css'
import Img from 'react-image';

/*function useOnScreen(options){
  const [ref , setRef] = React.useState(null);
  const [visible,setVisible]  = React.useState(false);

  React.useEffect(()=>{
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        setVisible(entry.isIntersecting);
      },options);      
    })

    if(ref){
      observer.observe(ref);

    }

    return()=>{
      if (ref){
        observer.unobserve(ref)
      }
    }

  },[ref,options])

  return [setRef,visible];
}
*/

const LazyImage = ({ width, height, src, ...rest }) => {

  // const [setRef,visible] = useOnScreen({
  //   triggerOnce: true,
  //   rootMargin: '-200px 0px',
  //   threshold : 0.9
  // })
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px',
    threshold : 1.0
  })

  return (
    <div ref={ref} >
      {console.log('***'+src)}
      {inView ? (
        <div className="container">
        <img className="Image"
          {...rest}
          src={src}
          width={width}
          height={height}
          loading="lazy"
        />
        </div>
      ) : null}
    </div>
  )
}

export default LazyImage
