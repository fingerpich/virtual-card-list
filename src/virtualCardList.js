/**
 * is a class to manage list with
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

    cardList=[];
    requireList=[];

    recreateCardLists() {
        const columnCount=Math.min(this.maxColumn,Math.floor(this.size/this.childMinWidth));
        for(var i=0;i<columnCount; i++){
            this.cardList[i] = new OrderedVirtualCardList(i,function(order,index){
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
        // this.calculate();
        //we should scroll every row and get their pull request for loading and make empty template
        //let the pull request passes and make cards empty card loading
    }

    elementPosition={};
    /**
     * calculate and find every elements css
     */
    calculate({getElementHeight}) {
        const col=Math.min(this.maxColumn,Math.floor(this.size/this.childMinWidth));
        const width=this.size[0];
        const elementWidth=width/col;
        const colsElements=[];
        const colsTop=this.getColsTop(col);
        let index=this.startIndex;
        const elPos=this.elementPosition;
        let smallestCol=this.getSmallestCol(colsTop);
        while(this.needToLoadMore(colsTop[smallestCol])){
            if(!elPos[index])elPos[index]={};
            const eliPos=elPos[index];

            eliPos.top = colsTop[smallestCol];
            eliPos.left = smallestCol * elementWidth;
            eliPos.width = elementWidth;
            eliPos.height = getElementHeight?getElementHeight(index):this.childAvgSize;
            colsTop[smallestCol]+=eliPos.height;
            index++;
            smallestCol=this.getSmallestCol(colsTop);
        }
        return this.elementPosition;
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

class OrderedVirtualCardList {
    constructor(getItemAtIndex) {
        this.container = {
            rect: [],
            minIndex: 0,
            maxIndex: 'infinite',
        };
        this.cardsPosotion=[];
        this.window = {
            rect: [],
        };
        this.getItemRect = () => {};
        this.getItemAtIndex=getItemAtIndex;
        this.scrollChange = () => {};//overided scoll event || container scroll event
    }
}