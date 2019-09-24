import React, { Fragment } from 'react'
import { isProduction } from '@macmillan-learning/savi-responsive-component'


const LazyLoad = (props) => {
    let imageBase = (isProduction()) ? props.data.primerInfo.externalImagePath.production : props.data.primerInfo.externalImagePath.dev;
    let imageArray = props.data.hasOwnProperty('imagePreLoad')?props.data.imagePreLoad:[];
    let imageContainer = imageArray.map((val, index) => {
        return <img key={index} src={imageBase + val} />
    })

    return (
        <div style={{ display: 'none' }} aria-hidden="true">
            {imageContainer}
        </div>

    )
}

export default LazyLoad;