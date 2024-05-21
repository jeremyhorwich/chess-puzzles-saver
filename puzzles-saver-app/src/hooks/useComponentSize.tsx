import {useState, useRef, useEffect, useCallback} from "react";

function useComponentSize() {
    type dimension = {
        width: number,
        height: number
    }

    const componentRef = useRef<any>(null);
    const [size, setSize] = useState<dimension>({width: 0, height: 0});

    const handleResize = useCallback(() => {
        if (componentRef) {
            setSize({
                width: componentRef.current.offsetHeight,
                height: componentRef.current.offsetWidth
            })
        }
    }, [])

    useEffect(() => {
        handleResize();

        const resizeObserver = new ResizeObserver(handleResize)
        resizeObserver.observe(componentRef.current);

        return (
            resizeObserver.disconnect()
        )

    }, [handleResize])

    return [componentRef, size]
}

export default useComponentSize;