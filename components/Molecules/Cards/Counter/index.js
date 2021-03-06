/**
 * Type: Component
 * Name: Counter
 * Description: Set to increment and decrement on a regular sechudle, as well as on clicking
 *
 */

// ==============================
// IMPORTS
// ==============================

// === CORE ===

import { useEffect } from "react";
import { store, view } from "react-easy-state";

// === CUSTOM ===
//
// 1. Molecules

import { Spacer } from "../../../Molecules/Layout";

// ==============================
// COMPONENT
// ==============================

const CounterCard = () => {

    //A simple store, containing a value, and functions to modify it
    const counter = store({
        num: 0,
        increment: () => counter.num++,
        decrement: () => counter.num--
    })

    //Using a useEffect hook with an empty dependency array as the second argument allows us to run a function when the component mounts, similar to a componentWillMount in a class based component
    useEffect(() => {
        //this interval will check every 60 seconds if the it is a new hour and will update the counter accordingly
        const countdown = () => {
            setInterval(() => {
                const workDayHours = [9, 10, 11, 12, 13, 14, 15, 16, 17]
                const currentTime = new Date()

                //set to check every minute if it is the top of the hour, and fire an increment or decrement if it is.
                if (currentTime.getMinutes() === 0) {
                    workDayHours.includes(currentTime.getHours()) ? counter.increment() : counter.decrement()
                }
            }, 60000)
        }

        //couldn't get the below working as reliably as i wanted. it SHOULD check the currect second and ,if needed, sets a timout to fire interval at the beginning of the next minute, but the seconds aren't accurate enough to rely on. would love to try again in the future.
        // const currentSecond = new Date().getSeconds()
        // if (currentSecond !== 1) {
        //     const delay = (60 - currentSecond) * 1000
        //     setTimeout(() => countdown(), delay)
        // } else countdown()

        countdown()

        //the return will clear the interval when the component dismounts
        return () => clearInterval(countdown)

        //eslint wasn't liking the empty dependency array below, but it's necessary for it to function
        // eslint-disable-next-line
    }, [])

    const buttonMaker = (text, action) => (
        //makes the increment and decrement buttons without having to repeat all the props in the return
        <button
            onClick={action}
            className="actionButton d-flex flex-row alignItems-center justifyContent-center bgColor-primary--main fontSize-sm breakLg-fontSize-sm fontFamily-primary textTransform-uppercase letterSpacing-sm paddingRight-sm paddingLeft-sm paddingTop-xs paddingBottom-xs marginRight-md lineHeight-lg textAlign-center borderRadius-sm">
            <span
                className="buttonText"
            >
                {text}
            </span>
        </button>
    )

    return (
        <div className="titleWrapper">
            {
                //Title
            }
            <h3 className="fontFamily-primary fontSize-xxl color-primary--main textTransform-uppercase letterSpacing-md">
                Counter
            </h3>

            <Spacer vertical space={24} />

            {
                //Counter content
            }
            <h1 className="fontFamily-primary color-white--main fontSize-xxxxl fontWeight-lg">
                {counter.num}
            </h1>

            <Spacer vertical space={24} />

            <div className="d-flex flex-row">
                {
                    //Buttons
                }
                {buttonMaker("Decrement", counter.decrement)}
                {buttonMaker("Increment", counter.increment)}
            </div>

            <Spacer vertical space={16} />

            <p className="breakMd-fontSize-md lineHeight-lg color-black--text">
                This counter features automatic incrementation on work hours and decrementation on all others.
            </p>
        </div>
    )
};

export default view(CounterCard);