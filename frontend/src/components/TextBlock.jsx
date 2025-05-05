

const TextBlock = ({ heading, content }) => {
    return (
        <div className="p-5 md:p-10 text-left">
            <h2 className="font-medium text-2xl mb-4 pl-10">{heading}</h2>
            <div className="pl-8"><hr className=""/></div>
            <p className="pl-10 pt-3 text-lg font-extralight leading-relaxed">{content}</p>
        </div>
    );
};


export default TextBlock;
