import React from 'react'

function CustomButton(
    props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
        children: React.ReactNode;
        variant?: 'primary' | 'secondary' | 'danger';
        type?: 'button' | 'submit' | 'reset';
        className?: string;
        ispending?: boolean;
    }

) {
    return (
        <button
            disabled={props.ispending}
            {...props}
            className={`px-4 py-2 rounded-md text-white ${props.variant === 'primary'
                    ? 'bg-blue-500 hover:bg-blue-600'
                    : props.variant === 'secondary'
                        ? 'bg-gray-500 hover:bg-gray-600'
                        : props.variant === 'danger'
                            ? 'bg-red-500 hover:bg-red-600'
                            : 'bg-gray-300 hover:bg-gray-400'
                } ${props.className}`}
        >
            {props.children}
        </button>
    )
}

export default CustomButton