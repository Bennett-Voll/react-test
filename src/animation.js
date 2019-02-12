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
     * Recurve method that handles the animation from on value to another
     * A callback will be called on each subsequent frame until it reaches the end
     * First parameter of the callback will be the current value
     *
     * @param {Function} callback 
     * @param {Number} startVal
     * @param {Number} changeInVal
     * @param {Number} startTime In miliseconds
     * @param {Number} duration In miliseconds
     * @param {Function} transition The type of transition to apply
     * @param {Control} control The control object
     * @return {Void}
     */
    startTimer(callback, startVal, changeInVal, startTime, duration, transition, control) {
        const timeNow = this.now();
        const timer = this.startTimer.bind(this, ...arguments);

        if (control.stopped) {
            return;
        }

        // end has been reached, set immediately to endvalue
        if (timeNow - startTime > duration) {
            callback(startVal + changeInVal);

            return;
        }

        // implies a delay was added to startTime,
        // wait until correct time has passed
        if (timeNow - startTime < 0) {
            requestAnimationFrame(timer);

            return;
        }

        console.log(arguments)

        callback(transition(
            timeNow - startTime,
            startVal,
            changeInVal,
            duration,
        ));

        requestAnimationFrame(timer);
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
        
            const startTime =  this.now() + thisDelay;
            const startVal = obj[thisProp];
            const changeInVal = thisEndVal - startVal;

            this.startTimer((val) => {
                obj[thisProp] = val;
            }, startVal, changeInVal, startTime, thisDuration, thisTransition, control);
        });
    
        return control;
    },

    /**
     * Call an callback instead of changing a property
     * 
     * @param {Function} callback
     * @param {String} startVal
     * @param {Number} endVal
     * @param {Number} duration
     * @param {Function} transition Transition functions from the transition module
     * @param {Number} delay
     * @return {Control} 
     */
    animateCallback(callback, startVal, endVal, duration, transition, delay = 0) {
        const control = new this.Control();
        const startTime =  this.now() + delay;
        const changeInVal = endVal - startVal;

        this.startTimer(callback, startVal, changeInVal, startTime, duration, transition, control);

        return control;
    },
}

Animation.dummy = () => new Animation.Control();

export default Animation;