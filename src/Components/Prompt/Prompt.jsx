import React from 'react'

export default function Prompt(props) {
  return (
    <div className='homeScreenPrompt' role='presentation'>
      <div className='dailog' role='dialog'>
        <div className='insiseDialog'>
          <div className='imageDIv'>
            <div className='imageCOntainEE'>
              <img
                alt=''
                height='76px'
                src=' https://safeshare.live/logo192.png'
                width='76px'
              />
            </div>
          </div>
          <div className='PromptText'>
            <h2 className='_7UhW9  x-6xq  yUEEX KV-D4 uL8Hv'>
              Add SafeShare to your Home screen?
            </h2>
            <div className='_7UhW9   xLCgt      MMzan   _0PwGv       uL8Hv         '>
              Get to Safeshare quickly and easily by adding it to your Home
              screen.
            </div>
          </div>
          <div className='mt3GC'>
            <button
              className='aOOlW  bIiDR  '
              tabIndex='0'
              onClick={props.handleClick}
            >
              Add to Home screen
            </button>
            <button className='aOOlW   HoLwm ' tabIndex='0'>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
