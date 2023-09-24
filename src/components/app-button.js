export const NextButton = ({ children, className, color, ...otherProps }) => {
    let buttonClass = "border border-solid py-2 px-4 rounded-full border-pink-500 mr-2"
    if (color === "red") {
        buttonClass += " bg-red-500 text-white"
    } else if (color === "blue") {
        buttonClass += " bg-blue-500 text-white"
    } else if (color === "green") {
        buttonClass += " bg-green-500 text-white"
    } else if (color === "black") {
        buttonClass += " bg-black text-white"
    }
    if (className) {
        buttonClass += " " + className;
    }
    return (
    <button
        {...otherProps}
        className={buttonClass}
        >
        { children }
    </button>
    );
}