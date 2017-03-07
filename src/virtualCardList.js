/**
 * is a class to manage list with
 */
class VirtualCardList {
    /**
     * constructor
     */
    constructor() {
    }

    /**
     * resize
     * @param width set container width
     * @param height set container height
     */
    resize(width, height) {

    }

    /**
     * setLayout set the layout
     * @param layout could be 'row' or 'column'
     */
    setLayout(layout) {

    }

    /**
     * setColumns set columns number or row number in layout=row
     * @param columnsCount split every row to columns counts
     */
    setColumns(columnsCount) {

    }

    /**
     * setElementSize change an element size and broadcast the change
     * @param index determine which element wanna change
     * @param size element new size
     */
    setElementSize(index, size) {

    }

    /**
     * setElementSize change an element size and broadcast the change
     * @param scroll
     */
    setScroll(scroll){
        this.calculate();
    }

    /**
     * calculate and find every elements css
     */
    calculate() {
        return {
            scrollTop:2,
            elementsPosition:[]
        };
    }
}