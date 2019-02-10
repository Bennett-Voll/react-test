/**
 * Simple object property animation that takes a transition from the transitions module
 * and animates properties accordingly
 * 
 */
const Animation = {
    /**
     * A class that controls an Animation instance. Is returned upon calling animate
     * 
     */
    Control: class {
        constructor() {
            this.stopped = false;
            this.paused = false;
        }
        
        stop() {
            this.stopped = true;
        }
    },

    /**
     * Return the current time in miliseconds
     * 
     * @return {Number}
     */
    now() {
        return (new Date()).getTime();
    },

    /**
     * Animate properties within the given object
     * 
     * @param {Object} obj An object in which we need to animate the properties
     * @param {Array|String} prop A string or an array of string whose represent the properties to animate
     * @param {Array|Number} endVal A value or an array of values at which we need to stop animating
     * @param {Array|Number} duration 
     * @param {Array|Function} transition Transition functions from the transition module
     * @param {Array|Number} delay
     * @return {Control} 
     */
    animate(obj, prop, endVal, duration, transition, delay = 0) {
        const control = new this.Control();
    
        if ( ! prop instanceof Array) {
            prop = [prop];
        }
    
        if ( ! endVal instanceof Array) {
            endVal = [endVal];
        }
    
        prop.forEach((thisProp, i) => {            
            const thisDuration = duration instanceof Array ? duration[i] : duration;
            const thisDelay = delay instanceof Array ? delay[i] : delay;
            const thisTransition = transition instanceof Array ? transition[i] : transition;
            const thisEndVal = endVal[i];
        
            console.log(thisDelay);

            const startTime =  this.now() + thisDelay;
            const startValue = obj[thisProp];
            const changeInValue = thisEndVal - startValue;

            const timer = () => {
                const timeNow = this.now();
        
                if (control.stopped) {
                    return;
                }

                if (timeNow - startTime > thisDuration) {
                    obj[thisProp] = thisEndVal;

                    return;
                }

                if (timeNow - startTime < 0) {
                    requestAnimationFrame(timer);

                    return;
                }
                
                obj[thisProp] = thisTransition(
                    timeNow - startTime,
                    startValue,
                    changeInValue,
                    thisDuration,
                );
        
                requestAnimationFrame(timer);
            };
        
            requestAnimationFrame(timer);
        });
    
        return control;
    }
}

Animation.dummy = () => new Animation.Control();

export default Animation;