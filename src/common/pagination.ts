/**
 * 페이지네이션 객체
 * @author Johnny
 */
export default class Pagination {
    /* 한 페이지당 게시글 수 */
    private itemRows: number;

    constructor() {
        this.itemRows = 10;
    }

    /**
     * 한 페이지당 게시글 수 조회
     * @author Johnny
     */
    getItemRows(): number {
        return this.itemRows;
    }
}
