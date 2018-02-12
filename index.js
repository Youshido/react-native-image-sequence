import { array, arrayOf, bool, number, shape, string } from 'prop-types';
import React, { Component } from 'react';
import { requireNativeComponent, View, ViewPropTypes } from 'react-native';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

class ImageSequence extends Component {
    render() {
        let normalized = this.props.images.map(resolveAssetSource);

        // reorder elements if start-index is different from 0 (beginning)
        if (this.props.startFrameIndex !== 0) {
            normalized = [...normalized.slice(this.props.startFrameIndex), ...normalized.slice(0, this.props.startFrameIndex)];
        }

        return (
            <RCTImageSequence
                {...this.props}
                images={normalized}/>
        );
    }
}

ImageSequence.defaultProps = {
    startFrameIndex : 0,
    framesPerSecond : 24,
};

ImageSequence.propTypes = {
    startFrameIndex : number,
    images          : array.isRequired,
    framesPerSecond : number,
    isAnimating     : bool
};

const RCTImageSequence = requireNativeComponent('RCTImageSequence', {
    propTypes : {
        ...ViewPropTypes,
        images          : arrayOf(shape({
            uri : string.isRequired
        })).isRequired,
        framesPerSecond : number,
        isAnimating     : bool
    },
});

export default ImageSequence;
