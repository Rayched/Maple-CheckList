import styled from "styled-components";

const CardBody = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 90%;
`;

const ImageBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 90%;
`;

const CardDataBox = styled.div`
    width: 95%;
    height: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .charnamedata {
        width: 100%;
        height: 40%;
        margin: 3px 0px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;

        img {
            width: 15px;
            height: 13px;
        };

        span {
            margin-left: 5px;
            font-weight: bold;
        }
    };

    .charclassdata {
        width: 100%;
        height: 45%;
        margin: 3px 0px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        font-weight: bold;

        .charclassdata-child {
            width: 50%;
            height: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            font-size: 15px;
        };

        #level {
            min-width: 80px;
            justify-content: flex-start;
        }

        #charclass {
            min-width: 80px;
            justify-content: flex-end;
            
            span {
                margin-left: 5px;
            }
        }
    };
`;

const EditBarContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(223, 230, 233);
    position: absolute;
    z-index: 2;
    border-radius: 8px;
    box-shadow: 2px 3px 2px rgba(0, 0, 0, 0.5);
`;

const EditBtnlayout = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    font-size: 14px;
`;

export const BookmarkCard_Commons = {
    CardBody, ImageBox, CardDataBox, EditBarContainer, EditBtnlayout
};