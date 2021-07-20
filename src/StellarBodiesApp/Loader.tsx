import React from 'react';

interface LoaderProps {
    message: string;
}

export const Loader = ({message}: LoaderProps) => {
    return (
        <div className='loading-container'>
            <svg
                id='L3'
                xmlns='http://www.w3.org/2000/svg'
                xmlnsXlink='http://www.w3.org/1999/xlink'
                x='0px'
                y='0px'
                width='150px'
                height='150px'
                viewBox='0 0 100 100'
                enableBackground='new 0 0 0 0'
                xmlSpace='preserve'
            >
                <circle fill='none' stroke='#fff' strokeWidth='4' cx='50' cy='50' r='44' style={{opacity: 0.5}} />
                <circle fill='#fff' cx='8' cy='54' r='6'>
                    <animateTransform
                        attributeName='transform'
                        dur='2s'
                        type='rotate'
                        from='0 50 48'
                        to='360 50 52'
                        repeatCount='indefinite'
                    />
                </circle>
            </svg>
            <p>{message}</p>
        </div>
    );
};
