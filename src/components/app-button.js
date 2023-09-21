export const appButton = ({children, className, ...otherProps}) => {
    return (
    <button
        {...otherProps}
        className={`border border-solid py-2 px-4 rounded-full border-pink-500 mr-2 ${className ?? ''}`}
        >
        {children}
    </button>
    );
}