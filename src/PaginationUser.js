import React from 'react';
import ReactPaginate from 'react-paginate';
import "./style/main_state.css";

const PaginationUser = (props) => {
    if (props.res === '') {//not loadet yet
        console.log("not loadet yet")
        return <div></div>;
    }
    console.log(props.selected_page, props.repo_count);
    let selected_min = props.selected_page * 4 + 1;
    let selected_max = Math.min((props.selected_page + 1) * 4, props.repo_count);
    return <div className="pagination-info"><p className="pagination-status">{selected_min} - {selected_max} of {props.repo_count} items</p>
        <ReactPaginate className="pagination"
            previousLabel={'<'}
            pageCount={Math.ceil(props.repo_count / 4)}
            marginPagesDisplayed={1}
            onPageChange={props.handlePaginationPageClick}
            pageRangeDisplayed={3}
            breakLabel={"..."}
            nextLabel={'>'}>
        </ReactPaginate>
    </div>
}

export default PaginationUser;