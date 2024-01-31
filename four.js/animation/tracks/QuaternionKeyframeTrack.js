const { InterpolateLinear } = require('../../constants.js');
const { KeyframeTrack } = require('../KeyframeTrack.js');
const { QuaternionLinearInterpolant } = require('../../math/interpolants/QuaternionLinearInterpolant.js');

/**
 * A Track of quaternion keyframe values.
 */
class QuaternionKeyframeTrack extends KeyframeTrack {

	InterpolantFactoryMethodLinear( result ) {

		return new QuaternionLinearInterpolant( this.times, this.values, this.getValueSize(), result );

	}

}

QuaternionKeyframeTrack.prototype.ValueTypeName = 'quaternion';
// ValueBufferType is inherited
QuaternionKeyframeTrack.prototype.DefaultInterpolation = InterpolateLinear;
QuaternionKeyframeTrack.prototype.InterpolantFactoryMethodSmooth = undefined;

module.exports = { QuaternionKeyframeTrack };
