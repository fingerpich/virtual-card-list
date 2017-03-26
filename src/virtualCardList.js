import VirtualCardSequence from 'virtualCardSequence';
/**
 * is a class to manage some card sequence together
 */

class VirtualCardList {
    /**
     * constructor
     */
    constructor({layout, size, startIndex}) {
        this.layout=layout||"row";
        this.size=size||[600,600];
        this.childMinWidth=40;
        this.childAvgSize=60;
        this.startIndex=startIndex||0;
        this.maxColumn=5;
    }

    cardSequences=[];
    requireList=[];

    recreateSequences() {
        const columnCount=Math.min(this.maxColumn,Math.floor(this.size/this.childMinWidth));
        for(var i=0;i<columnCount; i++){
            this.cardSequences[i] = new VirtualCardSequence(i,function(order, index){
                this.requireList.push({order,index});
                //manage repetitive item
                //manage async item
            });
        }
    }

    /**
     * resize
     * @param width set container width
     * @param height set container height
     */
    resize(width, height) {
        // after a delay
        this.recreateSequences();
    }

    /**
     * setLayout set the layout
     * @param layout could be 'row' or 'column'
     */
    setLayout(layout) {
        this.recreateSequences();
    }

    /**
     * setColumns set columns number or row number in layout=row
     * @param columnsCount split every row to columns counts
     */
    setColumns(columnsCount) {
        this.maxColumn=columnsCount;
        this.recreateSequences();
    }

    /**
     * setElementSize change an element size and broadcast the change
     * @param index determine which element wanna change
     * @param size element new size
     */
    setElementSize(index, size) {
        //TODO: find card sequence and just run it
        for(var i=0;i<this.cardSequences.length; i++){
            this.cardSequences[i].changeCardSize(index,size);
        }
    }

    /**
     * setElementSize change an element size and broadcast the change
     * @param scroll
     */
    setScroll(scroll){
        for(var i=0;i<this.cardSequences.length; i++){
            this.cardSequences[i].scrollChange(scroll);
        }
        // this.calculate();
        //we should scroll every row and get their pull request for loading and make empty template
        //let the pull request passes and make cards empty card loading
    }

    elementPosition={};
    /**
     * calculate and find every elements css
     */
    calculate({getElementHeight}) {

    }
    getSmallestCol(colsTop){
        let min=0;
        let minTop=213213213251216510;
        for(let i=0; i<colsTop.length; i++){
            if(colsTop<minTop)min=i;
        }
        return i;
    }
    needToLoadMore(mintop){
        if(mintop-this.scrollTop<20){
            return true;
        }
        return false;
    }

    getColsTop(columnCount) {
        const tops=[];
        for(let i=0;i<columnCount;i++){
            // tops.push(-Math.random()*100);
            tops.push(0);
        }
        return tops;
    }
}
export default VirtualCardList;