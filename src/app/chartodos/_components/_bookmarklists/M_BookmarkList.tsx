"use client"

import styled from "styled-components";
import { BookmarkList_Commons } from "./BookmarkList_commons";

const Container = styled(BookmarkList_Commons.BookmarkListContainer)`
    width: 100px;
    height: 50px;
    color: black;
`;

function M_BookmarkList(){
    return (
        <Container>
            mobile
        </Container>
    );
};

export default M_BookmarkList