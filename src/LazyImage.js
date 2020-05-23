import React from 'react'
import { useInView } from 'react-intersection-observer'
import './LazyImage.css'


const LazyImage = ({ width, height, src, ...rest }) => {

  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px',
    threshold : 1.0
  })

  let originalSrc = '';
  if(src.indexOf('compress@') >= 0){
    let url = src;
    url.replace('analog-mantra-247706.appspot.com/new_ltk_compressed','liketoknowit')
    url.replace('compress@','')
    originalSrc = url
  } else if(src.indexOf('new_ltk_compressed') < 0){
    originalSrc = src.replace('compressed','original-background')
  } else {
    originalSrc = src;
  }
  
  return (
    <div ref={ref} >
      {inView ? (
        <div className="container">
          <a href={originalSrc} target="_blank">
          <img className="Image"
            {...rest}
            src={src}
            width={width}
            height={height}
            loading="lazy"
          />
          </a>
        </div>
      ) : null}
    </div>
  )
}

export default LazyImage
